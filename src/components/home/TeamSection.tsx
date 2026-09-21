import Link from 'next/link';
import Image from 'next/image';
import { TEAM } from '@/data/team';
import styles from './TeamSection.module.css';

export function TeamSection() {
  return (
    <section className={`${styles.section} section section--warm`} aria-label="Meet the team">
      <div className="container">
        <div className={`${styles.header} reveal`}>
          <p className="overline">The Team</p>
          <h2 className={styles.title}>Real people, real accountability.</h2>
          <p className={styles.subtitle}>
            When you work with Krish, you know exactly who is handling your property.
            No call centres, no faceless teams — direct access to the people doing the work.
          </p>
        </div>
        <div className={`${styles.grid} reveal-stagger`}>
          {TEAM.map((member) => (
            <Link key={member.id} href={`/team/${member.slug}`} className={`${styles.card} reveal`}>
              <div className={styles.photoWrapper}>
                <Image
                  src={member.photo}
                  alt={`${member.name} — ${member.role} at Krish Real Estate`}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className={styles.photo}
                />
              </div>
              <div className={styles.info}>
                <h3 className={styles.name}>{member.name}</h3>
                <p className={styles.role}>{member.role}</p>
                {member.title && <p className={styles.title2}>{member.title}</p>}
              </div>
            </Link>
          ))}
        </div>
        <div className={styles.teamCta}>
          <Link href="/team" className="btn btn--secondary">
            Meet the Full Team
          </Link>
        </div>
      </div>
    </section>
  );
}
