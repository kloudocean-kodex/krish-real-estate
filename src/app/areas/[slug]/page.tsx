import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { AREAS } from '@/data/areas';
import { LISTINGS } from '@/data/listings';
import { PropertyCard } from '@/components/property/PropertyCard';
import { AreaImage } from '@/components/areas/AreaImage';
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
    return { title: 'Suburb Not Found' };
  }

  return {
    alternates: {canonical: `/areas/${slug}/`},
    title: `${area.name} VIC ${area.postcode} Property Guide & Market Insights`,
    description: `Explore ${area.name} VIC ${area.postcode}. Local character, amenities, current properties and personal property advice from Krish Real Estate.`,
    openGraph: { images: [{ url: area.image, alt: `Illustrative neighbourhood artwork for ${area.name}` }] },
  };
}

export default async function AreaDetailPage({ params }: AreaPageProps) {
  const { slug } = await params;
  const area = AREAS.find((a) => a.slug === slug);

  if (!area) {
    notFound();
  }

  const areaListings = LISTINGS.filter(
    (l) => l.address.suburb.toLowerCase() === area.name.toLowerCase() && ['active', 'under-offer'].includes(l.status)
  );

  return (
    <main className={styles.page}>
      {/* ── Masthead ── */}
      <section className={styles.masthead}>
        <div className={`container ${styles.mastheadGrid}`}>
          <div className={styles.mastheadContent}>
            <div className={styles.prestigeOverline}>
              <Link href="/areas" className={styles.backLink}>← All Northern Suburbs</Link>
              <span>·</span>
              <span>VIC {area.postcode}</span>
            </div>
            <h1 className={styles.title}>
              {area.name},<br />
              <span className={styles.titleItalic}>Your local guide.</span>
            </h1>
            <p className={styles.subtitle}>{area.description}</p>
          </div>
          <figure className={styles.areaFigure}>
            <div className={styles.areaImageWrapper}>
              <AreaImage area={area} eager sizes="(max-width: 1023px) calc(100vw - 64px), 570px" className={styles.areaImage} />
            </div>
            <figcaption className={styles.imageryNote}>Illustrative suburb imagery.</figcaption>
          </figure>
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
                {area.priceNote && <span className={styles.dataNote}>{area.priceNote}</span>}
              </div>
            )}
            <div className={styles.dataItem}>
              <span className={styles.dataLabel}>LOCAL CHARACTER</span>
              <strong className={styles.dataValue}>{area.character}</strong>
            </div>
            <div className={styles.dataItem}>
              <span className={styles.dataLabel}>PERSONAL PROPERTY ADVICE</span>
              <strong className={styles.dataValue}>Speak with Krish</strong>
              <span className={styles.dataNote}>Buying, selling or leasing in {area.name}</span>
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
            <h2 className={styles.listingsTitle}>Current Properties in {area.name}</h2>
            <span className={styles.listingsCount}>
              Showing <strong>{areaListings.length}</strong> {areaListings.length === 1 ? 'Property' : 'Properties'}
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
              <p>No properties are currently published in {area.name}. Tell us what you are looking for.</p>
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
              Discuss your property, timing and goals with Chirag and the Krish team.
              Request a personal appraisal informed by current local market evidence.
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
