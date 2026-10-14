import { Icon } from "@/components/icon";

const insights = [
  {
    icon: "brain" as const,
    title: "Daily check-ins",
    text: "Track sleep, stress, energy, and mood so small changes become a clearer pattern over time.",
  },
  {
    icon: "leaf" as const,
    title: "Food & fuel",
    text: "Keep meals simple with protein, fiber, and steady energy so healthy habits stay realistic, not rigid.",
  },
  {
    icon: "activity" as const,
    title: "Movement that fits",
    text: "Build a routine that works around your week, from walks and strength to recovery and consistency.",
  },
  {
    icon: "moon" as const,
    title: "Better recovery",
    text: "Use your habits to support sleep, hydration, and calm routines that help you feel more balanced every day.",
  },
];

export function HealthGuideInsights() {
  return (
    <section className="healthguide-insights" aria-labelledby="healthguide-insights-title">
      <div className="site-shell insights-shell">
        <div className="section-heading insights-heading">
          <span className="eyebrow section-eyebrow">
            <Icon name="sparkle" /> HealthGuide AI
          </span>
          <h2 id="healthguide-insights-title">
            Healthy habits, shaped around your real life.
          </h2>
        </div>

        <p className="insights-intro">
          The most useful wellness plans are the ones people can repeat. That is why
          HealthGuide AI brings together the everyday essentials that actually move the needle:
          hydration, meals, movement, sleep, recovery, and steady progress.
        </p>

        <div className="insights-grid">
          {insights.map(({ icon, title, text }) => (
            <article key={title} className="insight-card">
              <div className="insight-icon">
                <Icon name={icon} />
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
