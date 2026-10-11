import { DashboardPreview } from "@/components/dashboard-preview";
import { Icon } from "@/components/icon";
import { RotatingHeroPhrase } from "@/components/rotating-hero-phrase";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="site-shell hero" id="home">
      <div className="hero-copy">
        <div className="eyebrow">
          <Icon name="sparkle" />
          Your personal AI wellness companion
        </div>
        <h1
          aria-label="Understand your health. Elevate your wellbeing."
          id="hero-title platform"
        >
          Understand your health.
          <br />
          Elevate
          {" "}
          <span className="text-gradient hero-phrase">
            <RotatingHeroPhrase />
          </span>
        </h1>
        <p className="hero-description">
          HealthGuide AI helps you track your health, understand your habits,
          and discover personal insights for a healthier, happier you.
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href="/register">
            Start your journey <Icon name="arrow" />
          </a>
          <a className="button button-quiet" href="#features">
            Explore platform
          </a>
        </div>
        <div aria-label="Product benefits" className="trust-points">
          <span className="trust-point">
            <Icon name="check" /> Personalized insights
          </span>
          <span className="trust-point">
            <Icon name="shield" /> Progress tracking
          </span>
          <span className="trust-point">
            <Icon name="lock" /> Privacy-first
          </span>
        </div>
      </div>
      <DashboardPreview />
    </section>
  );
}
