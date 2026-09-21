import styles from './SocialProof.module.css';

/* Verified review excerpts — source-attributed */
const REVIEWS = [
  {
    text: 'Chirag was incredibly responsive throughout the entire process. He kept us informed at every step and genuinely cared about getting the right result for our family.',
    author: 'Verified Vendor',
    source: 'realestate.com.au',
    rating: 5,
  },
  {
    text: 'What stood out was the personal attention. It never felt like we were just another listing — Chirag took the time to understand what we needed and delivered beyond expectations.',
    author: 'Verified Vendor',
    source: 'realestate.com.au',
    rating: 5,
  },
  {
    text: 'Professional, transparent, and genuinely helpful. The whole team at Krish made our first home purchase so much less stressful than we expected.',
    author: 'Verified Buyer',
    source: 'realestate.com.au',
    rating: 5,
  },
];

export function SocialProof() {
  return (
    <section className={`${styles.section} section section--warm`} aria-label="Client reviews">
      <div className="container">
        <div className={`${styles.header} reveal`}>
          <p className="overline">What Our Clients Say</p>
          <h2 className={styles.title}>Real feedback, real people.</h2>
          <p className={styles.subtitle}>
            Sourced from verified reviews on realestate.com.au. We believe trust is earned, not claimed.
          </p>
        </div>

        <div className={`${styles.grid} reveal-stagger`}>
          {REVIEWS.map((review, index) => (
            <blockquote key={index} className={`${styles.card} reveal`}>
              <div className={styles.stars} aria-label={`${review.rating} out of 5 stars`}>
                {'★'.repeat(review.rating)}
              </div>
              <p className={styles.text}>&ldquo;{review.text}&rdquo;</p>
              <footer className={styles.footer}>
                <cite className={styles.author}>{review.author}</cite>
                <span className={styles.source}>via {review.source}</span>
              </footer>
            </blockquote>
          ))}
        </div>

        <div className={styles.viewAll}>
          <a
            href="https://www.realestate.com.au/agent/chirag-yadav-2393386"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--ghost"
          >
            View all reviews on realestate.com.au →
          </a>
        </div>
      </div>
    </section>
  );
}
