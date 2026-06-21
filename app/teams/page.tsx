"use client";

import { Users, User, Shield, Target } from "lucide-react";
import { teamList, computeStandings } from "@/lib/data";
import { TeamFlag } from "@/components/team-flag";
import { SectionHeading } from "@/components/section-heading";
import { cn } from "@/lib/utils";

// Define custom borders and shadows based on team IDs
const teamStyles = {
  ENG: "bg-[#e11d48] text-white border-black shadow-[8px_8px_0px_0px_#000] hover:shadow-[12px_12px_0px_0px_#000]",
  ARG: "bg-[#38bdf8] text-black border-black shadow-[8px_8px_0px_0px_#000] hover:shadow-[12px_12px_0px_0px_#000]",
  FRA: "bg-[#3b82f6] text-white border-black shadow-[8px_8px_0px_0px_#000] hover:shadow-[12px_12px_0px_0px_#000]",
  POR: "bg-[#16a34a] text-black border-black shadow-[8px_8px_0px_0px_#000] hover:shadow-[12px_12px_0px_0px_#000]",
};

export default function TeamsPage() {
  const standings = computeStandings();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
      <div className="mb-12">
        <SectionHeading
          eyebrow="The Contenders"
          title="Nations"
          description="Four titans of the digital pitch. One massive crown to claim."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {teamList.map((team) => {
          const stats = standings.find((s) => s.team.id === team.id);
          const rank = stats ? stats.rank : 4;
          const points = stats ? stats.points : 0;
          const wins = stats ? stats.wins : 0;
          const goals = stats ? stats.goalsFor : 0;

          // @ts-ignore
          const style = teamStyles[team.id] || "border-white";

          return (
            <div
              key={team.id}
              className={cn(
                "group relative border-4 p-6 sm:p-8 transition-all duration-300 transform hover:-translate-y-2 hover:-translate-x-2",
                style
              )}
            >
              <div className="flex flex-col h-full gap-6 relative z-10">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="border-4 border-black p-1 bg-white shrink-0 shadow-[4px_4px_0px_0px_#000]">
                      <TeamFlag
                        code={team.code}
                        country={team.country}
                        className="h-8 w-12 sm:h-12 sm:w-20 object-cover"
                      />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <h3 className="font-heading text-2xl sm:text-4xl font-black uppercase tracking-wide sm:tracking-widest leading-none truncate" style={{ WebkitTextStroke: "1px black" }}>
                        {team.country}
                      </h3>
                      <span className="text-sm sm:text-lg font-bold uppercase tracking-widest mt-1 opacity-90 border-t-2 sm:border-t-4 border-black pt-1">
                        {team.id}
                      </span>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center justify-center size-10 sm:size-12 bg-white text-black border-4 border-black shadow-[4px_4px_0px_0px_#000] group-hover:rotate-12 transition-transform">
                    <span className="font-heading text-2xl sm:text-3xl font-black">#{rank}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border-y-4 border-black py-4 mt-2">
                  <div className="flex items-center gap-3 p-3 border-4 border-black bg-black text-white hover:bg-white hover:text-black transition-colors shadow-[4px_4px_0px_0px_#000]">
                    <User className="size-6 shrink-0" />
                    <div className="flex flex-col min-w-0">
                      <span className="text-[10px] font-black uppercase tracking-widest truncate">Esports Pro</span>
                      <span className="text-base sm:text-lg font-black uppercase truncate">{team.player}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 border-4 border-black bg-black text-white hover:bg-white hover:text-black transition-colors shadow-[4px_4px_0px_0px_#000]">
                    <Shield className="size-6 shrink-0" />
                    <div className="flex flex-col min-w-0">
                      <span className="text-[10px] font-black uppercase tracking-widest truncate">Manager</span>
                      <span className="text-base sm:text-lg font-black uppercase truncate">{team.manager}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center mt-auto">
                  <div className="border-4 border-black p-2 sm:p-3 bg-white text-black shadow-[4px_4px_0px_0px_#000] hover:-translate-y-1 transition-transform flex flex-col items-center justify-center">
                    <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest block mb-1 opacity-80">Points</span>
                    <span className="font-heading text-3xl sm:text-4xl font-black block">{points}</span>
                  </div>
                  <div className="border-4 border-black p-2 sm:p-3 bg-white text-black shadow-[4px_4px_0px_0px_#000] hover:-translate-y-1 transition-transform flex flex-col items-center justify-center">
                    <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest block mb-1 opacity-80">Wins</span>
                    <span className="font-heading text-3xl sm:text-4xl font-black block">{wins}</span>
                  </div>
                  <div className="border-4 border-black p-2 sm:p-3 bg-white text-black shadow-[4px_4px_0px_0px_#000] hover:-translate-y-1 transition-transform flex flex-col items-center justify-center">
                    <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest block mb-1 opacity-80">Goals</span>
                    <span className="font-heading text-3xl sm:text-4xl font-black block">{goals}</span>
                  </div>
                </div>
              </div>

              {/* Decorative brutalist elements */}
              <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity">
                <Users className="size-32" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
