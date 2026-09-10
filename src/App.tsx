import { useEffect, useState } from "react";
import {
  DEFAULT_MILESTONES,
  DEFAULT_SETTINGS,
  MILESTONES_STORAGE_KEY,
  SETTINGS_STORAGE_KEY,
} from "./constants/defaults";
import { useAccentTheme } from "./hooks/useAccentTheme";
import { useLocalStorageState } from "./hooks/useLocalStorageState";
import { useNow } from "./hooks/useNow";
import { useTimeMetrics } from "./hooks/useTimeMetrics";
import { AmbientScreen } from "./components/layout/AmbientScreen";
import { Header } from "./components/layout/Header";
import { NavTabs } from "./components/layout/NavTabs";
import { SettingsDrawer } from "./components/layout/SettingsDrawer";
import { Toast } from "./components/common/Toast";
import { MatrixTab } from "./components/tabs/MatrixTab";
import { MilestonesTab } from "./components/tabs/MilestonesTab";
import { OverviewTab } from "./components/tabs/OverviewTab";
import { PwaInstallTab } from "./components/tabs/PwaInstallTab";
import { WidgetsTab } from "./components/tabs/WidgetsTab";
import type { AppSettings, Milestone, TabId } from "./types";
import "./App.css";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

function App() {
  const now = useNow();
  const metrics = useTimeMetrics(now);
  const [settings, setSettings] = useLocalStorageState<AppSettings>(
    SETTINGS_STORAGE_KEY,
    DEFAULT_SETTINGS,
  );
  const [milestones, setMilestones] = useLocalStorageState<Milestone[]>(
    MILESTONES_STORAGE_KEY,
    DEFAULT_MILESTONES,
  );
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [ambient, setAmbient] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const accent = useAccentTheme(settings.accentTheme);

  useEffect(() => {
    const capturePrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", capturePrompt);
    return () =>
      window.removeEventListener("beforeinstallprompt", capturePrompt);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty("--accent", accent.accent);
    document.documentElement.style.setProperty(
      "--accent-strong",
      accent.accentStrong,
    );
    document.documentElement.style.setProperty(
      "--accent-soft",
      accent.accentSoft,
    );
    document.documentElement.style.setProperty(
      "--accent-contrast",
      accent.contrast,
    );
    document.body.dataset.oled = String(settings.oledMode);
  }, [accent, settings.oledMode]);

  const install = async () => {
    if (!installPrompt) return;
    await installPrompt.prompt();
    const choice = await installPrompt.userChoice;
    setInstallPrompt(null);
    setToast(
      choice.outcome === "accepted"
        ? "Installed and ready."
        : "Install dismissed.",
    );
    window.setTimeout(() => setToast(null), 2800);
  };

  const renderTab = () => {
    switch (activeTab) {
      case "matrix":
        return <MatrixTab metrics={metrics} accent={accent} />;
      case "widgets":
        return <WidgetsTab metrics={metrics} accent={accent} />;
      case "milestones":
        return (
          <MilestonesTab
            milestones={milestones}
            accent={accent}
            onChange={setMilestones}
          />
        );
      case "install":
        return (
          <PwaInstallTab
            canInstall={installPrompt !== null}
            accent={accent}
            onInstall={install}
          />
        );
      default:
        return (
          <OverviewTab metrics={metrics} settings={settings} accent={accent} />
        );
    }
  };

  if (ambient)
    return <AmbientScreen metrics={metrics} onExit={() => setAmbient(false)} />;

  return (
    <div className="app-shell">
      <Header
        metrics={metrics}
        accent={accent}
        onAmbient={() => setAmbient(true)}
        onSettings={() => setSettingsOpen(true)}
      />
      <div className="top-controls">
        <span className="live-indicator">
          <i /> Live local time
        </span>
        <SettingsDrawer
          settings={settings}
          onChange={setSettings}
          open={settingsOpen}
          onOpenChange={setSettingsOpen}
        />
      </div>
      <NavTabs activeTab={activeTab} onChange={setActiveTab} />
      <main>{renderTab()}</main>
      <Toast message={toast} />
    </div>
  );
}

export default App;
