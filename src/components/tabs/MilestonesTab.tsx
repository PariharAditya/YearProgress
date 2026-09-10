import { useState } from "react";
import { formatDate } from "../../utils/format";
import type { AccentTheme, Milestone } from "../../types";

interface MilestonesTabProps {
  milestones: Milestone[];
  accent: AccentTheme;
  onChange: (milestones: Milestone[]) => void;
}

export function MilestonesTab({
  milestones,
  accent,
  onChange,
}: MilestonesTabProps) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const addMilestone = () => {
    if (!title.trim() || !date) return;
    onChange([
      ...milestones,
      { id: crypto.randomUUID(), title: title.trim(), date, completed: false },
    ]);
    setTitle("");
    setDate("");
  };
  return (
    <div className="tab-content">
      <div className="section-intro">
        <p className="kicker">Markers in the year</p>
        <h2>Give the days a shape.</h2>
      </div>
      <section className="panel milestone-form">
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="A thing worth remembering"
          aria-label="Milestone title"
        />
        <input
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          aria-label="Milestone date"
        />
        <button
          type="button"
          className="primary-button"
          style={{ backgroundColor: accent.accent }}
          onClick={addMilestone}
        >
          Add marker
        </button>
      </section>
      <div className="milestone-list">
        {milestones.map((milestone) => (
          <article
            className={`milestone ${milestone.completed ? "is-complete" : ""}`}
            key={milestone.id}
          >
            <button
              type="button"
              className="milestone-check"
              onClick={() =>
                onChange(
                  milestones.map((item) =>
                    item.id === milestone.id
                      ? { ...item, completed: !item.completed }
                      : item,
                  ),
                )
              }
              aria-label={`Mark ${milestone.title} complete`}
            >
              {milestone.completed ? "✓" : ""}
            </button>
            <div>
              <strong>{milestone.title}</strong>
              <span>{formatDate(milestone.date)}</span>
            </div>
            <button
              type="button"
              className="delete-button"
              onClick={() =>
                onChange(milestones.filter((item) => item.id !== milestone.id))
              }
              aria-label={`Delete ${milestone.title}`}
            >
              ×
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
