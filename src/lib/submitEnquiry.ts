/**
 * Unified form submission handler
 * ────────────────────────────────
 * Attempts submission in this priority order:
 *   1. Cloudflare Pages Function (/api/enquiry) — pushes to Web3Forms + Eagle CRM
 *   2. Web3Forms direct (fallback if CF Function unavailable)
 *   3. mailto: link (last-resort fallback)
 */

interface FormPayload {
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

interface SubmitResult {
  success: boolean;
  channel: 'api' | 'web3forms' | 'mailto';
  crm?: 'synced' | 'skipped' | 'failed';
}

export async function submitEnquiry(payload: FormPayload): Promise<SubmitResult> {
  // ── Attempt 1: Cloudflare Pages Function (handles both email + CRM) ──
  try {
    const res = await fetch('/api/enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      const data = await res.json();
      return {
        success: true,
        channel: 'api',
        crm: data.channels?.crm || 'skipped',
      };
    }
  } catch {
    // CF Function not available — fall through to Web3Forms
  }

  // ── Attempt 2: Web3Forms direct (client-side, email only) ──
  try {
    const web3Key = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
    if (web3Key && web3Key !== 'YOUR_WEB3FORMS_KEY') {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: web3Key,
          ...payload,
          subject: payload.subject || `New ${payload.enquiry_type} enquiry from ${payload.name} — Krish Real Estate`,
          from_name: 'Krish Real Estate Website',
          to: 'chirag@krishrealestate.com.au',
        }),
      });

      if (res.ok) {
        return { success: true, channel: 'web3forms', crm: 'skipped' };
      }
    }
  } catch {
    // Web3Forms failed — fall through to mailto
  }

  // ── Attempt 3: mailto fallback (always works) ──
  const subject = encodeURIComponent(
    payload.subject || `New ${payload.enquiry_type} enquiry from ${payload.name}`
  );
  const bodyLines = [
    `Name: ${payload.name}`,
    `Phone: ${payload.phone}`,
    `Email: ${payload.email}`,
    `Type: ${payload.enquiry_type}`,
    payload.address ? `Address: ${payload.address}` : '',
    payload.property_type ? `Property Type: ${payload.property_type}` : '',
    payload.bedrooms ? `Bedrooms: ${payload.bedrooms}` : '',
    payload.bathrooms ? `Bathrooms: ${payload.bathrooms}` : '',
    payload.timeline ? `Timeline: ${payload.timeline}` : '',
    '',
    payload.message ? `Message:\n${payload.message}` : '',
    payload.notes ? `Notes:\n${payload.notes}` : '',
  ].filter(Boolean).join('\n');

  const body = encodeURIComponent(bodyLines);
  window.open(`mailto:chirag@krishrealestate.com.au?subject=${subject}&body=${body}`, '_blank');

  return { success: true, channel: 'mailto', crm: 'skipped' };
}
