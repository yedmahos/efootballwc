"use client";

import { motion } from "framer-motion";
import { Crown, Goal, Star, Target, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { TeamFlag } from "@/components/team-flag";

const iconMap = {
  crown: Crown,
  goal: Goal,
  star: Star,
  target: Target,
  trophy: Trophy,
} as const;

export function StatCard({
  icon,
  label,
  value,
  sub,
  accent = "blue",
  index = 0,
  flag,
}: {
  icon: keyof typeof iconMap | React.ComponentType<{ className?: string }>;
  label: string;
  value: string | number;
  sub?: string;
  accent?: "blue" | "gold";
  index?: number;
  flag?: { code: string; country: string };
}) {
  const Icon = typeof icon === "string" ? iconMap[icon] : icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ x: -4, y: -4 }}
      transition={{ opacity: { duration: 0.4, delay: index * 0.08 }, y: { duration: 0.4, delay: index * 0.08 }, default: { type: "spring", stiffness: 300, damping: 20 } }}
      className={cn(
        "group relative overflow-hidden p-6 border-4 bg-black transition-all",
        accent === "gold" 
          ? "border-[var(--neon-pink)] shadow-[8px_8px_0px_0px_var(--neon-pink)] hover:shadow-[12px_12px_0px_0px_var(--neon-purple)]" 
          : "border-[var(--neon-cyan)] shadow-[8px_8px_0px_0px_var(--neon-cyan)] hover:shadow-[12px_12px_0px_0px_white]",
      )}
    >
      {/* Brutalist Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] bg-[length:4px_4px] pointer-events-none" />
      
      <div className="relative z-20 flex items-start justify-between">
        <div className="flex flex-col gap-3 min-w-0">
          <span className={cn(
            "text-sm font-black uppercase tracking-widest self-start px-2 py-1 border-2 text-black",
            accent === "gold" ? "bg-[var(--neon-pink)] border-[var(--neon-pink)]" : "bg-[var(--neon-cyan)] border-[var(--neon-cyan)]"
          )}>
            {label}
          </span>
          <span className={cn(
            "font-heading font-black tabular-nums text-white uppercase drop-shadow-[0_4px_0_rgba(255,255,255,0.2)] mt-2 flex items-center gap-3",
            flag ? "text-2xl sm:text-3xl lg:text-2xl xl:text-4xl" : "text-4xl sm:text-5xl"
          )}>
            {flag && <TeamFlag code={flag.code} country={flag.country} className="w-12 h-8 border-2 border-white object-cover shrink-0" />}
            <span className="break-words leading-tight">{value}</span>
          </span>
          {sub && (
            <span className={cn(
              "text-xs font-bold uppercase tracking-widest mt-1",
              accent === "gold" ? "text-[var(--neon-pink)]" : "text-[var(--neon-cyan)]"
            )}>
              {sub}
            </span>
          )}
        </div>
        <span
          className={cn(
            "relative z-20 grid size-14 place-items-center border-4 bg-black transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110",
            accent === "gold" ? "border-[var(--neon-pink)] text-[var(--neon-pink)] shadow-[4px_4px_0px_0px_var(--neon-pink)]" : "border-[var(--neon-cyan)] text-[var(--neon-cyan)] shadow-[4px_4px_0px_0px_var(--neon-cyan)]"
          )}
        >
          <Icon className="size-7" />
        </span>
      </div>
    </motion.div>
  );
}
