import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './PropertyManagement.module.css';

export const metadata: Metadata = {
  title: 'Property Management & Asset Stewardship | Melbourne North | Krish Real Estate',
  description:
    'Protect and grow your rental yield with boutique property management in Wollert, Epping, Craigieburn, and Donnybrook. Zero vacancy focus, verified tenants, and complete asset stewardship.',
  openGraph: {
    title: 'Property Management & Asset Stewardship | Krish Real Estate',
    description: 'Boutique asset stewardship for northern corridor property investors.',
    images: ['/images/property-interior.jpg'],
  },
};

export default function PropertyManagementPage() {
  return (
    <main className={styles.page}>
      {/* ── Masthead ── */}
      <section className={styles.masthead}>
        <div className="container">
          <div className={styles.mastheadContent}>
            <div className={styles.prestigeOverline}>
              <span>◆</span>
              <span>INVESTOR ASSET STEWARDSHIP</span>
              <span>◆</span>
            </div>
            <h1 className={styles.title}>
              We don&apos;t just manage rent.<br />
              <span className={styles.titleItalic}>We protect wealth.</span>
            </h1>
            <p className={styles.subtitle}>
              High-volume rent rolls treat your property like a filing cabinet number.
              At Krish, we manage a strictly capped portfolio of northern residences with the forensic care
              we would demand for our own investments.
            </p>
            <div className={styles.mastheadActions}>
              <Link href="/sell/property-appraisal" className={styles.ctaPrimary}>
                Request Rental Appraisal
              </Link>
              <a href="#transfer" className={styles.ctaSecondary}>
                Switching is Seamless
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stewardship Metrics ── */}
      <section className={styles.metricsSection}>
        <div className="container">
          <div className={styles.metricsGrid}>
            <div className={styles.metricItem}>
              <span className={styles.metricValue}>0.8%</span>
              <span className={styles.metricLabel}>PORTFOLIO VACANCY RATE</span>
              <p className={styles.metricDesc}>Average time to secure high-caliber tenants: 6 days</p>
            </div>
            <div className={styles.metricItem}>
              <span className={styles.metricValue}>99.4%</span>
              <span className={styles.metricLabel}>ON-TIME RENT COLLECTION</span>
              <p className={styles.metricDesc}>Zero tolerance for arrears with automated digital tracking</p>
            </div>
            <div className={styles.metricItem}>
              <span className={styles.metricValue}>100%</span>
              <span className={styles.metricLabel}>DIGITAL VIDEO INSPECTIONS</span>
              <p className={styles.metricDesc}>Complete photographic &amp; video walkthroughs every 6 months</p>
            </div>
            <div className={styles.metricItem}>
              <span className={styles.metricValue}>1:60</span>
              <span className={styles.metricLabel}>STAFF TO PROPERTY RATIO</span>
              <p className={styles.metricDesc}>Industry standard is 1:180. We prioritize attention.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Core Protections ── */}
      <section className={styles.protectionsSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionOverline}>◆ UNCOMPROMISING STANDARD</span>
            <h2 className={styles.sectionTitle}>The Krish Landlord Protection System</h2>
          </div>

          <div className={styles.protectionsGrid}>
            <div className={styles.protectionCard}>
              <span className={styles.protectionIcon}>✦</span>
              <h3 className={styles.protectionTitle}>Forensic Tenant Screening</h3>
              <p className={styles.protectionText}>
                We cross-examine employment stability, past rental ledgers, identity verification, and conduct personal reference interviews before recommending an applicant.
              </p>
            </div>

            <div className={styles.protectionCard}>
              <span className={styles.protectionIcon}>✦</span>
              <h3 className={styles.protectionTitle}>Proactive Rent Reviews</h3>
              <p className={styles.protectionText}>
                We audit street-level market rents quarterly. We ensure your yield keeps pace with inflation and capital growth without alienating premier tenants.
              </p>
            </div>

            <div className={styles.protectionCard}>
              <span className={styles.protectionIcon}>✦</span>
              <h3 className={styles.protectionTitle}>Trusted Trade Network</h3>
              <p className={styles.protectionText}>
                Licensed local electricians, plumbers, and maintenance specialists who charge fair rates and protect your asset value. Zero inflated contractor markups.
              </p>
            </div>

            <div className={styles.protectionCard}>
              <span className={styles.protectionIcon}>✦</span>
              <h3 className={styles.protectionTitle}>Strict Legislative Compliance</h3>
              <p className={styles.protectionText}>
                Complete compliance with Victoria&apos;s Residential Tenancies Act, smoke alarm checks, electrical safety audits, and gas safety certifications handled end-to-end.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Seamless Agency Transfer ── */}
      <section id="transfer" className={styles.transferSection}>
        <div className="container">
          <div className={styles.transferBox}>
            <div className={styles.transferLeft}>
              <span className={styles.transferTag}>CURRENTLY WITH ANOTHER AGENCY?</span>
              <h2 className={styles.transferTitle}>Switching management takes less than two minutes.</h2>
              <p className={styles.transferDesc}>
                You don&apos;t have to have any awkward conversations with your current agent.
                We handle the entire handover, collect the keys, notify your tenant respectfully,
                and review the tenancy ledger seamlessly.
              </p>
            </div>
            <div className={styles.transferRight}>
              <div className={styles.transferSteps}>
                <div className={styles.transferStep}>
                  <span className={styles.transferStepNum}>1</span>
                  <span>Notify us of your property address</span>
                </div>
                <div className={styles.transferStep}>
                  <span className={styles.transferStepNum}>2</span>
                  <span>Sign our digital management authority</span>
                </div>
                <div className={styles.transferStep}>
                  <span className={styles.transferStepNum}>3</span>
                  <span>We collect files and assume stewardship</span>
                </div>
              </div>
              <Link href="/sell/property-appraisal" className={styles.transferCtaBtn}>
                Initiate Management Transfer
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
