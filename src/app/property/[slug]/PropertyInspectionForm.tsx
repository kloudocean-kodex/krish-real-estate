'use client';

import { useState } from 'react';
import styles from './PropertyDetail.module.css';

export function PropertyInspectionForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      name,
      phone,
      email,
      source: 'krishrealestate.com.au — Property Viewing Request',
    };

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY || 'YOUR_WEB3FORMS_KEY',
          ...payload,
          subject: `Private Viewing Request from ${name} (${phone})`,
          from_name: 'Krish Real Estate Inspection Booking',
          to: 'chirag@krishrealestate.com.au',
        }),
      });

      if (!res.ok) throw new Error('Form API failed');
    } catch {
      const subject = encodeURIComponent(`Private Viewing Request: ${name}`);
      const body = encodeURIComponent(
        `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nRequested private viewing for property.`
      );
      window.open(`mailto:chirag@krishrealestate.com.au?subject=${subject}&body=${body}`, '_blank');
    }

    setIsSubmitting(false);
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
        <button type="submit" className={styles.submitAppointmentBtn} disabled={isSubmitting}>
          {isSubmitting ? 'Requesting Appointment...' : 'Request Private Viewing'}
        </button>
      </form>
      <p className={styles.formPrivacyNotice}>
        Discretion assured. Your information is never shared or sold.
      </p>
    </div>
  );
}
