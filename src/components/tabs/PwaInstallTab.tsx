import type { AccentTheme } from "../../types";

interface PwaInstallTabProps {
  canInstall: boolean;
  accent: AccentTheme;
  onInstall: () => void;
}

export function PwaInstallTab({
  canInstall,
  accent,
  onInstall,
}: PwaInstallTabProps) {
  return (
    <div className="tab-content">
      <section className="install-panel">
        <p className="kicker">A small place to return to</p>
        <h2>Keep the year close.</h2>
        <p className="muted">
          Install Year Progress for a focused, offline-ready view of the time
          you have left.
        </p>
        {canInstall ? (
          <button
            type="button"
            className="primary-button"
            style={{ backgroundColor: accent.accent }}
            onClick={onInstall}
          >
            Add to home screen
          </button>
        ) : (
          <div className="manual-install">
            <strong>Install the app shortcut from your browser menu</strong>
            <span>
              Open Chrome's menu and choose “Install app” or “Add to Home
              screen”. This adds Year Progress to your app drawer or home
              screen; it does not add a native resizable widget.
            </span>
          </div>
        )}
      </section>
    </div>
  );
}
