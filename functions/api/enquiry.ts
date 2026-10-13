/**
 * Cloudflare Pages Function — /api/enquiry
 * ─────────────────────────────────────────
 * Server-side handler that receives form submissions from the website
 * and pushes them to:
 *   1. Web3Forms (email notification to Chirag)
 *   2. Eagle CRM (lead record creation)
 *
 * Environment variables (set in Cloudflare Pages dashboard):
 *   - WEB3FORMS_KEY          — Web3Forms access key
 *   - EAGLE_CRM_CLIENT_ID    — Eagle API Client ID
 *   - EAGLE_CRM_CLIENT_SECRET — Eagle API Client Secret
 *   - EAGLE_CRM_BASE_URL     — Eagle API base URL (default: https://www.eagleagent.com.au)
 */

interface Env {
  WEB3FORMS_KEY: string;
  EAGLE_CRM_CLIENT_ID: string;
  EAGLE_CRM_CLIENT_SECRET: string;
  EAGLE_CRM_BASE_URL?: string;
}

interface EnquiryPayload {
  name: string;
  phone: string;
  email: string;
  message?: string;
  enquiry_type: string;
  source: string;
  address?: string;
  property_type?: string;
  bedrooms?: string;
  bathrooms?: string;
  timeline?: string;
  notes?: string;
  subject?: string;
}

// ── Eagle CRM Token Auth (VERIFIED ✅) ──
async function getEagleToken(env: Env): Promise<string | null> {
  const baseUrl = env.EAGLE_CRM_BASE_URL || 'https://www.eagleagent.com.au';
  try {
    const res = await fetch(`${baseUrl}/api/v3/token`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.EAGLE_CRM_CLIENT_ID}:${env.EAGLE_CRM_CLIENT_SECRET}`,
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) return null;
    // Eagle API response: { data: { token: { token: "eyJ...", expiresAt: ... } } }
    const json = await res.json() as { data?: { token?: { token?: string } } };
    return json?.data?.token?.token || null;
  } catch {
    return null;
  }
}

// ── Push to Eagle CRM (VERIFIED ✅ — Contact + Enquiry pipeline) ──
async function pushToEagle(env: Env, payload: EnquiryPayload): Promise<boolean> {
  if (!env.EAGLE_CRM_CLIENT_ID || !env.EAGLE_CRM_CLIENT_SECRET) return false;

  const token = await getEagleToken(env);
  if (!token) return false;

  const baseUrl = env.EAGLE_CRM_BASE_URL || 'https://www.eagleagent.com.au';
  const nameParts = (payload.name || '').split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  const notesLines = [
    `Source: ${payload.source}`,
    `Enquiry Type: ${payload.enquiry_type}`,
    payload.address ? `Property: ${payload.address}` : '',
    payload.property_type ? `Type: ${payload.property_type}` : '',
    payload.bedrooms ? `Beds: ${payload.bedrooms}` : '',
    payload.bathrooms ? `Baths: ${payload.bathrooms}` : '',
    payload.timeline ? `Timeline: ${payload.timeline}` : '',
    payload.message ? `\nMessage:\n${payload.message}` : '',
    payload.notes ? `\nNotes:\n${payload.notes}` : '',
  ].filter(Boolean).join('\n');

  try {
    // Step 1: Create Contact in Eagle CRM
    const contactRes = await fetch(`${baseUrl}/api/v3/graphql`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `mutation($input: CreateContactInput!) {
          createContact(input: $input) {
            contact { id }
            errors
          }
        }`,
        variables: {
          input: {
            attributes: {
              firstName,
              lastName: lastName || undefined,
              emails: [{ email: payload.email }],
              phoneNumbers: [{ phoneNumber: payload.phone, numberType: 'MOBILE' }],
              source: 'Website - krishrealestate.com.au',
              backgroundInfo: notesLines,
            },
          },
        },
      }),
    });

    const contactData = await contactRes.json() as {
      data?: { createContact?: { contact?: { id?: string } } };
    };
    const contactId = contactData?.data?.createContact?.contact?.id;
    if (!contactId) return false;

    // Step 2: Create Enquiry linked to the new Contact
    await fetch(`${baseUrl}/api/v3/graphql`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `mutation($input: CreateEnquiryInput!) {
          createEnquiry(input: $input) {
            enquiry { id }
            errors
          }
        }`,
        variables: {
          input: {
            attributes: {
              contactIds: [parseInt(contactId)],
              text: notesLines,
              referredBy: 'krishrealestate.com.au',
            },
          },
        },
      }),
    });

    return true;
  } catch {
    return false;
  }
}

// ── Push to Web3Forms ──
async function pushToWeb3Forms(env: Env, payload: EnquiryPayload): Promise<boolean> {
  if (!env.WEB3FORMS_KEY) return false;

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: env.WEB3FORMS_KEY,
        ...payload,
        subject: payload.subject || `New ${payload.enquiry_type} enquiry from ${payload.name} — Krish Real Estate`,
        from_name: 'Krish Real Estate Website',
        to: 'chirag@krishrealestate.com.au',
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

// ── Main Handler ──
export const onRequestPost: PagesFunction<Env> = async (context) => {
  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    const payload = await context.request.json() as EnquiryPayload;

    // Validate required fields
    if (!payload.name || !payload.email || !payload.phone) {
      return new Response(
        JSON.stringify({ success: false, error: 'Name, email, and phone are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // Send to both services concurrently
    const [web3Result, eagleResult] = await Promise.allSettled([
      pushToWeb3Forms(context.env, payload),
      pushToEagle(context.env, payload),
    ]);

    const web3Success = web3Result.status === 'fulfilled' && web3Result.value;
    const eagleSuccess = eagleResult.status === 'fulfilled' && eagleResult.value;

    return new Response(
      JSON.stringify({
        success: web3Success || eagleSuccess,
        channels: {
          email: web3Success ? 'delivered' : 'failed',
          crm: eagleSuccess ? 'synced' : 'skipped',
        },
      }),
      { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  } catch {
    return new Response(
      JSON.stringify({ success: false, error: 'Invalid request' }),
      { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  }
};

// Handle CORS preflight
export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};
