"use client";

import { useEffect, useState } from "react";

function diff(target: number) {
  const d = Math.max(0, target - Date.now());
  return {
    days: Math.floor(d / 86_400_000),
    hours: Math.floor((d / 3_600_000) % 24),
    minutes: Math.floor((d / 60_000) % 60),
    seconds: Math.floor((d / 1000) % 60),
  };
}

export function Countdown({
  target,
  size = "md",
}: {
  target: string;
  size?: "sm" | "md" | "lg";
}) {
  const targetMs = new Date(target).getTime();
  const [time, setTime] = useState(() => diff(targetMs));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const t = setInterval(() => setTime(diff(targetMs)), 1000);
    return () => clearInterval(t);
  }, [targetMs]);

  if (!mounted) {
    // Return a matching placeholder layout with "--" to keep layout shift to a minimum
    const placeholderTime = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    const units = [
      { label: "Days", value: 0 },
      { label: "Hrs", value: 0 },
      { label: "Min", value: 0 },
      { label: "Sec", value: 0 },
    ];
    const box =
      size === "lg"
        ? "min-w-12 sm:min-w-16 px-1 sm:px-3 py-1 sm:py-2 text-2xl sm:text-4xl border-2 sm:border-4"
        : size === "sm"
          ? "min-w-8 sm:min-w-10 px-1 sm:px-1.5 py-0.5 sm:py-1 text-base sm:text-lg border-2"
          : "min-w-10 sm:min-w-12 px-1.5 sm:px-2 py-1 sm:py-1.5 text-xl sm:text-2xl border-2 sm:border-4";

    return (
      <div className="flex items-center gap-1 sm:gap-3 opacity-0">
        {units.map((u, i) => (
          <div key={u.label} className="flex items-center gap-1 sm:gap-3">
            <div className="flex flex-col items-center">
              <div
                className={`bg-[var(--neon-cyan)] border-black text-center font-heading font-black tabular-nums text-black ${box}`}
              >
                --
              </div>
              <span className="mt-1 text-[0.5rem] sm:text-[0.6rem] font-black uppercase tracking-widest text-current opacity-70">
                {u.label}
              </span>
            </div>
            {i < units.length - 1 && (
              <span className="-mt-3 sm:-mt-4 text-lg sm:text-xl font-black text-[var(--neon-pink)]">:</span>
            )}
          </div>
        ))}
      </div>
    );
  }

  const units = [
    { label: "Days", value: time.days },
    { label: "Hrs", value: time.hours },
    { label: "Min", value: time.minutes },
    { label: "Sec", value: time.seconds },
  ];

  const box =
    size === "lg"
      ? "min-w-12 sm:min-w-16 px-1 sm:px-3 py-1 sm:py-2 text-2xl sm:text-4xl border-2 sm:border-4"
      : size === "sm"
        ? "min-w-8 sm:min-w-10 px-1 sm:px-1.5 py-0.5 sm:py-1 text-base sm:text-lg border-2"
        : "min-w-10 sm:min-w-12 px-1.5 sm:px-2 py-1 sm:py-1.5 text-xl sm:text-2xl border-2 sm:border-4";

  return (
    <div className="flex items-center gap-1 sm:gap-3">
      {units.map((u, i) => (
        <div key={u.label} className="flex items-center gap-1 sm:gap-3">
          <div className="flex flex-col items-center">
            <div
              className={`bg-[var(--neon-cyan)] border-black text-center font-heading font-black tabular-nums text-black ${box}`}
            >
              {String(u.value).padStart(2, "0")}
            </div>
            <span className="mt-1 text-[0.5rem] sm:text-[0.6rem] font-black uppercase tracking-widest text-current opacity-70">
              {u.label}
            </span>
          </div>
          {i < units.length - 1 && (
            <span className="-mt-3 sm:-mt-4 text-lg sm:text-xl font-black text-[var(--neon-pink)]">:</span>
          )}
        </div>
      ))}
    </div>
  );
}
