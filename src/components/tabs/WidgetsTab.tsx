import { ProgressBar } from "../common/ProgressBar";
import type { AccentTheme, TimeMetrics } from "../../types";
import { Smartphone, Sparkles } from "lucide-react";

interface WidgetsTabProps {
  metrics: TimeMetrics;
  accent: AccentTheme;
}

export function WidgetsTab({ metrics, accent }: WidgetsTabProps) {
  return (
    <div className="tab-content">
      <div className="section-intro">
        <p className="kicker">Widget previews</p>
        <h2>Choose the glance you want.</h2>
        <p className="muted">
          These are in-app previews. A browser-installed PWA creates an app
          shortcut, not a resizable Android launcher widget.
        </p>
      </div>
      <div className="phone-mockup">
        <div className="phone-speaker" />
        <section className="phone-widget widget-smart">
          <div className="widget-row">
            <span>
              <Sparkles size={12} /> SMART WIDGET
            </span>
            <span>{metrics.yearNumber}</span>
          </div>
          <strong>{metrics.year.elapsedPct.toFixed(2)}%</strong>
          <ProgressBar
            label="Year elapsed"
            value={metrics.year.elapsedPct}
            color={accent.accent}
          />
          <div className="widget-row widget-foot">
            <span>{metrics.year.elapsedPct.toFixed(1)}% passed</span>
            <span>{metrics.year.remainingUnits}d left</span>
          </div>
        </section>
        <section className="phone-widget widget-compact">
          <div className="widget-row">
            <span>2 × 2 MINIMAL</span>
            <span style={{ color: accent.accent }}>{metrics.yearNumber}</span>
          </div>
          <strong>{metrics.year.elapsedPct.toFixed(2)}%</strong>
          <ProgressBar
            label="Year elapsed"
            value={metrics.year.elapsedPct}
            color={accent.accent}
          />
        </section>
        <div className="phone-home" />
      </div>
      <div className="widget-guide">
        <Smartphone size={17} color={accent.accent} />
        <span>
          To use a real home-screen widget, this project needs a Capacitor or
          TWA Android wrapper with a native AppWidgetProvider. That is separate
          from the current web PWA.
        </span>
      </div>
    </div>
  );
}
