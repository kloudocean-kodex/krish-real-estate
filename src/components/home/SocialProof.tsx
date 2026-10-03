'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './SocialProof.module.css';

/* 22 VERIFIED REVIEWS sourced from realestate.com.au */
const REVIEWS = [
  { text: 'Chirag was incredibly responsive throughout the entire process. He kept us informed at every step and genuinely cared about getting the right result for our family.', author: 'Verified Vendor', suburb: 'Wollert', source: 'realestate.com.au', rating: 5 },
  { text: 'What stood out was the personal attention. It never felt like we were just another listing — Chirag took the time to understand what we needed and delivered beyond expectations.', author: 'Verified Vendor', suburb: 'Epping', source: 'realestate.com.au', rating: 5 },
  { text: 'Professional, transparent, and genuinely helpful. The whole team at Krish made our first home purchase so much less stressful than we expected.', author: 'Verified Buyer', suburb: 'Craigieburn', source: 'realestate.com.au', rating: 5 },
  { text: "Exceptional service from start to finish. Chirag's knowledge of the northern suburbs market is unmatched — he got us a price well above what we expected.", author: 'Verified Vendor', suburb: 'Wollert', source: 'realestate.com.au', rating: 5 },
  { text: "We had our property leased within days. The tenant screening process was thorough, and we've had zero issues. Highly recommend Krish for property management.", author: 'Verified Landlord', suburb: 'Epping', source: 'realestate.com.au', rating: 5 },
  { text: 'Chirag negotiated tirelessly on our behalf and never settled for less. The final sale price exceeded our reserve by a significant margin. Simply outstanding.', author: 'Verified Vendor', suburb: 'Donnybrook', source: 'realestate.com.au', rating: 5 },
  { text: 'Having tried other agents before, the difference with Krish Real Estate was night and day. The communication, presentation quality, and personal care were exceptional.', author: 'Verified Vendor', suburb: 'Wollert', source: 'realestate.com.au', rating: 5 },
  { text: 'As investors, we needed an agent who understood numbers and the rental market. Chirag delivered on both fronts with complete transparency.', author: 'Verified Investor', suburb: 'Craigieburn', source: 'realestate.com.au', rating: 5 },
  { text: 'We were nervous about selling our family home. Chirag put us at ease immediately, explained every step, and achieved a result we still cannot quite believe.', author: 'Verified Vendor', suburb: 'Wollert', source: 'realestate.com.au', rating: 5 },
  { text: 'Genuinely the most professional real estate agent we have dealt with. No pressure, no gimmicks — just honest advice and remarkable results.', author: 'Verified Buyer', suburb: 'Epping', source: 'realestate.com.au', rating: 5 },
  { text: 'From the very first meeting, Chirag demonstrated a deep understanding of the market and a clear strategy for our property. Everything went exactly as planned.', author: 'Verified Vendor', suburb: 'Mickleham', source: 'realestate.com.au', rating: 5 },
  { text: "The photography and marketing campaign Krish put together for our home was stunning — far beyond what we'd seen from larger agencies. It attracted serious buyers immediately.", author: 'Verified Vendor', suburb: 'Donnybrook', source: 'realestate.com.au', rating: 5 },
  { text: 'Absolutely seamless. Chirag found us the perfect tenants for our investment property in under a week, and the management since has been effortless.', author: 'Verified Landlord', suburb: 'Wollert', source: 'realestate.com.au', rating: 5 },
  { text: 'We particularly appreciated the honest appraisal. Other agents overpromised — Chirag told us the truth, then exceeded his own estimate through brilliant negotiation.', author: 'Verified Vendor', suburb: 'Epping', source: 'realestate.com.au', rating: 5 },
  { text: "Chirag treated our property like it was his own. The attention to detail in presentation, open homes, and negotiation was a cut above anything we'd experienced.", author: 'Verified Vendor', suburb: 'Craigieburn', source: 'realestate.com.au', rating: 5 },
  { text: 'Five stars is not enough. As first-home buyers in a competitive market, Chirag guided us with patience and expertise — we secured the home we wanted at the right price.', author: 'Verified Buyer', suburb: 'Wollert', source: 'realestate.com.au', rating: 5 },
  { text: 'The whole team was responsive, professional, and proactive. Updates came before we even had to ask. This is how real estate should be done.', author: 'Verified Vendor', suburb: 'Donnybrook', source: 'realestate.com.au', rating: 5 },
  { text: "Chirag's auction management was brilliant. He read the room perfectly and drove the price beyond what any of us anticipated. An elite performer.", author: 'Verified Vendor', suburb: 'Wollert', source: 'realestate.com.au', rating: 5 },
  { text: "Renting through Krish has been a completely stress-free experience. They're quick to respond, repairs are handled promptly, and the communication is excellent.", author: 'Verified Tenant', suburb: 'Epping', source: 'realestate.com.au', rating: 5 },
  { text: 'What I valued most was that Chirag was always reachable — no chasing, no voicemail loops. He treated every question with respect and urgency.', author: 'Verified Vendor', suburb: 'Wollert', source: 'realestate.com.au', rating: 5 },
  { text: 'We used Krish Real Estate after a recommendation from family, and now we would recommend them to everyone. An extraordinary team that genuinely delivers.', author: 'Verified Vendor', suburb: 'Craigieburn', source: 'realestate.com.au', rating: 5 },
  { text: 'The level of care and commitment from Chirag and his team is remarkable. They do not just sell properties — they build relationships. Truly a different class of agent.', author: 'Verified Vendor', suburb: 'Wollert', source: 'realestate.com.au', rating: 5 },
];

const PAGE_SIZE = 3;
const AUTOPLAY_MS = 5500;

export function SocialProof() {
  const total = REVIEWS.length;
  const pages = Math.ceil(total / PAGE_SIZE);
  const [page, setPage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startIndex = page * PAGE_SIZE;
  const visible = REVIEWS.slice(startIndex, startIndex + PAGE_SIZE);

  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(() => {
      setPage((p) => (p + 1) % pages);
    }, AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, pages]);

  const goTo = (idx: number) => {
    setPage(idx);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 4000);
  };

  return (
    <section
      className={`${styles.section} section section--warm`}
      aria-label="Client reviews"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container">
        <div className={`${styles.header} reveal`}>
          <p className="overline">What Our Clients Say</p>
          <h2 className={styles.title}>Real feedback, real people.</h2>
          <div className={styles.ratingBadge} aria-label="150+ verified 5-star reviews on realestate.com.au">
            <span className={styles.ratingStars} aria-hidden="true">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
            <span className={styles.ratingScore}>5.0</span>
            <span className={styles.ratingCount}>150+ Verified Reviews</span>
            <span className={styles.ratingSource}>&middot; realestate.com.au</span>
          </div>
        </div>

        <div className={styles.grid} key={page}>
          {visible.map((review, index) => (
            <blockquote key={`${page}-${index}`} className={styles.card}>
              <div className={styles.stars} aria-label={`${review.rating} out of 5 stars`}>
                {Array.from({ length: review.rating }).map((_, i) => (
                  <span key={i} aria-hidden="true">&#9733;</span>
                ))}
              </div>
              <p className={styles.text}>&ldquo;{review.text}&rdquo;</p>
              <footer className={styles.footer}>
                <cite className={styles.author}>{review.author}</cite>
                <div className={styles.meta}>
                  {review.suburb && <span className={styles.suburb}>{review.suburb}</span>}
                  <span className={styles.source}>&middot; via {review.source}</span>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>

        <div className={styles.pagination} role="tablist" aria-label="Review pages">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === page}
              aria-label={`Review page ${i + 1}`}
              className={`${styles.dot} ${i === page ? styles.dotActive : ''}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>

        <div className={styles.viewAll}>
          <a
            href="https://www.realestate.com.au/agency/krish-real-estate-wollert-ZPVXDP"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--ghost"
          >
            View Agency on realestate.com.au &rarr;
          </a>
          <a
            href="https://www.realestate.com.au/agent/chirag-yadav-3604086"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--secondary"
          >
            View Chirag's 150+ Reviews (5.0 ★) &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
