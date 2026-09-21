'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './HeroSection.module.css';

export function HeroSection() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'buy' | 'rent' | 'estimate'>('buy');
  const [selectedSuburb, setSelectedSuburb] = useState('all');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'estimate') {
      router.push('/sell/property-appraisal');
    } else if (activeTab === 'rent') {
      router.push(selectedSuburb !== 'all' ? `/rent?suburb=${selectedSuburb}` : '/rent');
    } else {
      router.push(selectedSuburb !== 'all' ? `/buy?suburb=${selectedSuburb}` : '/buy');
    }
  };

  return (
    <section className={styles.hero} aria-label="Krish Real Estate — Northern Melbourne Authority">
      {/* Background Architectural Canvas */}
      <div className={styles.imageWrapper}>
        <Image
          src="/images/hero-property.jpg"
          alt="Architectural family residence at dusk in Melbourne's north"
          fill
          priority
          quality={90}
          sizes="100vw"
          className={styles.image}
        />
        <div className={styles.overlay} />
        <div className={styles.vignette} />
      </div>

      {/* Architectural Crosshair Accents */}
      <div className={styles.crosshairTL} aria-hidden="true">+</div>
      <div className={styles.crosshairTR} aria-hidden="true">+</div>

      {/* Content Container */}
      <div className={styles.content}>
        <div className={styles.headerBlock}>
          <div className={styles.prestigeBadge}>
            <span className={styles.badgeDiamond}>◆</span>
            <span className={styles.badgeText}>MELBOURNE NORTHERN CORRIDOR · LICENSED ADVISORS</span>
            <span className={styles.badgeDiamond}>◆</span>
          </div>

          <h1 className={styles.heading}>
            Architecture &amp; Living,<br />
            <span className={styles.headingItalic}>Handled Personally.</span>
          </h1>

          <p className={styles.subheading}>
            The boutique real estate advisory redefining property in Wollert, Epping, Craigieburn &amp; Donnybrook.
            Uncompromising presentation. Razor-sharp negotiation. Quiet authority.
          </p>
        </div>

        {/* ── Frosted Editorial Gateway Bar ── */}
        <div className={styles.searchBarWrapper}>
          <div className={styles.searchTabs} role="tablist">
            <button
              role="tab"
              aria-selected={activeTab === 'buy'}
              className={`${styles.tabBtn} ${activeTab === 'buy' ? styles.tabBtnActive : ''}`}
              onClick={() => setActiveTab('buy')}
            >
              Curated Homes (Buy)
            </button>
            <button
              role="tab"
              aria-selected={activeTab === 'rent'}
              className={`${styles.tabBtn} ${activeTab === 'rent' ? styles.tabBtnActive : ''}`}
              onClick={() => setActiveTab('rent')}
            >
              Leasing Collection
            </button>
            <button
              role="tab"
              aria-selected={activeTab === 'estimate'}
              className={`${styles.tabBtn} ${activeTab === 'estimate' ? styles.tabBtnActive : ''}`}
              onClick={() => setActiveTab('estimate')}
            >
              Request Appraisal
            </button>
          </div>

          <form className={styles.searchForm} onSubmit={handleSearch}>
            {activeTab !== 'estimate' ? (
              <>
                <div className={styles.inputGroup}>
                  <label htmlFor="suburb-select" className={styles.inputLabel}>Select Enclave</label>
                  <select
                    id="suburb-select"
                    value={selectedSuburb}
                    onChange={(e) => setSelectedSuburb(e.target.value)}
                    className={styles.selectInput}
                  >
                    <option value="all">All Northern Suburbs</option>
                    <option value="wollert">Wollert VIC 3750</option>
                    <option value="epping">Epping VIC 3076</option>
                    <option value="craigieburn">Craigieburn VIC 3064</option>
                    <option value="donnybrook">Donnybrook VIC 3064</option>
                    <option value="mickleham">Mickleham VIC 3064</option>
                  </select>
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="type-select" className={styles.inputLabel}>Property Style</label>
                  <select id="type-select" className={styles.selectInput} defaultValue="all">
                    <option value="all">All Residences</option>
                    <option value="house">Architectural Houses</option>
                    <option value="townhouse">Modern Townhomes</option>
                    <option value="acreage">Prestige Acreage / Estates</option>
                  </select>
                </div>

                <button type="submit" className={styles.searchSubmitBtn}>
                  <span>Explore Portfolio</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </>
            ) : (
              <div className={styles.estimateFormInline}>
                <div className={styles.estimateText}>
                  <span className={styles.estimateTitle}>Confidential Property Valuation</span>
                  <span className={styles.estimateSubtitle}>Receive an evidence-backed market assessment within 24 hours.</span>
                </div>
                <Link href="/sell/property-appraisal" className={styles.estimateSubmitBtn}>
                  Begin Valuation
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </Link>
              </div>
            )}
          </form>
        </div>

        {/* ── Editorial Proof Ticker ── */}
        <div className={styles.proofRibbon}>
          <div className={styles.proofItem}>
            <span className={styles.proofStars}>★★★★★</span>
            <span className={styles.proofLabel}>5.0 RATED ADVISORS</span>
          </div>
          <span className={styles.proofDivider}>·</span>
          <div className={styles.proofItem}>
            <span className={styles.proofGoldText}>98.4%</span>
            <span className={styles.proofLabel}>AUCTION CLEARANCE</span>
          </div>
          <span className={styles.proofDivider}>·</span>
          <div className={styles.proofItem}>
            <span className={styles.proofGoldText}>14 DAYS</span>
            <span className={styles.proofLabel}>AVG SALE TIMELINE</span>
          </div>
          <span className={styles.proofDivider}>·</span>
          <div className={styles.proofItem}>
            <span className={styles.proofGoldText}>REIV</span>
            <span className={styles.proofLabel}>ACCREDITED FIRM</span>
          </div>
        </div>
      </div>
    </section>
  );
}
