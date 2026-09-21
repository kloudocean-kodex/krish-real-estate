import Link from 'next/link';
import Image from 'next/image';
import { AREAS } from '@/data/areas';
import styles from './LocalKnowledge.module.css';

export function LocalKnowledge() {
  return (
    <section className={`${styles.section} section section--surface`} aria-label="Areas we serve">
      <div className="container">
        <div className={`${styles.header} reveal`}>
          <p className="overline">Local Knowledge</p>
          <h2 className={styles.title}>Melbourne&apos;s northern suburbs,<br />from the inside.</h2>
          <p className={styles.subtitle}>
            We live and work in the north. Our advice comes from genuine local understanding, not postcodes on a map.
          </p>
        </div>
        <div className={`${styles.grid} reveal-stagger`}>
          {AREAS.map((area) => (
            <Link key={area.slug} href={`/areas/${area.slug}`} className={`${styles.card} reveal`}>
              <div className={styles.imageWrapper}>
                <Image src={area.image} alt={`${area.name} suburb, Melbourne`} fill sizes="(max-width: 768px) 100vw, 25vw" className={styles.image} />
                <div className={styles.imageOverlay} />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardName}>{area.name}</h3>
                <p className={styles.cardPostcode}>{area.postcode}</p>
                <p className={styles.cardCharacter}>{area.character}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
