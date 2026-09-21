'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';

const NAV_LINKS = [
  { label: 'Buy', href: '/buy' },
  { label: 'Rent', href: '/rent' },
  { label: 'Sell', href: '/sell' },
  { label: 'Manage', href: '/property-management' },
  { label: 'Our Team', href: '/team' },
  { label: 'Areas', href: '/areas' },
  { label: 'Contact', href: '/contact' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  const isScrolled = scrollY > 40;
  const isHeroMode = scrollY < 10;  /* fully transparent at top */

  return (
    <>
      <header
        ref={headerRef}
        className={`${styles.header} ${isScrolled ? styles.scrolled : ''} ${isHeroMode ? styles.heroMode : ''}`}
        role="banner"
      >
        <div className={styles.container}>

          {/* ── Logo ── */}
          <Link href="/" className={styles.logo} aria-label="Krish Real Estate — Home">
            <Image
              src="/images/krish-logo-original.png"
              alt="Krish Real Estate"
              width={160}
              height={72}
              priority
              className={`${styles.logoImage} ${isHeroMode ? styles.logoImageLight : ''}`}
            />
          </Link>

          {/* ── Desktop Navigation ── */}
          <nav className={styles.nav} aria-label="Primary navigation">
            <ul className={styles.navList}>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={styles.navLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* ── Actions ── */}
          <div className={styles.actions}>
            <a href="tel:0300000000" className={styles.phoneLink} aria-label="Call Krish Real Estate">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span className={styles.phoneLinkText}>03 0000 0000</span>
            </a>

            <Link href="/sell/property-appraisal" className={styles.ctaButton}>
              Free Appraisal
            </Link>

            <button
              className={styles.menuButton}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <span className={`${styles.menuIcon} ${isMenuOpen ? styles.menuIconOpen : ''}`}>
                <span /><span /><span />
              </span>
            </button>
          </div>
        </div>

        {/* ── Gold Rule — decorative accent line ── */}
        <div className={`${styles.goldRule} ${isScrolled ? styles.goldRuleVisible : ''}`} aria-hidden="true" />
      </header>

      {/* ── Mobile Menu ── */}
      <div
        id="mobile-menu"
        className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className={styles.mobileMenuInner}>
          <nav className={styles.mobileNav} aria-label="Mobile navigation">
            <ul className={styles.mobileNavList}>
              {NAV_LINKS.map((link, index) => (
                <li
                  key={link.href}
                  className={`${styles.mobileNavItem} ${isMenuOpen ? styles.mobileNavItemVisible : ''}`}
                  style={{ transitionDelay: `${index * 60 + 80}ms` }}
                >
                  <Link
                    href={link.href}
                    className={styles.mobileNavLink}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className={styles.mobileNavLinkNumber}>{String(index + 1).padStart(2, '0')}</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className={styles.mobileMenuFooter}>
            <Link
              href="/sell/property-appraisal"
              className={styles.mobileCtaButton}
              onClick={() => setIsMenuOpen(false)}
            >
              Request a Free Appraisal
            </Link>
            <div className={styles.mobileContact}>
              <a href="tel:0300000000" className={styles.mobileContactLink}>03 0000 0000</a>
              <span>·</span>
              <a href="mailto:info@krishrealestate.com.au" className={styles.mobileContactLink}>info@krishrealestate.com.au</a>
            </div>
            <p className={styles.mobileAddress}>22 Wollemi Avenue, Wollert VIC 3750</p>
          </div>
        </div>
      </div>
    </>
  );
}
