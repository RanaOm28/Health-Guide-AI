"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Icon } from "@/components/icon";

type AuthMode = "login" | "register";

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export function AuthForm({ mode }: { mode: AuthMode }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isRegister = mode === "register";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(`${apiUrl}/api/auth/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        setError(result.message ?? "We couldn't complete your request. Please try again.");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError(
        "Couldn't connect to HealthGuide. Make sure the Express API is running, then try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-glow" aria-hidden="true" />
      <section aria-labelledby="auth-title" className="auth-card">
        <Link aria-label="HealthGuide AI home" className="brand auth-brand" href="/">
          <span className="brand-mark"><Icon name="shield" /></span>
          <span>HealthGuide <span className="brand-ai">AI</span></span>
        </Link>
        <span className="eyebrow section-eyebrow">
          <Icon name="sparkle" />
          {isRegister ? "Start your wellness journey" : "Welcome back"}
        </span>
        <h1 id="auth-title">{isRegister ? "Create your account" : "Sign in to HealthGuide"}</h1>
        <p className="auth-description">
          {isRegister
            ? "Set up your account to record your progress and build goals that feel right for you."
            : "Your wellness goals and progress are ready when you are."}
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          {isRegister && (
            <label className="form-field">
              <span>Your name</span>
              <input autoComplete="name" maxLength={80} name="name" placeholder="Alex Morgan" required />
            </label>
          )}
          <label className="form-field">
            <span>Email address</span>
            <input
              autoComplete="email"
              name="email"
              placeholder="you@example.com"
              required
              type="email"
            />
          </label>
          <label className="form-field">
            <span>Password</span>
            <input
              autoComplete={isRegister ? "new-password" : "current-password"}
              minLength={8}
              name="password"
              placeholder={isRegister ? "At least 8 characters" : "Enter your password"}
              required
              type="password"
            />
          </label>
          {isRegister && (
            <label className="form-field">
              <span>What would you like to focus on?</span>
              <select defaultValue="wellbeing" name="goal">
                <option value="wellbeing">Build healthier habits</option>
                <option value="lose">Lose weight steadily</option>
                <option value="gain">Gain weight mindfully</option>
                <option value="maintain">Maintain my current weight</option>
              </select>
            </label>
          )}
          {error && (
            <p className="auth-error" role="alert">
              {error}
            </p>
          )}
          <button className="button button-primary auth-submit" disabled={isSubmitting} type="submit">
            {isSubmitting
              ? "Please wait…"
              : isRegister
                ? "Create account"
                : "Sign in"}
            {!isSubmitting && <Icon name="arrow" />}
          </button>
        </form>

        <p className="auth-switch">
          {isRegister ? "Already have an account?" : "New to HealthGuide?"}{" "}
          <Link href={isRegister ? "/login" : "/register"}>
            {isRegister ? "Sign in" : "Create an account"}
          </Link>
        </p>
        <p className="auth-privacy">
          <Icon name="lock" />
          Your account is protected. HealthGuide is a wellness tool, not a medical service.
        </p>
      </section>
    </main>
  );
}
