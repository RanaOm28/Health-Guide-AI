import { Icon } from "@/components/icon";

const steps = [
  {
    title: "Track your rhythm",
    text: "See your sleep, hydration, energy, and weight trends in one calm dashboard.",
    icon: "chart" as const,
    accent: "mint",
  },
  {
    title: "Build better habits",
    text: "Turn small wins into sustainable routines with clear, guided daily goals.",
    icon: "leaf" as const,
    accent: "gold",
  },
  {
    title: "Stay encouraged",
    text: "Celebrate progress, catch patterns early, and keep moving with a gentle system.",
    icon: "heart" as const,
    accent: "blue",
  },
];

export function WellnessJourney() {
  return (
    <section className="journey-section" aria-labelledby="journey-title">
      <div className="site-shell">
        <div className="journey-header">
          <span className="eyebrow">
            <Icon name="sparkle" />
            Built for real life
          </span>
          <h2 id="journey-title">A calmer way to stay on track</h2>
          <p>
            HealthGuide brings together the signals that matter most so your wellness plan feels
            clear, realistic, and motivating.
          </p>
        </div>

        <div className="journey-grid">
          {steps.map((step, index) => (
            <article key={step.title} className={`journey-card journey-card-${step.accent}`}>
              <div className="journey-icon-wrap">
                <Icon name={step.icon} />
              </div>
              <span className="journey-index">0{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>

        <div className="journey-highlight">
          <div className="journey-highlight-copy">
            <span className="mini-label">This week</span>
            <strong>Consistency score</strong>
            <b>74%</b>
          </div>

          <div className="journey-progress" aria-label="Consistency score 74 percent">
            <span style={{ width: "74%" }} />
          </div>

          <ul className="journey-stats">
            <li>
              <Icon name="check" />
              5 workouts logged
            </li>
            <li>
              <Icon name="moon" />
              6.8h average sleep
            </li>
            <li>
              <Icon name="leaf" />
              2.4L hydrated
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
