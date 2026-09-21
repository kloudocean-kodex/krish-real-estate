import Link from 'next/link';
import Image from 'next/image';
import { getSoldListings } from '@/data/mock-listings';
import styles from './SoldProof.module.css';

export function SoldProof() {
  const soldListings = getSoldListings().slice(0, 4);

  if (soldListings.length === 0) return null;

  return (
    <section className={`${styles.section} section section--surface`} aria-label="Recent results">
      <div className="container">
        <div className={`${styles.header} reveal`}>
          <p className="overline">Recent Results</p>
          <h2 className={styles.title}>Recently sold &amp; leased.</h2>
        </div>
        <div className={`${styles.grid} reveal-stagger`}>
          {soldListings.map((listing) => (
            <article key={listing.listingId} className={`${styles.card} reveal`}>
              <div className={styles.imageWrapper}>
                {listing.media[0] && (
                  <Image src={listing.media[0].url} alt={listing.media[0].alt} fill sizes="(max-width: 768px) 100vw, 50vw" className={styles.image} />
                )}
                <span className={styles.badge}>{listing.status === 'sold' ? 'Sold' : 'Leased'}</span>
              </div>
              <div className={styles.content}>
                <p className={styles.price}>{listing.price.display}</p>
                <p className={styles.address}>{listing.address.display}</p>
                <p className={styles.features}>{listing.beds} Bed · {listing.baths} Bath · {listing.cars} Car</p>
              </div>
            </article>
          ))}
        </div>
        <div className={styles.viewAll}>
          <Link href="/sold" className="btn btn--secondary">View All Results</Link>
        </div>
      </div>
    </section>
  );
}
