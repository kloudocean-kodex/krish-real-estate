import type { Metadata } from 'next';
import { BUSINESS } from '@/data/team';
import styles from '../privacy/Privacy.module.css';

export const metadata: Metadata = {
  title: `Terms of Use | ${BUSINESS.name}`,
  description: `Terms and conditions governing the use of the ${BUSINESS.name} website and property portals.`,
};

export default function TermsPage() {
  return (
    <main className={styles.page}>
      <section className={styles.masthead}>
        <div className="container">
          <span className={styles.overline}>◆ LEGAL &amp; REGULATORY</span>
          <h1 className={styles.title}>Terms of Use</h1>
          <p className={styles.subtitle}>
            Terms and conditions governing access to and use of this website.
          </p>
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className="container">
          <div className={styles.contentWrapper}>
            <div className={styles.prose}>
              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing or using the website of {BUSINESS.legalName} (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;), you acknowledge and agree to be bound by these Terms of Use and our Privacy Policy. If you do not agree with any part of these terms, you must discontinue using our website.
              </p>

              <h2>2. Nature of Property Information</h2>
              <p>
                All property listings, photographs, floorplans, descriptions, estimated price ranges, and inspection times displayed on this website are provided for informational and advertising purposes only. While every endeavor is made to verify the accuracy of the information:
              </p>
              <ul>
                <li>Neither {BUSINESS.legalName} nor its licensed agents warrant or guarantee the accuracy, completeness, or currency of any property details.</li>
                <li>Prospective purchasers and tenants must conduct their own independent legal, building, pest, and financial inquiries and verify all representations.</li>
                <li>Prices displayed are subject to contract, vendor instruction, and auction conditions.</li>
              </ul>

              <h2>3. Intellectual Property Rights</h2>
              <p>
                All trademarks, logos, visual assets, text, photography, architectural diagrams, and code on this website are the intellectual property of {BUSINESS.legalName} or licensed to us. You may not reproduce, distribute, or modify any materials without our prior written consent.
              </p>

              <h2>4. Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by Victorian and Australian law, {BUSINESS.legalName} excludes all liability for any direct, indirect, incidental, or consequential loss arising from your reliance on information contained on this website.
              </p>

              <h2>5. Governing Law</h2>
              <p>
                These Terms of Use are governed by and construed in accordance with the laws of the State of Victoria, Australia. You submit to the non-exclusive jurisdiction of the courts of Victoria.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
