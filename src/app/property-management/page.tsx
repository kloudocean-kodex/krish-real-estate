import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './PropertyManagement.module.css';

export const metadata: Metadata = {
  alternates: {canonical: '/property-management/'},
  title: 'Property Management | Melbourne North',
  description:
    'Local property management in Wollert, Epping, Craigieburn, and Donnybrook. Clear communication, careful tenant selection, and attentive property care.',
  openGraph: {
    title: 'Property Management in Melbourne’s North',
    description: 'Local property management and direct communication for northern Melbourne landlords.',
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
              <span>PROPERTY MANAGEMENT · MELBOURNE NORTH</span>
              <span>◆</span>
            </div>
            <h1 className={styles.title}>
              Your rental property,<br />
              <span className={styles.titleItalic}>looked after personally.</span>
            </h1>
            <p className={styles.subtitle}>
              From tenant selection and inspections to maintenance and owner updates,
              our Wollert-based team helps you manage rental property across Melbourne&apos;s north.
            </p>
            <div className={styles.mastheadActions}>
              <Link href="/rental-appraisal" className={styles.ctaPrimary}>
                Request Rental Appraisal
              </Link>
              <a href="#transfer" className={styles.ctaSecondary}>
                Ask About Switching
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Core Protections ── */}
      <section className={styles.protectionsSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionOverline}>◆ OUR APPROACH</span>
            <h2 className={styles.sectionTitle}>How we look after your property</h2>
          </div>

          <div className={styles.protectionsGrid}>
            <div className={styles.protectionCard}>
              <span className={styles.protectionIcon}>✦</span>
              <h3 className={styles.protectionTitle}>Careful Tenant Selection</h3>
              <p className={styles.protectionText}>
                We review applications and available references, discuss strengths and risks, and help you choose a tenant.
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
              <h3 className={styles.protectionTitle}>Maintenance Coordination</h3>
              <p className={styles.protectionText}>
                We coordinate qualified trades and discuss maintenance approvals and costs with you.
              </p>
            </div>

            <div className={styles.protectionCard}>
              <span className={styles.protectionIcon}>✦</span>
              <h3 className={styles.protectionTitle}>Tenancy Requirements</h3>
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
