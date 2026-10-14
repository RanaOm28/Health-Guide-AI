"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Icon } from "@/components/icon";

type HydrationEstimate = {
  lowerLitres: number;
  upperLitres: number;
  activity: "usual" | "active";
};

export function HydrationEstimator() {
  const [estimate, setEstimate] = useState<HydrationEstimate | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const calculationTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (calculationTimer.current !== null) {
        window.clearTimeout(calculationTimer.current);
      }
    };
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setEstimate(null);
    setIsLoading(false);
    if (calculationTimer.current !== null) {
      window.clearTimeout(calculationTimer.current);
      calculationTimer.current = null;
    }

    const formData = new FormData(event.currentTarget);
    const weight = Number(formData.get("weightKg"));
    const age = Number(formData.get("age"));
    const activity = formData.get("activity");

    if (!Number.isFinite(age) || age < 1 || age > 120) {
      setError("Enter a valid age to see your estimate.");
      return;
    }

    if (age < 18) {
      setError(
        "This rough estimate is for adults. Fluid needs for children and teens should be discussed with a healthcare professional.",
      );
      return;
    }

    if (!Number.isFinite(weight) || weight < 20 || weight > 300) {
      setError("Enter a valid weight between 20 and 300 kg.");
      return;
    }

    const activeDay = activity === "active";
    const estimateResult: HydrationEstimate = {
      lowerLitres: (weight * 30) / 1000 + (activeDay ? 0.3 : 0),
      upperLitres: (weight * 35) / 1000 + (activeDay ? 0.35 : 0),
      activity: activeDay ? "active" : "usual",
    };

    setIsLoading(true);
    calculationTimer.current = window.setTimeout(() => {
      setEstimate(estimateResult);
      setIsLoading(false);
      calculationTimer.current = null;
    }, 3000);
  }

  return (
    <section aria-labelledby="hydration-title" className="hydration-section" id="hydration">
      <div className="site-shell hydration-layout">
        <div className="hydration-intro">
          <span className="eyebrow section-eyebrow">
            <Icon name="heart" /> Everyday health, made practical
          </span>
          <h2 id="hydration-title">
            Get a simple <span className="text-gradient">hydration estimate.</span>
          </h2>
          <p>
            Use your weight to see a broad starting range for daily fluids.
            Activity and weather can change what your body needs, so treat this
            as general information—not a personal prescription.
          </p>
          <div className="calculator-assurance">
            <Icon name="shield" />
            <span>
              The estimate uses a rough 30–35 mL per kg calculation. Your details
              stay in this page and are not saved.
            </span>
          </div>
        </div>

        <div className="hydration-card">
          <form className="hydration-form" onSubmit={handleSubmit}>
            <div className="calculator-form-heading">
              <div>
                <span className="progress-kicker">A quick check-in</span>
                <h3>Your daily fluid starting point</h3>
              </div>
              <span aria-hidden="true" className="hydration-icon">
                <Icon name="leaf" />
              </span>
            </div>
            <label className="form-field">
              <span>Weight (kg)</span>
              <input
                autoComplete="off"
                max="300"
                min="20"
                name="weightKg"
                placeholder="e.g. 68"
                required
                step="0.1"
                type="number"
              />
            </label>

            <label className="form-field">
              <span>Age</span>
              <input
                autoComplete="off"
                max="120"
                min="1"
                name="age"
                placeholder="e.g. 30"
                required
                step="1"
                type="number"
              />
            </label>
            <label className="form-field">
              <span>Today’s activity</span>
              <select defaultValue="usual" name="activity">
                <option value="usual">Usual day</option>
                <option value="active">Exercise or lots of sweating</option>
              </select>
            </label>
            {error && <p className="auth-error" role="alert">{error}</p>}
            <button
              className="button button-primary calculator-submit"
              disabled={isLoading}
              type="submit"
            >
              {isLoading ? (
                <>
                  <span aria-hidden="true" className="submit-spinner" />
                  Preparing your estimate
                </>
              ) : (
                <>
                  Estimate daily fluids <Icon name="arrow" />
                </>
              )}
            </button>
            <p className="calculator-privacy-note">
              This estimate is calculated on your device and is not saved.
            </p>
          </form>

          <div
            aria-busy={isLoading}
            aria-live="polite"
            className="hydration-result"
            role="status"
          >
            {isLoading ? (
              <div className="hydration-loading">
                <span aria-hidden="true" className="loading-orbit">
                  <span />
                </span>
                <span className="progress-kicker">A moment for your wellbeing</span>
                <h3>Preparing your estimate</h3>
                <p>Putting together a simple daily fluid starting range.</p>
                <div aria-hidden="true" className="hydration-loading-progress">
                  <span />
                </div>
                <span className="loading-caption">Your details stay on this page</span>
              </div>
            ) : estimate ? (
              <div className="hydration-estimate">
                <span className="progress-kicker">Your rough starting range</span>
                <strong className="hydration-amount">
                  {estimate.lowerLitres.toFixed(1)}
                  <span>–</span>
                  {estimate.upperLitres.toFixed(1)}
                  <small> L / day</small>
                </strong>
                <p>
                  This broad estimate is based on body weight. It includes
                  fluids from drinks and foods; it is not a requirement to drink
                  this amount as plain water.
                </p>
                {estimate.activity === "active" && (
                  <p className="hydration-activity-adjustment">
                    Includes a rough +300–350 mL activity adjustment. This is
                    not a per-hour target; actual needs vary with activity,
                    heat, and individual health.
                  </p>
                )}
                <div className="hydration-tip">
                  <Icon name={estimate.activity === "active" ? "activity" : "sparkle"} />
                  <span>
                    {estimate.activity === "active"
                      ? "Exercise, heat, and sweating can change fluid needs. Take breaks and drink to thirst; avoid forcing large amounts quickly."
                      : "On a usual day, keep drinks available and use thirst as one helpful guide. Needs vary with weather and health."}
                  </span>
                </div>
              </div>
            ) : (
              <div className="calculator-placeholder">
                <span aria-hidden="true" className="placeholder-orbit">
                  <Icon name="leaf" />
                </span>
                <h3>Your estimate will appear here</h3>
                <p>
                  Enter your age, weight, and today’s activity for a broad
                  daily fluid starting range.
                </p>
                <span aria-hidden="true" className="placeholder-decoration">
                  STEADY · SIMPLE · SUPPORTIVE
                </span>
              </div>
            )}
          </div>
        </div>
        <p className="hydration-disclaimer">
          Fluid needs differ from person to person. If you have been advised to
          limit fluids, or have a heart or kidney condition, ask your healthcare
          professional what is right for you. Do not use this estimate to
          override medical advice.
        </p>
      </div>
    </section>
  );
}
