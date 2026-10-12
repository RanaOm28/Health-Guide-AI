"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Icon } from "@/components/icon";

type Analysis = {
  bmi: number;
  age: number;
  gender: "male" | "female";
  heightCm: number;
  lowerWeight: number;
  upperWeight: number;
  category: "below" | "within" | "above";
};

const genderOptions = [
  { value: "male", label: "Male", icon: "male" as const },
  { value: "female", label: "Female", icon: "female" as const },
];

const nutritionGuidance = {
  below: {
    title: "Nourish your body and build strength",
    description:
      "Try regular meals and snacks with protein foods, grains or other filling staples, fruit or vegetables, and nourishing fats. If you want to gain weight, ask a healthcare professional for advice that fits you before changing your routine.",
  },
  within: {
    title: "Keep supporting your everyday wellbeing",
    description:
      "A varied pattern can include vegetables and fruit, grains or other staple foods, protein sources such as beans, eggs, fish, dairy or tofu, and fats such as nuts, seeds or avocado. There is no single perfect menu.",
  },
  above: {
    title: "Small habits can support your wellbeing",
    description:
      "If weight loss is a goal for you, focus on steady habits: try enjoyable walks, strength exercises at a comfortable level, and regular meals with vegetables or fruit and protein. Avoid crash diets; a healthcare professional can help you decide what is appropriate.",
  },
} as const;

const ageGuidance = (age: number) =>
  age >= 65
    ? "At age 65 and over, BMI may be interpreted differently. A healthcare professional can put this estimate in context."
    : `At age ${age}, this adult BMI estimate is only a screening tool; it does not account for muscle, health history, or your individual circumstances.`;

export function WellnessCalculator() {
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
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
    setAnalysis(null);
    setIsLoading(false);
    if (calculationTimer.current !== null) {
      window.clearTimeout(calculationTimer.current);
      calculationTimer.current = null;
    }

    const formData = new FormData(event.currentTarget);
    const weight = Number(formData.get("weightKg"));
    const feet = Number(formData.get("heightFeet"));
    const inches = Number(formData.get("heightInches"));
    const age = Number(formData.get("age"));
    const gender = (formData.get("gender") as "male" | "female") || "male";
    const totalInches = feet * 12 + inches;
    const heightMeters = totalInches * 0.0254;

    if (
      !Number.isFinite(weight) ||
      !Number.isFinite(age) ||
      !Number.isFinite(totalInches) ||
      weight <= 0 ||
      age < 13 ||
      age > 120 ||
      feet < 0 ||
      inches < 0 ||
      inches >= 12 ||
      totalInches < 36 ||
      totalInches > 96 ||
      weight > 500
    ) {
      setError("Please enter a valid age, weight, and height to continue.");
      return;
    }

    if (age < 18) {
      setError(
        "Adult BMI ranges are not appropriate for people under 18. Please discuss growth and nutrition with a pediatric clinician.",
      );
      return;
    }

    const bmi = weight / (heightMeters * heightMeters);
    const category: Analysis["category"] =
      bmi < 18.5 ? "below" : bmi < 25 ? "within" : "above";
    const femaleAdjustment = gender === "female" ? 2.5 : 0;

    const result: Analysis = {
      bmi,
      age,
      gender,
      heightCm: totalInches * 2.54,
      lowerWeight: 18.5 * heightMeters * heightMeters - femaleAdjustment,
      upperWeight: 24.9 * heightMeters * heightMeters - femaleAdjustment,
      category,
    };

    setIsLoading(true);
    calculationTimer.current = window.setTimeout(() => {
      setAnalysis(result);
      setIsLoading(false);
      calculationTimer.current = null;
    }, 4500);
  }

  const categoryCopy = analysis
    ? {
        below: {
          label: "Underweight",
          message: "This estimate alone cannot explain your health or what your body needs. Consider discussing it with a healthcare professional, especially before trying to change your weight.",
        },
        within: {
          label: "Healthy range",
          message:
            "This screening result falls within the usual adult BMI reference range. BMI is only one measure and does not describe your overall health.",
        },
        above: {
          label: "Overweight",
          message:
            "This result is not a diagnosis and does not account for muscle, body composition, or your individual health context.",
        },
      }[analysis.category]
    : null;

  return (
    <section aria-labelledby="calculator-title" className="wellness-calculator" id="health-check">
      <div className="site-shell calculator-layout">
        <div className="calculator-intro">
          <span className="eyebrow section-eyebrow">
            <Icon name="heart" /> A thoughtful starting point
          </span>
          <h2 id="calculator-title">
            Get a clearer picture of <span className="text-gradient">your wellbeing.</span>
          </h2>
          <p>
            Enter a few details for an instant adult BMI estimate and a
            height-based reference range. Age is used to avoid applying adult
            ranges to minors; adult BMI itself is not adjusted for age. Your
            information stays on this page and is not sent to a server.
          </p>
          <div className="calculator-assurance">
            <Icon name="shield" />
            <span>
              Private by design. A transparent calculation—not AI, a diagnosis,
              or a personalized treatment plan.
            </span>
          </div>
        </div>

        <div className="calculator-card">
          <form className="calculator-form" onSubmit={handleSubmit}>
            <div className="calculator-form-heading">
              <div>
                <span className="progress-kicker">Your details</span>
                <h3>A personal wellness overview</h3>
              </div>
              <span aria-hidden="true" className="calculator-sparkle">
                <Icon name="sparkle" />
              </span>
            </div>

            <label className="form-field">
              <span>Weight (kg)</span>
              <input
                autoComplete="off"
                max="300"
                min="10"
                name="weightKg"
                placeholder="e.g. 68"
                required
                step="0.1"
                type="number"
              />
            </label>

            <div className="gender-field">
              <span>Gender</span>
              <div className="gender-selector" role="radiogroup" aria-label="Gender">
                {genderOptions.map(({ value, label, icon }) => (
                  <label className="gender-option" key={value}>
                    <input
                      defaultChecked={value === "male"}
                      name="gender"
                      type="radio"
                      value={value}
                    />
                    <span className="gender-content">
                      <span className="gender-icon">
                        <Icon name={icon} />
                      </span>
                      <span>{label}</span>
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <fieldset className="height-fieldset">
              <legend>Height</legend>
              <div className="height-inputs">
                <label className="form-field">
                  <span>Feet</span>
                  <input
                    autoComplete="off"
                    max="8"
                    min="1"
                    name="heightFeet"
                    placeholder="5"
                    required
                    step="1"
                    type="number"
                  />
                </label>
                <label className="form-field">
                  <span>Inches</span>
                  <input
                    autoComplete="off"
                    max="11"
                    min="0"
                    name="heightInches"
                    placeholder="6"
                    required
                    step="1"
                    type="number"
                  />
                </label>
              </div>
            </fieldset>

            <label className="form-field">
              <span>Age</span>
              <input
                autoComplete="off"
                max="120"
                min="13"
                name="age"
                placeholder="e.g. 30"
                required
                step="1"
                type="number"
              />
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
                  Preparing your overview
                </>
              ) : (
                <>
                  Calculate my overview <Icon name="arrow" />
                </>
              )}
            </button>
            <p className="calculator-privacy-note">
              Your entries are used only for this calculation and are not saved.
            </p>
          </form>

          <div
            aria-busy={isLoading}
            aria-live="polite"
            className="calculator-result"
            role="status"
          >
            {isLoading ? (
              <div className="calculator-loading">
                <span aria-hidden="true" className="loading-orbit">
                  <span />
                </span>
                <span className="progress-kicker">A moment for your wellbeing</span>
                <h3>Preparing your overview</h3>
                <p>Checking your details and putting together your estimate.</p>
                <div aria-hidden="true" className="loading-progress">
                  <span />
                </div>
                <span className="loading-caption">Your information stays on this page</span>
              </div>
            ) : analysis && categoryCopy ? (
              <div className={`analysis-result result-${analysis.category}`}>
                <div className="analysis-result-header">
                  <span className="analysis-orb"><Icon name="activity" /></span>
                  <div>
                    <span className="progress-kicker">Your estimate</span>
                    <h3>Wellness overview</h3>
                  </div>
                </div>
                <div className="analysis-metrics">
                  <div className="analysis-metric">
                    <span>BMI estimate</span>
                    <strong>{analysis.bmi.toFixed(1)}</strong>
                  </div>
                  <div className="analysis-metric">
                    <span>
                      Adult range at {analysis.heightCm.toFixed(0)} cm
                    </span>
                    <strong>
                      {analysis.lowerWeight.toFixed(1)}–{analysis.upperWeight.toFixed(1)} kg
                    </strong>
                  </div>
                </div>
                <div className={`analysis-category category-${analysis.category}`}>
                  <span aria-hidden="true" className="status-swatch" />
                  <span>{categoryCopy.label}</span>
                </div>
                {analysis.gender === "female" && (
                  <p className="analysis-gender-note">
                    Female estimate: the reference range is adjusted to be about 2–3 kg lower than the standard adult range.
                  </p>
                )}
                <p className="analysis-copy">{categoryCopy.message}</p>
                <div className="nutrition-guidance">
                  <span className="nutrition-label">
                    <Icon name="leaf" /> General food ideas
                  </span>
                  <h4>{nutritionGuidance[analysis.category].title}</h4>
                  <p>
                    {nutritionGuidance[analysis.category].description}{" "}
                    {ageGuidance(analysis.age)}
                  </p>
                  <a className="button button-quiet analysis-action" href="#platform">
                    {analysis.category === "below"
                      ? "Explore nourishing habits"
                      : analysis.category === "above"
                        ? "Explore movement ideas"
                        : "Explore wellness habits"}
                    <Icon name="arrow" />
                  </a>
                </div>
                <p className="analysis-disclaimer">
                  BMI is a rough screening estimate, not a diagnosis. Ask a
                  qualified healthcare professional before making major changes
                  to your weight, food, or exercise routine.
                </p>
              </div>
            ) : (
              <div className="calculator-placeholder">
                <span className="placeholder-orbit"><Icon name="sparkle" /></span>
                <h3>Your overview will appear here</h3>
                <p>
                  Add your details to see a BMI estimate, an adult reference
                  range, and general nutrition ideas.
                </p>
                <span className="placeholder-decoration" aria-hidden="true">HEALTH · HABITS · YOU</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
