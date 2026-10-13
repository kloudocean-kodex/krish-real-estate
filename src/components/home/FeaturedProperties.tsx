'use client';

import { useState } from 'react';
import type { NormalizedListing } from '@/data/listings';
import { PropertyCard } from '@/components/property/PropertyCard';
import Link from 'next/link';
import styles from './FeaturedProperties.module.css';

export function FeaturedProperties({ previews, counts }: {
  previews: Record<'sale' | 'rent', NormalizedListing[]>;
  counts: Record<'sale' | 'rent', number>;
}) {
  const [activeTab, setActiveTab] = useState<'sale' | 'rent'>('sale');

  const listings = previews[activeTab];

  return (
    <section
      className={styles.section}
      aria-label="Current properties"
    >
      <div className="container">
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <p className={styles.overline}>◆ THE CURATED PORTFOLIO</p>
            <h2 className={styles.title}>
              Currently on the <span className={styles.titleEm}>Market.</span>
            </h2>
          </div>
          <div className={styles.tabs} role="group" aria-label="Filter by transaction type">
            <button
              type="button"
              aria-pressed={activeTab === 'sale'}
              className={`${styles.tab} ${activeTab === 'sale' ? styles.tabActive : ''}`}
              onClick={() => setActiveTab('sale')}
            >
              For Sale ({counts.sale})
            </button>
            <button
              type="button"
              aria-pressed={activeTab === 'rent'}
              className={`${styles.tab} ${activeTab === 'rent' ? styles.tabActive : ''}`}
              onClick={() => setActiveTab('rent')}
            >
              For Lease ({counts.rent})
            </button>
          </div>
        </div>

        {listings.length > 0 ? (
          <div className={`${styles.grid} reveal`}>
            {listings.slice(0,3).map((listing) => (
              <PropertyCard key={listing.listingId} listing={listing} />
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <p className={styles.emptyText}>
              No properties currently available{activeTab === 'rent' ? ' for lease' : ' for purchase'}.
              Tell us your preferred location and budget, and our team can help with your search.
            </p>
            <Link href="/contact" className={styles.viewAllBtn}>
              Tell Us What You’re Looking For
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
