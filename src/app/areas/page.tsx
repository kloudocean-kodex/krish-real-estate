import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { AREAS } from '@/data/areas';
import styles from './Areas.module.css';

export const metadata: Metadata = {
  title: 'Melbourne Northern Suburbs Guide | Wollert, Epping, Craigieburn | Krish Real Estate',
  description:
    'Deep street-level intelligence on Wollert, Epping, Craigieburn, and Donnybrook. Median prices, school zones, capital growth, and architectural character.',
  openGraph: {
    title: 'Northern Suburbs Intelligence Guide | Krish Real Estate',
    description: 'Local insights, infrastructure timelines, and property intelligence across Melbourne\'s north.',
    images: ['/images/hero-property.jpg'],
  },
};

export default function AreasPage() {
  return (
    <main className={styles.page}>
      {/* ── Masthead ── */}
      <section className={styles.masthead}>
        <div className="container">
          <div className={styles.mastheadContent}>
            <div className={styles.prestigeOverline}>
              <span>◆</span>
              <span>LOCAL AUTHORITY INTELLIGENCE</span>
              <span>◆</span>
            </div>
            <h1 className={styles.title}>
              Northern Melbourne,<br />
              <span className={styles.titleItalic}>street by street.</span>
            </h1>
            <p className={styles.subtitle}>
              Understanding Melbourne&apos;s northern corridor requires more than generic portal data.
              Explore our comprehensive suburb monographs for Wollert, Epping, Craigieburn, and Donnybrook.
            </p>
          </div>
        </div>
      </section>

      {/* ── Suburb Cards Grid ── */}
      <section className={styles.suburbsSection}>
        <div className="container">
          <div className={styles.suburbsGrid}>
            {AREAS.map((area) => (
              <article key={area.slug} className={styles.areaCard}>
                <Link href={`/areas/${area.slug}`} className={styles.cardLink}>
                  <div className={styles.imageWrapper}>
                    <Image
                      src={area.image}
                      alt={`${area.name} suburb lifestyle and properties`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className={styles.image}
                    />
                    <div className={styles.imageOverlay} />
                    <span className={styles.postcodeBadge}>VIC {area.postcode}</span>
                  </div>

                  <div className={styles.cardContent}>
                    <div className={styles.cardHeader}>
                      <h2 className={styles.areaName}>{area.name}</h2>
                      {area.medianPrice && (
                        <span className={styles.medianPriceTag}>Median: {area.medianPrice}</span>
                      )}
                    </div>

                    <p className={styles.areaCharacter}>{area.character}</p>
                    <p className={styles.areaDesc}>{area.description}</p>

                    <div className={styles.keyHighlights}>
                      <span className={styles.highlightTitle}>NOTABLE ATTRIBUTES:</span>
                      <ul className={styles.highlightList}>
                        {area.keyFeatures.slice(0, 3).map((feat, idx) => (
                          <li key={idx}>✦ {feat}</li>
                        ))}
                      </ul>
                    </div>

                    <span className={styles.readGuideLink}>
                      Explore Suburb Monograph →
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
