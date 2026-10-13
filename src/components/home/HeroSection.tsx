'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './HeroSection.module.css';
import { REPUTATION } from '@/data/reputation';
import { HeroMedia } from './HeroMedia';

export function HeroSection() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'buy' | 'rent' | 'estimate'>('buy');
  const [selectedSuburb, setSelectedSuburb] = useState('all');
  const [selectedType,setSelectedType]=useState('all');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'estimate') {
      router.push('/sell/property-appraisal');
    } else if (activeTab === 'rent') {
      router.push(`/rent?suburb=${selectedSuburb}&type=${selectedType}`);
    } else {
      router.push(`/buy?suburb=${selectedSuburb}&type=${selectedType}`);
    }
  };

  return (
    <section className={styles.hero} aria-label="Krish Real Estate — Melbourne's northern suburbs">
      <HeroMedia />

      {/* Architectural Crosshair Accents */}
      <div className={styles.crosshairTL} aria-hidden="true">+</div>
      <div className={styles.crosshairTR} aria-hidden="true">+</div>

      {/* Content Container */}
      <div className={styles.content}>
        <div className={styles.headerBlock}>
          <div className={styles.prestigeBadge}>
            <span className={styles.badgeDiamond}>◆</span>
            <span className={styles.badgeText}>MELBOURNE’S NORTH · YOUR LOCAL PROPERTY TEAM</span>
            <span className={styles.badgeDiamond}>◆</span>
          </div>

          <h1 className={styles.heading}>
            Working together{' '}<br />
            <span className={styles.headingItalic}>means winning together.</span>
          </h1>

          <p className={styles.subheading}>
            Buying, selling or managing a property in Melbourne’s north? Work directly with a local team that puts your goals at the centre.
          </p>
        </div>

        {/* ── Frosted Editorial Gateway Bar ── */}
        <div className={styles.searchBarWrapper}>
          <div className={styles.searchTabs} role="group" aria-label="Property search type">
            <button
              type="button"
              aria-pressed={activeTab === 'buy'}
              className={`${styles.tabBtn} ${activeTab === 'buy' ? styles.tabBtnActive : ''}`}
              onClick={() => setActiveTab('buy')}
            >
              Buy
            </button>
            <button
              type="button"
              aria-pressed={activeTab === 'rent'}
              className={`${styles.tabBtn} ${activeTab === 'rent' ? styles.tabBtnActive : ''}`}
              onClick={() => setActiveTab('rent')}
            >
              Rent
            </button>
            <button
              type="button"
              aria-pressed={activeTab === 'estimate'}
              className={`${styles.tabBtn} ${activeTab === 'estimate' ? styles.tabBtnActive : ''}`}
              onClick={() => setActiveTab('estimate')}
            >
              Appraisal
            </button>
          </div>

          <form className={styles.searchForm} onSubmit={handleSearch}>
            {activeTab !== 'estimate' ? (
              <>
                <div className={styles.inputGroup}>
                  <label htmlFor="suburb-select" className={styles.inputLabel}>Choose a Suburb</label>
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
                  <select id="type-select" className={styles.selectInput} value={selectedType} onChange={e=>setSelectedType(e.target.value)}>
                    <option value="all">All Property Types</option>
                    <option value="house">Houses</option>
                    <option value="townhouse">Townhouses</option>
                    <option value="land">Land</option>
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
                  <span className={styles.estimateTitle}>Personal Property Appraisal</span>
                  <span className={styles.estimateSubtitle}>Receive an evidence-backed market assessment with a member of our local team.</span>
                </div>
                <Link href="/sell/property-appraisal" className={styles.estimateSubmitBtn}>
                  Request Appraisal
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
          <a className={styles.proofItem} href={REPUTATION.google.url} target="_blank" rel="noopener noreferrer">
            <span className={styles.proofGoldText}>4.9 ★</span>
            <span className={styles.proofLabel}>KRISH ON GOOGLE ↗</span>
          </a>
          <span className={styles.proofDivider}>·</span>
          <a className={styles.proofItem} href={REPUTATION.chirag.url} target="_blank" rel="noopener noreferrer">
            <span className={styles.proofGoldText}>5.0 ★</span>
            <span className={styles.proofLabel}>CHIRAG ON REALESTATE.COM.AU ↗</span>
          </a>
          <span className={styles.proofDivider}>·</span>
          <div className={styles.proofItem}>
            <span className={styles.proofGoldText}>WOLLERT</span>
            <span className={styles.proofLabel}>BASED TEAM</span>
          </div>
        </div>
      </div>
    </section>
  );
}
