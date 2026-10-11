import { Icon, type IconName } from "@/components/icon";

const paths: {
  title: string;
  description: string;
  icon: IconName;
}[] = [
  {
    title: "Lose weight steadily",
    description:
      "Build supportive routines around movement, meals, sleep, and consistency—at a pace that feels sustainable.",
    icon: "activity",
  },
  {
    title: "Gain weight mindfully",
    description:
      "Track your progress and plan nourishing habits that support your personal goals and preferences.",
    icon: "heart",
  },
  {
    title: "Feel stronger and healthier",
    description:
      "Focus on everyday wellbeing, celebrate small wins, and shape goals that are about more than a number.",
    icon: "sparkle",
  },
];

export function WellnessPaths() {
  return (
    <section
      aria-labelledby="wellness-paths-title"
      className="wellness-paths"
      id="platform"
    >
      <div className="site-shell wellness-paths-inner">
        <div className="wellness-paths-copy">
          <span className="eyebrow section-eyebrow">Your goals, your pace</span>
          <h2 id="wellness-paths-title">
            A healthier routine starts <span className="text-gradient">with you.</span>
          </h2>
          <p>
            Whether you want to lose weight, gain weight, or build healthier
            habits, explore practical tools and make progress in a way that
            respects your needs.
          </p>
          <a className="button button-quiet" href="/register">
            Set your personal goal <Icon name="arrow" />
          </a>
          <small>
            General wellness support only—not a substitute for professional medical advice.
          </small>
        </div>
        <div className="wellness-paths-content">
          <div className="goal-card-grid">
            {paths.map(({ title, description, icon }) => (
              <article className="goal-card" key={title}>
                <span className="feature-icon">
                  <Icon name={icon} />
                </span>
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </article>
            ))}
          </div>
          <div aria-label="Illustrative weekly progress chart" className="progress-preview">
            <div className="progress-preview-heading">
              <div>
                <span className="progress-kicker">A little progress, over time</span>
                <h3>Your progress, made visible</h3>
              </div>
              <span className="progress-range">Sample</span>
            </div>
            <svg
              aria-hidden="true"
              className="progress-preview-chart"
              preserveAspectRatio="none"
              viewBox="0 0 500 150"
            >
              <defs>
                <linearGradient id="progressFill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="#18d6ad" stopOpacity=".24" />
                  <stop offset="1" stopColor="#18d6ad" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0 32H500M0 74H500M0 116H500" stroke="rgba(171,211,205,.10)" />
              <path
                d="M3 113 C32 110 42 93 72 99 S117 111 143 83 184 89 215 71 256 86 285 64 327 68 357 51 399 65 429 37 467 45 497 22 V150 H3Z"
                fill="url(#progressFill)"
              />
              <path
                d="M3 113 C32 110 42 93 72 99 S117 111 143 83 184 89 215 71 256 86 285 64 327 68 357 51 399 65 429 37 467 45 497 22"
                fill="none"
                stroke="#22dfb6"
                strokeLinecap="round"
                strokeWidth="3"
              />
              <circle cx="497" cy="22" r="5" fill="#22dfb6" />
              <circle cx="497" cy="22" r="10" fill="#22dfb6" opacity=".15" />
            </svg>
            <div className="progress-preview-days">
              <span>Week 1</span><span>Week 2</span><span>Week 3</span>
              <span>Week 4</span><span>Week 5</span><span>Week 6</span>
            </div>
            <p>Illustrative preview. Your dashboard graph uses the entries you record.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
