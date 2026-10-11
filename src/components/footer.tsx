import { Icon } from "@/components/icon";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer" id="about">
      <div className="site-shell footer-inner">
        <Link aria-label="HealthGuide AI home" className="brand" href="/">
          <span className="brand-mark">
            <Icon name="shield" />
          </span>
          <span>
            HealthGuide <span className="brand-ai">AI</span>
          </span>
        </Link>
        <p>© 2026 HealthGuide AI. Your wellbeing, thoughtfully supported.</p>
        <nav aria-label="Footer navigation" className="footer-links">
          <Link href="/#about">Privacy</Link>
          <Link href="/#about">Terms</Link>
          <Link href="/#features">Contact</Link>
        </nav>
      </div>
    </footer>
  );
}
