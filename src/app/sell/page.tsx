import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './Sell.module.css';

export const metadata: Metadata = {
  alternates: {canonical: '/sell/'},
  title: 'Sell With Krish Real Estate | Melbourne North Advisory',
  description:
    'Discover why homeowners in Wollert, Epping, Craigieburn, and Donnybrook choose Krish Real Estate to represent their most valuable asset.',
  openGraph: {
    title: 'Selling with Krish Real Estate | Northern Melbourne Advisory',
    description: 'Bespoke campaign architectures, architectural media, and personal sales support.',
    images: ['/images/property-interior.jpg'],
  },
};

export default function SellPage() {
  return (
    <main className={styles.page}>
      {/* ── Masthead ── */}
      <section className={styles.masthead}>
        <div className="container">
          <div className={styles.mastheadContent}>
            <div className={styles.prestigeOverline}>
              <span>◆</span>
              <span>VENDOR ADVISORY &amp; CAMPAIGN ARCHITECTURE</span>
              <span>◆</span>
            </div>
            <h1 className={styles.title}>
              Not high volume.<br />
              <span className={styles.titleItalic}>High standard.</span>
            </h1>
            <p className={styles.subtitle}>
              We plan your campaign around your property and your goals.
              Bespoke architectural presentation, targeted buyer networks, and fierce price defense.
            </p>
            <div className={styles.mastheadActions}>
              <Link href="/sell/property-appraisal" className={styles.ctaPrimary}>
                Request Confidential Appraisal
              </Link>
              <a href="#comparison" className={styles.ctaSecondary}>
                Compare Our Standard
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── The 4 Pillars ── */}
      <section className={styles.pillarsSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionOverline}>◆ THE KRISH ADVANTAGE</span>
            <h2 className={styles.sectionTitle}>The Four Pillars of Maximum Realization</h2>
          </div>

          <div className={styles.pillarsGrid}>
            <div className={styles.pillarCard}>
              <span className={styles.pillarNumber}>01</span>
              <h3 className={styles.pillarTitle}>Architectural Brand Theater</h3>
              <p className={styles.pillarText}>
                We produce magazine-grade editorial photography, dusk captures, and cinematic videography that elevates your home beyond standard portal listings.
              </p>
            </div>

            <div className={styles.pillarCard}>
              <span className={styles.pillarNumber}>02</span>
              <h3 className={styles.pillarTitle}>Private Buyer Database</h3>
              <p className={styles.pillarText}>
                We match buyer requirements with suitable properties across Wollert, Epping, Craigieburn and surrounding suburbs.
              </p>
            </div>

            <div className={styles.pillarCard}>
              <span className={styles.pillarNumber}>03</span>
              <h3 className={styles.pillarTitle}>Street-Level Evidence Pricing</h3>
              <p className={styles.pillarText}>
                We don&apos;t give you inflated estimates to win your signature, only to condition you down later. We give you strategic, defensible data from day one.
              </p>
            </div>

            <div className={styles.pillarCard}>
              <span className={styles.pillarNumber}>04</span>
              <h3 className={styles.pillarTitle}>Unapologetic Price Defense</h3>
              <p className={styles.pillarText}>
                We do not rush for a quick commission. We hold the line during buyer negotiations to extract the ultimate dollar for your equity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Comparison Table ── */}
      <section id="comparison" className={styles.comparisonSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionOverline}>◆ CLEAR DISTINCTION</span>
            <h2 className={styles.sectionTitle}>The Standard You Deserve</h2>
          </div>

          <div className={styles.pillarsGrid}>
            {[['01 · Appraisal','Discuss comparable sales, your property and the likely buyer audience.'],['02 · Preparation','Agree on presentation, photography, pricing and a campaign budget.'],['03 · On the market','Coordinate inspections and review buyer feedback together.'],['04 · Offers & settlement','Work through offers, contract steps and the handover with your agent.']].map(([title,text])=><div key={title} className={styles.pillarCard}><h3 className={styles.pillarTitle}>{title}</h3><p className={styles.pillarText}>{text}</p></div>)}
          </div>
        </div>
      </section>

      {/* ── Bottom Appraisal Gateway ── */}
      <section className={styles.appraisalGateway}>
        <div className="container">
          <div className={styles.gatewayCard}>
            <span className={styles.gatewayTag}>STEP INTO THE CONVERSATION</span>
            <h2 className={styles.gatewayTitle}>Ready to discuss your property?</h2>
            <p className={styles.gatewaySubtitle}>
              Share your address and timing. We will arrange a personal discussion about your property and comparable local sales.
            </p>
            <Link href="/sell/property-appraisal" className={styles.gatewayBtn}>
              Request an Appraisal
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
