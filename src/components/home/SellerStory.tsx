import Link from 'next/link';
import Image from 'next/image';
import styles from './SellerStory.module.css';
import {getActiveListings} from '@/data/listing-summaries';
const property=getActiveListings('sale').find(l=>l.propertyType==='House');

export function SellerStory() {
  return (
    <section className={`${styles.section} section`} aria-label="The Krish Selling Standard">
      <div className={styles.container}>
        <div className={`${styles.imageCol} reveal reveal--left`}>
          <div className={styles.imageWrapper}>
            <Image
              src={property?.media[0]?.url || "/images/property-interior.jpg"}
              alt={property?.media[0]?.alt || "Property presentation"}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className={styles.image}
            />
            <div className={styles.imageOverlay} />
            <div className={styles.imagePlacard}>
              <span className={styles.placardIcon}>✦</span>
              <span className={styles.placardText}>CURATED PRESENTATION · MELBOURNE NORTH</span>
            </div>
          </div>
        </div>

        <div className={`${styles.contentCol} reveal reveal--right`}>
          <div className={styles.headerBlock}>
            <p className={styles.overline}>◆ THE PRIVATE ADVISORY DIFFERENCE</p>
            <h2 className={styles.title}>
              Your home deserves<br />
              <span className={styles.titleItalic}>more than a template.</span>
            </h2>
            <p className={styles.description}>
              Each property and seller has a different goal. Chirag and the Krish team bring local market
              knowledge, considered presentation and direct communication to every campaign.
            </p>
          </div>

          <div className={styles.steps}>
            <div className={styles.step}>
              <span className={styles.stepNumber}>01</span>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>A grounded pricing conversation</h3>
                <p className={styles.stepText}>
                  We discuss comparable local sales, current competition and your goals before recommending a guide and campaign approach.
                </p>
              </div>
            </div>

            <div className={styles.step}>
              <span className={styles.stepNumber}>02</span>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>Presentation that fits the home</h3>
                <p className={styles.stepText}>
                  Photography, floorplans and listing copy are planned around what buyers need to understand about your property.
                </p>
              </div>
            </div>

            <div className={styles.step}>
              <span className={styles.stepNumber}>03</span>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>Clear advice through negotiation</h3>
                <p className={styles.stepText}>
                  We keep you informed as interest and offers develop, so you can make each decision with the relevant facts.
                </p>
              </div>
            </div>
          </div>

          <div className={styles.actions}>
            <Link href="/sell/property-appraisal" className={styles.ctaPrimary}>
              <span>Request Private Appraisal</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
            <Link href="/sell" className={styles.ctaSecondary}>
              The Krish Sales Method
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
