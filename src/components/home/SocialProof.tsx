import { BUSINESS } from '@/data/team';
import { REPUTATION, REVIEW_EXCERPTS } from '@/data/reputation';
import styles from './SocialProof.module.css';

export function SocialProof() {
  return <section className={`${styles.section} section section--warm`} aria-label="Client reviews">
    <div className="container">
      <div className={styles.header}>
        <div>
          <p className="overline">A reputation built together</p>
          <h2 className={styles.title}>Trust, in their<br /><em>own words.</em></h2>
        </div>
        <p className={styles.subtitle}>The people, the process, the personal attention.
          Read what buyers, sellers and renters share on independent platforms.</p>
      </div>
      <div className={styles.ratings}>
        <a className={styles.ratingCard} href={REPUTATION.google.url} target="_blank" rel="noopener noreferrer">
          <div><span className={styles.platform}>Google</span><span className={styles.profile}>Krish Real Estate</span></div>
          <div className={styles.scoreRow}><strong className={styles.score}>{REPUTATION.google.rating}<span>/5</span></strong>
            <span className={styles.ratingDetails}><span className={styles.stars} aria-hidden="true">★★★★★</span>
              <span>{REPUTATION.google.count} reviews</span></span></div>
          <span className={styles.ratingLink}>Read Google reviews <span aria-hidden="true">↗</span></span>
          <span className={styles.checked}>Profile checked {REPUTATION.google.checked}</span>
        </a>
        <a className={styles.ratingCard} href={REPUTATION.chirag.url} target="_blank" rel="noopener noreferrer">
          <div><span className={styles.platform}>realestate.com.au</span><span className={styles.profile}>Chirag Yadav · Director</span></div>
          <div className={styles.scoreRow}><strong className={styles.score}>{REPUTATION.chirag.rating}<span>/5</span></strong>
            <span className={styles.ratingDetails}><span className={styles.stars} aria-hidden="true">★★★★★</span>
              <span>{REPUTATION.chirag.count} reviews</span></span></div>
          <span className={styles.ratingLink}>Read Chirag’s reviews <span aria-hidden="true">↗</span></span>
          <span className={styles.checked}>Count last verified {REPUTATION.chirag.checked}</span>
        </a>
      </div>
      <div className={styles.grid}>
        {REVIEW_EXCERPTS.map(review => <blockquote className={styles.card} key={review.author}>
          <span className={styles.quoteMark} aria-hidden="true">“</span>
          <p className={styles.text}>{review.text}</p>
          <footer className={styles.footer}>
            <cite className={styles.author}>{review.author}</cite>
            <span className={styles.context}>{review.context}</span>
            <a className={styles.source} href={review.url} target="_blank" rel="noopener noreferrer">
              Review excerpt · {review.source} ↗
            </a>
          </footer>
        </blockquote>)}
      </div>
      <div className={styles.viewAll}>
        <p>Individual experiences, shared in their own words. Ratings and counts may change.</p>
        <a href={BUSINESS.socialMedia.realestateAgency} target="_blank" rel="noopener noreferrer">
          Explore the agency’s reviews on realestate.com.au ↗
        </a>
      </div>
    </div>
  </section>;
}
