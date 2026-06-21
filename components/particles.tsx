"use client";

import { useMemo, useState, useEffect } from "react";

interface ParticlesProps {
  count?: number;
  className?: string;
}

/** Lightweight floating gold/blue particles for stadium atmosphere. */
export function Particles({ count = 24, className = "" }: ParticlesProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const dots = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        bottom: Math.random() * 100,
        size: Math.random() * 3 + 1.5,
        duration: Math.random() * 8 + 6,
        delay: Math.random() * 8,
        gold: Math.random() > 0.5,
      })),
    [count],
  );

  if (!mounted) return null;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {dots.map((d) => (
        <span
          key={d.id}
          className="animate-float-particle absolute rounded-full"
          style={{
            left: `${d.left}%`,
            bottom: `${d.bottom}%`,
            width: d.size,
            height: d.size,
            background: d.gold ? "var(--gold)" : "var(--primary)",
            boxShadow: `0 0 ${d.size * 3}px ${d.gold ? "var(--gold)" : "var(--primary)"}`,
            animationDuration: `${d.duration}s`,
            animationDelay: `${d.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
