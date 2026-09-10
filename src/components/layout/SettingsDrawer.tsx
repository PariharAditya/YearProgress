import { ACCENT_THEMES } from "../../constants/themes";
import type { AccentThemeId, AppSettings } from "../../types";
import { ToggleSwitch } from "../common/ToggleSwitch";

interface SettingsDrawerProps {
  settings: AppSettings;
  onChange: (settings: AppSettings) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function SettingsDrawer({
  settings,
  onChange,
  open = false,
  onOpenChange = () => undefined,
}: SettingsDrawerProps) {
  const update = (patch: Partial<AppSettings>) =>
    onChange({ ...settings, ...patch });

  return (
    <>
      <button
        type="button"
        className="settings-trigger"
        onClick={() => onOpenChange(true)}
      >
        Settings
      </button>
      {open && (
        <div className="drawer-backdrop" onClick={() => onOpenChange(false)}>
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
                onClick={() => onOpenChange(false)}
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
              <ToggleSwitch
                label="Milliseconds ticker"
                checked={settings.showMilliseconds}
                onChange={(showMilliseconds) => update({ showMilliseconds })}
              />
            </section>
            <section className="settings-section">
              <h3>Precision</h3>
              <div className="segmented-control">
                {([0, 1, 2, 3, 4, 5, 6] as const).map((precision) => (
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
