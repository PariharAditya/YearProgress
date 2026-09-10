import { useState } from "react";
import { ACCENT_THEMES } from "../../constants/themes";
import type { AccentThemeId, AppSettings } from "../../types";
import { ToggleSwitch } from "../common/ToggleSwitch";

interface SettingsDrawerProps {
  settings: AppSettings;
  onChange: (settings: AppSettings) => void;
}

export function SettingsDrawer({ settings, onChange }: SettingsDrawerProps) {
  const [open, setOpen] = useState(false);
  const update = (patch: Partial<AppSettings>) =>
    onChange({ ...settings, ...patch });

  return (
    <>
      <button
        type="button"
        className="settings-trigger"
        onClick={() => setOpen(true)}
      >
        Settings
      </button>
      {open && (
        <div className="drawer-backdrop" onClick={() => setOpen(false)}>
          <aside
            className="settings-drawer"
            onClick={(event) => event.stopPropagation()}
            aria-label="Settings"
          >
            <div className="drawer-heading">
              <div>
                <p className="kicker">Personalize</p>
                <h2>Settings</h2>
              </div>
              <button
                className="close-button"
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close settings"
              >
                ×
              </button>
            </div>
            <section className="settings-section">
              <h3>Accent</h3>
              <div className="theme-options">
                {ACCENT_THEMES.map((theme) => (
                  <button
                    key={theme.id}
                    type="button"
                    className={
                      settings.accentTheme === theme.id
                        ? "theme-choice is-selected"
                        : "theme-choice"
                    }
                    onClick={() =>
                      update({ accentTheme: theme.id as AccentThemeId })
                    }
                  >
                    <span style={{ backgroundColor: theme.accent }} />
                    {theme.name}
                  </button>
                ))}
              </div>
            </section>
            <section className="settings-section">
              <h3>Display</h3>
              <ToggleSwitch
                label="OLED black"
                checked={settings.oledMode}
                onChange={(oledMode) => update({ oledMode })}
              />
              <ToggleSwitch
                label="Show quarter"
                checked={settings.showQuarter}
                onChange={(showQuarter) => update({ showQuarter })}
              />
            </section>
            <section className="settings-section">
              <h3>Precision</h3>
              <div className="segmented-control">
                {([0, 1, 2] as const).map((precision) => (
                  <button
                    key={precision}
                    type="button"
                    className={
                      settings.precision === precision ? "is-selected" : ""
                    }
                    onClick={() => update({ precision })}
                  >
                    {precision} dp
                  </button>
                ))}
              </div>
            </section>
          </aside>
        </div>
      )}
    </>
  );
}
