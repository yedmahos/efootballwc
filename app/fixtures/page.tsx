"use client";

import { useState } from "react";
import Link from "next/link";
import { ShieldAlert, MapPin, Target } from "lucide-react";
import { matches, teams } from "@/lib/data";
import { TeamFlag } from "@/components/team-flag";
import { SectionHeading } from "@/components/section-heading";
import { Countdown } from "@/components/countdown";
import { cn } from "@/lib/utils";

export default function FixturesPage() {
  const [filter, setFilter] = useState<"all" | "upcoming" | "completed">("all");

  const filteredMatches = matches.filter((m) => {
    if (filter === "upcoming") return m.status === "upcoming";
    if (filter === "completed") return m.status === "completed";
    return true;
  });

  const matchdays = Array.from(
    new Set(filteredMatches.map((m) => m.matchday)),
  ).sort((a, b) => a - b);

  const nextUpcoming = matches
    .filter((m) => m.status === "upcoming")
    .sort(
      (a, b) => new Date(a.kickoff).getTime() - new Date(b.kickoff).getTime(),
    )[0];

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
      <div className="mb-12">
        <SectionHeading
          eyebrow="The Schedule"
          title="Match Center"
          description="Every brutal encounter on the road to the final. No mercy."
        />
      </div>

      {nextUpcoming && (
        <div className="mb-16 border-8 border-white bg-black p-6 sm:p-10 shadow-[16px_16px_0px_0px_var(--neon-purple)] relative overflow-hidden group">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:10px_10px]" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="flex flex-col gap-4">
              <span className="inline-block bg-[var(--neon-pink)] text-black px-4 py-1 font-black uppercase tracking-widest border-2 border-white self-start transform -rotate-2">
                Next Match Live
              </span>
              <h3 className="font-heading text-4xl sm:text-5xl font-black uppercase text-white drop-shadow-[0_4px_0_var(--neon-cyan)]">
                {teams[nextUpcoming.home].country} VS {teams[nextUpcoming.away].country}
              </h3>
              <p className="text-xl font-bold uppercase tracking-widest text-[var(--neon-cyan)] flex items-center gap-2">
                <MapPin className="size-6" />
                {nextUpcoming.stadium} &middot; {nextUpcoming.matchday === 7 ? "Third Place Play-off" : nextUpcoming.matchday === 8 ? "The Final" : `Matchday ${nextUpcoming.matchday}`}
              </p>
            </div>

            <div className="flex flex-col items-center md:items-end gap-2 shrink-0 bg-white p-4 sm:p-6 border-4 border-black transform rotate-1 group-hover:rotate-0 transition-transform w-full md:w-auto">
              <span className="text-black font-black uppercase tracking-widest text-sm">Kickoff Countdown</span>
              <div className="text-black">
                <Countdown target={nextUpcoming.kickoff} size="lg" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-black/70 mt-2">
                {new Date(nextUpcoming.kickoff).toLocaleString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Brutalist Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between border-b-4 border-white pb-6 mb-12 gap-6">
        <div className="flex flex-wrap items-center gap-2">
          {(["all", "upcoming", "completed"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={cn(
                "px-3 py-2 sm:px-6 sm:py-3 font-heading text-base sm:text-lg font-black uppercase tracking-widest transition-transform border-4 border-white",
                filter === t
                  ? "bg-white text-black translate-x-1 -translate-y-1 shadow-[4px_4px_0px_0px_var(--neon-cyan)]"
                  : "bg-black text-white hover:bg-white hover:text-black",
              )}
            >
              {t}
            </button>
          ))}
        </div>
        <span className="text-xl font-black uppercase tracking-widest text-white bg-black border-4 border-white px-4 py-2">
          {filteredMatches.length} / {matches.length}
        </span>
      </div>

      {filteredMatches.length === 0 ? (
        <div className="maximalist-card flex flex-col items-center text-center p-16">
          <ShieldAlert className="size-16 text-[var(--neon-pink)] mb-6" />
          <h3 className="font-heading text-3xl font-black uppercase text-white">No Matches</h3>
          <p className="text-lg font-bold uppercase tracking-widest text-[var(--neon-cyan)] mt-2">
            Change your filter.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-16">
          {matchdays.map((day) => {
            const dayMatches = filteredMatches.filter((m) => m.matchday === day);
            return (
              <div key={day} className="flex flex-col gap-8">
                <div className="flex items-center gap-6">
                  <span className="font-heading text-3xl font-black uppercase tracking-widest text-black bg-[var(--neon-cyan)] px-6 py-2 border-4 border-white transform -skew-x-6">
                    {day === 7 ? "Third Place Play-off" : day === 8 ? "The Final" : `Matchday ${day}`}
                  </span>
                  <div className="h-1 flex-1 bg-white" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {dayMatches.map((match) => {
                    const home = teams[match.home];
                    const away = teams[match.away];
                    const date = new Date(match.kickoff);
                    const isUpcoming = match.status === "upcoming";

                    return (
                      <Link
                        key={match.id}
                        href={`/match/${match.id}`}
                        className="group relative block bg-black border-4 border-white p-6 transition-all hover:-translate-y-2 hover:translate-x-2 hover:shadow-[-8px_8px_0px_0px_var(--neon-pink)]"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                          <div className="flex-1 flex flex-col gap-4">
                            {/* Home */}
                            <div className="flex items-center gap-4 bg-white/5 p-3 border-2 border-transparent group-hover:border-[var(--neon-cyan)] transition-colors">
                              <TeamFlag code={home.code} country={home.country} className="w-10 h-7 border-2 border-white object-cover shrink-0" />
                              <span className="text-xl font-black uppercase text-white group-hover:text-[var(--neon-cyan)] transition-colors">
                                {home.country}
                              </span>
                              {!isUpcoming && (
                                <span className="ml-auto font-heading text-3xl font-black text-white">
                                  {match.homeScore}
                                </span>
                              )}
                            </div>

                            {/* Away */}
                            <div className="flex items-center gap-4 bg-white/5 p-3 border-2 border-transparent group-hover:border-[var(--neon-pink)] transition-colors">
                              <TeamFlag code={away.code} country={away.country} className="w-10 h-7 border-2 border-white object-cover shrink-0" />
                              <span className="text-xl font-black uppercase text-white group-hover:text-[var(--neon-pink)] transition-colors">
                                {away.country}
                              </span>
                              {!isUpcoming && (
                                <span className="ml-auto font-heading text-3xl font-black text-white">
                                  {match.awayScore}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Desktop Divider */}
                          <div className="hidden sm:block w-1 h-32 bg-white shrink-0" />
                          {/* Mobile Divider */}
                          <div className="sm:hidden h-1 w-full bg-white shrink-0" />

                          <div className="flex flex-row sm:flex-col items-center justify-between sm:justify-center gap-2 shrink-0 w-full sm:w-32 text-center">
                            {isUpcoming ? (
                              <>
                                <span className="bg-[var(--neon-cyan)] text-black font-black uppercase tracking-widest px-3 py-1 border-2 border-white text-xs">
                                  Up Next
                                </span>
                                <div className="flex flex-col items-end sm:items-center">
                                  <span className="text-xl font-black text-white">
                                    {date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                                  </span>
                                  <span className="text-sm font-bold uppercase tracking-widest text-white/50">
                                    {date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                                  </span>
                                </div>
                              </>
                            ) : (
                              <>
                                <span className="bg-white text-black font-black uppercase tracking-widest px-3 py-1 border-2 border-black text-xs">
                                  Full Time
                                </span>
                                <span className="text-sm font-bold uppercase tracking-widest text-[var(--neon-pink)] sm:mt-4 flex items-center gap-1 group-hover:underline">
                                  <Target className="size-4" />
                                  Details
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
