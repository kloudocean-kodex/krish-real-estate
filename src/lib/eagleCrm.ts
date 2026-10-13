/**
 * Eagle CRM (Eagle Agent) Integration Library
 * ──────────────────────────────────────────────
 * Server-side utility for authenticating and pushing leads to Eagle CRM.
 * This runs inside Cloudflare Pages Functions — never exposed to the browser.
 *
 * Eagle API v3 — GraphQL over REST
 * Auth: POST /api/v3/token  → Bearer {client_id}:{client_secret}
 * Docs: Provided by Eagle Software after API registration
 */

interface EagleTokenResponse {
  token: string;
  expiresIn: number;
}

interface EagleLeadPayload {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  enquiryType: 'selling' | 'buying' | 'leasing' | 'general' | 'appraisal';
  message?: string;
  propertyAddress?: string;
  source?: string;
}

interface EagleConfig {
  clientId: string;
  clientSecret: string;
  baseUrl: string;
}

/**
 * Get a 24-hour session token from Eagle CRM API v3
 */
async function getEagleToken(config: EagleConfig): Promise<string> {
  const response = await fetch(`${config.baseUrl}/api/v3/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${config.clientId}:${config.clientSecret}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Eagle CRM auth failed (${response.status}): ${errorText}`);
  }

  const data = (await response.json()) as EagleTokenResponse;
  return data.token;
}

/**
 * Push a new contact/enquiry to Eagle CRM via GraphQL mutation
 */
async function createEagleContact(
  config: EagleConfig,
  token: string,
  lead: EagleLeadPayload
): Promise<{ success: boolean; contactId?: string; error?: string }> {
  // Map enquiry type to Eagle CRM contact category
  const categoryMap: Record<string, string> = {
    selling: 'Vendor',
    buying: 'Buyer',
    leasing: 'Tenant',
    general: 'Enquiry',
    appraisal: 'Vendor',
  };

  const mutation = `
    mutation CreateContact($input: ContactInput!) {
      createContact(input: $input) {
        id
        firstName
        lastName
        email
      }
    }
  `;

  const variables = {
    input: {
      firstName: lead.firstName,
      lastName: lead.lastName,
      phone: lead.phone,
      email: lead.email,
      category: categoryMap[lead.enquiryType] || 'Enquiry',
      notes: [
        `Source: ${lead.source || 'krishrealestate.com.au'}`,
        `Enquiry Type: ${lead.enquiryType}`,
        lead.propertyAddress ? `Property: ${lead.propertyAddress}` : '',
        lead.message ? `Message: ${lead.message}` : '',
      ]
        .filter(Boolean)
        .join('\n'),
    },
  };

  try {
    const response = await fetch(`${config.baseUrl}/api/v3/graphql`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: mutation, variables }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return { success: false, error: `Eagle API error (${response.status}): ${errorText}` };
    }

    const result = await response.json();
    if (result.errors) {
      return { success: false, error: result.errors[0]?.message || 'GraphQL error' };
    }

    return {
      success: true,
      contactId: result.data?.createContact?.id,
    };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Unknown Eagle CRM error',
    };
  }
}

/**
 * Main entry: push a lead to Eagle CRM
 * Returns result without throwing — caller handles fallback
 */
export async function pushLeadToEagleCRM(
  lead: EagleLeadPayload
): Promise<{ success: boolean; contactId?: string; error?: string }> {
  const config: EagleConfig = {
    clientId: process.env.EAGLE_CRM_CLIENT_ID || '',
    clientSecret: process.env.EAGLE_CRM_CLIENT_SECRET || '',
    baseUrl: process.env.EAGLE_CRM_BASE_URL || 'https://www.eagleagent.com.au',
  };

  // If credentials aren't configured, skip silently
  if (!config.clientId || !config.clientSecret) {
    return {
      success: false,
      error: 'Eagle CRM credentials not configured — skipping CRM push',
    };
  }

  try {
    const token = await getEagleToken(config);
    return await createEagleContact(config, token, lead);
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Eagle CRM integration error',
    };
  }
}
