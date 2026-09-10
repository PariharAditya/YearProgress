import type { TimeMetrics } from "../../types";

interface AmbientScreenProps {
  metrics: TimeMetrics;
  onExit: () => void;
}

export function AmbientScreen({ metrics, onExit }: AmbientScreenProps) {
  const date = metrics.now.toLocaleDateString(undefined, {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const time = metrics.now.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  return (
    <div className="ambient-screen">
      <button type="button" className="ambient-exit" onClick={onExit}>
        Exit ambient
      </button>
      <div className="ambient-content">
        <p className="kicker">{date}</p>
        <strong className="ambient-time">{time}</strong>
        <div className="ambient-progress">
          <div className="ambient-progress-label">
            <span>YEAR {metrics.yearNumber} PROGRESS</span>
            <span>{metrics.year.elapsedPct.toFixed(2)}%</span>
          </div>
          <div className="ambient-track">
            <span style={{ width: `${metrics.year.elapsedPct}%` }} />
          </div>
        </div>
        <div className="ambient-stats">
          <span>
            <small>DAY</small>
            {metrics.day.elapsedPct.toFixed(1)}%
          </span>
          <span>
            <small>WEEK</small>
            {metrics.week.elapsedPct.toFixed(1)}%
          </span>
          <span>
            <small>MONTH</small>
            {metrics.month.elapsedPct.toFixed(1)}%
          </span>
        </div>
        <span>
          Day {metrics.dayOfYear} of {metrics.daysInYear} ·{" "}
          {metrics.year.remainingUnits} days remaining
        </span>
      </div>
    </div>
  );
}
