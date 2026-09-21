import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { AREAS } from '@/data/areas';
import { MOCK_LISTINGS } from '@/data/mock-listings';
import { PropertyCard } from '@/components/property/PropertyCard';
import styles from './AreaDetail.module.css';

interface AreaPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return AREAS.map((area) => ({
    slug: area.slug,
  }));
}

export async function generateMetadata({ params }: AreaPageProps): Promise<Metadata> {
  const { slug } = await params;
  const area = AREAS.find((a) => a.slug === slug);

  if (!area) {
    return { title: 'Suburb Not Found | Krish Real Estate' };
  }

  return {
    title: `${area.name} VIC ${area.postcode} Property Guide & Market Insights | Krish Real Estate`,
    description: `Deep market intelligence on ${area.name} VIC ${area.postcode}. Median prices, schools, lifestyle, and current residences for sale.`,
  };
}

export default async function AreaDetailPage({ params }: AreaPageProps) {
  const { slug } = await params;
  const area = AREAS.find((a) => a.slug === slug);

  if (!area) {
    notFound();
  }

  const areaListings = MOCK_LISTINGS.filter(
    (l) => l.address.suburb.toLowerCase() === area.name.toLowerCase()
  );

  return (
    <main className={styles.page}>
      {/* ── Masthead ── */}
      <section className={styles.masthead}>
        <div className="container">
          <div className={styles.mastheadContent}>
            <div className={styles.prestigeOverline}>
              <Link href="/areas" className={styles.backLink}>← All Northern Suburbs</Link>
              <span>·</span>
              <span>VIC {area.postcode}</span>
            </div>
            <h1 className={styles.title}>
              {area.name},<br />
              <span className={styles.titleItalic}>Living &amp; Investment Guide.</span>
            </h1>
            <p className={styles.subtitle}>{area.description}</p>
          </div>
        </div>
      </section>

      {/* ── Suburb Overview & Data Strip ── */}
      <section className={styles.dataSection}>
        <div className="container">
          <div className={styles.dataGrid}>
            {area.medianPrice && (
              <div className={styles.dataItem}>
                <span className={styles.dataLabel}>INDICATIVE MEDIAN HOUSE</span>
                <strong className={styles.dataValue}>{area.medianPrice}</strong>
                <span className={styles.dataNote}>Strong 5-year capital appreciation</span>
              </div>
            )}
            <div className={styles.dataItem}>
              <span className={styles.dataLabel}>DEMOGRAPHIC CHARACTER</span>
              <strong className={styles.dataValue}>{area.character}</strong>
              <span className={styles.dataNote}>High proportion of owner-occupiers</span>
            </div>
            <div className={styles.dataItem}>
              <span className={styles.dataLabel}>DISTANCE TO MELBOURNE CBD</span>
              <strong className={styles.dataValue}>24–28 km</strong>
              <span className={styles.dataNote}>Direct rail from Epping / Craigieburn</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Key Attributes Section ── */}
      <section className={styles.attributesSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionOverline}>◆ LIFESTYLE &amp; AMENITY</span>
            <h2 className={styles.sectionTitle}>Why Families &amp; Investors Choose {area.name}</h2>
          </div>

          <div className={styles.attributesList}>
            {area.keyFeatures.map((feature, idx) => (
              <div key={idx} className={styles.attributeRow}>
                <span className={styles.attributeNum}>{String(idx + 1).padStart(2, '0')}</span>
                <p className={styles.attributeText}>{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Current Residences in Suburb ── */}
      <section className={styles.listingsSection}>
        <div className="container">
          <div className={styles.listingsHeader}>
            <h2 className={styles.listingsTitle}>Current Residences in {area.name}</h2>
            <span className={styles.listingsCount}>
              Showing <strong>{areaListings.length}</strong> {areaListings.length === 1 ? 'Residence' : 'Residences'}
            </span>
          </div>

          {areaListings.length > 0 ? (
            <div className={styles.grid}>
              {areaListings.map((listing) => (
                <PropertyCard key={listing.listingId} listing={listing} />
              ))}
            </div>
          ) : (
            <div className={styles.emptyNotice}>
              <p>We are currently curating new properties in {area.name}.</p>
              <Link href="/contact" className={styles.contactBtn}>
                Register Your {area.name} Search Brief
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ── Suburb Appraisal CTA ── */}
      <section className={styles.appraisalCtaSection}>
        <div className="container">
          <div className={styles.ctaBox}>
            <span className={styles.ctaTag}>LOCAL VALUATION EXPERTISE</span>
            <h2 className={styles.ctaTitle}>Own a home in {area.name}?</h2>
            <p className={styles.ctaDesc}>
              Our team has transacted extensively across {area.name}&apos;s key estates.
              Request a discreet, evidence-backed appraisal of your home&apos;s current market standing.
            </p>
            <Link href="/sell/property-appraisal" className={styles.ctaBtn}>
              Request {area.name} Market Appraisal
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
