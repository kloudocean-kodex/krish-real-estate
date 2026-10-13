import type { Metadata } from 'next';
import { getSoldListings } from '@/data/listings';
import { PropertyCard } from '@/components/property/PropertyCard';
import Link from 'next/link';
import styles from './Sold.module.css';

export const metadata: Metadata = {
  alternates: {canonical: '/sold/'},
  title: 'Sales & Leasing History | Melbourne North',
  description:
    'Explore published sales and leasing history by Krish Real Estate across Wollert, Epping, Craigieburn, and Donnybrook.',
  openGraph: {
    title: 'Sales & Leasing History',
    description: 'Evidence of exceptional outcomes across Melbourne\'s northern corridor.',
    images: ['/images/hero-property.jpg'],
  },
};

export default function SoldPage() {
  const soldListings = getSoldListings();

  return (
    <main className={styles.page}>
      {/* ── Masthead ── */}
      <section className={styles.masthead}>
        <div className="container">
          <div className={styles.mastheadContent}>
            <div className={styles.prestigeOverline}>
              <span>◆</span>
              <span>TRACK RECORD OF EXCELLENCE</span>
              <span>◆</span>
            </div>
            <h1 className={styles.title}>
              Sales &amp; Leasing,<br />
              <span className={styles.titleItalic}>Personal Service.</span>
            </h1>
            <p className={styles.subtitle}>
              In real estate, promises mean nothing without proof. Explore our recent sales and leasing results
              across Wollert, Epping, Craigieburn, and Donnybrook.
            </p>
          </div>
        </div>
      </section>

      {/* ── Authority Metrics Ribbon ── */}
      <section className={styles.metricsSection}>
        <div className="container">
          <div className={styles.metricsGrid}>
            <div className={styles.metricItem}>
              <span className={styles.metricValue}>Personal</span>
              <span className={styles.metricLabel}>LOCAL REPRESENTATION</span>
              <p className={styles.metricSub}>Serving Melbourne’s northern suburbs</p>
            </div>
            <div className={styles.metricItem}>
              <span className={styles.metricValue}>Direct</span>
              <span className={styles.metricLabel}>AGENT CONTACT</span>
              <p className={styles.metricSub}>Speak with the people handling your property</p>
            </div>
            <div className={styles.metricItem}>
              <span className={styles.metricValue}>Local</span>
              <span className={styles.metricLabel}>MARKET KNOWLEDGE</span>
              <p className={styles.metricSub}>Advice grounded in comparable properties</p>
            </div>
            <div className={styles.metricItem}>
              <span className={styles.metricValue}>5.0 ★</span>
              <span className={styles.metricLabel}>VERIFIED REA REVIEWS</span>
              <p className={styles.metricSub}>Every vendor handled with obsessive personal care</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Sold Results Grid ── */}
      <section className={styles.resultsSection}>
        <div className="container">
          <div className={styles.resultsHeader}>
            <h2 className={styles.resultsTitle}>Sales & Leasing History</h2>
            <span className={styles.resultsCount}>
              Showing <strong>{soldListings.length}</strong> Results
            </span>
          </div>

          <div className={styles.grid}>
            {soldListings.map((listing) => (
              <PropertyCard key={listing.listingId} listing={listing} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Appraisal CTA ── */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaBox}>
            <span className={styles.ctaTag}>DISCOVER YOUR HOME&apos;S CURRENT WORTH</span>
            <h2 className={styles.ctaTitle}>
              Curious what your property could achieve in today&apos;s market?
            </h2>
            <p className={styles.ctaDesc}>
              We provide comprehensive, evidence-based market appraisals with street-level comparable data — zero pressure, complete discretion.
            </p>
            <Link href="/sell/property-appraisal" className={styles.ctaBtn}>
              Request Confidential Market Appraisal
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
