"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Countdown } from "@/components/countdown";
import { Particles } from "@/components/particles";
import { TeamFlag } from "@/components/team-flag";
import { teams, type Match } from "@/lib/data";

export function FeaturedMatch({ match }: { match: Match }) {
  const home = teams[match.home];
  const away = teams[match.away];
  const d = new Date(match.kickoff);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden border-4 border-white bg-[var(--neon-purple)]"
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-multiply"
        style={{ backgroundImage: "url(/images/stadium-night.png)" }}
      />
      <Particles count={18} />

      <div className="relative z-10 flex flex-col gap-8 p-6 sm:p-10">
        <div className="flex items-center justify-between">
          <span className="border-4 border-black bg-white px-4 py-2 text-sm font-black uppercase tracking-widest text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            Next Featured Match
          </span>
          <span className="text-lg font-black uppercase tracking-widest text-black bg-white px-2 border-2 border-black">
            Matchday {match.matchday}
          </span>
        </div>

        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-4 w-full">
          <div className="flex flex-col items-center gap-2 sm:gap-3 text-center border-2 sm:border-4 border-black bg-black p-2 sm:p-4 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] sm:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] w-full">
            <TeamFlag
              code={home.code}
              country={home.country}
              className="h-10 w-16 sm:h-20 sm:w-32"
            />
            <div>
              <p className="font-heading text-sm font-black uppercase tracking-wide sm:text-3xl text-white break-words">
                {home.country}
              </p>
              <p className="text-[10px] sm:text-sm font-bold text-[var(--neon-cyan)] uppercase break-words">
                {home.player}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center my-0 px-1 sm:px-2">
            <span
              className="font-heading text-3xl font-black text-black sm:text-8xl text-outline-thick drop-shadow-xl"
              style={{ WebkitTextStroke: "2px black", color: "white" }}
            >
              VS
            </span>
            <span className="mt-1 sm:mt-2 text-[10px] sm:text-sm font-black uppercase tracking-widest text-black bg-white px-1 sm:px-2 py-0.5 sm:py-1 border-2 border-black whitespace-nowrap">
              {d.toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>

          <div className="flex flex-col items-center gap-2 sm:gap-3 text-center border-2 sm:border-4 border-black bg-black p-2 sm:p-4 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] sm:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] w-full">
            <TeamFlag
              code={away.code}
              country={away.country}
              className="h-10 w-16 sm:h-20 sm:w-32"
            />
            <div>
              <p className="font-heading text-sm font-black uppercase tracking-wide sm:text-3xl text-white break-words">
                {away.country}
              </p>
              <p className="text-[10px] sm:text-sm font-bold text-[var(--neon-cyan)] uppercase break-words">
                {away.player}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6 mt-4">
          <Countdown target={match.kickoff} size="lg" />
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <span className="flex items-center gap-2 font-black uppercase tracking-widest text-black bg-white px-3 py-1 border-2 border-black">
              <MapPin className="size-5 text-[var(--neon-pink)]" />
              {match.stadium}
            </span>
            <Link
              href={`/match/${match.id}`}
              className="border-4 border-black bg-[var(--neon-cyan)] px-6 py-3 text-sm font-black uppercase tracking-widest text-black transition-transform hover:scale-110 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              Match Center
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
