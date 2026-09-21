import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { MOCK_LISTINGS, type NormalizedListing } from '@/data/mock-listings';
import { PropertyInspectionForm } from './PropertyInspectionForm';
import styles from './PropertyDetail.module.css';

interface PropertyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return MOCK_LISTINGS.map((listing) => ({
    slug: listing.slug,
  }));
}

export async function generateMetadata({ params }: PropertyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const listing = MOCK_LISTINGS.find((l) => l.slug === slug);

  if (!listing) {
    return { title: 'Property Not Found | Krish Real Estate' };
  }

  return {
    title: `${listing.address.street}, ${listing.address.suburb} | Krish Real Estate`,
    description: `${listing.beds} Bed, ${listing.baths} Bath, ${listing.cars} Car residence in ${listing.address.suburb}. ${listing.price.display}. Represented exclusively by Krish Real Estate.`,
    openGraph: {
      title: `${listing.address.street}, ${listing.address.suburb}`,
      description: `${listing.price.display} — ${listing.beds} Bed ${listing.baths} Bath architectural residence.`,
      images: [listing.media[0]?.url || '/images/hero-property.jpg'],
    },
  };
}

export default async function PropertyDetailPage({ params }: PropertyPageProps) {
  const { slug } = await params;
  const listing = MOCK_LISTINGS.find((l) => l.slug === slug);

  if (!listing) {
    notFound();
  }

  const primaryImage = listing.media[0];
  const interiorImage = listing.media[1] || listing.media[0];
  const agent = listing.agents[0];

  return (
    <main className={styles.page}>
      {/* ── Breadcrumb & Top Bar ── */}
      <nav className={styles.breadcrumbBar} aria-label="Breadcrumb">
        <div className="container">
          <div className={styles.breadcrumbInner}>
            <div className={styles.breadcrumbs}>
              <Link href="/" className={styles.breadLink}>Home</Link>
              <span>/</span>
              <Link href={listing.transactionType === 'rent' ? '/rent' : '/buy'} className={styles.breadLink}>
                {listing.transactionType === 'rent' ? 'For Lease' : 'For Sale'}
              </Link>
              <span>/</span>
              <span className={styles.breadCurrent}>{listing.address.suburb}</span>
            </div>
            <div className={styles.propertyStatusBadge}>
              <span className={styles.statusDot} />
              <span>{listing.status === 'active' ? 'Available' : listing.status.toUpperCase()}</span>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Cinematic Architectural Gallery Spread ── */}
      <section className={styles.gallerySection} aria-label="Property Gallery">
        <div className={styles.galleryGrid}>
          <div className={styles.galleryPrimary}>
            {primaryImage && (
              <Image
                src={primaryImage.url}
                alt={primaryImage.alt}
                fill
                priority
                quality={90}
                sizes="(max-width: 1024px) 100vw, 65vw"
                className={styles.galleryImg}
              />
            )}
            <div className={styles.imageBadge}>
              <span>01 / 02 · EXTERIOR ELEVATION</span>
            </div>
          </div>

          <div className={styles.gallerySecondary}>
            {interiorImage && (
              <Image
                src={interiorImage.url}
                alt={interiorImage.alt}
                fill
                quality={85}
                sizes="(max-width: 1024px) 100vw, 35vw"
                className={styles.galleryImg}
              />
            )}
            <div className={styles.imageBadge}>
              <span>02 / 02 · LIVING &amp; ARCHITECTURE</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Sticky Property Summary Header ── */}
      <header className={styles.summaryBar}>
        <div className="container">
          <div className={styles.summaryInner}>
            <div className={styles.summaryLeft}>
              <p className={styles.summaryPrice}>{listing.price.display}</p>
              <h1 className={styles.summaryAddress}>{listing.address.display}</h1>
            </div>
            <div className={styles.summaryRight}>
              <a href="#inspection-booking" className={styles.summaryCtaBtn}>
                Book Private Inspection
              </a>
              <a href="#statement-of-information" className={styles.summarySecondaryBtn}>
                Statement of Info
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* ── Main Two-Column Editorial Layout ── */}
      <div className="container">
        <div className={styles.mainGrid}>
          {/* ── Left Column: The Architectural Monograph ── */}
          <div className={styles.detailsCol}>
            {/* Key Specifications Grid */}
            <div className={styles.specsCard}>
              <div className={styles.specItem}>
                <span className={styles.specIcon}>BEDROOMS</span>
                <strong className={styles.specValue}>{listing.beds}</strong>
                <span className={styles.specSub}>Robes &amp; Master Ensuite</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specIcon}>BATHROOMS</span>
                <strong className={styles.specValue}>{listing.baths}</strong>
                <span className={styles.specSub}>Floor-to-Ceiling Tiles</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specIcon}>GARAGING</span>
                <strong className={styles.specValue}>{listing.cars}</strong>
                <span className={styles.specSub}>Secure Internal Access</span>
              </div>
              {listing.landSize && (
                <div className={styles.specItem}>
                  <span className={styles.specIcon}>ALLOTMENT</span>
                  <strong className={styles.specValue}>{listing.landSize}m²</strong>
                  <span className={styles.specSub}>Prime Northern Parcel</span>
                </div>
              )}
            </div>

            {/* Architectural Narrative */}
            <section className={styles.narrativeSection}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionOverline}>◆ THE ARCHITECTURAL NARRATIVE</span>
                <h2 className={styles.sectionTitle}>
                  An exemplary expression of<br />
                  <span className={styles.sectionTitleEm}>contemporary family living.</span>
                </h2>
              </div>

              <div className={styles.narrativeBody}>
                <p>{listing.description}</p>
                <p>
                  Meticulously designed to optimize northern light and generous volume, this residence achieves
                  a refined harmony between private retreats and expansive entertaining spaces.
                  The bespoke kitchen acts as the home&apos;s culinary anchor, framed by premium engineered stone,
                  integrated appliances, and seamless flow toward the landscaped outdoor terrace.
                </p>
              </div>
            </section>

            {/* Inclusions & Highlights */}
            <section className={styles.inclusionsSection}>
              <h3 className={styles.inclusionsTitle}>Curated Inclusions &amp; Specifications</h3>
              <div className={styles.inclusionsGrid}>
                {listing.features.map((feature) => (
                  <div key={feature} className={styles.inclusionItem}>
                    <span className={styles.inclusionDiamond}>✦</span>
                    <span className={styles.inclusionText}>{feature}</span>
                  </div>
                ))}
                <div className={styles.inclusionItem}>
                  <span className={styles.inclusionDiamond}>✦</span>
                  <span className={styles.inclusionText}>High Ceilings with Architectural Square Set Cornice</span>
                </div>
                <div className={styles.inclusionItem}>
                  <span className={styles.inclusionDiamond}>✦</span>
                  <span className={styles.inclusionText}>Zoned Climate Control Throughout</span>
                </div>
                <div className={styles.inclusionItem}>
                  <span className={styles.inclusionDiamond}>✦</span>
                  <span className={styles.inclusionText}>Low-Maintenance Landscaped Grounds</span>
                </div>
              </div>
            </section>

            {/* Inspection Times Schedule */}
            {listing.inspections.length > 0 && (
              <section className={styles.inspectionsSection}>
                <h3 className={styles.inspectionsTitle}>Open For Inspection Schedule</h3>
                <div className={styles.inspectionsList}>
                  {listing.inspections.map((insp, idx) => (
                    <div key={idx} className={styles.inspectionRow}>
                      <div className={styles.inspectionDateInfo}>
                        <span className={styles.inspectionCalendarIcon}>📅</span>
                        <strong>{new Date(insp.date).toLocaleDateString('en-AU', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</strong>
                      </div>
                      <span className={styles.inspectionTime}>
                        {insp.startTime} – {insp.endTime}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Victorian Legal Statement of Information (SOI) */}
            <section id="statement-of-information" className={styles.legalSection}>
              <div className={styles.legalInner}>
                <span className={styles.legalIcon}>⚖️</span>
                <div>
                  <h4 className={styles.legalTitle}>Consumer Affairs Victoria — Statement of Information</h4>
                  <p className={styles.legalText}>
                    In accordance with Section 47AF of the Estate Agents Act 1980, the indicative selling price,
                    median suburb price, and comparable sales data are provided for complete consumer transparency.
                  </p>
                  <a
                    href="https://www.consumer.vic.gov.au/duediligencechecklist"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.legalLink}
                  >
                    View Due Diligence Checklist (CAV) →
                  </a>
                </div>
              </div>
            </section>
          </div>

          {/* ── Right Column: Sticky Private Concierge Card ── */}
          <aside className={styles.asideCol}>
            <div className={styles.stickyCard}>
              <div className={styles.agentCardHeader}>
                {agent?.photo && (
                  <div className={styles.agentAvatar}>
                    <Image
                      src={agent.photo}
                      alt={agent.name}
                      fill
                      className={styles.agentAvatarImg}
                    />
                  </div>
                )}
                <div>
                  <span className={styles.agentPrestigeRole}>EXCLUSIVE ADVISOR</span>
                  <h3 className={styles.agentName}>{agent?.name || 'Chirag Yadav'}</h3>
                  <p className={styles.agentFirm}>Krish Real Estate</p>
                </div>
              </div>

              <div className={styles.agentContacts}>
                <a href={`tel:${agent?.phone || '0300000000'}`} className={styles.contactActionBtn}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  <span>{agent?.phone || '0400 000 000'}</span>
                </a>
                <a href={`mailto:${agent?.email || 'info@krishrealestate.com.au'}`} className={styles.contactSecondaryActionBtn}>
                  Email Advisor
                </a>
              </div>

              {/* Private Inspection Form */}
              <PropertyInspectionForm />

              <div className={styles.officeDetails}>
                <p className={styles.officeAddress}>
                  <strong>Krish Real Estate Gallery</strong><br />
                  22 Wollemi Avenue, Wollert VIC 3750
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
