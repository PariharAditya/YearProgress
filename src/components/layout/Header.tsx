import type { AccentTheme, TimeMetrics } from "../../types";
import { Maximize2, Settings, Zap } from "lucide-react";

interface HeaderProps {
  metrics: TimeMetrics;
  accent: AccentTheme;
  onAmbient: () => void;
  onSettings: () => void;
}

export function Header({
  metrics,
  accent,
  onAmbient,
  onSettings,
}: HeaderProps) {
  const time = metrics.now.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  return (
    <header className="app-header">
      <div>
        <div className="brand-line">
          <span
            className="brand-pulse"
            style={{ backgroundColor: accent.accent }}
          />
          <h1>
            YEAR<span style={{ color: accent.accent }}>PROGRESS</span>
          </h1>
        </div>
        <p className="kicker">Android PWA & widget studio</p>
      </div>
      <div className="header-actions">
        <span className="header-clock">{time}</span>
        <button
          className="icon-button"
          type="button"
          onClick={onAmbient}
          aria-label="Open ambient mode"
          title="Ambient mode"
        >
          <Maximize2 size={17} />
        </button>
        <button
          className="icon-button"
          type="button"
          onClick={onSettings}
          aria-label="Open settings"
          title="Settings"
        >
          <Settings size={17} />
        </button>
        <Zap size={15} color={accent.accent} />
      </div>
    </header>
  );
}
