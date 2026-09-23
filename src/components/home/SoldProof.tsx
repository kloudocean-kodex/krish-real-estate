'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getSoldListings } from '@/data/mock-listings';
import styles from './SoldProof.module.css';

export function SoldProof() {
  const [filter, setFilter] = useState<'all' | 'sold' | 'leased'>('all');
  const allResults = getSoldListings();

  const soldCount = useMemo(() => allResults.filter((l) => l.status === 'sold').length, [allResults]);
  const leasedCount = useMemo(() => allResults.filter((l) => l.status === 'leased').length, [allResults]);

  const displayedListings = useMemo(() => {
    if (filter === 'sold') {
      return allResults.filter((l) => l.status === 'sold').slice(0, 4);
    }
    if (filter === 'leased') {
      return allResults.filter((l) => l.status === 'leased');
    }
    // 'all': 2 sold + 2 leased for balanced variety, exactly 4 items
    const sold = allResults.filter((l) => l.status === 'sold').slice(0, 2);
    const leased = allResults.filter((l) => l.status === 'leased').slice(0, 2);
    return [...sold, ...leased];
  }, [allResults, filter]);

  if (allResults.length === 0) return null;

  return (
    <section className={`${styles.section} section section--surface`} aria-label="Recent sales and leasing outcomes">
      <div className="container">

        {/* ── Section Header ── */}
        <div className={`${styles.header} reveal`}>
          <div className={styles.headerLeft}>
            <div className={styles.prestigeOverline}>
              <span>◆</span>
              <span>TRACK RECORD OF EXCELLENCE</span>
              <span>◆</span>
            </div>
            <h2 className={styles.title}>
              Documented Results,<br />
              <span className={styles.titleItalic}>Record Outcomes.</span>
            </h2>
            <p className={styles.subtitle}>
              In Melbourne’s northern corridor, proof speaks louder than promises. Explore recent benchmark sales and premium leasing achievements.
            </p>
          </div>

          {/* ── Segmented Filter Tabs ── */}
          <div className={styles.tabGroup} role="tablist" aria-label="Filter recent results">
            <button
              role="tab"
              aria-selected={filter === 'all'}
              className={`${styles.tabBtn} ${filter === 'all' ? styles.tabBtnActive : ''}`}
              onClick={() => setFilter('all')}
            >
              All Results <span className={styles.tabBadge}>4</span>
            </button>
            <button
              role="tab"
              aria-selected={filter === 'sold'}
              className={`${styles.tabBtn} ${filter === 'sold' ? styles.tabBtnActive : ''}`}
              onClick={() => setFilter('sold')}
            >
              Recently Sold <span className={styles.tabBadge}>{soldCount}</span>
            </button>
            <button
              role="tab"
              aria-selected={filter === 'leased'}
              className={`${styles.tabBtn} ${filter === 'leased' ? styles.tabBtnActive : ''}`}
              onClick={() => setFilter('leased')}
            >
              Recently Leased <span className={styles.tabBadge}>{leasedCount}</span>
            </button>
          </div>
        </div>

        {/* ── Property Showcase Grid ── */}
        <div className={`${styles.grid} ${displayedListings.length === 3 ? styles.grid3 : ''} ${displayedListings.length === 2 ? styles.grid2 : ''} reveal-stagger`}>
          {displayedListings.map((listing) => {
            const isSold = listing.status === 'sold';
            return (
              <article key={listing.listingId} className={`${styles.card} reveal`}>
                <Link href={`/property/${listing.slug}`} className={styles.cardLink} aria-label={`View details of ${listing.address.display}`}>
                  <div className={styles.imageWrapper}>
                    {listing.media[0] && (
                      <Image
                        src={listing.media[0].url}
                        alt={listing.media[0].alt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className={styles.image}
                      />
                    )}
                    <div className={styles.imageOverlay} />
                    
                    {/* Status Badge */}
                    <div className={styles.badgeStrip}>
                      <span className={`${styles.statusBadge} ${isSold ? styles.badgeSold : styles.badgeLeased}`}>
                        {isSold ? 'Sold' : 'Leased'}
                      </span>
                      <span className={styles.suburbTag}>
                        {listing.address.suburb}
                      </span>
                    </div>

                    {/* Quick Specs Pill */}
                    <div className={styles.quickSpecs}>
                      <span>{listing.beds} Bed</span>
                      <span>·</span>
                      <span>{listing.baths} Bath</span>
                      <span>·</span>
                      <span>{listing.cars} Car</span>
                    </div>
                  </div>

                  <div className={styles.content}>
                    <p className={styles.price}>{listing.price.display}</p>
                    <p className={styles.address}>{listing.address.display}</p>
                    <p className={styles.summaryText}>{listing.description}</p>
                    
                    <div className={styles.cardFooter}>
                      <span className={styles.viewDetailsText}>
                        View Case Study
                      </span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={styles.arrowIcon}>
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>

        {/* ── Authority Proof Metrics Strip ── */}
        <div className={`${styles.metricsStrip} reveal`}>
          <div className={styles.metricItem}>
            <span className={styles.metricNumber}>98.4%</span>
            <span className={styles.metricLabel}>AUCTION CLEARANCE</span>
            <span className={styles.metricSub}>Above REIV Northern Avg</span>
          </div>
          <div className={styles.metricDivider} />
          <div className={styles.metricItem}>
            <span className={styles.metricNumber}>14 Days</span>
            <span className={styles.metricLabel}>AVG ON MARKET</span>
            <span className={styles.metricSub}>Targeted Buyer Network</span>
          </div>
          <div className={styles.metricDivider} />
          <div className={styles.metricItem}>
            <span className={styles.metricNumber}>$180M+</span>
            <span className={styles.metricLabel}>TOTAL TRANSACTED</span>
            <span className={styles.metricSub}>Northern Growth Corridor</span>
          </div>
          <div className={styles.metricDivider} />
          <div className={styles.metricItem}>
            <span className={styles.metricNumber}>5.0 ★</span>
            <span className={styles.metricLabel}>VERIFIED REVIEWS</span>
            <span className={styles.metricSub}>100% Client Endorsed</span>
          </div>
        </div>

        {/* ── Bottom Action Strip ── */}
        <div className={`${styles.viewAll} reveal`}>
          <Link href="/sold" className="btn btn--secondary">
            <span>Explore All Sales &amp; Leasing Results</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <Link href="/sell/property-appraisal" className="btn btn--primary">
            Request an Appraisal
          </Link>
        </div>

      </div>
    </section>
  );
}
