"use client";

import { Crown } from "lucide-react";
import { computeStandings, completedMatches, matches } from "@/lib/data";
import { TeamFlag } from "@/components/team-flag";
import { SectionHeading } from "@/components/section-heading";
import { cn } from "@/lib/utils";

export default function StandingsPage() {
  const standings = computeStandings();
  const isTournamentOver = completedMatches.length === matches.length && matches.length > 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
      <div className="mb-12">
        <SectionHeading
          eyebrow="The Leaderboard"
          title="Standings"
          description="Only the strong survive. Tracking points, goals, and the brutal race to the top."
        />
      </div>

      <div className="maximalist-card p-0 bg-black w-full">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-max">
            <thead>
            <tr className="bg-[var(--neon-purple)] border-b-4 border-white text-white">
              <th className="px-2 py-3 sm:px-6 sm:py-4 font-heading text-sm sm:text-lg font-black uppercase tracking-widest border-r-4 border-white w-10 sm:w-16 text-center">#</th>
              <th className="px-3 py-3 sm:px-6 sm:py-4 font-heading text-sm sm:text-lg font-black uppercase tracking-widest border-r-4 border-white">Nation</th>
              <th className="px-2 py-3 sm:px-6 sm:py-4 font-heading text-sm sm:text-lg font-black uppercase tracking-widest border-r-4 border-white text-center">P</th>
              <th className="px-2 py-3 sm:px-6 sm:py-4 font-heading text-sm sm:text-lg font-black uppercase tracking-widest border-r-4 border-white text-center">W</th>
              <th className="px-2 py-3 sm:px-6 sm:py-4 font-heading text-sm sm:text-lg font-black uppercase tracking-widest border-r-4 border-white text-center">D</th>
              <th className="px-2 py-3 sm:px-6 sm:py-4 font-heading text-sm sm:text-lg font-black uppercase tracking-widest border-r-4 border-white text-center">L</th>
              <th className="px-2 py-3 sm:px-6 sm:py-4 font-heading text-sm sm:text-lg font-black uppercase tracking-widest border-r-4 border-white text-center hidden sm:table-cell">GF</th>
              <th className="px-2 py-3 sm:px-6 sm:py-4 font-heading text-sm sm:text-lg font-black uppercase tracking-widest border-r-4 border-white text-center hidden sm:table-cell">GA</th>
              <th className="px-2 py-3 sm:px-6 sm:py-4 font-heading text-sm sm:text-lg font-black uppercase tracking-widest border-r-4 border-white text-center hidden md:table-cell">GD</th>
              <th className="px-3 py-3 sm:px-6 sm:py-4 font-heading text-base sm:text-xl font-black uppercase tracking-widest text-center text-black bg-[var(--neon-cyan)]">Pts</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((row, idx) => {
              const isTop = idx === 0;
              return (
                <tr
                  key={row.team.id}
                  className={cn(
                    "border-b-4 border-white transition-colors hover:bg-white/10 group",
                    idx === standings.length - 1 && "border-b-0",
                  )}
                >
                  <td className="px-2 py-4 sm:px-6 sm:py-6 border-r-4 border-white text-center bg-white/5">
                    <span className={cn(
                      "font-heading text-xl sm:text-3xl font-black",
                      isTop ? "text-white" : "text-white/50"
                    )}>
                      {row.rank}
                    </span>
                  </td>
                  <td className="px-3 py-4 sm:px-6 sm:py-6 border-r-4 border-white">
                    <div className="flex items-center gap-2 sm:gap-4">
                      <TeamFlag code={row.team.code} country={row.team.country} className="w-8 h-5 sm:w-12 sm:h-8 border-2 border-white object-cover shrink-0" />
                      <div className="flex flex-col">
                        <span className="font-heading text-base sm:text-2xl font-black uppercase tracking-wide text-white group-hover:text-[var(--neon-cyan)] transition-colors flex items-center gap-1 sm:gap-2">
                          {row.team.country}
                          {isTop && isTournamentOver && <Crown className="size-4 sm:size-6 text-gold fill-gold" />}
                        </span>
                        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white/50">
                          {row.team.player}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-2 py-4 sm:px-6 sm:py-6 border-r-4 border-white text-center font-bold text-white text-base sm:text-xl">{row.played}</td>
                  <td className="px-2 py-4 sm:px-6 sm:py-6 border-r-4 border-white text-center font-bold text-[var(--neon-cyan)] text-base sm:text-xl">{row.wins}</td>
                  <td className="px-2 py-4 sm:px-6 sm:py-6 border-r-4 border-white text-center font-bold text-white/70 text-base sm:text-xl">{row.draws}</td>
                  <td className="px-2 py-4 sm:px-6 sm:py-6 border-r-4 border-white text-center font-bold text-[var(--neon-pink)] text-base sm:text-xl">{row.losses}</td>
                  <td className="px-2 py-4 sm:px-6 sm:py-6 border-r-4 border-white text-center font-bold text-white text-base sm:text-xl hidden sm:table-cell">{row.goalsFor}</td>
                  <td className="px-2 py-4 sm:px-6 sm:py-6 border-r-4 border-white text-center font-bold text-white text-base sm:text-xl hidden sm:table-cell">{row.goalsAgainst}</td>
                  <td className="px-2 py-4 sm:px-6 sm:py-6 border-r-4 border-white text-center font-bold text-white text-base sm:text-xl hidden md:table-cell">
                    {row.goalDiff > 0 ? `+${row.goalDiff}` : row.goalDiff}
                  </td>
                  <td className="px-3 py-4 sm:px-6 sm:py-6 font-heading text-2xl sm:text-4xl font-black text-center text-white bg-white/5 group-hover:bg-[var(--neon-cyan)] group-hover:text-black transition-colors">
                    {row.points}
                  </td>
                </tr>
              );
            })}
          </tbody>
          </table>
        </div>
      </div>

      <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6 border-4 border-white bg-[var(--neon-cyan)] text-black shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
        <div className="flex flex-col gap-2 flex-1">
          <h4 className="font-heading text-2xl font-black uppercase">Form Guide</h4>
          <p className="text-sm font-bold uppercase tracking-widest">
            Last 5 matches. Green = Win, Gray = Draw, Red = Loss.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          {standings.map((row) => (
            <div key={`form-${row.team.id}`} className="flex items-center justify-end gap-3">
              <TeamFlag code={row.team.code} country={row.team.country} className="w-8 h-5 border-2 border-black object-cover hidden sm:block shrink-0" />
              <span className="text-xs font-black uppercase tracking-widest w-12 text-right shrink-0">{row.team.id}</span>
              <div className="flex gap-1">
                {row.form.length === 0 ? (
                  <span className="text-xs font-bold uppercase tracking-widest text-black/50">No matches yet</span>
                ) : (
                  row.form.map((result, i) => (
                    <span
                      key={i}
                      className={cn(
                        "flex items-center justify-center w-6 h-6 border-2 border-black text-xs font-black",
                        result === "W" ? "bg-black text-[var(--neon-cyan)]" : result === "D" ? "bg-white text-black" : "bg-[var(--neon-pink)] text-black"
                      )}
                    >
                      {result}
                    </span>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
