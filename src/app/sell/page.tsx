import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Sell.module.css';

export const metadata: Metadata = {
  title: 'Sell With Krish Real Estate | Melbourne North Advisory',
  description:
    'Discover why homeowners in Wollert, Epping, Craigieburn, and Donnybrook choose Krish Real Estate to represent their most valuable asset.',
  openGraph: {
    title: 'Selling with Krish Real Estate | Northern Melbourne Advisory',
    description: 'Bespoke campaign architectures, architectural media, and record sales results.',
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
              We limit our active listing portfolio so every property receives executive-level attention.
              Bespoke architectural presentation, targeted buyer networks, and fierce price defense.
            </p>
            <div className={styles.mastheadActions}>
              <Link href="/sell/property-appraisal" className={styles.ctaPrimary}>
                Request Confidential Valuation
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
                Over 3,800 active, pre-qualified buyers across Melbourne&apos;s north and interstate investors looking specifically in Wollert, Epping, and Craigieburn.
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

          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Campaign Element</th>
                  <th>Standard Agency</th>
                  <th className={styles.highlightCol}>The Krish Standard</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Agent Workload</td>
                  <td>15–30 listings per agent simultaneously</td>
                  <td className={styles.highlightCol}>Capped at 5–8 active campaigns per lead advisor</td>
                </tr>
                <tr>
                  <td>Visual Presentation</td>
                  <td>Standard 15-minute quick photographer</td>
                  <td className={styles.highlightCol}>Full architectural dusk shoot + editorial styling direction</td>
                </tr>
                <tr>
                  <td>Buyer Communication</td>
                  <td>Automated generic SMS blast</td>
                  <td className={styles.highlightCol}>Personal telephone debrief with every qualified open attendee</td>
                </tr>
                <tr>
                  <td>Vendor Feedback</td>
                  <td>Weekly automated portal analytics link</td>
                  <td className={styles.highlightCol}>Detailed written report &amp; voice debrief after every inspection</td>
                </tr>
                <tr>
                  <td>Negotiation Philosophy</td>
                  <td>Accept first reasonable offer to turn over volume</td>
                  <td className={styles.highlightCol}>Structured multi-offer tension to maximize final price</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Bottom Valuation Gateway ── */}
      <section className={styles.valuationGateway}>
        <div className="container">
          <div className={styles.gatewayCard}>
            <span className={styles.gatewayTag}>STEP INTO THE CONVERSATION</span>
            <h2 className={styles.gatewayTitle}>Ready to discuss your property?</h2>
            <p className={styles.gatewaySubtitle}>
              A private appraisal takes approximately 20 minutes and gives you total clarity on your home&apos;s true market value.
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
