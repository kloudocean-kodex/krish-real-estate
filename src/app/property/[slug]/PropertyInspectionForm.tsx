'use client';

import { useState } from 'react';
import styles from './PropertyDetail.module.css';

export function PropertyInspectionForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className={styles.inspectionSuccess}>
        <span className={styles.inspectionSuccessIcon}>✓</span>
        <p className={styles.inspectionSuccessTitle}>Viewing Request Received</p>
        <p className={styles.inspectionSuccessText}>
          Our team will contact you on <strong>{phone}</strong> to confirm your appointment time.
        </p>
      </div>
    );
  }

  return (
    <div id="inspection-booking" className={styles.inspectionFormCard}>
      <h4 className={styles.formTitle}>Schedule Private Appointment</h4>
      <p className={styles.formSubtitle}>Enter your details for priority inspection scheduling.</p>

      <form className={styles.quickForm} onSubmit={handleSubmit}>
        <div className={styles.formField}>
          <input
            type="text"
            placeholder="Full Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.formInput}
          />
        </div>
        <div className={styles.formField}>
          <input
            type="tel"
            placeholder="Mobile Number"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={styles.formInput}
          />
        </div>
        <div className={styles.formField}>
          <input
            type="email"
            placeholder="Email Address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.formInput}
          />
        </div>
        <button type="submit" className={styles.submitAppointmentBtn}>
          Request Private Viewing
        </button>
      </form>
      <p className={styles.formPrivacyNotice}>
        Discretion assured. Your information is never shared or sold.
      </p>
    </div>
  );
}
