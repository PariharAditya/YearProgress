import type { TabId } from "../../types";

const tabs: Array<{ id: TabId; label: string }> = [
  { id: "overview", label: "Overview" },
  { id: "matrix", label: "365 days" },
  { id: "widgets", label: "Widgets" },
  { id: "milestones", label: "Milestones" },
  { id: "install", label: "Install" },
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
          {tab.label}
        </button>
      ))}
    </nav>
  );
}
