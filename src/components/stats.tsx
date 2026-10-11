"use client";

import { useEffect, useRef, useState } from "react";
import { Icon, type IconName } from "@/components/icon";

type StatKey = "members" | "satisfaction" | "protection" | "support";
type StatCounters = Record<StatKey, number>;

const finalCounters: StatCounters = {
  members: 50000,
  satisfaction: 4.8,
  protection: 99.9,
  support: 24,
};

const stats: { key: StatKey; label: string; icon: IconName }[] = [
  { key: "members", label: "Active members", icon: "users" },
  { key: "satisfaction", label: "Member satisfaction", icon: "star" },
  { key: "protection", label: "Data protection", icon: "shield" },
  { key: "support", label: "Wellness support", icon: "heart" },
];

export function Stats() {
  const [counters, setCounters] = useState<StatCounters>({
    members: 0,
    satisfaction: 0,
    protection: 0,
    support: 0,
  });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) {
      const frame = window.requestAnimationFrame(() =>
        setCounters(finalCounters),
      );
      return () => window.cancelAnimationFrame(frame);
    }

    let animationFrame = 0;
    let hasStarted = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasStarted) return;
        hasStarted = true;
        const startTime = performance.now();
        const duration = 2500;

        function animate(now: number) {
          const progress = Math.min((now - startTime) / duration, 1);
          const easedProgress = 1 - (1 - progress) ** 3;
          setCounters({
            members: Math.round(finalCounters.members * easedProgress),
            satisfaction:
              Math.round(finalCounters.satisfaction * easedProgress * 10) / 10,
            protection:
              Math.round(finalCounters.protection * easedProgress * 10) / 10,
            support: Math.round(finalCounters.support * easedProgress),
          });

          if (progress < 1) {
            animationFrame = window.requestAnimationFrame(animate);
          }
        }

        animationFrame = window.requestAnimationFrame(animate);
        observer.disconnect();
      },
      { threshold: 0.25 },
    );

    observer.observe(section);
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <section
      aria-label="HealthGuide by the numbers"
      className="stats-section"
      ref={sectionRef}
    >
      <div className="site-shell stats-grid">
        {stats.map(({ key, label, icon }) => (
          <div className="stat-item" key={label}>
            <span className="stat-icon">
              <Icon name={icon} />
            </span>
            <span>
              <strong className="stat-value">
                {key === "members"
                  ? `${counters.members < 1000 ? counters.members : `${Math.floor(counters.members / 1000)}K`}+`
                  : key === "satisfaction"
                    ? `${counters.satisfaction.toFixed(1)} / 5`
                    : key === "protection"
                      ? `${counters.protection.toFixed(1)}%`
                      : `${counters.support}/7`}
              </strong>
              <span className="stat-label">{label}</span>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
