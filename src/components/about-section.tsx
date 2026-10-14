import { Icon } from "@/components/icon";

const highlights = [
  {
    value: "Daily",
    label: "Simple habits that fit real life",
  },
  {
    value: "Clear",
    label: "Practical tracking without overwhelm",
  },
  {
    value: "Balanced",
    label: "Food, movement, sleep, and energy together",
  },
  {
    value: "Steady",
    label: "Progress that feels realistic and sustainable",
  },
];

const storyCards = [
  {
    title: "Small steps, steady wins",
    text: "Health is not about perfection. It is about routines that feel doable, repeatable, and supportive.",
    tone: "sunset",
  },
  {
    title: "Real guidance, no noise",
    text: "We focus on what matters most: hydration, food, movement, sleep, and the habits that keep you going.",
    tone: "mint",
  },
  {
    title: "A healthier rhythm",
    text: "Structure should help your life feel easier, not harder. HealthGuide AI keeps the plan practical and calm.",
    tone: "deep",
  },
];

const processSteps = [
  {
    number: "01",
    title: "See the basics",
    text: "Start with daily habits that directly affect how you feel: water, meals, movement, and recovery.",
  },
  {
    number: "02",
    title: "Track what matters",
    text: "Notice patterns in energy, sleep, mood, and progress without turning health into a complicated project.",
  },
  {
    number: "03",
    title: "Build a rhythm",
    text: "Repeat the routines that work for your life and keep your progress grounded, flexible, and sustainable.",
  },
];

export function AboutSection() {
  return (
    <section aria-labelledby="about-title" className="about-section" id="about">
      <div className="site-shell about-shell">
        <div className="about-intro">
          <span className="eyebrow section-eyebrow">
            <Icon name="sparkle" /> HealthGuide AI
          </span>
          <h2 id="about-title">
            A clear health start here.
          </h2>
          <p>
            We believe good health should feel simpler, calmer, and more practical.
            HealthGuide AI brings together the basics that shape how you feel each day,
            from hydration and meals to sleep, movement, and steady progress.
          </p>
        </div>

        <div className="about-quote-panel">
          <p>“Small, steady habits create the biggest changes.”</p>
          <span>HealthGuide AI</span>
        </div>

        <div className="about-metrics">
          {highlights.map(({ value, label }) => (
            <div className="about-metric" key={value}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>

        <div className="about-visual-grid">
          <div className="about-visual-main image-card tone-sunset">
            <div className="image-card-layout">
              <div className="image-pill">Healthy routine</div>
              <div className="image-chart">
                <span className="chart-line" />
                <span className="chart-line line-two" />
              </div>
              <div className="image-stats">
                <span>Energy</span>
                <strong>82%</strong>
              </div>
            </div>
          </div>

          <div className="about-visual-stack">
            {storyCards.map(({ title, text, tone }) => (
              <article className={`story-card tone-${tone}`} key={title}>
                <div className="story-visual" aria-hidden="true" />
                <div className="story-copy">
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="about-process">
          <div className="process-header">
            <span className="eyebrow section-eyebrow">
              <Icon name="chart" /> How it helps
            </span>
            <h3>Simple steps to a healthier rhythm.</h3>
          </div>

          <div className="process-grid">
            {processSteps.map(({ number, title, text }) => (
              <div className="process-step" key={number}>
                <span className="step-number">{number}</span>
                <h4>{title}</h4>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
