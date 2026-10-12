import Link from "next/link";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Icon, type IconName } from "@/components/icon";

type FocusStat = {
  value: string;
  label: string;
};

type LogicCard = {
  title: string;
  description: string;
  icon: IconName;
};

type RoutineStep = {
  title: string;
  text: string;
};

type WellnessGoalPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  imageUrl: string;
  imageAlt: string;
  floatingLabel: string;
  floatingValue: string;
  focusStats: FocusStat[];
  whyTitle: string;
  whyHighlight: string;
  logicCards: LogicCard[];
  rhythmTitle: string;
  routineSteps: RoutineStep[];
  supportTitle: string;
  supportCopy: string;
  supportChecklist: string[];
  ctaTitle: string;
  ctaButtonLabel: string;
};

export function WellnessGoalPage({
  eyebrow,
  title,
  intro,
  imageUrl,
  imageAlt,
  floatingLabel,
  floatingValue,
  focusStats,
  whyTitle,
  whyHighlight,
  logicCards,
  rhythmTitle,
  routineSteps,
  supportTitle,
  supportCopy,
  supportChecklist,
  ctaTitle,
  ctaButtonLabel,
}: WellnessGoalPageProps) {
  return (
    <>
      <Header />
      <main className="goal-detail-page">
        <section className="goal-detail-hero">
          <div className="site-shell goal-detail-hero-inner">
            <div className="goal-detail-copy">
              <span className="eyebrow section-eyebrow">{eyebrow}</span>
              <h1>{title}</h1>
              <p>{intro}</p>

              <div className="goal-detail-actions">
                <Link className="button button-primary" href="/register">
                  Start your plan
                </Link>
                <a className="button button-quiet" href="#why-it-works">
                  See the approach
                </a>
              </div>

              <ul className="goal-detail-stats" aria-label="Key focus areas">
                {focusStats.map(({ value, label }) => (
                  <li key={label}>
                    <strong>{value}</strong>
                    <span>{label}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="goal-detail-media">
              <div className="goal-detail-image-wrap">
                <img alt={imageAlt} src={imageUrl} />
                <div className="goal-detail-floating-card">
                  <span className="mini-label">{floatingLabel}</span>
                  <strong>{floatingValue}</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="goal-detail-section" id="why-it-works">
          <div className="site-shell">
            <div className="section-heading">
              <span className="eyebrow section-eyebrow">Why it works</span>
              <h2>
                {whyTitle} <span className="text-gradient">{whyHighlight}</span>
              </h2>
            </div>

            <div className="logic-grid">
              {logicCards.map(({ title: cardTitle, description, icon }) => (
                <article className="logic-card" key={cardTitle}>
                  <span className="feature-icon">
                    <Icon name={icon} />
                  </span>
                  <h3>{cardTitle}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="goal-detail-section goal-detail-section-alt" id="routine">
          <div className="site-shell">
            <div className="section-heading">
              <span className="eyebrow section-eyebrow">Daily rhythm</span>
              <h2>{rhythmTitle}</h2>
            </div>

            <div className="routine-grid">
              {routineSteps.map((step, index) => (
                <article className="routine-step" key={step.title}>
                  <span className="routine-number">0{index + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="goal-detail-section">
          <div className="site-shell support-layout">
            <div className="support-copy">
              <span className="eyebrow section-eyebrow">What to focus on</span>
              <h2>{supportTitle}</h2>
              <p>{supportCopy}</p>
            </div>

            <div className="support-list">
              {supportChecklist.map((item) => (
                <div className="support-item" key={item}>
                  <span className="support-badge">
                    <Icon name="check" />
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="goal-detail-cta">
          <div className="site-shell goal-detail-cta-box">
            <div>
              <span className="eyebrow section-eyebrow">Ready when you are</span>
              <h2>{ctaTitle}</h2>
            </div>
            <Link className="button button-primary" href="/register">
              {ctaButtonLabel}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
