import type { TimeMetrics } from "../../types";

interface AmbientScreenProps {
  metrics: TimeMetrics;
  onExit: () => void;
}

export function AmbientScreen({ metrics, onExit }: AmbientScreenProps) {
  return (
    <div className="ambient-screen">
      <button type="button" className="ambient-exit" onClick={onExit}>
        Exit ambient
      </button>
      <p className="kicker">
        {metrics.yearNumber} / day {metrics.dayOfYear}
      </p>
      <strong>{metrics.year.elapsedPct.toFixed(2)}%</strong>
      <span>of this year has passed</span>
    </div>
  );
}
