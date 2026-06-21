import Link from "next/link";
import { Trophy, BarChart3 } from "lucide-react";
import { Hero } from "@/components/home/hero";
import { FeaturedMatch } from "@/components/home/featured-match";
import { MatchCard } from "@/components/match-card";
import { SectionHeading } from "@/components/section-heading";
import { StatCard } from "@/components/stat-card";
import {
  completedMatches,
  computeStandings,
  getStats,
  nextMatch,
} from "@/lib/data";

export default function HomePage() {
  const standings = computeStandings();
  const stats = getStats();
  const leader = standings[0];
  const next = nextMatch();
  const recent = [...completedMatches].slice(-3).reverse();

  return (
    <div>
      <Hero />

      <div className="mx-auto flex max-w-7xl flex-col gap-16 px-4 py-16 lg:px-8">
        {/* Dashboard */}
        <section className="flex flex-col gap-6">
          <SectionHeading
            eyebrow="Tournament Pulse"
            title="Live Dashboard"
            description="A real-time snapshot of the race for the eFootball World Cup crown."
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              icon="crown"
              label="Current Leader"
              value={stats.playedMatches === 0 ? "TBD" : leader.team.id}
              sub={stats.playedMatches === 0 ? "Tournament pending" : `${leader.wins} wins · ${leader.points} pts`}
              accent="gold"
              index={0}
              flag={stats.playedMatches === 0 ? undefined : { code: leader.team.code, country: leader.team.country }}
            />
            <StatCard
              icon="goal"
              label="Matches Played"
              value={`${stats.playedMatches} / ${stats.totalMatches}`}
              sub={`${stats.totalMatches - stats.playedMatches} remaining`}
              index={1}
            />
            <StatCard
              icon="target"
              label="Goals Scored"
              value={stats.totalGoals}
              sub={`${stats.avgGoals} per match`}
              index={2}
            />
            <StatCard
              icon="star"
              label="Top Scorer"
              value={stats.playedMatches === 0 ? "TBD" : stats.topScorer.team.player}
              sub={stats.playedMatches === 0 ? "Tournament pending" : `${stats.topScorer.goals} goals · ${stats.topScorer.team.country}`}
              accent="gold"
              index={3}
              flag={stats.playedMatches === 0 ? undefined : { code: stats.topScorer.team.code, country: stats.topScorer.team.country }}
            />
          </div>
        </section>

        {/* Featured upcoming */}
        {next && (
          <section className="flex flex-col gap-6">
            <SectionHeading eyebrow="Coming Up" title="Featured Match" />
            <FeaturedMatch match={next} />
          </section>
        )}

        {/* Recent results */}
        <section className="flex flex-col gap-6">
          <div className="flex items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Match Center"
              title="Recent Results"
              description="The latest scorelines and standout performers from the tournament."
            />
            <Link
              href="/fixtures"
              className="hidden shrink-0 items-center gap-1 text-sm font-black text-white hover:text-[var(--neon-cyan)] uppercase tracking-widest sm:flex transition-colors"
            >
              All fixtures →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {recent.map((m) => (
              <MatchCard key={m.id} match={m} />
            ))}
          </div>
        </section>

        {/* CTA banner */}
        <section className="relative overflow-hidden border-4 border-white bg-black p-8 text-center sm:p-12 shadow-[12px_12px_0px_0px_var(--neon-purple)]">
          <BarChart3 className="mx-auto mb-4 size-16 text-white" />
          <h3 className="font-heading text-4xl font-black uppercase tracking-wide sm:text-5xl text-white">
            Dive into the Data
          </h3>
          <p className="mx-auto mt-4 max-w-xl text-white font-bold uppercase tracking-widest">
            Analyze the numbers behind the greatest eFootball teams on the planet.
          </p>
          <Link
            href="/statistics"
            className="mt-8 inline-flex items-center gap-3 border-4 border-black bg-[var(--neon-pink)] px-8 py-4 text-lg font-black uppercase tracking-widest text-black transition-transform hover:scale-105 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
          >
            <BarChart3 className="size-6" />
            View Statistics
          </Link>
        </section>
      </div>
    </div>
  );
}
