/** Server-only Eagle v3 transport; Pages supplies credentials at runtime. */
export interface EagleConfig {
  EAGLE_CRM_CLIENT_ID?: string;
  EAGLE_CRM_CLIENT_SECRET?: string;
}
export interface EagleLead {
  name: string;
  email: string;
  phone: string;
  enquiry_type: string;
  source: string;
  subject?: string;
  message?: string;
  address?: string;
  property_type?: string;
  bedrooms?: string;
  bathrooms?: string;
  timeline?: string;
  notes?: string;
  property_id?: string;
  page_url?: string;
  referrer?: string;
  campaign?: string;
  request_id?: string;
}
export interface EagleResult {
  success: boolean;
  contactId?: string;
  enquiryId?: string;
  stage: "configuration" | "auth" | "contact" | "enquiry" | "complete";
}
type GraphResult = {
  errors?: { message: string }[];
  data?: {
    createContact?: { contact?: { id: string }; errors?: string[] };
    createEnquiry?: { enquiry?: { id: string }; errors?: string[] };
  };
};
export async function pushLeadToEagleCRM(
  env: EagleConfig,
  lead: EagleLead,
): Promise<EagleResult> {
  if (!env.EAGLE_CRM_CLIENT_ID || !env.EAGLE_CRM_CLIENT_SECRET)
    return { success: false, stage: "configuration" };
  let stage: EagleResult["stage"] = "auth";
  let contactId: string | undefined;
  const base = "https://www.eagleagent.com.au";
  try {
    const auth = await fetch(`${base}/api/v3/token`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.EAGLE_CRM_CLIENT_ID}:${env.EAGLE_CRM_CLIENT_SECRET}`,
        "Content-Type": "application/json",
      },
      signal: AbortSignal.timeout(12000),
    });
    const data = (await auth.json()) as {
      data?: { token?: { token?: string } };
    };
    const token = data.data?.token?.token;
    if (!auth.ok || !token) return { success: false, stage };
    const gql = async (query: string, attributes: Record<string, unknown>) => {
      const response = await fetch(`${base}/api/v3/graphql`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, variables: { input: { attributes } } }),
        signal: AbortSignal.timeout(15000),
      });
      const result = (await response.json()) as GraphResult;
      if (!response.ok || result.errors?.length)
        throw new Error("Eagle rejected request");
      return result;
    };
    const [firstName, ...last] = lead.name.trim().split(/\s+/);
    const text = Object.entries(lead)
      .filter(([, v]) => v)
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n");
    stage = "contact";
    // Reuse a record only when both supplied email and phone match. Never
    // overwrite an existing person's details or marketing permissions.
    const lookup = await fetch(`${base}/api/v3/graphql`, {
      method: "POST",
      headers: {Authorization: `Bearer ${token}`, "Content-Type": "application/json"},
      body: JSON.stringify({query: "query($email:String!){contacts(query:$email,first:50){nodes{id emails{email} phoneNumbers{phoneNumber}}}}",variables:{email:lead.email}}),
      signal: AbortSignal.timeout(12000),
    });
    const matches = await lookup.json() as {errors?:unknown[];data?:{contacts?:{nodes?:{id:string;emails?:{email:string}[];phoneNumbers?:{phoneNumber:string}[]}[]}}};
    if(!lookup.ok||matches.errors?.length||!Array.isArray(matches.data?.contacts?.nodes))throw new Error('Contact lookup unavailable');
    const phoneKey=(phone:string)=>phone.replace(/\D/g,'').replace(/^61(?=\d{9}$)/,'0');
    contactId=matches.data.contacts.nodes.find(c=>c.emails?.some(e=>e.email?.toLowerCase()===lead.email.toLowerCase())&&c.phoneNumbers?.some(p=>phoneKey(p.phoneNumber)===phoneKey(lead.phone)))?.id;
    if(!contactId){
    const contact = await gql(
      "mutation($input:CreateContactInput!){createContact(input:$input){contact{id}}}",
      {
        firstName,
        lastName: last.join(" "),
        emails: [{ email: lead.email }],
        phoneNumbers: [{ phoneNumber: lead.phone, numberType: "MOBILE" }],
        backgroundInfo: text,
        subscribedToEmail: false,
        subscribedToSms: false,
        subscribedToPropertyAlerts: false,
      },
    );
    contactId = contact.data?.createContact?.contact?.id;
    }
    if (!contactId || !Number.isSafeInteger(Number(contactId)))
      return { success: false, stage };
    stage = "enquiry";
    let enquiryId: string | undefined;
    try {
      // Eagle can return null for its non-nullable payload.errors field even after
      // committing an enquiry. Select the actual record rather than that field.
      const enquiry = await gql(
        "mutation($input:CreateEnquiryInput!){createEnquiry(input:$input){enquiry{id}}}",
        {
          contactIds: [Number(contactId)],
          ...(lead.property_id
            ? { propertyIds: [Number(lead.property_id)] }
            : {}),
          text,
          visibleToVendor: false,
        },
      );
      enquiryId = enquiry.data?.createEnquiry?.enquiry?.id;
    } catch {
      /* Reconcile an ambiguous upstream response before allowing a retry. */
    }
    if (!enquiryId && lead.request_id) {
      const readback = await fetch(`${base}/api/v3/graphql`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query:
            "query($ids:[ID!],$since:String){enquiries(contactId:$ids,enquiryAfter:$since,first:50){nodes{id text}}}",
          variables: {
            ids: [contactId],
            since: new Date(Date.now() - 600000).toISOString(),
          },
        }),
        signal: AbortSignal.timeout(12000),
      });
      const saved = (await readback.json()) as {
        data?: { enquiries?: { nodes?: { id: string; text: string }[] } };
      };
      if (readback.ok)
        enquiryId = saved.data?.enquiries?.nodes?.find((item) =>
          item.text?.split("\n").includes(`request_id: ${lead.request_id}`),
        )?.id;
    }
    return {
      success: !!enquiryId,
      contactId,
      enquiryId,
      stage: enquiryId ? "complete" : stage,
    };
  } catch {
    return { success: false, contactId, stage };
  }
}
