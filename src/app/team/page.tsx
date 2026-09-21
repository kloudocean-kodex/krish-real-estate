import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { TEAM, BUSINESS } from '@/data/team';
import styles from './Team.module.css';

export const metadata: Metadata = {
  title: 'Our Team & Leadership | Melbourne North | Krish Real Estate',
  description:
    'Meet Chirag Yadav and the dedicated real estate advisory team at Krish Real Estate in Wollert. Independent, experienced, and personally invested in your outcome.',
  openGraph: {
    title: 'Our Team & Leadership | Krish Real Estate',
    description: 'Meet the people behind Melbourne\'s premier boutique northern real estate advisory.',
    images: ['/images/agent-placeholder.jpg'],
  },
};

export default function TeamPage() {
  const director = TEAM.find((m) => m.isDirector) || TEAM[0];
  const consultants = TEAM.filter((m) => !m.isDirector);

  return (
    <main className={styles.page}>
      {/* ── Masthead ── */}
      <section className={styles.masthead}>
        <div className="container">
          <div className={styles.mastheadContent}>
            <div className={styles.prestigeOverline}>
              <span>◆</span>
              <span>BOUTIQUE LEADERSHIP</span>
              <span>◆</span>
            </div>
            <h1 className={styles.title}>
              The people behind<br />
              <span className={styles.titleItalic}>the results.</span>
            </h1>
            <p className={styles.subtitle}>
              We are an independent agency by design. You never deal with junior assistants or call centers.
              You work directly with experienced northern Melbourne principals who protect your equity.
            </p>
          </div>
        </div>
      </section>

      {/* ── Director Spotlight ── */}
      <section className={styles.directorSection}>
        <div className="container">
          <div className={styles.directorCard}>
            <div className={styles.directorPhotoCol}>
              <div className={styles.directorPhotoWrapper}>
                <Image
                  src={director.photo}
                  alt={director.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className={styles.directorPhoto}
                />
                <div className={styles.directorBadge}>
                  <span>FOUNDER &amp; OFFICER IN EFFECTIVE CONTROL</span>
                </div>
              </div>
            </div>

            <div className={styles.directorContentCol}>
              <span className={styles.roleTag}>{director.title || director.role}</span>
              <h2 className={styles.directorName}>{director.name}</h2>
              <p className={styles.directorBio}>{director.bio}</p>

              {director.specialties && (
                <div className={styles.specialties}>
                  <span className={styles.specialtiesLabel}>AREAS OF EXPERTISE:</span>
                  <div className={styles.specialtiesPills}>
                    {director.specialties.map((spec) => (
                      <span key={spec} className={styles.specialtyPill}>
                        ✦ {spec}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className={styles.directorActions}>
                {director.phone && (
                  <a href={`tel:${director.phone}`} className={styles.contactBtn}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                    <span>Direct: {director.phone}</span>
                  </a>
                )}
                {director.email && (
                  <a href={`mailto:${director.email}`} className={styles.emailBtn}>
                    Email Chirag
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Team Consultants Grid ── */}
      <section className={styles.consultantsSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionOverline}>◆ THE ADVISORY COLLECTIVE</span>
            <h2 className={styles.sectionTitle}>Advisors &amp; Client Concierge</h2>
          </div>

          <div className={styles.consultantsGrid}>
            {consultants.map((member) => (
              <article key={member.id} className={styles.memberCard}>
                <div className={styles.memberPhotoWrapper}>
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className={styles.memberPhoto}
                  />
                  <span className={styles.memberRoleBadge}>{member.role}</span>
                </div>
                <div className={styles.memberContent}>
                  <h3 className={styles.memberName}>{member.name}</h3>
                  <p className={styles.memberBio}>{member.bio}</p>
                  {member.email && (
                    <a href={`mailto:${member.email}`} className={styles.memberEmailLink}>
                      {member.email} →
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Firm Philosophy Banner ── */}
      <section className={styles.philosophySection}>
        <div className="container">
          <div className={styles.philosophyBox}>
            <span className={styles.philosophyTag}>THE KRISH PROMISE</span>
            <h2 className={styles.philosophyTitle}>
              &ldquo;We deliberately chose not to be a 50-agent franchise.&rdquo;
            </h2>
            <p className={styles.philosophyText}>
              In high-volume agencies, your home is just a number on a Monday morning sales whiteboard.
              At Krish, every client is known by name. Every campaign is guided personally.
              That is why our clearance rate and client satisfaction consistently outperform the northern Melbourne average.
            </p>
            <Link href="/contact" className={styles.philosophyCta}>
              Book a Confidential Consultation
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
