'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BUSINESS } from '@/data/team';
import { EnquiryProtection } from '@/components/EnquiryProtection';
import { submitEnquiry } from '@/lib/submitEnquiry';
import styles from './Contact.module.css';

export function ContactClient() {
  const [enquiryType, setEnquiryType] = useState('general');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    if (isSubmitting) return;
    setError('');
    setIsSubmitting(true);

    const result = await submitEnquiry({
      name: fullName,
      phone,
      email,
      message,
      enquiry_type: enquiryType,
      source: 'krishrealestate.com.au — Contact Form',
      subject: `New ${enquiryType} enquiry from ${fullName} — Krish Real Estate`,
    }, form);

    setAttempt(a => a + 1);
    setIsSubmitting(false);
    if (!result.success) { setError(`${result.error || 'Unable to send. Please call 0479 092 216.'}${result.reference ? ` Reference: ${result.reference}` : ''}`); return; }
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
              <span>YOUR LOCAL PROPERTY TEAM</span>
              <span>◆</span>
            </div>
            <h1 className={styles.title}>
              Let&apos;s begin the<br />
              <span className={styles.titleItalic}>conversation.</span>
            </h1>
            <p className={styles.subtitle}>
              Thinking of selling, looking for a home, or seeking help with a rental property?
              Tell our Wollert-based team what you need and we will be in touch.
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
                <span className={styles.cardTag}>OUR WOLLERT OFFICE</span>
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
                    <a href="mailto:rental@krishrealestate.com.au" className={styles.methodValue}>rental@krishrealestate.com.au</a>
                  </div>

                  <div className={styles.methodItem}>
                    <span className={styles.methodLabel}>OFFICE HOURS</span>
                    <p className={styles.hoursText}>
                      Meetings and inspections by appointment. Please call ahead to arrange a time.
                    </p>
                  </div>
                </div>

                <div className={styles.accreditationStrip}>
                  <span className={styles.accreditationItem}>✦ WOLLERT-BASED TEAM</span>
                  <span className={styles.accreditationItem}>✦ LICENSED ESTATE AGENT (VIC)</span>
                </div>
              </div>
            </div>

            {/* Right: Enquiry Form */}
            <div className={styles.formCol}>
              {!isSubmitted ? (
                <div className={styles.formCard}>
                  <h2 className={styles.formHeading}>How can we help?</h2>
                  <p className={styles.formSubheading}>
                    Choose your enquiry type and leave a message for our team.
                  </p>

                  <form onSubmit={handleSubmit} className={styles.form}>
                    {/* Enquiry Type Selector */}
                    <div className={styles.typeSelector}>
                      {[
                        { id: 'selling', label: 'Selling a Property' },
                        { id: 'buying', label: 'Buying a Property' },
                        { id: 'leasing', label: 'Property Management' },
                        { id: 'general', label: 'General Enquiry' },
                      ].map((type) => (
                        <button
                          key={type.id}
                          type="button"
                          aria-pressed={enquiryType === type.id}
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

                    <EnquiryProtection attempt={attempt} />
                    {error && <p role="alert" className="form-error">{error}</p>}
                    <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                      {isSubmitting ? 'Sending…' : 'Send Enquiry'}
                    </button>

                    <p className={styles.privacyNote}>
                      Your enquiry goes directly to our team.
                    </p>
                  </form>
                </div>
              ) : (
                <div className={styles.successCard}>
                  <span className={styles.successIcon}>✓</span>
                  <h2 className={styles.successTitle}>Thank you, {fullName}.</h2>
                  <p className={styles.successText}>
                    Your {enquiryType === 'general' ? 'general enquiry' : `${enquiryType} enquiry`} has been received by our Wollert office.
                    Our team will review your message and contact you on <strong>{phone}</strong> shortly.
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
