import Link from 'next/link';
import Image from 'next/image';
import { AREAS } from '@/data/areas';
import styles from './LocalKnowledge.module.css';

export function LocalKnowledge() {
  return (
    <section className={`${styles.section} section section--surface`} aria-label="Areas we serve">
      <div className="container">
        <div className={`${styles.header} reveal`}>
          <div className={styles.headingBlock}>
            <p className={styles.overline}>Local Knowledge</p>
            <h2 className={styles.title}>Melbourne&apos;s northern suburbs,{' '}
              <span className={styles.titleEm}>from the inside.</span>
            </h2>
          </div>
          <div className={styles.introduction}>
            <p className={styles.subtitle}>
              We live and work in the north. Our advice comes from genuine local understanding, not postcodes on a map.
            </p>
            <Link href="/areas" className={styles.allGuides}>
              All suburb guides <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
        <div className={`${styles.grid} reveal-stagger`}>
          {AREAS.map((area) => (
            <Link key={area.slug} href={`/areas/${area.slug}`} className={`${styles.card} reveal`}
              aria-label={`Explore ${area.name} suburb guide`}>
              <div className={styles.imageWrapper}>
                <Image src={area.image} alt={`Property represented by Krish Real Estate in ${area.name}`} fill
                  sizes="(max-width: 639px) calc(100vw - 40px), (max-width: 1023px) 50vw, 25vw"
                  className={styles.image} />
              </div>
              <div className={styles.cardContent}>
                <p className={styles.cardPostcode}>VIC <span aria-hidden="true">·</span> {area.postcode}</p>
                <h3 className={styles.cardName}>{area.name}</h3>
                <p className={styles.cardCharacter}>{area.character}</p>
                <div className={styles.cardFooter}>
                  <span>Explore {area.name}</span>
                  <span className={styles.arrow} aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" focusable="false">
                      <path d="M5 12h14m-6-6 6 6-6 6" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
