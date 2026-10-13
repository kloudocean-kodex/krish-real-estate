import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './PropertyManagement.module.css';

export const metadata: Metadata = {
  alternates: {canonical: '/property-management/'},
  title: 'Property Management & Asset Stewardship | Melbourne North',
  description:
    'Protect and grow your rental yield with boutique property management in Wollert, Epping, Craigieburn, and Donnybrook. Clear communication, careful tenant selection, and attentive investment care.',
  openGraph: {
    title: 'Property Management & Asset Stewardship',
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
              <Link href="/rental-appraisal" className={styles.ctaPrimary}>
                Request Rental Appraisal
              </Link>
              <a href="#transfer" className={styles.ctaSecondary}>
                Switching is Seamless
              </a>
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
                We review comparable rents and discuss appropriate rental reviews with you, taking current tenancy requirements into account.
              </p>
            </div>

            <div className={styles.protectionCard}>
              <span className={styles.protectionIcon}>✦</span>
              <h3 className={styles.protectionTitle}>Trusted Trade Network</h3>
              <p className={styles.protectionText}>
                Licensed local electricians, plumbers, and maintenance specialists who charge fair rates and protect your asset value. Maintenance approvals and costs are discussed with you.
              </p>
            </div>

            <div className={styles.protectionCard}>
              <span className={styles.protectionIcon}>✦</span>
              <h3 className={styles.protectionTitle}>Strict Legislative Compliance</h3>
              <p className={styles.protectionText}>
                We help coordinate safety checks, maintenance and tenancy documentation with appropriately qualified providers.
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
              <h2 className={styles.transferTitle}>A clear path to switching property managers.</h2>
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
              <Link href="/rental-appraisal" className={styles.transferCtaBtn}>
                Initiate Management Transfer
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
