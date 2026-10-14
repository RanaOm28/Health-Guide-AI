import { Icon } from "@/components/icon";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer" id="about">
      <div className="site-shell footer-shell">
        <div className="footer-top">
          <div className="footer-brand-block">
            <Link aria-label="HealthGuide AI home" className="brand footer-brand" href="/">
              <span className="brand-mark">
                <Icon name="shield" />
              </span>
              <span>
                HealthGuide <span className="brand-ai">AI</span>
              </span>
            </Link>
            <p>
              Wellness tracking designed to help people build sustainable habits, understand their
              data, and feel better over time.
            </p>
          </div>

          <div className="footer-column">
            <h3>Explore</h3>
            <nav aria-label="Footer navigation" className="footer-links">
              <Link href="/#features">Features</Link>
              <Link href="/#health-check">BMI</Link>
              <Link href="/#hydration">Hydration</Link>
              <Link href="/platform">Platform</Link>
            </nav>
          </div>

          <div className="footer-column">
            <h3>Wellness paths</h3>
            <nav aria-label="Health paths" className="footer-links footer-links-stack">
              <Link href="/lose-weight-steadily">Lose weight steadily</Link>
              <Link href="/gain-weight-mindfully">Gain weight mindfully</Link>
              <Link href="/feel-stronger-and-healthier">Feel stronger</Link>
            </nav>
          </div>

          <div className="footer-column">
            <h3>Company</h3>
            <nav aria-label="Company links" className="footer-links footer-links-stack">
              <Link href="/#about">About</Link>
              <Link href="/#features">Privacy</Link>
              <Link href="/#features">Contact</Link>
            </nav>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 HealthGuide AI. Thoughtful wellness support for everyday life.</p>
          <span>General wellness guidance only.</span>
        </div>
      </div>
    </footer>
  );
}
