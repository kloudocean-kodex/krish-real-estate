import Link from 'next/link';
import Image from 'next/image';
import type { NormalizedListing } from '@/data/mock-listings';
import styles from './PropertyCard.module.css';

interface PropertyCardProps {
  listing: NormalizedListing;
  priority?: boolean;
}

export function PropertyCard({ listing, priority = false }: PropertyCardProps) {
  const mainImage = listing.media[0];
  const nextInspection = listing.inspections[0];

  return (
    <article className={styles.card}>
      <Link href={`/property/${listing.slug}`} className={styles.link}>
        {/* Visual Frame */}
        <div className={styles.imageWrapper}>
          {mainImage && (
            <Image
              src={mainImage.url}
              alt={mainImage.alt}
              fill
              priority={priority}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className={styles.image}
            />
          )}

          <div className={styles.imageOverlay} />

          {/* Suburb / Tag pill */}
          <div className={styles.suburbPill}>
            <span>{listing.address.suburb.toUpperCase()}</span>
          </div>

          {/* Status Badge */}
          {listing.status !== 'active' && (
            <span className={`${styles.badge} ${styles[`badge${listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}`] || ''}`}>
              {listing.status === 'sold' ? 'Sold' :
               listing.status === 'leased' ? 'Leased' :
               listing.status === 'under-offer' ? 'Under Offer' : listing.status}
            </span>
          )}
          {listing.transactionType === 'rent' && listing.status === 'active' && (
            <span className={styles.badgeRent}>For Lease</span>
          )}
        </div>

        {/* Editorial Placard */}
        <div className={styles.content}>
          <div className={styles.priceRow}>
            <p className={styles.price}>{listing.price.display}</p>
            <span className={styles.propertyType}>{listing.propertyType}</span>
          </div>

          <h3 className={styles.address}>{listing.address.street}</h3>
          <p className={styles.suburb}>
            {listing.address.suburb}, VIC {listing.address.postcode}
          </p>

          {/* Architectural Specs Ribbon */}
          <div className={styles.specsRibbon}>
            <span className={styles.specItem}>
              <strong>{listing.beds}</strong> Bed
            </span>
            <span className={styles.specDot}>·</span>
            <span className={styles.specItem}>
              <strong>{listing.baths}</strong> Bath
            </span>
            <span className={styles.specDot}>·</span>
            <span className={styles.specItem}>
              <strong>{listing.cars}</strong> Car
            </span>
            {listing.landSize && (
              <>
                <span className={styles.specDot}>·</span>
                <span className={styles.specItem}>
                  <strong>{listing.landSize}</strong> m²
                </span>
              </>
            )}
          </div>

          {/* Upcoming Inspection Tag */}
          {nextInspection && listing.status === 'active' && (
            <div className={styles.inspection}>
              <span className={styles.inspectionPulse} />
              <span>Inspection: {formatInspectionBrief(nextInspection)}</span>
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}

function formatInspectionBrief(inspection: { date: string; startTime: string; endTime: string }): string {
  const date = new Date(inspection.date);
  const day = new Intl.DateTimeFormat('en-AU', { weekday: 'short', day: 'numeric', month: 'short' }).format(date);
  const [startH, startM] = inspection.startTime.split(':').map(Number);
  const startPeriod = startH >= 12 ? 'pm' : 'am';
  const startDisplay = `${startH % 12 || 12}${startM > 0 ? `:${startM.toString().padStart(2, '0')}` : ''}${startPeriod}`;
  return `${day}, ${startDisplay}`;
}
