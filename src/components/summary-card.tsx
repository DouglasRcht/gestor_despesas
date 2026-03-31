type SummaryCardTone = "amber" | "clay" | "forest";

const toneStyles: Record<SummaryCardTone, string> = {
  amber:
    "border-[rgba(217,123,44,0.18)] bg-[rgba(255,247,238,0.92)] text-[color:var(--accent-amber)]",
  clay:
    "border-[rgba(201,92,84,0.18)] bg-[rgba(255,244,243,0.92)] text-[color:var(--accent-clay)]",
  forest:
    "border-[rgba(31,138,112,0.18)] bg-[rgba(240,252,248,0.92)] text-[color:var(--accent-forest)]",
};

interface SummaryCardProps {
  title: string;
  value: string;
  description: string;
  tone: SummaryCardTone;
}

export function SummaryCard({
  description,
  tone,
  title,
  value,
}: SummaryCardProps) {
  return (
    <article
      className={`rounded-[28px] border p-5 shadow-[0_16px_40px_rgba(31,42,34,0.06)] ${toneStyles[tone]}`}
    >
      <p className="section-eyebrow">{title}</p>
      <p className="mt-4 text-3xl font-semibold text-[color:var(--foreground)]">
        {value}
      </p>
      <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
        {description}
      </p>
    </article>
  );
}
