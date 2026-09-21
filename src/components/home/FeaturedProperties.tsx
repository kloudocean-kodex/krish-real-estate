'use client';

import { useState } from 'react';
import { getActiveListings } from '@/data/mock-listings';
import { PropertyCard } from '@/components/property/PropertyCard';
import { useScrollReveal } from '@/lib/hooks/useScrollReveal';
import Link from 'next/link';
import styles from './FeaturedProperties.module.css';

export function FeaturedProperties() {
  const [activeTab, setActiveTab] = useState<'sale' | 'rent'>('sale');
  const { ref, isRevealed } = useScrollReveal();

  const listings = getActiveListings(activeTab);

  return (
    <section
      className={styles.section}
      aria-label="Current properties"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="container">
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <p className={styles.overline}>◆ THE CURATED PORTFOLIO</p>
            <h2 className={styles.title}>
              Currently on the <span className={styles.titleEm}>Market.</span>
            </h2>
          </div>
          <div className={styles.tabs} role="tablist" aria-label="Filter by transaction type">
            <button
              role="tab"
              aria-selected={activeTab === 'sale'}
              className={`${styles.tab} ${activeTab === 'sale' ? styles.tabActive : ''}`}
              onClick={() => setActiveTab('sale')}
            >
              For Sale ({getActiveListings('sale').length})
            </button>
            <button
              role="tab"
              aria-selected={activeTab === 'rent'}
              className={`${styles.tab} ${activeTab === 'rent' ? styles.tabActive : ''}`}
              onClick={() => setActiveTab('rent')}
            >
              For Lease ({getActiveListings('rent').length})
            </button>
          </div>
        </div>

        {listings.length > 0 ? (
          <div className={`${styles.grid} ${isRevealed ? styles.gridRevealed : ''}`}>
            {listings.map((listing, index) => (
              <PropertyCard key={listing.listingId} listing={listing} priority={index === 0} />
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <p className={styles.emptyText}>
              No properties currently available{activeTab === 'rent' ? ' for lease' : ' for purchase'}.
              New architectural residences are introduced weekly. Register your requirements for priority off-market previews.
            </p>
            <Link href="/contact" className={styles.viewAllBtn}>
              Register Acquisition Brief
            </Link>
          </div>
        )}

        <div className={styles.viewAll}>
          <Link href={activeTab === 'sale' ? '/buy' : '/rent'} className={styles.viewAllBtn}>
            <span>View All {activeTab === 'sale' ? 'Properties For Sale' : 'Leasing Opportunities'}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
