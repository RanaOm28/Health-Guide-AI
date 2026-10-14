import Link from "next/link";
import { Icon, type IconName } from "@/components/icon";

const tools: {
  title: string;
  description: string;
  href: string;
  icon: IconName;
}[] = [
  {
    title: "BMI Check",
    description: "A quick adult BMI estimate to help you better understand your current wellness baseline.",
    href: "/#health-check",
    icon: "activity",
  },
  {
    title: "Hydration Estimate",
    description: "See your daily fluid targets and stay more consistent with your hydration habits.",
    href: "/#hydration",
    icon: "leaf",
  },
  {
    title: "Lose Weight Steadily",
    description: "Build calm, realistic routines around movement, meals, sleep, and consistency.",
    href: "/lose-weight-steadily",
    icon: "chart",
  },
  {
    title: "Gain Weight Mindfully",
    description: "Create a more intentional, nourishing rhythm with gradual and sustainable progress.",
    href: "/gain-weight-mindfully",
    icon: "heart",
  },
  {
    title: "Feel Stronger",
    description: "Build energy, resilience, and confidence with a focus on everyday wellbeing.",
    href: "/feel-stronger-and-healthier",
    icon: "sparkle",
  },
];

export function WellnessTools() {
  return (
    <section aria-labelledby="tools-title" className="tool-section">
      <div className="site-shell">
        <div className="tool-section-header">
          <span className="eyebrow section-eyebrow">
            <Icon name="shield" />
            Wellness tools
          </span>
          <h2 id="tools-title">
            Practical tools for <span className="text-gradient">real progress</span>
          </h2>
        </div>

        <div className="tool-grid">
          {tools.map(({ title, description, href, icon }) => (
            <Link className="tool-card" href={href} key={title}>
              <div className="tool-icon">
                <Icon name={icon} />
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
              <span className="tool-link">
                Explore <Icon name="arrow" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
