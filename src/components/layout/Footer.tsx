import Link from 'next/link';
import { BUSINESS } from '@/data/team';
import styles from './Footer.module.css';

const FOOTER_NAV = {
  'Buy & Rent': [
    { label: 'Properties for Sale', href: '/buy' },
    { label: 'Properties for Rent', href: '/rent' },
    { label: 'Recently Sold', href: '/sold' },
  ],
  Services: [
    { label: 'Sell Your Property', href: '/sell' },
    { label: 'Property Appraisal', href: '/sell/property-appraisal' },
    { label: 'Property Management', href: '/property-management' },
    { label: 'Rental Appraisal', href: '/rental-appraisal' },
  ],
  Company: [
    { label: 'Our Team', href: '/team' },
    { label: 'Areas We Cover', href: '/areas' },
    { label: 'Contact Us', href: '/contact' },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.container}>
        {/* Top Section */}
        <div className={styles.top}>
          {/* Brand Column */}
          <div className={styles.brand}>
            <Link href="/" className={styles.logo} aria-label="Krish Real Estate — Home">
              <span className={styles.logoMark}>K</span>
              <span className={styles.logoText}>KRISH<span className={styles.logoSub}>REAL ESTATE</span></span>
            </Link>
            <p className={styles.tagline}>{BUSINESS.tagline}</p>
            <address className={styles.address}>
              <p>{BUSINESS.address.street}</p>
              <p>{BUSINESS.address.suburb} {BUSINESS.address.state} {BUSINESS.address.postcode}</p>
              <p>
                <a href={`tel:${BUSINESS.phone.replace(/\s/g, '')}`} className={styles.contactLink}>
                  {BUSINESS.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${BUSINESS.email}`} className={styles.contactLink}>
                  {BUSINESS.email}
                </a>
              </p>
            </address>
          </div>

          {/* Navigation Columns */}
          {Object.entries(FOOTER_NAV).map(([title, links]) => (
            <div key={title} className={styles.navColumn}>
              <h3 className={styles.navTitle}>{title}</h3>
              <ul className={styles.navList}>
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={styles.navLink}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <hr className={styles.divider} />

        {/* Bottom Section */}
        <div className={styles.bottom}>
          <div className={styles.legal}>
            <p>&copy; {currentYear} {BUSINESS.name}. All rights reserved.</p>
            <div className={styles.legalLinks}>
              <Link href="/privacy" className={styles.legalLink}>Privacy Policy</Link>
              <span className={styles.legalSeparator}>·</span>
              <Link href="/terms" className={styles.legalLink}>Terms of Use</Link>
            </div>
          </div>
          <div className={styles.memberships}>
            {BUSINESS.memberships.map((m) => (
              <span key={m} className={styles.membership}>{m} Member</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
