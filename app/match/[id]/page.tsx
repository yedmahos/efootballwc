"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Trophy,
  ArrowLeft,
  MapPin,
  Calendar,
  Clock,
  Star,
  ShieldAlert,
} from "lucide-react";
import { getMatch, teams, computeStandings } from "@/lib/data";
import { TeamFlag } from "@/components/team-flag";

interface MatchPageProps {
  params: Promise<{ id: string }>;
}

export default function MatchDetailPage({ params }: MatchPageProps) {
  const { id } = React.use(params);
  const matchId = parseInt(id);
  const match = getMatch(matchId);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!match) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 lg:px-8 text-center flex flex-col items-center justify-center maximalist-card">
        <ShieldAlert className="size-16 text-[var(--neon-pink)] mb-6" />
        <h2 className="font-heading text-3xl font-black uppercase text-white">
          Match Not Found
        </h2>
        <p className="text-lg font-bold uppercase tracking-widest text-[var(--neon-cyan)] mt-2">
          The match with ID #{id} does not exist.
        </p>
        <Link
          href="/fixtures"
          className="mt-8 bg-white text-black px-6 py-3 border-4 border-black font-heading text-xl font-black uppercase tracking-widest hover:-translate-y-1 hover:translate-x-1 shadow-[4px_4px_0px_0px_var(--neon-pink)] transition-transform inline-flex items-center gap-2"
        >
          <ArrowLeft className="size-6" /> Back to Fixtures
        </Link>
      </div>
    );
  }

  const home = teams[match.home];
  const away = teams[match.away];
  const isUpcoming = match.status === "upcoming";
  const kickoffDate = new Date(match.kickoff);

  const standings = computeStandings();
  const homeStats = standings.find((s) => s.team.id === match.home);
  const awayStats = standings.find((s) => s.team.id === match.away);

  if (!mounted) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 lg:px-8 flex items-center justify-center">
        <div className="size-12 border-8 border-[var(--neon-cyan)] border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      {/* Back to schedule */}
      <Link
        href="/fixtures"
        className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-white bg-black border-2 border-white px-4 py-2 hover:bg-white hover:text-black transition-colors mb-8"
      >
        <ArrowLeft className="size-4 shrink-0" />
        Back to Schedule
      </Link>

      {/* Main Scoreboard / Banner */}
      <div className="relative overflow-hidden bg-black border-8 border-white p-6 sm:p-12 shadow-[16px_16px_0px_0px_var(--neon-purple)] mb-12 group">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:10px_10px]" />
        
        <div className="relative z-10 flex flex-col items-center gap-8">
          <span
            className={`px-4 py-1 text-sm font-black uppercase tracking-widest border-2 ${
              isUpcoming
                ? "bg-[var(--neon-cyan)] border-white text-black"
                : "bg-white border-black text-black"
            } transform -rotate-2 self-center`}
          >
            {isUpcoming
              ? `Matchday ${match.matchday} // Upcoming`
              : "Full Time // Completed"}
          </span>

          <div className="flex flex-row items-center justify-between gap-2 sm:gap-4 w-full">
            {/* Home Team */}
            <div className="flex flex-col items-center sm:items-end gap-2 sm:gap-4 flex-1 min-w-0">
              <TeamFlag
                code={home.code}
                country={home.country}
                className="h-12 w-20 sm:h-24 sm:w-36 border-2 sm:border-4 border-white object-cover shadow-[4px_4px_0px_0px_var(--neon-cyan)] sm:shadow-[8px_8px_0px_0px_var(--neon-cyan)] shrink-0"
              />
              <div className="text-center sm:text-right">
                <h2 className="font-heading text-xl sm:text-5xl font-black uppercase text-white drop-shadow-[0_2px_0_var(--neon-cyan)] sm:drop-shadow-[0_4px_0_var(--neon-cyan)] break-words">
                  {home.country}
                </h2>
                <span className="text-[10px] sm:text-sm font-bold uppercase tracking-widest text-white/70 bg-white/10 px-1 sm:px-2 py-0.5 sm:py-1 mt-1 sm:mt-2 inline-block border-2 border-transparent break-words">
                  PRO: {home.player}
                </span>
              </div>
            </div>

            {/* Score or VS */}
            <div className="flex flex-col items-center justify-center shrink-0 min-w-0 sm:min-w-32 z-20 my-0">
              {isUpcoming ? (
                <div className="bg-white text-black p-2 sm:p-4 border-2 sm:border-4 border-black transform rotate-3 scale-90 sm:scale-110 shadow-[4px_4px_0px_0px_var(--neon-pink)] sm:shadow-[8px_8px_0px_0px_var(--neon-pink)]">
                  <span className="font-heading text-3xl sm:text-6xl font-black uppercase">
                    VS
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-1 sm:gap-4 bg-white text-black p-2 sm:p-6 border-2 sm:border-8 border-black transform -rotate-2 shadow-[4px_4px_0px_0px_var(--neon-pink)] sm:shadow-[8px_8px_0px_0px_var(--neon-pink)]">
                  <span className="font-heading text-4xl sm:text-7xl font-black">{match.homeScore}</span>
                  <span className="text-black/30 font-heading text-3xl sm:text-5xl">-</span>
                  <span className="font-heading text-4xl sm:text-7xl font-black">{match.awayScore}</span>
                </div>
              )}
            </div>

            {/* Away Team */}
            <div className="flex flex-col items-center sm:items-start gap-2 sm:gap-4 flex-1 min-w-0">
              <TeamFlag
                code={away.code}
                country={away.country}
                className="h-12 w-20 sm:h-24 sm:w-36 border-2 sm:border-4 border-white object-cover shadow-[4px_4px_0px_0px_var(--neon-pink)] sm:shadow-[8px_8px_0px_0px_var(--neon-pink)] shrink-0"
              />
              <div className="text-center sm:text-left">
                <h2 className="font-heading text-xl sm:text-5xl font-black uppercase text-white drop-shadow-[0_2px_0_var(--neon-pink)] sm:drop-shadow-[0_4px_0_var(--neon-pink)] break-words">
                  {away.country}
                </h2>
                <span className="text-[10px] sm:text-sm font-bold uppercase tracking-widest text-white/70 bg-white/10 px-1 sm:px-2 py-0.5 sm:py-1 mt-1 sm:mt-2 inline-block border-2 border-transparent break-words">
                  PRO: {away.player}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-sm font-bold uppercase tracking-widest text-[var(--neon-cyan)] mt-4 bg-black border-4 border-white p-4">
            <span className="flex items-center gap-2">
              <MapPin className="size-5 shrink-0" /> {match.stadium}
            </span>
            <span className="text-white hidden sm:block">||</span>
            <span className="flex items-center gap-2">
              <Calendar className="size-5 shrink-0" />
              {kickoffDate.toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </span>
            <span className="text-white hidden sm:block">||</span>
            <span className="flex items-center gap-2">
              <Clock className="size-5 shrink-0" />
              {kickoffDate.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-8">
          {!isUpcoming && (
            <div className="bg-black border-4 border-white p-6 sm:p-8 shadow-[8px_8px_0px_0px_white]">
              <h3 className="font-heading text-2xl font-black uppercase text-white border-b-4 border-white pb-4 mb-6">
                Match Timeline & Goals
              </h3>

              {match.goals && match.goals.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {match.goals.map((goal, idx) => {
                    const goalTeam = teams[goal.team];
                    const isHomeScorer = goal.team === match.home;

                    return (
                      <div
                        key={idx}
                        className={`flex items-center gap-4 p-4 border-4 border-current bg-white/5 ${
                          isHomeScorer 
                            ? "text-[var(--neon-cyan)]" 
                            : "flex-row-reverse text-[var(--neon-pink)]"
                        }`}
                      >
                        <TeamFlag
                          code={goalTeam.code}
                          country={goalTeam.country}
                          className="h-8 w-12 border-2 border-white object-cover shrink-0"
                        />
                        <span className="font-heading text-2xl font-black uppercase text-white">
                          {goal.scorer}
                        </span>
                        <span
                          className={`font-heading text-3xl font-black ${
                            isHomeScorer ? "ml-auto" : "mr-auto"
                          }`}
                        >
                          {goal.minute}'
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-white text-black p-6 border-4 border-black font-black uppercase tracking-widest text-center">
                  0-0 Draw. No Goals.
                </div>
              )}

              {match.mvp && (
                <div className="mt-8 bg-[var(--neon-cyan)] text-black p-6 border-4 border-black flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Star className="size-8" />
                    <span className="font-black uppercase tracking-widest">
                      Most Valuable Player
                    </span>
                  </div>
                  <span className="font-heading text-4xl font-black uppercase">
                    {match.mvp}
                  </span>
                </div>
              )}
            </div>
          )}

          {!isUpcoming && (
            <div className="bg-black border-4 border-white p-6 sm:p-8 shadow-[8px_8px_0px_0px_var(--neon-cyan)]">
              <h3 className="font-heading text-2xl font-black uppercase text-white border-b-4 border-white pb-4 mb-8">
                Raw Statistics
              </h3>

              <div className="flex flex-col gap-8">
                {match.possession && (
                  <StatBar
                    label="Possession %"
                    homeValue={match.possession.home}
                    awayValue={match.possession.away}
                    homeColor="bg-[var(--neon-cyan)]"
                    awayColor="bg-[var(--neon-pink)]"
                  />
                )}
                {match.shots && (
                  <StatBar
                    label="Total Shots"
                    homeValue={match.shots.home}
                    awayValue={match.shots.away}
                    homeColor="bg-[var(--neon-cyan)]"
                    awayColor="bg-[var(--neon-pink)]"
                  />
                )}
                {match.shotsOnTarget && (
                  <StatBar
                    label="Shots on Target"
                    homeValue={match.shotsOnTarget.home}
                    awayValue={match.shotsOnTarget.away}
                    homeColor="bg-[var(--neon-cyan)]"
                    awayColor="bg-[var(--neon-pink)]"
                  />
                )}
                {match.corners && (
                  <StatBar
                    label="Corner Kicks"
                    homeValue={match.corners.home}
                    awayValue={match.corners.away}
                    homeColor="bg-[var(--neon-cyan)]"
                    awayColor="bg-[var(--neon-pink)]"
                  />
                )}
              </div>
            </div>
          )}

          {isUpcoming && (
            <div className="bg-black border-4 border-white p-6 sm:p-8 shadow-[8px_8px_0px_0px_white]">
              <h3 className="font-heading text-2xl font-black uppercase text-white border-b-4 border-white pb-4 mb-8">
                Head-to-Head Comparison
              </h3>

              {homeStats && awayStats ? (
                <div className="flex flex-col gap-8">
                  <StatBar
                    label="Current Rank"
                    homeValue={4 - homeStats.rank}
                    awayValue={4 - awayStats.rank}
                    formatValue={(val) => `#${4 - val}`}
                    homeColor="bg-[var(--neon-cyan)]"
                    awayColor="bg-[var(--neon-pink)]"
                  />
                  <StatBar
                    label="Victories"
                    homeValue={homeStats.wins}
                    awayValue={awayStats.wins}
                    homeColor="bg-[var(--neon-cyan)]"
                    awayColor="bg-[var(--neon-pink)]"
                  />
                  <StatBar
                    label="Goals Scored"
                    homeValue={homeStats.goalsFor}
                    awayValue={awayStats.goalsFor}
                    homeColor="bg-[var(--neon-cyan)]"
                    awayColor="bg-[var(--neon-pink)]"
                  />
                  <StatBar
                    label="Goal Difference"
                    homeValue={homeStats.goalDiff + 20}
                    awayValue={awayStats.goalDiff + 20}
                    formatValue={(val) => String(val - 20)}
                    homeColor="bg-[var(--neon-cyan)]"
                    awayColor="bg-[var(--neon-pink)]"
                  />
                </div>
              ) : (
                <div className="bg-white text-black p-6 border-4 border-black font-black uppercase tracking-widest text-center">
                  Tournament data unavailable.
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-8">
          <div className="bg-black border-4 border-[var(--neon-pink)] p-6 shadow-[8px_8px_0px_0px_var(--neon-pink)]">
            <h4 className="font-heading text-xl font-black uppercase tracking-widest text-white flex items-center gap-3 border-b-4 border-[var(--neon-pink)] pb-4 mb-6">
              <Trophy className="size-6 text-[var(--neon-pink)]" /> Group Table Context
            </h4>

            <div className="flex flex-col gap-6">
              {homeStats && (
                <div className="bg-white/5 border-4 border-white p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <TeamFlag
                        code={home.code}
                        country={home.country}
                        className="h-6 w-10 border-2 border-white object-cover"
                      />
                      <span className="font-black uppercase text-lg text-white">
                        {home.country}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center bg-[var(--neon-cyan)] text-black font-black px-3 py-2 border-2 border-black">
                    <span>RANK #{homeStats.rank}</span>
                    <span>{homeStats.points} PTS</span>
                  </div>
                </div>
              )}

              {awayStats && (
                <div className="bg-white/5 border-4 border-white p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <TeamFlag
                        code={away.code}
                        country={away.country}
                        className="h-6 w-10 border-2 border-white object-cover"
                      />
                      <span className="font-black uppercase text-lg text-white">
                        {away.country}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center bg-[var(--neon-pink)] text-black font-black px-3 py-2 border-2 border-black">
                    <span>RANK #{awayStats.rank}</span>
                    <span>{awayStats.points} PTS</span>
                  </div>
                </div>
              )}
            </div>

            <p className="text-sm font-bold uppercase tracking-widest text-white/70 mt-6 leading-relaxed bg-black border-4 border-white p-4">
              Direct impact on standings. <Link href="/standings" className="text-[var(--neon-pink)] hover:text-white underline">View Table</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Brutalist Stat Bar Component
function StatBar({
  label,
  homeValue,
  awayValue,
  formatValue,
  homeColor,
  awayColor,
}: {
  label: string;
  homeValue: number;
  awayValue: number;
  formatValue?: (val: number) => string;
  homeColor: string;
  awayColor: string;
}) {
  const total = homeValue + awayValue;
  const percentage = total > 0 ? (homeValue / total) * 100 : 50;

  const homeLabel = formatValue ? formatValue(homeValue) : String(homeValue);
  const awayLabel = formatValue ? formatValue(awayValue) : String(awayValue);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-lg font-black uppercase text-white mb-1">
        <span className="bg-white/10 px-2 py-1">{homeLabel}</span>
        <span className="text-sm text-white/50">{label}</span>
        <span className="bg-white/10 px-2 py-1">{awayLabel}</span>
      </div>
      <div className="h-6 w-full flex border-4 border-white bg-black">
        <div 
          className={`h-full ${homeColor} border-r-4 border-white`} 
          style={{ width: `${percentage}%` }}
        />
        <div 
          className={`h-full ${awayColor}`} 
          style={{ width: `${100 - percentage}%` }}
        />
      </div>
    </div>
  );
}
