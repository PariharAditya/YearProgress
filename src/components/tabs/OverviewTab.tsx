import { ProgressBar } from "../common/ProgressBar";
import { StatCard } from "../common/StatCard";
import type { AccentTheme, AppSettings, TimeMetrics } from "../../types";
import { Calendar, Clock3, Share2 } from "lucide-react";

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
          <p className="kicker">YEAR {metrics.yearNumber} PROGRESS</p>
          <div
            className="hero-number hero-number-top"
            style={{ color: accent.accent }}
          >
            {metrics.year.elapsedPct.toFixed(settings.precision)}
            <span>%</span>
          </div>
          <div className="hero-actions">
            <span>
              <strong>{metrics.dayOfYear}</strong> days passed
            </span>
            <span>
              <strong>{metrics.year.remainingUnits}</strong> days left
            </span>
            <button
              className="share-button"
              type="button"
              aria-label="Share progress"
            >
              <Share2 size={15} />
            </button>
          </div>
        </div>
        <div className="hero-side">
          <Calendar size={20} />
          <span>Local calendar</span>
        </div>
      </section>
      <div className="stat-grid">
        <StatCard
          label={`Quarter ${metrics.currentQuarter}`}
          value={`${metrics.quarter.elapsedPct.toFixed(settings.precision)}%`}
          detail={`${metrics.quarter.elapsedUnits}d passed · ${metrics.quarter.remainingUnits}d left`}
          accent={accent.accent}
        />
        <StatCard
          label="Month"
          value={`${metrics.month.elapsedPct.toFixed(settings.precision)}%`}
          detail={`${metrics.month.elapsedUnits}d passed · ${metrics.month.remainingUnits}d left`}
          accent={accent.accent}
        />
        <StatCard
          label="Today"
          value={`${metrics.day.elapsedPct.toFixed(settings.precision)}%`}
          detail={`${metrics.hoursPassed.toFixed(1)}h passed · ${metrics.hoursRemaining.toFixed(1)}h left`}
          accent={accent.accent}
        />
      </div>
      <section className="panel progress-panel">
        <div className="section-heading">
          <div>
            <p className="kicker">
              <Clock3 size={13} /> Time breakdown
            </p>
            <h2>Keep the signal visible.</h2>
          </div>
          <span className="panel-note">
            {metrics.year.remainingUnits} remaining
          </span>
        </div>
        {progressItems
          .filter((item) => settings.showQuarter || item.label !== "QUARTER")
          .map((item) => (
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
