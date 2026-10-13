import Link from 'next/link';
import Image from 'next/image';
import type { NormalizedListing } from '@/data/listings';
import { formatDate, formatTime } from '@/lib/utils';
import { PropertyFeatures } from './PropertyFeatures';
import { Icon } from '@/components/ui/Icon';
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
            <picture>
              {mainImage.srcSet && <source srcSet={mainImage.srcSet}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" type="image/webp" />}
              <Image
              src={mainImage.url}
              alt={mainImage.alt}
              fill
              loading={priority ? 'eager' : 'lazy'}
              fetchPriority={priority ? 'high' : 'auto'}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className={styles.image}
            />
            </picture>
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
            <PropertyFeatures listing={listing} />
          </div>

          {/* Upcoming Inspection Tag */}
          {nextInspection && listing.status === 'active' && (
            <div className={styles.inspection}>
              <Icon name="calendar" size={16} />
              <span>Inspection: {formatInspectionBrief(nextInspection)}</span>
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}

function formatInspectionBrief(inspection: { date: string; startTime: string; endTime: string }): string {
  return `${formatDate(inspection.date)}, ${formatTime(inspection.startTime)}`;
}
