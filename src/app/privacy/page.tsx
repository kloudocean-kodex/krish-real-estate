import type { Metadata } from 'next';
import { BUSINESS } from '@/data/team';
import styles from './Privacy.module.css';

export const metadata: Metadata = {
  alternates: {canonical: '/privacy/'},
  title: `Privacy Policy | ${BUSINESS.name}`,
  description: `Privacy policy and personal information handling practices of ${BUSINESS.legalName} in Victoria, Australia.`,
};

export default function PrivacyPage() {
  return (
    <main className={styles.page}>
      <section className={styles.masthead}>
        <div className="container">
          <span className={styles.overline}>◆ LEGAL &amp; COMPLIANCE</span>
          <h1 className={styles.title}>Privacy Policy</h1>
          <p className={styles.subtitle}>
            How {BUSINESS.legalName} handles, secures, and protects your personal information.
          </p>
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className="container">
          <div className={styles.contentWrapper}>
            <div className={styles.prose}>
              <h2>1. Commitment to Privacy</h2>
              <p>
                {BUSINESS.legalName} (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is committed to protecting your privacy in accordance with the <strong>Privacy Act 1988 (Cth)</strong> and the <strong>Australian Privacy Principles (APPs)</strong>. This Privacy Policy outlines how we collect, hold, use, and disclose personal information in connection with our real estate sales, property management, and advisory services.
              </p>

              <h2>2. Information We Collect</h2>
              <p>Depending on your interaction with us, we may collect:</p>
              <ul>
                <li><strong>Contact details:</strong> Full name, email address, telephone numbers, and residential address.</li>
                <li><strong>Property information:</strong> Ownership details, title documentation, inspection history, appraisal requests, and pricing preferences.</li>
                <li><strong>Tenancy details:</strong> Identification documents, employment details, references, and financial information for rental applications.</li>
                <li><strong>Digital interactions:</strong> Information submitted via our website forms, enquiry portals, and electronic correspondence.</li>
              </ul>

              <h2>3. Purpose of Collection</h2>
              <p>We collect personal information to:</p>
              <ul>
                <li>Deliver professional residential sales, auctioneering, and property management services.</li>
                <li>Prepare and provide accurate, evidence-backed property appraisals.</li>
                <li>Facilitate legal contract preparation with conveyancers and legal representatives.</li>
                <li>Fulfill our statutory obligations under the <em>Estate Agents Act 1980 (Vic)</em> and other relevant legislation.</li>
              </ul>

              <h2>4. Website Enquiries &amp; Service Providers</h2>
              <p>Website enquiries are processed through Cloudflare and stored in Eagle Software so our team can respond. Eagle Software also sends enquiry notifications to our team. Bot protection may process technical information to prevent abuse. We do not treat an enquiry as consent to marketing subscriptions.</p>
              <h2>5. Security &amp; Storage</h2>
              <p>
                We use access-controlled systems and take reasonable steps to protect personal information. Contact us to request access, correction, or to raise a privacy concern.
              </p>

              <h2>6. Contact Our Privacy Officer</h2>
              <p>
                If you have questions regarding this Privacy Policy or wish to access or correct your personal information, please contact:
              </p>
              <p>
                <strong>The Privacy Officer</strong><br />
                {BUSINESS.legalName}<br />
                {BUSINESS.address.street}, {BUSINESS.address.suburb} {BUSINESS.address.state} {BUSINESS.address.postcode}<br />
                Email: <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a><br />
                Phone: <a href={`tel:${BUSINESS.phone}`}>{BUSINESS.phone}</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
