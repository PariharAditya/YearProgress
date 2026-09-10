import type { AccentTheme, TimeMetrics } from "../../types";

interface MatrixTabProps {
  metrics: TimeMetrics;
  accent: AccentTheme;
}

export function MatrixTab({ metrics, accent }: MatrixTabProps) {
  return (
    <div className="tab-content">
      <section className="panel matrix-panel">
        <div className="section-heading">
          <div>
            <p className="kicker">Calendar matrix</p>
            <h2>One square, one day.</h2>
          </div>
          <span className="panel-note">{metrics.daysInYear} total</span>
        </div>
        <div
          className="day-grid"
          aria-label={`${metrics.yearNumber} day progress`}
        >
          {metrics.days.map((day) => (
            <span
              key={day.date}
              className={`day-cell ${day.isToday ? "is-today" : ""} ${day.isPast ? "is-past" : ""}`}
              style={
                day.isPast || day.isToday
                  ? { backgroundColor: accent.accent }
                  : undefined
              }
              title={day.date}
            />
          ))}
        </div>
        <div className="matrix-legend">
          <span>
            <i style={{ backgroundColor: accent.accent }} />
            Elapsed
          </span>
          <span>
            <i className="legend-today" />
            Today
          </span>
          <span>
            <i />
            Ahead
          </span>
        </div>
      </section>
    </div>
  );
}
