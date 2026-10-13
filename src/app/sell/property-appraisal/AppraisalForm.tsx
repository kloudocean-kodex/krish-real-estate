"use client";

import { useState } from "react";
import Link from "next/link";
import { EnquiryProtection } from "@/components/EnquiryProtection";
import { submitEnquiry } from "@/lib/submitEnquiry";
import styles from "./Appraisal.module.css";

export function AppraisalForm() {
  const [step, setStep] = useState<number>(1);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Form State
  const [address, setAddress] = useState("");
  const [suburb, setSuburb] = useState("Wollert");
  const [propertyType, setPropertyType] = useState("House");
  const [beds, setBeds] = useState("4");
  const [baths, setBaths] = useState("2");
  const [timeline, setTimeline] = useState("1 to 3 Months");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    if (isSubmitting) return;
    setError("");
    setIsSubmitting(true);

    const result = await submitEnquiry(
      {
        name: fullName,
        phone,
        email,
        address: `${address}, ${suburb}`,
        property_type: propertyType,
        bedrooms: beds,
        bathrooms: baths,
        timeline,
        notes,
        enquiry_type: "appraisal",
        source: "krishrealestate.com.au — Property Appraisal Request",
        subject: `New Property Appraisal Request: ${address}, ${suburb} from ${fullName}`,
      },
      form,
    );

    setAttempt((a) => a + 1);
    setIsSubmitting(false);
    if (!result.success) {
      setError(
        `${result.error || "Unable to send. Please call 0479 092 216."}${result.reference ? ` Reference: ${result.reference}` : ""}`,
      );
      return;
    }
    setIsSubmitted(true);
  };

  return (
    <main className={styles.page}>
      <div className="container">
        <div className={styles.wrapper}>
          {/* Header */}
          <div className={styles.header}>
            <span className={styles.overline}>
              ◆ YOUR LOCAL MARKET APPRAISAL
            </span>
            <h1 className={styles.title}>
              What is your home
              <br />
              <span className={styles.titleItalic}>
                worth in today&apos;s market?
              </span>
            </h1>
            <p className={styles.subtitle}>
              Understand your property’s position with a personal market appraisal,
              informed by comparable sales and local buyer demand. An appraisal
              is an estimate of market value, rather than a formal valuation.
            </p>
          </div>

          {!isSubmitted ? (
            <div className={styles.formCard}>
              {/* Progress Steps */}
              <div className={styles.progressBar}>
                <div
                  className={`${styles.progressStep} ${step >= 1 ? styles.progressStepActive : ""}`}
                >
                  <span className={styles.stepNum}>01</span>
                  <span className={styles.stepName}>Property</span>
                </div>
                <div className={styles.progressLine} />
                <div
                  className={`${styles.progressStep} ${step >= 2 ? styles.progressStepActive : ""}`}
                >
                  <span className={styles.stepNum}>02</span>
                  <span className={styles.stepName}>Timeline</span>
                </div>
                <div className={styles.progressLine} />
                <div
                  className={`${styles.progressStep} ${step >= 3 ? styles.progressStepActive : ""}`}
                >
                  <span className={styles.stepNum}>03</span>
                  <span className={styles.stepName}>Contact</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className={styles.form}>
                {/* STEP 1 */}
                {step === 1 && (
                  <div className={styles.stepPane}>
                    <h2 className={styles.stepTitle}>
                      Property Location &amp; Configuration
                    </h2>

                    <div className={styles.field}>
                      <label
                        htmlFor="appraisal-address"
                        className={styles.label}
                      >
                        Street Address *
                      </label>
                      <input
                        id="appraisal-address"
                        type="text"
                        required
                        placeholder="e.g. 15 Banksia Drive"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className={styles.input}
                      />
                    </div>

                    <div className={styles.fieldRow}>
                      <div className={styles.field}>
                        <label
                          htmlFor="appraisal-suburb"
                          className={styles.label}
                        >
                          Suburb *
                        </label>
                        <select
                          id="appraisal-suburb"
                          value={suburb}
                          onChange={(e) => setSuburb(e.target.value)}
                          className={styles.select}
                        >
                          <option value="Wollert">Wollert VIC 3750</option>
                          <option value="Epping">Epping VIC 3076</option>
                          <option value="Craigieburn">
                            Craigieburn VIC 3064
                          </option>
                          <option value="Donnybrook">
                            Donnybrook VIC 3064
                          </option>
                          <option value="Mickleham">Mickleham VIC 3064</option>
                          <option value="Other">Other Northern Suburb</option>
                        </select>
                      </div>

                      <div className={styles.field}>
                        <label
                          htmlFor="appraisal-type"
                          className={styles.label}
                        >
                          Property Style
                        </label>
                        <select
                          id="appraisal-type"
                          value={propertyType}
                          onChange={(e) => setPropertyType(e.target.value)}
                          className={styles.select}
                        >
                          <option value="House">Free-standing House</option>
                          <option value="Townhouse">Townhome</option>
                          <option value="Acreage">Acreage / Lifestyle</option>
                          <option value="Apartment">Apartment</option>
                        </select>
                      </div>
                    </div>

                    <div className={styles.fieldRow}>
                      <div className={styles.field}>
                        <label
                          htmlFor="appraisal-beds"
                          className={styles.label}
                        >
                          Bedrooms
                        </label>
                        <select
                          id="appraisal-beds"
                          value={beds}
                          onChange={(e) => setBeds(e.target.value)}
                          className={styles.select}
                        >
                          <option value="2">2 Bedrooms</option>
                          <option value="3">3 Bedrooms</option>
                          <option value="4">4 Bedrooms</option>
                          <option value="5">5+ Bedrooms</option>
                        </select>
                      </div>

                      <div className={styles.field}>
                        <label
                          htmlFor="appraisal-baths"
                          className={styles.label}
                        >
                          Bathrooms
                        </label>
                        <select
                          id="appraisal-baths"
                          value={baths}
                          onChange={(e) => setBaths(e.target.value)}
                          className={styles.select}
                        >
                          <option value="1">1 Bathroom</option>
                          <option value="2">2 Bathrooms</option>
                          <option value="3">3 Bathrooms</option>
                          <option value="4">4+ Bathrooms</option>
                        </select>
                      </div>
                    </div>

                    <div className={styles.actionsRight}>
                      <button
                        type="button"
                        disabled={!address.trim()}
                        onClick={() => setStep(2)}
                        className={styles.nextBtn}
                      >
                        Continue to Timeline →
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                  <div className={styles.stepPane}>
                    <h2 className={styles.stepTitle}>
                      Your Timeline &amp; Objective
                    </h2>

                    <div className={styles.field}>
                      <label className={styles.label}>
                        When are you contemplating a move?
                      </label>
                      <div className={styles.radioGrid}>
                        {[
                          {
                            id: "immediate",
                            label: "Immediately (Next 30 days)",
                          },
                          { id: "1-3m", label: "1 to 3 Months" },
                          { id: "3-6m", label: "3 to 6 Months" },
                          {
                            id: "curious",
                            label: "Just curious / Refinancing",
                          },
                        ].map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            className={`${styles.radioCard} ${timeline === item.label ? styles.radioCardActive : ""}`}
                            onClick={() => setTimeline(item.label)}
                          >
                            <span className={styles.radioDot} />
                            <span>{item.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className={styles.field}>
                      <label htmlFor="appraisal-notes" className={styles.label}>
                        Any special features or upgrades?
                      </label>
                      <textarea
                        id="appraisal-notes"
                        rows={3}
                        placeholder="e.g. Inground pool, recent kitchen renovation, solar battery system..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className={styles.textarea}
                      />
                    </div>

                    <div className={styles.actionsBetween}>
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className={styles.backBtn}
                      >
                        ← Back
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className={styles.nextBtn}
                      >
                        Continue to Contact →
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3 */}
                {step === 3 && (
                  <div className={styles.stepPane}>
                    <h2 className={styles.stepTitle}>
                      Where should we deliver your report?
                    </h2>

                    <div className={styles.field}>
                      <label htmlFor="appraisal-name" className={styles.label}>
                        Full Name *
                      </label>
                      <input
                        id="appraisal-name"
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
                        <label
                          htmlFor="appraisal-phone"
                          className={styles.label}
                        >
                          Mobile Phone *
                        </label>
                        <input
                          id="appraisal-phone"
                          type="tel"
                          required
                          placeholder="0400 000 000"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className={styles.input}
                        />
                      </div>

                      <div className={styles.field}>
                        <label
                          htmlFor="appraisal-email"
                          className={styles.label}
                        >
                          Email Address *
                        </label>
                        <input
                          id="appraisal-email"
                          type="email"
                          required
                          placeholder="name@domain.com.au"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className={styles.input}
                        />
                      </div>
                    </div>

                    <div className={styles.discretionNotice}>
                      <span className={styles.lockIcon}>🔒</span>
                      <span>
                        Your details are used to respond to your enquiry.
                      </span>
                    </div>

                    <EnquiryProtection attempt={attempt} />
                    {error && (
                      <p role="alert" className="form-error">
                        {error}
                      </p>
                    )}
                    <div className={styles.actionsBetween}>
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className={styles.backBtn}
                      >
                        ← Back
                      </button>
                      <button
                        type="submit"
                        className={styles.submitBtn}
                        disabled={isSubmitting}
                      >
                        {isSubmitting
                          ? "Sending Request..."
                          : "Submit Appraisal Request"}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          ) : (
            <div className={styles.successCard}>
              <span className={styles.successIcon}>✓</span>
              <h2 className={styles.successTitle}>
                Thank you, {fullName || "Valued Client"}.
              </h2>
              <p className={styles.successMessage}>
                Your confidential appraisal request for{" "}
                <strong>
                  {address}, {suburb}
                </strong>{" "}
                has been received by our team. We will review local comparable
                sales and contact you to discuss your property.
              </p>
              <p className={styles.successContactNotice}>
                Our team will contact you on{" "}
                <strong>{phone}</strong> to discuss your property.
              </p>
              <div className={styles.successActions}>
                <Link href="/" className={styles.nextBtn}>
                  Return to Homepage
                </Link>
                <Link href="/buy" className={styles.backBtn}>
                  Explore Our Active Portfolio
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
