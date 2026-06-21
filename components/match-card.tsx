"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Crown, MapPin, Star } from "lucide-react";
import { teams, type Match } from "@/lib/data";
import { TeamFlag } from "@/components/team-flag";
import { cn } from "@/lib/utils";

function formatKickoff(iso: string) {
  const d = new Date(iso);
  return {
    date: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    time: d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
  };
}

export function MatchCard({ match }: { match: Match }) {
  const home = teams[match.home];
  const away = teams[match.away];
  const completed = match.status === "completed";
  const homeWin = completed && (match.homeScore ?? 0) > (match.awayScore ?? 0);
  const awayWin = completed && (match.awayScore ?? 0) > (match.homeScore ?? 0);
  const { date, time } = formatKickoff(match.kickoff);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
    >
      <Link
        href={`/match/${match.id}`}
        className="group block overflow-hidden border-4 border-white bg-black maximalist-card transition-all"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b-4 border-white bg-[var(--neon-purple)] px-4 py-3">
          <span className="text-xs font-black uppercase tracking-widest text-black">
            Matchday {match.matchday}
          </span>
          <span
            className={cn(
              "border-2 border-black bg-black px-2 py-1 text-[0.65rem] font-black uppercase tracking-wider text-white",
            )}
          >
            {completed ? "Full Time" : "Upcoming"}
          </span>
        </div>

        {/* Teams + score */}
        <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-1 sm:gap-2 px-2 sm:px-4 py-6">
          <TeamSide team={home} side="home" win={homeWin} />

          <div className="flex flex-col items-center px-1 sm:px-2 shrink-0">
            {completed ? (
              <div className="flex items-center gap-1 sm:gap-2 font-heading text-3xl sm:text-4xl font-black tabular-nums">
                <span
                  className={cn(
                    homeWin ? "text-white" : "text-muted-foreground",
                  )}
                >
                  {match.homeScore}
                </span>
                <span className="text-muted-foreground">-</span>
                <span
                  className={cn(
                    awayWin ? "text-white" : "text-muted-foreground",
                  )}
                >
                  {match.awayScore}
                </span>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <span className="font-heading text-xl sm:text-2xl font-black text-[var(--neon-cyan)] text-outline-thick">
                  {time}
                </span>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white mt-1">
                  {date}
                </span>
              </div>
            )}
            <span className="mt-1 sm:mt-2 bg-white text-black px-2 py-0.5 text-[0.6rem] sm:text-[0.65rem] font-black uppercase tracking-widest border-2 border-black">
              {completed ? "VS" : "Kickoff"}
            </span>
          </div>

          <TeamSide team={away} side="away" win={awayWin} />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-2 border-t-4 border-white bg-black px-4 py-3 text-xs font-bold uppercase text-white">
          <span className="flex min-w-0 items-center gap-2">
            <MapPin className="size-4 shrink-0" />
            <span className="truncate">{match.stadium}</span>
          </span>
          {completed && match.mvp ? (
            <span className="flex shrink-0 items-center gap-1 text-[var(--neon-pink)]">
              <Star className="size-4 fill-[var(--neon-pink)]" />
              MVP {match.mvp}
            </span>
          ) : (
            <span className="shrink-0 transition-colors group-hover:text-[var(--neon-cyan)]">
              View details →
            </span>
          )}
        </div>
      </Link>
    </motion.div>
  );
}

function TeamSide({
  team,
  side,
  win,
}: {
  team: (typeof teams)[keyof typeof teams];
  side: "home" | "away";
  win: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between w-full min-w-0 gap-2",
        side === "away" && "flex-row-reverse"
      )}
    >
      <TeamFlag code={team.code} country={team.country} className="h-7 w-10 shrink-0" />
      <div className={cn("flex flex-col min-w-0", side === "home" ? "items-end" : "items-start")}>
        <span className={cn(
          "flex items-center gap-1.5 font-heading text-base font-black uppercase tracking-wide text-white",
          side === "away" && "flex-row-reverse"
        )}>
          {win && <Crown className="size-4 shrink-0 text-gold fill-gold" />}
          <span>{team.id}</span>
        </span>
      </div>
    </div>
  );
}
