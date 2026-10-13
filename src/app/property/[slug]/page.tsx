import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { LISTINGS } from '@/data/listings';
import { PropertyGallery } from '@/components/property/PropertyGallery';
import { PropertyInspectionForm } from './PropertyInspectionForm';
import styles from './PropertyDetail.module.css';

interface PropertyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return LISTINGS.map((listing) => ({
    slug: listing.slug,
  }));
}

export async function generateMetadata({ params }: PropertyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const listing = LISTINGS.find((l) => l.slug === slug);

  if (!listing) {
    return { title: 'Property Not Found' };
  }

  const isLand = listing.propertyType.toLowerCase().includes('land');
  const summary = isLand
    ? `Land in ${listing.address.suburb}${listing.landSize ? `, ${listing.landSize}m²` : ''}. ${listing.price.display}. Listed by Krish Real Estate.`
    : `${listing.beds} bed, ${listing.baths} bath property in ${listing.address.suburb}. ${listing.price.display}. Listed by Krish Real Estate.`;

  return {
    alternates: {canonical: `/property/${slug}/`},
    title: `${listing.address.street}, ${listing.address.suburb}`,
    description: summary,
    openGraph: {
      title: `${listing.address.street}, ${listing.address.suburb}`,
      description: summary,
      images: [listing.media[0]?.url || '/images/hero-property.jpg'],
    },
  };
}

export default async function PropertyDetailPage({ params }: PropertyPageProps) {
  const { slug } = await params;
  const listing = LISTINGS.find((l) => l.slug === slug);

  if (!listing) {
    notFound();
  }

  const isAvailable=['active','under-offer'].includes(listing.status);
  const isLand = listing.propertyType.toLowerCase().includes('land');
  const agent = listing.agents[0] || {name:'Chirag Yadav',phone:'0479 092 216',email:'chirag@krishrealestate.com.au',photo:'/images/team-chirag.webp'};

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

      <PropertyGallery media={listing.media} />

      {/* ── Sticky Property Summary Header ── */}
      <header className={styles.summaryBar}>
        <div className="container">
          <div className={styles.summaryInner}>
            <div className={styles.summaryLeft}>
              <p className={styles.summaryPrice}>{listing.price.display}</p>
              <h1 className={styles.summaryAddress}>{listing.address.display}</h1>
            </div>
            <div className={styles.summaryRight}>
              <a href={isAvailable?"#inspection-booking":"/sell/property-appraisal/"} className={styles.summaryCtaBtn}>
                {isAvailable ? 'Request an Inspection' : 'Request an Appraisal'}
              </a>
              <a href={listing.transactionType === "sale" ? "#statement-of-information" : "#inspection-booking"} className={styles.summarySecondaryBtn}>
                Property Documents
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
              {!isLand && <div className={styles.specItem}>
                <span className={styles.specIcon}>BEDROOMS</span>
                <strong className={styles.specValue}>{listing.beds}</strong>
                <span className={styles.specSub}>Bedrooms</span>
              </div>}
              {!isLand && <div className={styles.specItem}>
                <span className={styles.specIcon}>BATHROOMS</span>
                <strong className={styles.specValue}>{listing.baths}</strong>
                <span className={styles.specSub}>Bathrooms</span>
              </div>}
              {!isLand && <div className={styles.specItem}>
                <span className={styles.specIcon}>GARAGING</span>
                <strong className={styles.specValue}>{listing.cars}</strong>
                <span className={styles.specSub}>Car spaces</span>
              </div>}
              {listing.landSize && (
                <div className={styles.specItem}>
                  <span className={styles.specIcon}>ALLOTMENT</span>
                  <strong className={styles.specValue}>{listing.landSize}m²</strong>
                  <span className={styles.specSub}>Land area</span>
                </div>
              )}
            </div>

            {/* Architectural Narrative */}
            <section className={styles.narrativeSection}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionOverline}>◆ ABOUT THIS PROPERTY</span>
                <h2 className={styles.sectionTitle}>
                  Your next chapter,<br />
                  <span className={styles.sectionTitleEm}>in {listing.address.suburb}.</span>
                </h2>
              </div>

              <div className={styles.narrativeBody}>
                {listing.description.split(/\n\s*\n/).filter(Boolean).map((paragraph,index)=><p key={index} style={{whiteSpace:"pre-line"}}>{paragraph}</p>)}

              </div>
            </section>

            {!!listing.tours?.length && <section className={styles.legalSection}><h3 className={styles.legalTitle}>Explore this property</h3>{listing.tours.map((url,index)=><p key={url}><a href={url} target="_blank" rel="noopener noreferrer" className={styles.legalLink}>View property tour {listing.tours!.length>1?index+1:''} ↗</a></p>)}</section>}
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

            {listing.transactionType === 'sale' && <section id="statement-of-information" className={styles.legalSection}>
              <h3 className={styles.legalTitle}>Property information</h3>
              {listing.statementOfInformation ? <a href={listing.statementOfInformation} target="_blank" rel="noopener noreferrer" className={styles.legalLink}>Download Statement of Information (PDF)</a> : <p className={styles.legalText}>Contact the agent for available property documents and pricing information.</p>}
              <p><a href="https://www.consumer.vic.gov.au/duediligencechecklist" target="_blank" rel="noopener noreferrer" className={styles.legalLink}>Consumer Affairs Victoria: due diligence checklist</a></p>
            </section>}

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
                  <span className={styles.agentPrestigeRole}>YOUR PROPERTY AGENT</span>
                  <h3 className={styles.agentName}>{agent?.name || 'Chirag Yadav'}</h3>
                  <p className={styles.agentFirm}>Krish Real Estate</p>
                </div>
              </div>

              <div className={styles.agentContacts}>
                <a href={`tel:${agent.phone}`} className={styles.contactActionBtn}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  <span>{agent.phone}</span>
                </a>
                <a href={`mailto:${agent?.email || 'chirag@krishrealestate.com.au'}`} className={styles.contactSecondaryActionBtn}>
                  Email Agent
                </a>
              </div>

              {/* Private Inspection Form */}
              {isAvailable && <PropertyInspectionForm propertyId={listing.listingId} address={listing.address.display} transactionType={listing.transactionType} />}

              <div className={styles.officeDetails}>
                <p className={styles.officeAddress}>
                  <strong>Krish Real Estate</strong><br />
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
