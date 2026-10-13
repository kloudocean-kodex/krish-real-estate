import { BUSINESS } from '@/data/team';
import styles from './SocialProof.module.css';
// Short, verbatim excerpts verified on Chirag's public REA profile, 13 October 2026.
const reviews=[
 {text:'Chirag was prompt, transparent and professional',author:'Seller of a house',suburb:'Craigieburn'},
 {text:'Chirag was outstanding',author:'Seller of residential land',suburb:'Wallan'},
 {text:'Chirag is a very professional and dedicated real estate agent',author:'Seller of a house',suburb:'Tarneit'},
];
export function SocialProof(){return <section className={`${styles.section} section section--warm`} aria-label="Client reviews"><div className="container">
 <div className={styles.header}><p className="overline">Reputation, earned locally</p><h2 className={styles.title}>The people behind the reviews.</h2>
 <a className={styles.ratingBadge} href={BUSINESS.socialMedia.realestateAgent} target="_blank" rel="noopener noreferrer"><span className={styles.ratingStars} aria-hidden="true">★★★★★</span><span className={styles.ratingScore}>5.0</span><span className={styles.ratingCount}>152 reviews · Chirag Yadav</span><span className={styles.ratingSource}>realestate.com.au</span></a>
 <p className={styles.subtitle}>Public profile checked 13 October 2026. Review counts may change.</p></div>
 <div className={styles.grid}>{reviews.map(r=><blockquote className={styles.card} key={r.suburb}><div className={styles.stars} aria-label="5 out of 5 stars">★★★★★</div><p className={styles.text}>“{r.text}”</p><footer className={styles.footer}><cite className={styles.author}>{r.author}</cite><span className={styles.suburb}>{r.suburb}, VIC</span><a className={styles.source} href={BUSINESS.socialMedia.realestateAgent} target="_blank" rel="noopener noreferrer">Review excerpt · realestate.com.au ↗</a></footer></blockquote>)}</div>
 <div className={styles.viewAll}><a href={BUSINESS.socialMedia.realestateAgent} target="_blank" rel="noopener noreferrer" className="btn btn--secondary">Read Chirag’s client reviews ↗</a><a href={BUSINESS.socialMedia.realestateAgency} target="_blank" rel="noopener noreferrer" className="btn btn--ghost">View the agency ↗</a></div>
 </div></section>;}
