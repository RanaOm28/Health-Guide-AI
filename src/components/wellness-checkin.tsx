"use client";

import { useMemo, useState } from "react";

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export function WellnessCheckIn() {
  const [sleep, setSleep] = useState(7.5);
  const [water, setWater] = useState(2.2);
  const [steps, setSteps] = useState(7500);
  const [stress, setStress] = useState(4);
  const [mood, setMood] = useState<"energized" | "balanced" | "tired">("balanced");

  const result = useMemo(() => {
    const sleepScore = clamp((sleep / 8) * 100, 0, 100);
    const hydrationScore = clamp((water / 2.5) * 100, 0, 100);
    const movementScore = clamp((steps / 10000) * 100, 0, 100);
    const stressScore = clamp(100 - stress * 15, 0, 100);

    const moodAdjustments = {
      energized: 8,
      balanced: 4,
      tired: -6,
    } as const;

    const total = Math.round(
      sleepScore * 0.3 +
        hydrationScore * 0.2 +
        movementScore * 0.25 +
        stressScore * 0.15 +
        moodAdjustments[mood] * 0.1,
    );

    let status = "Needs a reset";
    let focus = "Pick one easy win to stabilize your day.";

    if (total >= 80) {
      status = "Strong rhythm";
      focus = "Keep your momentum by protecting sleep, hydration, and recovery.";
    } else if (total >= 60) {
      status = "Steady momentum";
      focus = "A small daily improvement here will create noticeable progress this week.";
    } else if (total >= 40) {
      status = "Needs attention";
      focus = "Prioritize sleep and movement first before trying to optimize everything.";
    }

    const recommendations = [
      sleep < 7 ? "Aim for 30 extra minutes of sleep tonight." : "Keep your current sleep routine consistent.",
      water < 2.5 ? "Add 500–750 ml of water to your day." : "You are meeting your hydration target well.",
      steps < 8000 ? "Take a 15–20 minute walk to build momentum." : "Your movement level is strong; keep it sustainable.",
      stress > 6 ? "Reduce one pressure point today and protect a calm reset window." : "Your stress load looks manageable; keep recovery habits intact.",
    ];

    return {
      total,
      status,
      focus,
      sleepScore,
      hydrationScore,
      movementScore,
      stressScore,
      recommendations,
    };
  }, [mood, sleep, steps, stress, water]);

  return (
    <section aria-labelledby="checkin-title" className="checkin-section" id="wellness-checkin">
      <div className="site-shell checkin-layout">
        <div className="checkin-intro">
          <span className="eyebrow section-eyebrow">
            Lifestyle check-in
          </span>
          <h2 id="checkin-title">
            Spot what to improve <span className="text-gradient">before it grows.</span>
          </h2>
          <p>
            This quick check-in turns a few daily signals into a simple real-life action plan.
            It is designed to support steady habits, not perfection.
          </p>

          <div className="checkin-highlights">
            <div className="checkin-highlight-card">
              <strong>{Math.round(result.sleepScore)}%</strong>
              <span>Sleep quality</span>
            </div>
            <div className="checkin-highlight-card">
              <strong>{Math.round(result.hydrationScore)}%</strong>
              <span>Hydration</span>
            </div>
            <div className="checkin-highlight-card">
              <strong>{Math.round(result.movementScore)}%</strong>
              <span>Movement</span>
            </div>
          </div>
        </div>

        <div className="checkin-panel">
          <div className="checkin-panel-header">
            <div>
              <span className="progress-kicker">Today’s snapshot</span>
              <h3>{result.status}</h3>
            </div>
            <div className="score-badge" aria-live="polite">
              {result.total}/100
            </div>
          </div>

          <div className="checkin-form-grid">
            <label className="slider-field">
              <span>Sleep</span>
              <div className="slider-meta">
                <strong>{sleep.toFixed(1)} hrs</strong>
                <small>target: 8 hrs</small>
              </div>
              <input
                max="10"
                min="4"
                onChange={(event) => setSleep(Number(event.target.value))}
                step="0.5"
                type="range"
                value={sleep}
              />
            </label>

            <label className="slider-field">
              <span>Water</span>
              <div className="slider-meta">
                <strong>{water.toFixed(1)} L</strong>
                <small>target: 2.5 L</small>
              </div>
              <input
                max="4"
                min="0.5"
                onChange={(event) => setWater(Number(event.target.value))}
                step="0.1"
                type="range"
                value={water}
              />
            </label>

            <label className="slider-field">
              <span>Steps</span>
              <div className="slider-meta">
                <strong>{steps.toLocaleString()}</strong>
                <small>goal: 10k</small>
              </div>
              <input
                max="15000"
                min="1000"
                onChange={(event) => setSteps(Number(event.target.value))}
                step="500"
                type="range"
                value={steps}
              />
            </label>

            <label className="slider-field">
              <span>Stress level</span>
              <div className="slider-meta">
                <strong>{stress}/10</strong>
                <small>lower is better</small>
              </div>
              <input
                max="10"
                min="0"
                onChange={(event) => setStress(Number(event.target.value))}
                step="1"
                type="range"
                value={stress}
              />
            </label>
          </div>

          <label className="select-field">
            <span>How are you feeling today?</span>
            <select onChange={(event) => setMood(event.target.value as "energized" | "balanced" | "tired")} value={mood}>
              <option value="energized">Energized</option>
              <option value="balanced">Balanced</option>
              <option value="tired">Tired</option>
            </select>
          </label>

          <div className="checkin-result-box" aria-live="polite">
            <p className="result-summary">{result.focus}</p>
            <ul>
              {result.recommendations.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
