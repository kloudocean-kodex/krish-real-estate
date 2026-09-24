'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BUSINESS } from '@/data/team';
import styles from '../sell/property-appraisal/Appraisal.module.css';

export default function RentalAppraisalPage() {
  const [address, setAddress] = useState('');
  const [suburb, setSuburb] = useState('Wollert');
  const [propertyType, setPropertyType] = useState('House');
  const [beds, setBeds] = useState('4');
  const [currentStatus, setCurrentStatus] = useState('Tenanted — Seeking New Management');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <main className={styles.page}>
      <div className="container">
        <div className={styles.wrapper}>
          {/* Header */}
          <div className={styles.header}>
            <span className={styles.overline}>◆ ASSET PERFORMANCE &amp; YIELD</span>
            <h1 className={styles.title}>
              Complimentary Rental<br />
              <span className={styles.titleItalic}>Yield Appraisal.</span>
            </h1>
            <p className={styles.subtitle}>
              Discover your investment property&apos;s true rental potential in today&apos;s high-demand northern Melbourne corridor. Zero obligation, full discretion.
            </p>
          </div>

          {!isSubmitted ? (
            <div className={styles.formCard}>
              <form onSubmit={handleSubmit} className={styles.form}>
                <h2 className={styles.stepTitle}>Property &amp; Tenancy Details</h2>

                <div className={styles.field}>
                  <label htmlFor="rental-address" className={styles.label}>Rental Property Address *</label>
                  <input
                    id="rental-address"
                    type="text"
                    required
                    placeholder="e.g. 24 Aspect Drive"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className={styles.input}
                  />
                </div>

                <div className={styles.fieldRow}>
                  <div className={styles.field}>
                    <label htmlFor="rental-suburb" className={styles.label}>Suburb *</label>
                    <select
                      id="rental-suburb"
                      value={suburb}
                      onChange={(e) => setSuburb(e.target.value)}
                      className={styles.select}
                    >
                      <option value="Wollert">Wollert VIC 3750</option>
                      <option value="Epping">Epping VIC 3076</option>
                      <option value="Craigieburn">Craigieburn VIC 3064</option>
                      <option value="Donnybrook">Donnybrook VIC 3064</option>
                      <option value="Mickleham">Mickleham VIC 3064</option>
                      <option value="Other">Other Northern Suburb</option>
                    </select>
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="rental-type" className={styles.label}>Property Type</label>
                    <select
                      id="rental-type"
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      className={styles.select}
                    >
                      <option value="House">House / Freestanding</option>
                      <option value="Townhouse">Townhouse</option>
                      <option value="Unit">Unit / Apartment</option>
                    </select>
                  </div>
                </div>

                <div className={styles.fieldRow}>
                  <div className={styles.field}>
                    <label htmlFor="rental-beds" className={styles.label}>Bedrooms</label>
                    <select
                      id="rental-beds"
                      value={beds}
                      onChange={(e) => setBeds(e.target.value)}
                      className={styles.select}
                    >
                      <option value="2">2 Bedrooms</option>
                      <option value="3">3 Bedrooms</option>
                      <option value="4">4 Bedrooms</option>
                      <option value="5+">5+ Bedrooms</option>
                    </select>
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="rental-status" className={styles.label}>Current Situation</label>
                    <select
                      id="rental-status"
                      value={currentStatus}
                      onChange={(e) => setCurrentStatus(e.target.value)}
                      className={styles.select}
                    >
                      <option value="Currently Tenanted — Transfer Management">Currently Tenanted — Transfer Management</option>
                      <option value="Vacant — Ready to Lease">Vacant — Ready to Lease</option>
                      <option value="Settling Soon / Under Construction">Settling Soon / Under Construction</option>
                      <option value="Owner Occupied — Considering Renting">Owner Occupied — Considering Renting</option>
                    </select>
                  </div>
                </div>

                <h2 className={styles.stepTitle} style={{ marginTop: 'var(--space-6)' }}>Your Contact Details</h2>

                <div className={styles.field}>
                  <label htmlFor="rental-name" className={styles.label}>Full Name *</label>
                  <input
                    id="rental-name"
                    type="text"
                    required
                    placeholder="Your name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className={styles.input}
                  />
                </div>

                <div className={styles.fieldRow}>
                  <div className={styles.field}>
                    <label htmlFor="rental-phone" className={styles.label}>Phone Number *</label>
                    <input
                      id="rental-phone"
                      type="tel"
                      required
                      placeholder="0400 000 000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="rental-email" className={styles.label}>Email Address *</label>
                    <input
                      id="rental-email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={styles.input}
                    />
                  </div>
                </div>

                <div className={styles.formActions}>
                  <button type="submit" className={styles.submitBtn}>
                    <span>Request Rental Yield Appraisal</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className={styles.successCard}>
              <div className={styles.successIcon}>✓</div>
              <h2 className={styles.successTitle}>Rental Appraisal Requested</h2>
              <p className={styles.successDesc}>
                Thank you, <strong>{fullName}</strong>. Our senior property manager will review comparable leasing data for <strong>{address}, {suburb}</strong> and deliver your comprehensive yield report within 24 business hours.
              </p>
              <div className={styles.successActions}>
                <Link href="/property-management" className="btn btn--primary">
                  Explore Property Management
                </Link>
                <Link href="/" className="btn btn--secondary">
                  Back to Home
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
