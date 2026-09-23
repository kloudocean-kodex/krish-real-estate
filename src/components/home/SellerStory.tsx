import Link from 'next/link';
import Image from 'next/image';
import styles from './SellerStory.module.css';

export function SellerStory() {
  return (
    <section className={`${styles.section} section`} aria-label="The Krish Selling Standard">
      <div className={styles.container}>
        <div className={`${styles.imageCol} reveal reveal--left`}>
          <div className={styles.imageWrapper}>
            <Image
              src="/images/lifestyle-handshake.jpg"
              alt="Krish Real Estate agent congratulating a homeowner on a successful sale"
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
              Every home in Wollert, Epping, Craigieburn, and Donnybrook has a unique architectural soul.
              We reject high-volume agency assembly lines. We curate bespoke campaign architectures designed
              to ignite buyer emotion and secure record market prices.
            </p>
          </div>

          <div className={styles.steps}>
            <div className={styles.step}>
              <span className={styles.stepNumber}>01</span>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>Evidence-Backed Market Positioning</h3>
                <p className={styles.stepText}>
                  We decode real buyer depth, street-by-street clearance records, and off-market comparable metrics. No inflated promises — only strategic truth.
                </p>
              </div>
            </div>

            <div className={styles.step}>
              <span className={styles.stepNumber}>02</span>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>Editorial Architectural Production</h3>
                <p className={styles.stepText}>
                  Magazine-grade dusk photography, spatial floorplan analysis, and cinematic storytelling that positions your residence in a tier of its own.
                </p>
              </div>
            </div>

            <div className={styles.step}>
              <span className={styles.stepNumber}>03</span>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>Fierce, Uncompromising Negotiation</h3>
                <p className={styles.stepText}>
                  We treat every vendor&apos;s equity with the protective stewardship we would demand for our own families. We never leave money on the table.
                </p>
              </div>
            </div>
          </div>

          <div className={styles.actions}>
            <Link href="/sell/property-appraisal" className={styles.ctaPrimary}>
              <span>Request Private Valuation</span>
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
