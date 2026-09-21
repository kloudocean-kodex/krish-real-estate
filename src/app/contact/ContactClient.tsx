'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BUSINESS } from '@/data/team';
import styles from './Contact.module.css';

export function ContactClient() {
  const [enquiryType, setEnquiryType] = useState('selling');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <main className={styles.page}>
      {/* ── Masthead ── */}
      <section className={styles.masthead}>
        <div className="container">
          <div className={styles.mastheadContent}>
            <div className={styles.prestigeOverline}>
              <span>◆</span>
              <span>PRIVATE CLIENT CONCIERGE</span>
              <span>◆</span>
            </div>
            <h1 className={styles.title}>
              Let&apos;s begin the<br />
              <span className={styles.titleItalic}>conversation.</span>
            </h1>
            <p className={styles.subtitle}>
              Whether you are contemplating a sale, seeking an off-market acquisition in the northern corridor,
              or require your investment managed with forensic care — our advisory desk is at your disposal.
            </p>
          </div>
        </div>
      </section>

      {/* ── Contact Details & Form Grid ── */}
      <section className={styles.contactSection}>
        <div className="container">
          <div className={styles.contactGrid}>
            {/* Left: Office & Contact Info */}
            <div className={styles.infoCol}>
              <div className={styles.officeCard}>
                <span className={styles.cardTag}>HEADQUARTERS</span>
                <h2 className={styles.officeTitle}>{BUSINESS.name}</h2>
                <p className={styles.officeAddress}>
                  22 Wollemi Avenue<br />
                  Wollert VIC 3750<br />
                  Australia
                </p>

                <div className={styles.contactMethods}>
                  <div className={styles.methodItem}>
                    <span className={styles.methodLabel}>TELEPHONE</span>
                    <a href={`tel:${BUSINESS.phone}`} className={styles.methodValue}>
                      {BUSINESS.phone}
                    </a>
                  </div>

                  <div className={styles.methodItem}>
                    <span className={styles.methodLabel}>EMAIL CORRESPONDENCE</span>
                    <a href={`mailto:${BUSINESS.email}`} className={styles.methodValue}>
                      {BUSINESS.email}
                    </a>
                  </div>

                  <div className={styles.methodItem}>
                    <span className={styles.methodLabel}>OFFICE HOURS</span>
                    <p className={styles.hoursText}>
                      Monday – Friday: 9:00am – 6:00pm<br />
                      Saturday: 9:00am – 5:00pm<br />
                      Sunday: Private appointments by arrangement
                    </p>
                  </div>
                </div>

                <div className={styles.accreditationStrip}>
                  <span className={styles.accreditationItem}>✦ REIV ACCREDITED FIRM</span>
                  <span className={styles.accreditationItem}>✦ LICENSED ESTATE AGENT (VIC)</span>
                </div>
              </div>
            </div>

            {/* Right: Enquiry Form */}
            <div className={styles.formCol}>
              {!isSubmitted ? (
                <div className={styles.formCard}>
                  <h2 className={styles.formHeading}>Confidential Consultation Request</h2>
                  <p className={styles.formSubheading}>
                    Select your area of interest. We will connect you directly with the appropriate lead advisor.
                  </p>

                  <form onSubmit={handleSubmit} className={styles.form}>
                    {/* Enquiry Type Selector */}
                    <div className={styles.typeSelector}>
                      {[
                        { id: 'selling', label: 'Selling a Property' },
                        { id: 'buying', label: 'Buying / Off-Market' },
                        { id: 'leasing', label: 'Asset Management' },
                        { id: 'general', label: 'General Enquiry' },
                      ].map((type) => (
                        <button
                          key={type.id}
                          type="button"
                          className={`${styles.typeBtn} ${enquiryType === type.id ? styles.typeBtnActive : ''}`}
                          onClick={() => setEnquiryType(type.id)}
                        >
                          {type.label}
                        </button>
                      ))}
                    </div>

                    <div className={styles.field}>
                      <label htmlFor="contact-name" className={styles.label}>Full Name *</label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        placeholder="Your full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className={styles.input}
                      />
                    </div>

                    <div className={styles.fieldRow}>
                      <div className={styles.field}>
                        <label htmlFor="contact-phone" className={styles.label}>Phone Number *</label>
                        <input
                          id="contact-phone"
                          type="tel"
                          required
                          placeholder="0400 000 000"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className={styles.input}
                        />
                      </div>

                      <div className={styles.field}>
                        <label htmlFor="contact-email" className={styles.label}>Email Address *</label>
                        <input
                          id="contact-email"
                          type="email"
                          required
                          placeholder="name@domain.com.au"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className={styles.input}
                        />
                      </div>
                    </div>

                    <div className={styles.field}>
                      <label htmlFor="contact-message" className={styles.label}>How can we assist? *</label>
                      <textarea
                        id="contact-message"
                        required
                        rows={4}
                        placeholder="Tell us about your property, requirements, or desired timeline..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className={styles.textarea}
                      />
                    </div>

                    <button type="submit" className={styles.submitBtn}>
                      Send Confidential Message
                    </button>

                    <p className={styles.privacyNote}>
                      Discretion assured. Your contact details remain strictly confidential.
                    </p>
                  </form>
                </div>
              ) : (
                <div className={styles.successCard}>
                  <span className={styles.successIcon}>✓</span>
                  <h2 className={styles.successTitle}>Thank you, {fullName}.</h2>
                  <p className={styles.successText}>
                    Your enquiry regarding <strong>{enquiryType}</strong> has been received by our Wollert office.
                    A lead advisor will review your notes and contact you on <strong>{phone}</strong> shortly.
                  </p>
                  <Link href="/" className={styles.returnBtn}>
                    Return to Homepage
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
