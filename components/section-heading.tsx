import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {eyebrow && (
        <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold">
          <span className="h-px w-6 bg-gold/60" />
          {eyebrow}
        </span>
      )}
      <h2 className="font-heading text-2xl font-bold uppercase tracking-wide text-foreground text-balance sm:text-3xl">
        {title}
      </h2>
    </div>
  );
}

export function FormDots({ form }: { form: ("W" | "D" | "L")[] }) {
  const colors = {
    W: "bg-emerald-500",
    D: "bg-amber-400",
    L: "bg-rose-500",
  };
  return (
    <div className="flex items-center gap-1">
      {form.length === 0 && (
        <span className="text-xs text-muted-foreground">—</span>
      )}
      {form.slice(-5).map((r, i) => (
        <span
          key={i}
          title={r === "W" ? "Win" : r === "D" ? "Draw" : "Loss"}
          className={cn(
            "grid size-5 place-items-center rounded text-[0.6rem] font-bold text-white",
            colors[r],
          )}
        >
          {r}
        </span>
      ))}
    </div>
  );
}
