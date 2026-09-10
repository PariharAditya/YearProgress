import type { TabId } from "../../types";
import {
  BarChart3,
  CalendarDays,
  Clock3,
  Download,
  Smartphone,
} from "lucide-react";

const tabs: Array<{ id: TabId; label: string; icon: typeof Clock3 }> = [
  { id: "overview", label: "Overview", icon: Clock3 },
  { id: "matrix", label: "365 Grid", icon: CalendarDays },
  { id: "widgets", label: "Widgets", icon: Smartphone },
  { id: "milestones", label: "Goals", icon: BarChart3 },
  { id: "install", label: "Install", icon: Download },
];

interface NavTabsProps {
  activeTab: TabId;
  onChange: (tab: TabId) => void;
}

export function NavTabs({ activeTab, onChange }: NavTabsProps) {
  return (
    <nav className="tabs" aria-label="Primary navigation">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          className={activeTab === tab.id ? "is-active" : ""}
          onClick={() => onChange(tab.id)}
          aria-current={activeTab === tab.id ? "page" : undefined}
        >
          <tab.icon size={14} />
          {tab.label}
        </button>
      ))}
    </nav>
  );
}
