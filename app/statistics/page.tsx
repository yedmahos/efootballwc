"use client";

import { BarChart3, Target, Goal, Trophy } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { getStats, teams } from "@/lib/data";
import { SectionHeading } from "@/components/section-heading";
import { TeamFlag } from "@/components/team-flag";

export default function StatisticsPage() {
  const stats = getStats();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
      <div className="mb-12 border-b-8 border-white pb-6">
        <SectionHeading
          eyebrow="The Data"
          title="Raw Statistics"
          description="Numbers don't lie. Deep dive into the raw metrics of the tournament."
        />
      </div>

      {/* Massive Top Level Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-16">
        <div className="border-4 border-white bg-[var(--neon-purple)] text-white p-8 hover:-translate-y-2 transition-transform shadow-[8px_8px_0px_0px_white]">
          <Goal className="size-12 mb-4" />
          <p className="text-sm font-black uppercase tracking-widest border-b-2 border-white pb-2 mb-4">Total Goals</p>
          <p className="font-heading text-7xl font-black">{stats.totalGoals}</p>
          <p className="text-xl font-bold uppercase mt-2 opacity-80">{stats.avgGoals} Per Match</p>
        </div>

        <div className="border-4 border-white bg-black text-white p-8 hover:-translate-y-2 transition-transform shadow-[8px_8px_0px_0px_var(--neon-cyan)]">
          <Target className="size-12 mb-4 text-[var(--neon-cyan)]" />
          <p className="text-sm font-black uppercase tracking-widest border-b-2 border-white pb-2 mb-4 text-[var(--neon-cyan)]">Matches Played</p>
          <p className="font-heading text-7xl font-black">{stats.playedMatches}</p>
          <p className="text-xl font-bold uppercase mt-2 opacity-80">Out of {stats.totalMatches}</p>
        </div>

        <div className="border-4 border-white bg-[var(--neon-pink)] text-black p-8 hover:-translate-y-2 transition-transform shadow-[8px_8px_0px_0px_white]">
          <BarChart3 className="size-12 mb-4" />
          <p className="text-sm font-black uppercase tracking-widest border-b-2 border-black pb-2 mb-4">Best Attack</p>
          <div className="flex items-center gap-3">
            <TeamFlag code={stats.bestAttack.team.code} country={stats.bestAttack.team.country} className="w-12 h-8 border-2 border-black object-cover shrink-0" />
            <p className="font-heading text-5xl font-black">{stats.bestAttack.team.id}</p>
          </div>
          <p className="text-xl font-bold uppercase mt-2">{stats.bestAttack.goals} Goals Scored</p>
        </div>

        <div className="border-4 border-white bg-[var(--neon-cyan)] text-black p-8 hover:-translate-y-2 transition-transform shadow-[8px_8px_0px_0px_black]">
          <Trophy className="size-12 mb-4" />
          <p className="text-sm font-black uppercase tracking-widest border-b-2 border-black pb-2 mb-4">Most Wins</p>
          <div className="flex items-center gap-3">
            <TeamFlag code={stats.mostWins.team.code} country={stats.mostWins.team.country} className="w-12 h-8 border-2 border-black object-cover shrink-0" />
            <p className="font-heading text-5xl font-black">{stats.mostWins.team.id}</p>
          </div>
          <p className="text-xl font-bold uppercase mt-2">{stats.mostWins.wins} Victories</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="border-4 border-white bg-black p-6 sm:p-10 shadow-[12px_12px_0px_0px_var(--neon-pink)]">
          <h3 className="font-heading text-3xl font-black uppercase text-white mb-2">Goal Distribution</h3>
          <p className="text-sm font-bold uppercase tracking-widest text-white/50 mb-8">
            Total goals scored by each nation.
          </p>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.goalsByTeam} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis 
                  dataKey="country" 
                  stroke="#fff" 
                  tick={{ fill: "#fff", fontSize: 12, fontWeight: "bold", textTransform: "uppercase" }} 
                  axisLine={{ stroke: '#fff', strokeWidth: 4 }}
                  tickLine={{ stroke: '#fff', strokeWidth: 4 }}
                />
                <YAxis 
                  stroke="#fff" 
                  tick={{ fill: "#fff", fontSize: 12, fontWeight: "bold" }}
                  axisLine={{ stroke: '#fff', strokeWidth: 4 }}
                  tickLine={{ stroke: '#fff', strokeWidth: 4 }}
                />
                <Tooltip
                  cursor={{ fill: "rgba(255,255,255,0.1)" }}
                  contentStyle={{
                    backgroundColor: "#000",
                    border: "4px solid #fff",
                    borderRadius: "0px",
                    fontFamily: "var(--font-geist-mono)",
                    textTransform: "uppercase",
                    fontWeight: "bold",
                    color: "#fff"
                  }}
                />
                <Bar dataKey="goals" radius={[0, 0, 0, 0]} stroke="#fff" strokeWidth={4}>
                  {stats.goalsByTeam.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="border-4 border-white bg-black p-6 sm:p-10 shadow-[12px_12px_0px_0px_var(--neon-cyan)]">
          <h3 className="font-heading text-3xl font-black uppercase text-white mb-2">Highest Scoring Match</h3>
          <p className="text-sm font-bold uppercase tracking-widest text-white/50 mb-8">
            The most explosive game so far.
          </p>

          {stats.highestScoringMatch && (
            <div className="flex flex-col h-full justify-center">
              <div className="bg-white text-black border-4 border-white p-8">
                <div className="flex justify-between items-center mb-6 border-b-4 border-black pb-4">
                  <span className="font-black uppercase tracking-widest text-sm bg-black text-white px-3 py-1">
                    Matchday {stats.highestScoringMatch.matchday}
                  </span>
                  <span className="font-black uppercase tracking-widest text-sm text-black/50">
                    {stats.highestScoringMatch.stadium}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 text-center">
                  <div className="flex flex-col items-center flex-1 gap-2">
                    <TeamFlag code={teams[stats.highestScoringMatch.home].code} country={teams[stats.highestScoringMatch.home].country} className="w-16 h-10 border-2 border-black object-cover" />
                    <span className="font-heading text-3xl font-black uppercase">
                      {stats.highestScoringMatch.home}
                    </span>
                    <span className="font-heading text-7xl font-black mt-1 text-[var(--neon-purple)]">
                      {stats.highestScoringMatch.homeScore}
                    </span>
                  </div>

                  <div className="w-2 h-24 bg-black skew-x-12 shrink-0" />

                  <div className="flex flex-col items-center flex-1 gap-2">
                    <TeamFlag code={teams[stats.highestScoringMatch.away].code} country={teams[stats.highestScoringMatch.away].country} className="w-16 h-10 border-2 border-black object-cover" />
                    <span className="font-heading text-3xl font-black uppercase">
                      {stats.highestScoringMatch.away}
                    </span>
                    <span className="font-heading text-7xl font-black mt-1 text-[var(--neon-pink)]">
                      {stats.highestScoringMatch.awayScore}
                    </span>
                  </div>
                </div>

                <div className="mt-8 bg-black text-white p-4 border-4 border-black text-center">
                  <span className="font-bold uppercase tracking-widest text-xs text-white/70 block mb-1">MVP</span>
                  <span className="font-heading text-xl font-black text-[var(--neon-cyan)]">
                    {stats.highestScoringMatch.mvp}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
