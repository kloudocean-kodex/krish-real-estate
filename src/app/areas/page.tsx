import type { Metadata } from 'next';
import Link from 'next/link';
import { AreaImage } from '@/components/areas/AreaImage';
import { AREAS } from '@/data/areas';
import styles from './Areas.module.css';

export const metadata: Metadata = {
  alternates: {canonical: '/areas/'},
  title: 'Melbourne Northern Suburbs Guide | Wollert, Epping, Craigieburn',
  description:
    'Explore Wollert, Epping, Craigieburn and Donnybrook with Krish Real Estate. Local character, amenities, current properties and personal property advice.',
  openGraph: {
    title: 'Northern Suburbs Intelligence Guide',
    description: 'Explore local character, amenities and property opportunities across Melbourne\'s north.',
    images: ['/images/areas/wollert-1200.webp'],
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
              <span>LOCAL KNOWLEDGE</span>
              <span>◆</span>
            </div>
            <h1 className={styles.title}>
              Northern Melbourne,<br />
              <span className={styles.titleItalic}>street by street.</span>
            </h1>
            <p className={styles.subtitle}>
              Get to know the places we live and work. Explore local character, everyday amenities
              and property opportunities across Wollert, Epping, Craigieburn and Donnybrook.
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
                <Link href={`/areas/${area.slug}`} className={styles.cardLink} aria-label={`Explore ${area.name} suburb guide`}>
                  <div className={styles.imageWrapper}>
                    <AreaImage
                      area={area}
                      sizes="(max-width: 767px) calc(100vw - 64px), (max-width: 1319px) calc(50vw - 68px), 580px"
                      className={styles.image}
                    />
                  </div>

                  <div className={styles.cardContent}>
                    <p className={styles.postcode}>VIC · {area.postcode}</p>
                    <div className={styles.cardHeader}>
                      <h2 className={styles.areaName}>{area.name}</h2>
                      {area.medianPrice && (
                        <span className={styles.medianPriceTag}>Median: {area.medianPrice}</span>
                      )}
                    </div>

                    <p className={styles.areaCharacter}>{area.character}</p>
                    <p className={styles.areaDesc}>{area.description}</p>

                    <div className={styles.keyHighlights}>
                      <span className={styles.highlightTitle}>LOCAL HIGHLIGHTS</span>
                      <ul className={styles.highlightList}>
                        {area.keyFeatures.slice(0, 3).map((feat, idx) => (
                          <li key={idx}>✦ {feat}</li>
                        ))}
                      </ul>
                    </div>

                    <span className={styles.readGuideLink}>
                      Explore {area.name} <span aria-hidden="true">↗</span>
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
          <p className={styles.imageryNote}>Illustrative suburb imagery.</p>
        </div>
      </section>
    </main>
  );
}
