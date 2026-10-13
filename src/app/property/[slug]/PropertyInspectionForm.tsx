'use client';

import { useState } from 'react';
import { EnquiryProtection } from '@/components/EnquiryProtection';
import { submitEnquiry } from '@/lib/submitEnquiry';
import styles from './PropertyDetail.module.css';

export function PropertyInspectionForm({propertyId,address,transactionType}:{propertyId:string;address:string;transactionType:string}) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
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
      name,
      phone,
      email,
      enquiry_type: transactionType === 'rent' ? 'leasing' : 'buying',
      property_id: propertyId,
      address,
      source: 'krishrealestate.com.au — Property Viewing Request',
      subject: `Private Viewing Request from ${name} (${phone})`,
    }, form);

    setAttempt(a => a + 1);
    setIsSubmitting(false);
    if (!result.success) { setError(`${result.error || 'Unable to send. Please call 0479 092 216.'}${result.reference ? ` Reference: ${result.reference}` : ''}`); return; }
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
      <h4 className={styles.formTitle}>Request an inspection</h4>
      <p className={styles.formSubtitle}>Leave your details and the agent will arrange a suitable time.</p>

      <form className={styles.quickForm} onSubmit={handleSubmit}>
        <div className={styles.formField}>
          <input
            type="text"
            aria-label="Full Name" autoComplete="name"
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
            aria-label="Mobile Number" autoComplete="tel"
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
            aria-label="Email Address" autoComplete="email"
            placeholder="Email Address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.formInput}
          />
        </div>
        <EnquiryProtection attempt={attempt} />
                    {error && <p role="alert" className="form-error">{error}</p>}
                    <button type="submit" className={styles.submitAppointmentBtn} disabled={isSubmitting}>
          {isSubmitting ? 'Requesting Appointment...' : 'Request Private Viewing'}
        </button>
      </form>
      <p className={styles.formPrivacyNotice}>
        We use your details to arrange your inspection.
      </p>
    </div>
  );
}
