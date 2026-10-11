import { Icon, type IconName } from "@/components/icon";

const navigation: { label: string; icon: IconName; active?: boolean }[] = [
  { label: "Dashboard", icon: "grid", active: true },
  { label: "Health Profile", icon: "heart" },
  { label: "Activity", icon: "activity" },
  { label: "Nutrition", icon: "leaf" },
  { label: "Sleep", icon: "moon" },
  { label: "Insights", icon: "sparkle" },
  { label: "Settings", icon: "settings" },
];

function MiniChart({ variant = "one" }: { variant?: "one" | "two" }) {
  return (
    <svg aria-hidden="true" className="mini-chart" preserveAspectRatio="none" viewBox="0 0 100 30">
      <path
        d={
          variant === "one"
            ? "M1 23 C14 22 15 18 24 20 S39 24 49 14 63 17 70 12 85 15 99 5"
            : "M1 24 C12 21 15 15 25 18 S40 26 49 15 66 8 72 12 87 17 99 4"
        }
      />
    </svg>
  );
}

export function DashboardPreview() {
  return (
    <div aria-label="Health dashboard preview" className="dashboard-stage" role="img">
      <div className="dashboard">
        <aside className="dashboard-sidebar">
          <div className="dashboard-brand">
            <Icon name="shield" />
            <span>
              HealthGuide <span className="brand-ai">AI</span>
            </span>
          </div>
          {navigation.map(({ label, icon, active }) => (
            <div className={`side-item${active ? " side-item-active" : ""}`} key={label}>
              <Icon name={icon} />
              {label}
            </div>
          ))}
        </aside>
        <div className="dashboard-content">
          <div className="dashboard-topline">
            <span>Good morning, Alex</span>
            <span aria-hidden="true" className="avatar">A</span>
          </div>
          <div className="dashboard-heading">
            <div>
              <h2>Wellness Overview</h2>
              <p>Small steps. Big changes.</p>
            </div>
            <span className="date-chip">
              <Icon name="calendar" /> This week
            </span>
          </div>
          <div className="metric-row">
            <div className="metric-card">
              <span className="metric-label">
                <Icon name="heart" /> Health score
              </span>
              <strong className="metric-value">82</strong>
              <span className="metric-note">↑ 6% from last week</span>
            </div>
            <div className="metric-card">
              <span className="metric-label">
                <Icon name="moon" /> Sleep
              </span>
              <strong className="metric-value">7h 48m</strong>
              <span className="metric-note">● Good</span>
              <MiniChart />
            </div>
            <div className="metric-card">
              <span className="metric-label">
                <Icon name="activity" /> Activity
              </span>
              <strong className="metric-value">8,240</strong>
              <span className="metric-note">Steps</span>
              <MiniChart variant="two" />
            </div>
          </div>
          <div className="dashboard-lower">
            <div className="chart-card">
              <div className="panel-title">
                <span>Health trends</span>
                <span className="metric-note">7D</span>
              </div>
              <svg aria-hidden="true" className="trend-chart" preserveAspectRatio="none" viewBox="0 0 220 64">
                <defs>
                  <linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0" stopColor="#16d8b2" stopOpacity=".24" />
                    <stop offset="1" stopColor="#16d8b2" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  className="chart-area"
                  d="M1 51 C22 47 30 43 42 45 S61 51 78 36 103 22 119 29 145 31 158 25 180 20 192 22 209 9 219 11 V64 H1Z"
                />
                <path
                  className="chart-line"
                  d="M1 51 C22 47 30 43 42 45 S61 51 78 36 103 22 119 29 145 31 158 25 180 20 192 22 209 9 219 11"
                />
              </svg>
              <div className="chart-days">
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span>
                <span>Fri</span><span>Sat</span><span>Sun</span>
              </div>
            </div>
            <div className="insight-card">
              <div className="insight-heading">
                <Icon name="sparkle" /> AI insight
              </div>
              <p>Your sleep consistency improved this week.</p>
              <small>You slept 18% longer on average. Keep up the good work.</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
