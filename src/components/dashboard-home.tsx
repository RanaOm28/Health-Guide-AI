"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/icon";

type User = { id: string; name: string; email: string; goal: string };
type WeightEntry = { id: string; weightKg: number; recordedAt: string };
type ApiResponse<T> = T & { message?: string };

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(
    new Date(date),
  );
}

function ProgressChart({ entries }: { entries: WeightEntry[] }) {
  const points = useMemo(() => {
    const visible = entries.slice(-8);
    if (!visible.length) return [];
    const values = visible.map((entry) => entry.weightKg);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = Math.max(max - min, 1);
    return visible.map((entry, index) => ({
      ...entry,
      x: visible.length === 1 ? 250 : 12 + (index * 476) / (visible.length - 1),
      y: 126 - ((entry.weightKg - min) / range) * 92,
    }));
  }, [entries]);
  const line = points.map(({ x, y }) => `${x},${y}`).join(" ");
  const area = points.length > 1 ? `12,142 ${line} 488,142` : "";

  if (!points.length) {
    return (
      <div className="chart-empty">
        <Icon name="chart" />
        <span>Add your first entry to start seeing your progress.</span>
      </div>
    );
  }

  return (
    <div className="member-chart-wrap">
      <svg
        aria-label={`Weight progress graph with ${points.length} recorded entries`}
        className="member-progress-chart"
        preserveAspectRatio="none"
        role="img"
        viewBox="0 0 500 150"
      >
        <defs>
          <linearGradient id="memberChartFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#18d6ad" stopOpacity=".24" />
            <stop offset="1" stopColor="#18d6ad" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[34, 74, 114].map((y) => (
          <line key={y} x1="0" x2="500" y1={y} y2={y} />
        ))}
        {points.length > 1 && <polygon className="member-chart-area" points={area} />}
        <polyline className="member-chart-line" points={line} />
        {points.map(({ id, x, y }) => (
          <circle className="member-chart-dot" key={id} cx={x} cy={y} r="4" />
        ))}
      </svg>
      <div className="member-chart-dates">
        {points.map(({ id, recordedAt }) => <span key={id}>{formatDate(recordedAt)}</span>)}
      </div>
    </div>
  );
}

export function DashboardHome() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [entries, setEntries] = useState<WeightEntry[]>([]);
  const [weight, setWeight] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function loadDashboard() {
      try {
        const [userResponse, entriesResponse] = await Promise.all([
          fetch(`${apiUrl}/api/auth/me`, { credentials: "include" }),
          fetch(`${apiUrl}/api/weight-entries`, { credentials: "include" }),
        ]);
        if (userResponse.status === 401 || entriesResponse.status === 401) {
          router.replace("/login");
          return;
        }
        if (!userResponse.ok || !entriesResponse.ok) {
          throw new Error("Couldn't load your dashboard. Please try again.");
        }
        const userData = (await userResponse.json()) as ApiResponse<{ user: User }>;
        const entriesData = (await entriesResponse.json()) as ApiResponse<{
          entries: WeightEntry[];
        }>;
        if (!cancelled) {
          setUser(userData.user);
          setEntries(entriesData.entries);
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Couldn't connect to your dashboard.",
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    void loadDashboard();
    return () => {
      cancelled = true;
    };
  }, [router]);

  async function handleAddEntry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSaving(true);
    try {
      const response = await fetch(`${apiUrl}/api/weight-entries`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ weightKg: Number(weight) }),
      });
      const result = (await response.json()) as ApiResponse<{ entry: WeightEntry }>;
      if (!response.ok) {
        setError(result.message ?? "Couldn't save this entry.");
        return;
      }
      setEntries((current) => [...current, result.entry]);
      setWeight("");
    } catch {
      setError("Couldn't connect to your dashboard. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  async function handleSignOut() {
    try {
      const response = await fetch(`${apiUrl}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      if (!response.ok) throw new Error("Couldn't sign out. Please try again.");
      router.replace("/login");
    } catch (signOutError) {
      setError(signOutError instanceof Error ? signOutError.message : "Couldn't sign out.");
    }
  }

  const latestEntry = entries.at(-1);

  return (
    <main className="member-dashboard">
      <header className="member-header site-shell">
        <a aria-label="HealthGuide AI home" className="brand" href="/">
          <span className="brand-mark"><Icon name="shield" /></span>
          <span>HealthGuide <span className="brand-ai">AI</span></span>
        </a>
        <div className="member-actions">
          <a className="member-link" href="/">Back to home</a>
          <button className="member-signout" onClick={handleSignOut} type="button">
            Sign out
          </button>
        </div>
      </header>
      <div className="site-shell member-content">
        <span className="eyebrow section-eyebrow">
          <Icon name="sparkle" /> Your personal space
        </span>
        <h1>{loading ? "Loading your dashboard…" : `Welcome${user ? `, ${user.name}` : ""}.`}</h1>
        <p className="member-intro">
          Small steps add up. Record what matters to you and see your progress over time.
        </p>
        {error && <p className="auth-error member-error" role="alert">{error}</p>}
        <div className="member-grid">
          <section aria-labelledby="goal-title" className="member-panel goal-summary">
            <span className="feature-icon"><Icon name="heart" /></span>
            <div>
              <span className="progress-kicker">Your current focus</span>
              <h2 id="goal-title">
                {user?.goal === "lose"
                  ? "Lose weight steadily"
                  : user?.goal === "gain"
                    ? "Gain weight mindfully"
                    : user?.goal === "maintain"
                      ? "Maintain your current weight"
                      : "Build healthier habits"}
              </h2>
              <p>Personal goals are a guide, not a measure of your worth. Move at your own pace.</p>
            </div>
          </section>
          <section aria-labelledby="latest-weight-title" className="member-panel latest-summary">
            <span className="progress-kicker" id="latest-weight-title">Latest recorded weight</span>
            <strong>{latestEntry ? `${latestEntry.weightKg} kg` : "Not recorded yet"}</strong>
            <span className="latest-date">
              {latestEntry ? formatDate(latestEntry.recordedAt) : "Add an entry when you’re ready"}
            </span>
          </section>
        </div>
        <section aria-labelledby="progress-title" className="member-panel progress-panel">
          <div className="progress-panel-heading">
            <div>
              <span className="progress-kicker">Your personal records</span>
              <h2 id="progress-title">Weight progress</h2>
              <p>Only you can access the entries saved to your account.</p>
            </div>
            <span className="progress-range">{entries.length} {entries.length === 1 ? "entry" : "entries"}</span>
          </div>
          <ProgressChart entries={entries} />
          <form className="weight-entry-form" onSubmit={handleAddEntry}>
            <label className="form-field weight-field">
              <span>Record weight (kg)</span>
              <input
                max="1000"
                min="0.1"
                onChange={(event) => setWeight(event.target.value)}
                placeholder="e.g. 68.5"
                required
                step="0.1"
                type="number"
                value={weight}
              />
            </label>
            <button className="button button-primary" disabled={saving || loading} type="submit">
              {saving ? "Saving…" : "Add progress entry"} <Icon name="arrow" />
            </button>
          </form>
          <p className="weight-note">
            Weight is optional. This chart shows records you enter and does not provide medical advice.
          </p>
        </section>
      </div>
    </main>
  );
}
