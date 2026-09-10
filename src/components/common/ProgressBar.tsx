interface ProgressBarProps {
  label: string;
  value: number;
  color: string;
  detail?: string;
}

export function ProgressBar({ label, value, color, detail }: ProgressBarProps) {
  return (
    <div className="progress-row">
      <div className="progress-meta">
        <span>{label}</span>
        <strong>{detail ?? `${value.toFixed(1)}%`}</strong>
      </div>
      <div
        className="progress-track"
        role="progressbar"
        aria-label={label}
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <span
          className="progress-fill"
          style={{ width: `${value}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}
