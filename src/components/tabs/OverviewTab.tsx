import { ProgressBar } from "../common/ProgressBar";
import { StatCard } from "../common/StatCard";
import type { AccentTheme, AppSettings, TimeMetrics } from "../../types";

interface OverviewTabProps {
  metrics: TimeMetrics;
  settings: AppSettings;
  accent: AccentTheme;
}

export function OverviewTab({ metrics, settings, accent }: OverviewTabProps) {
  const progressItems = [
    metrics.year,
    metrics.month,
    metrics.week,
    metrics.day,
  ];
  return (
    <div className="tab-content overview-tab">
      <section className="hero-panel">
        <div>
          <p className="kicker">The year is a finite place</p>
          <h2>{metrics.year.remainingUnits} days left to shape.</h2>
          <p className="muted">
            Day {metrics.dayOfYear} of {metrics.daysInYear}, measured from your
            local calendar.
          </p>
        </div>
        <div className="hero-number" style={{ color: accent.accent }}>
          {metrics.year.elapsedPct.toFixed(settings.precision)}
          <span>%</span>
        </div>
      </section>
      <div className="stat-grid">
        <StatCard
          label="Today"
          value={`${metrics.day.remainingUnits} day`}
          detail="until midnight"
          accent={accent.accent}
        />
        <StatCard
          label="This week"
          value={`${metrics.week.remainingUnits} days`}
          detail={`${metrics.week.elapsedUnits} elapsed`}
          accent={accent.accent}
        />
        <StatCard
          label="This month"
          value={`${metrics.month.remainingUnits} days`}
          detail={`${metrics.month.elapsedUnits} elapsed`}
          accent={accent.accent}
        />
      </div>
      <section className="panel progress-panel">
        <div className="section-heading">
          <div>
            <p className="kicker">Momentum</p>
            <h2>Keep the signal visible.</h2>
          </div>
          <span className="panel-note">
            {metrics.year.remainingUnits} remaining
          </span>
        </div>
        {progressItems.map((item) => (
          <ProgressBar
            key={item.label}
            label={item.label}
            value={item.elapsedPct}
            color={accent.accent}
            detail={`${item.elapsedPct.toFixed(settings.precision)}% elapsed`}
          />
        ))}
      </section>
    </div>
  );
}
