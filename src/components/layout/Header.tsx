import type { AccentTheme, TimeMetrics } from "../../types";

interface HeaderProps {
  metrics: TimeMetrics;
  accent: AccentTheme;
  onAmbient: () => void;
}

export function Header({ metrics, accent, onAmbient }: HeaderProps) {
  return (
    <header className="app-header">
      <div>
        <p className="kicker">A quiet measure of time</p>
        <h1>Year / {metrics.yearNumber}</h1>
      </div>
      <button
        className="icon-button"
        type="button"
        onClick={onAmbient}
        aria-label="Open ambient mode"
        title="Ambient mode"
      >
        ◌
      </button>
      <span
        className="accent-dot"
        style={{ backgroundColor: accent.accent }}
        aria-hidden="true"
      />
    </header>
  );
}
