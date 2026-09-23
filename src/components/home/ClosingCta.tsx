import Link from 'next/link';
import Image from 'next/image';
import styles from './ClosingCta.module.css';

export function ClosingCta() {
  return (
    <section className={`${styles.section} section`} aria-label="Get in touch with Krish Real Estate">
      {/* Full-bleed lifestyle image background */}
      <div className={styles.bgImage} aria-hidden="true">
        <Image
          src="/images/lifestyle-family.jpg"
          alt=""
          fill
          sizes="100vw"
          quality={85}
          className={styles.bgImageEl}
        />
      </div>
      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.container}>
        <div className={`${styles.content} reveal`}>
          <p className={styles.eyebrow}>◆ Ready to Start?</p>

          <h2 className={styles.title}>
            Let&apos;s have a conversation<br />
            about <span className={styles.titleAccent}>your property.</span>
          </h2>

          <span className={styles.goldRule} role="presentation" />

          <p className={styles.description}>
            Whether you&apos;re thinking about selling, looking to buy, or need your investment
            managed properly — a conversation costs nothing and might change everything.
          </p>

          <div className={styles.actions}>
            <Link href="/sell/property-appraisal" className={styles.ctaPrimary}>
              Request an Appraisal
            </Link>
            <Link href="/contact" className={styles.ctaSecondary}>
              Contact Us
            </Link>
          </div>

          <div className={styles.contactDirect}>
            <a href="tel:0300000000" className={styles.phone}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              03 0000 0000
            </a>
            <span className={styles.separator}>·</span>
            <a href="mailto:info@krishrealestate.com.au" className={styles.email}>
              info@krishrealestate.com.au
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
