import type { CSSProperties } from "react";

interface StatCardProps {
  label: string;
  value: string;
  detail?: string;
  accent?: string;
}

export function StatCard({ label, value, detail, accent }: StatCardProps) {
  return (
    <article
      className="stat-card"
      style={{ "--card-accent": accent } as CSSProperties}
    >
      <span className="eyebrow">{label}</span>
      <strong>{value}</strong>
      {detail && <small>{detail}</small>}
    </article>
  );
}
