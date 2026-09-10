import { ProgressBar } from "../common/ProgressBar";
import type { AccentTheme, TimeMetrics } from "../../types";

interface WidgetsTabProps {
  metrics: TimeMetrics;
  accent: AccentTheme;
}

export function WidgetsTab({ metrics, accent }: WidgetsTabProps) {
  return (
    <div className="tab-content">
      <div className="section-intro">
        <p className="kicker">In-app previews</p>
        <h2>Choose the glance you want.</h2>
        <p className="muted">
          These layouts are configurable previews for the app, not native
          launcher widgets.
        </p>
      </div>
      <div className="widget-grid">
        <section className="widget-preview widget-wide">
          <span className="widget-label">YEAR / {metrics.yearNumber}</span>
          <strong>{metrics.year.elapsedPct.toFixed(1)}%</strong>
          <ProgressBar
            label="Year elapsed"
            value={metrics.year.elapsedPct}
            color={accent.accent}
          />
        </section>
        <section className="widget-preview widget-square">
          <span className="widget-label">DAY {metrics.dayOfYear}</span>
          <strong>{metrics.day.remainingPct.toFixed(0)}%</strong>
          <span className="muted">still open</span>
        </section>
        <section className="widget-preview widget-tall">
          <span className="widget-label">NEXT</span>
          <strong>{metrics.month.remainingUnits}</strong>
          <span className="muted">days in month</span>
        </section>
      </div>
    </div>
  );
}
