import Link from 'next/link';
import styles from './PropertyManagement.module.css';

const PM_FEATURES = [
  { title: 'Tenant Selection', description: 'Thorough screening and reference checks to find reliable, quality tenants.' },
  { title: 'Regular Inspections', description: 'Routine property inspections with detailed reports and photos.' },
  { title: 'Clear Communication', description: 'Proactive updates on your property — no surprises, no silence.' },
  { title: 'Maintenance Coordination', description: 'Trusted tradespeople and prompt resolution of maintenance issues.' },
  { title: 'Market-Rate Reviews', description: 'Annual rent reviews based on current market data to maximise your return.' },
  { title: 'Full Transparency', description: 'Itemised statements, real-time access, and honest advice on your investment.' },
];

export function PropertyManagement() {
  return (
    <section className={`${styles.section} section section--paper`} aria-label="Property management services">
      <div className="container">
        <div className={styles.layout}>
          <div className={`${styles.content} reveal`}>
            <p className="overline">Property Management</p>
            <h2 className={styles.title}>Your investment,<br />looked after personally.</h2>
            <p className={styles.description}>
              Property management isn&apos;t a side service for us — it&apos;s a core commitment.
              We treat every rental property as if it were our own, with transparent communication
              and proactive management that protects your investment and keeps tenants happy.
            </p>
            <Link href="/rental-appraisal" className="btn btn--primary">
              Request a Rental Appraisal
            </Link>
          </div>
          <div className={styles.features}>
            {PM_FEATURES.map((feature) => (
              <div key={feature.title} className={styles.feature}>
                <div className={styles.featureIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureText}>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
