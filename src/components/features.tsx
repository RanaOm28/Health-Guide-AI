import { Icon, type IconName } from "@/components/icon";

const features: {
  title: string;
  description: string;
  icon: IconName;
}[] = [
  {
    title: "AI wellness insights",
    description: "Get personal recommendations based on your health data, habits, and goals.",
    icon: "brain",
  },
  {
    title: "Track your progress",
    description: "Visualize your trends and see real progress over time with easy-to-read charts.",
    icon: "chart",
  },
  {
    title: "Build healthier habits",
    description: "Set goals, get gentle reminders, and create routines that fit your lifestyle.",
    icon: "leaf",
  },
];

export function Features() {
  return (
    <section aria-labelledby="features-title" className="site-shell features-section" id="features">
      <span className="eyebrow section-eyebrow">Key features</span>
      <h2 id="features-title">
        Your health, in one <span className="text-gradient">clear picture.</span>
      </h2>
      <p className="section-description" id="insights">
        Everything you need to understand your body, build better habits, and
        achieve your wellness goals — all in one place.
      </p>
      <div className="feature-grid">
        {features.map(({ title, description, icon }) => (
          <article className="feature-card" key={title}>
            <div className="feature-card-top">
              <span className="feature-icon">
                <Icon name={icon} />
              </span>
              <h3>{title}</h3>
            </div>
            <p>{description}</p>
            <span aria-hidden="true" className="feature-arrow">
              <Icon name="arrow" />
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}
