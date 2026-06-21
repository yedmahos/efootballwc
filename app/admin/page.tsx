"use client";

import { useState, useRef } from "react";
import { matches, teams } from "@/lib/data";
import { updateMatchComplete } from "./actions";
import { ShieldAlert, Target, Upload, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin") {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("ACCESS DENIED");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black p-4 overflow-x-hidden">
        <form
          onSubmit={handleLogin}
          className="border-4 sm:border-8 border-white p-6 sm:p-8 max-w-[calc(100%-2rem)] sm:max-w-md w-full bg-black relative shadow-[8px_8px_0px_0px_#e11d48] sm:shadow-[16px_16px_0px_0px_#e11d48] mx-auto mt-6 sm:mt-0"
        >
          <div className="absolute -top-5 -left-5 sm:-top-6 sm:-left-6 bg-white text-black p-1.5 sm:p-2 border-2 sm:border-4 border-black">
            <ShieldAlert className="size-6 sm:size-8" />
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-black uppercase tracking-tighter mb-6 sm:mb-8 text-white mt-2 sm:mt-4">
            Backend Access
          </h1>
          <div className="space-y-4">
            <div>
              <label className="block font-heading text-lg sm:text-xl font-bold uppercase tracking-widest text-[var(--neon-cyan)] mb-2">
                Passcode
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-2 sm:border-4 border-white p-3 sm:p-4 font-mono text-lg sm:text-xl text-white focus:outline-none focus:border-[var(--neon-cyan)] transition-colors"
                placeholder="ENTER CODE"
              />
            </div>
            {error && (
              <div className="bg-[#e11d48] text-white font-bold p-2 sm:p-3 border-2 sm:border-4 border-white uppercase tracking-widest text-center text-sm sm:text-base">
                {error}
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-white text-black border-2 sm:border-4 border-white p-3 sm:p-4 font-heading text-xl sm:text-2xl font-black uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
            >
              Authenticate
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 lg:px-8">
      <div className="mb-12 border-b-8 border-white pb-8">
        <h1 className="font-heading text-6xl md:text-8xl font-black uppercase tracking-tighter text-white">
          Backend<br />System
        </h1>
        <p className="font-mono text-xl text-[var(--neon-cyan)] mt-4 uppercase tracking-widest">
          Comprehensive Match Data Override
        </p>
      </div>

      <div className="space-y-16">
        {matches.map((match) => (
          <MatchEditor key={match.id} match={match} />
        ))}
      </div>
    </div>
  );
}

function MatchEditor({ match }: any) {
  const homeTeam = teams[match.home as keyof typeof teams];
  const awayTeam = teams[match.away as keyof typeof teams];

  const [status, setStatus] = useState(match.status);
  const [homeScore, setHomeScore] = useState(match.homeScore ?? 0);
  const [awayScore, setAwayScore] = useState(match.awayScore ?? 0);
  const [kickoff, setKickoff] = useState(match.kickoff.slice(0, 16));
  const [stadium, setStadium] = useState(match.stadium);
  
  // Stats
  const [possessionHome, setPossessionHome] = useState(match.possession?.home ?? 50);
  const [possessionAway, setPossessionAway] = useState(match.possession?.away ?? 50);
  const [shotsHome, setShotsHome] = useState(match.shots?.home ?? 0);
  const [shotsAway, setShotsAway] = useState(match.shots?.away ?? 0);
  const [sotHome, setSotHome] = useState(match.shotsOnTarget?.home ?? 0);
  const [sotAway, setSotAway] = useState(match.shotsOnTarget?.away ?? 0);
  const [cornersHome, setCornersHome] = useState(match.corners?.home ?? 0);
  const [cornersAway, setCornersAway] = useState(match.corners?.away ?? 0);

  // Goals
  const [goals, setGoals] = useState<{ minute: number; team: string; scorer: string }[]>(match.goals || []);

  const [isLoading, setIsLoading] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleGoalAdd = () => {
    setGoals([...goals, { minute: 0, team: match.home, scorer: "" }]);
  };

  const handleGoalRemove = (index: number) => {
    setGoals(goals.filter((_, i) => i !== index));
  };

  const handleGoalChange = (index: number, field: string, value: string | number) => {
    const newGoals = [...goals];
    newGoals[index] = { ...newGoals[index], [field]: value };
    setGoals(newGoals);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsParsing(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("/api/parse-stats", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to parse");

      const data = await res.json();
      if (data.home && data.away) {
        setPossessionHome(data.home.possession || 0);
        setPossessionAway(data.away.possession || 0);
        setShotsHome(data.home.shots || 0);
        setShotsAway(data.away.shots || 0);
        setSotHome(data.home.shotsOnTarget || 0);
        setSotAway(data.away.shotsOnTarget || 0);
        setCornersHome(data.home.corners || 0);
        setCornersAway(data.away.corners || 0);
        alert("STATS EXTRACTED SUCCESSFULLY.");
      }
    } catch (err) {
      alert("AI PARSING FAILED.");
      console.error(err);
    } finally {
      setIsParsing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Sort goals by minute before saving
    const sortedGoals = [...goals].sort((a, b) => a.minute - b.minute);

    const payload = {
      status,
      homeScore,
      awayScore,
      kickoff: new Date(kickoff).toISOString(),
      stadium,
      possession: { home: possessionHome, away: possessionAway },
      shots: { home: shotsHome, away: shotsAway },
      shotsOnTarget: { home: sotHome, away: sotAway },
      corners: { home: cornersHome, away: cornersAway },
      goals: sortedGoals,
    };

    const res = await updateMatchComplete(match.id, payload);
    if (res.success) {
      alert("DATA SYNCHRONIZED.");
    } else {
      alert("ERROR SYNCHRONIZING.");
    }
    setIsLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-8 border-white p-8 bg-black relative"
    >
      <div className="absolute -top-6 -left-6 bg-[var(--neon-purple)] text-black p-2 border-4 border-white font-heading text-2xl font-black">
        MATCH {match.id}
      </div>

      {/* HEADER: Score & Basic Info */}
      <div className="flex flex-col gap-6 sm:gap-8 mb-8 border-b-4 border-white/20 pb-8 mt-4">
        
        <div className="flex justify-around items-center">
          <div className="flex flex-col items-center">
            <span className="font-heading text-3xl sm:text-4xl font-black uppercase tracking-widest" style={{ color: homeTeam.color }}>
              {homeTeam.id}
            </span>
            <input
              type="number"
              min="0"
              value={homeScore}
              onChange={(e) => setHomeScore(parseInt(e.target.value) || 0)}
              className="mt-2 sm:mt-4 w-20 sm:w-32 bg-transparent border-4 border-current text-center p-2 sm:p-4 font-heading text-4xl sm:text-6xl font-black focus:outline-none focus:bg-white focus:text-black transition-colors"
              style={{ borderColor: homeTeam.color, color: homeTeam.color }}
            />
          </div>

          <span className="font-heading text-2xl font-black text-white/30 hidden sm:block">VS</span>

          <div className="flex flex-col items-center">
            <span className="font-heading text-3xl sm:text-4xl font-black uppercase tracking-widest" style={{ color: awayTeam.color }}>
              {awayTeam.id}
            </span>
            <input
              type="number"
              min="0"
              value={awayScore}
              onChange={(e) => setAwayScore(parseInt(e.target.value) || 0)}
              className="mt-2 sm:mt-4 w-20 sm:w-32 bg-transparent border-4 border-current text-center p-2 sm:p-4 font-heading text-4xl sm:text-6xl font-black focus:outline-none focus:bg-white focus:text-black transition-colors"
              style={{ borderColor: awayTeam.color, color: awayTeam.color }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block font-mono text-sm font-bold uppercase tracking-widest text-[var(--neon-cyan)] mb-1">Status</label>
            <select 
              value={status} 
              onChange={(e) => setStatus(e.target.value)}
              className="w-full bg-black border-4 border-white p-2 font-bold uppercase text-white outline-none"
            >
              <option value="upcoming">Upcoming</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div>
            <label className="block font-mono text-sm font-bold uppercase tracking-widest text-[var(--neon-cyan)] mb-1">Kickoff</label>
            <input 
              type="datetime-local" 
              value={kickoff}
              onChange={(e) => setKickoff(e.target.value)}
              className="w-full bg-black border-4 border-white p-2 font-bold uppercase text-white outline-none"
            />
          </div>
          <div>
            <label className="block font-mono text-sm font-bold uppercase tracking-widest text-[var(--neon-cyan)] mb-1">Stadium</label>
            <input 
              type="text" 
              value={stadium}
              onChange={(e) => setStadium(e.target.value)}
              className="w-full bg-black border-4 border-white p-2 font-bold uppercase text-white outline-none"
            />
          </div>
        </div>
      </div>

      {/* DETAILED STATS */}
      <div className="mb-8 border-b-4 border-white/20 pb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h2 className="font-heading text-2xl sm:text-3xl font-black uppercase tracking-widest text-white">Match Statistics</h2>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 bg-[var(--neon-cyan)] text-black font-bold uppercase tracking-widest px-4 py-2 hover:bg-white transition-colors w-full sm:w-auto justify-center"
          >
            <Upload className="size-5" />
            {isParsing ? "PARSING..." : "UPLOAD"}
          </button>
          <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileUpload} />
        </div>

        <div className="grid grid-cols-[1fr_auto_1fr] sm:grid-cols-3 gap-2 sm:gap-4 text-center font-bold items-center">
          <div className="text-[var(--neon-cyan)] uppercase tracking-widest text-xs sm:text-base">HOME</div>
          <div className="text-white/50 uppercase tracking-widest text-xs sm:text-base">METRIC</div>
          <div className="text-[var(--neon-pink)] uppercase tracking-widest text-xs sm:text-base">AWAY</div>

          <input type="number" value={possessionHome} onChange={(e) => setPossessionHome(parseInt(e.target.value)||0)} className="w-full min-w-0 bg-transparent border-2 border-[var(--neon-cyan)] text-white text-center p-2" />
          <div className="p-1 sm:p-2 text-white text-[10px] sm:text-base leading-tight break-words">Possession (%)</div>
          <input type="number" value={possessionAway} onChange={(e) => setPossessionAway(parseInt(e.target.value)||0)} className="w-full min-w-0 bg-transparent border-2 border-[var(--neon-pink)] text-white text-center p-2" />

          <input type="number" value={shotsHome} onChange={(e) => setShotsHome(parseInt(e.target.value)||0)} className="w-full min-w-0 bg-transparent border-2 border-[var(--neon-cyan)] text-white text-center p-2" />
          <div className="p-1 sm:p-2 text-white text-[10px] sm:text-base leading-tight break-words">Shots</div>
          <input type="number" value={shotsAway} onChange={(e) => setShotsAway(parseInt(e.target.value)||0)} className="w-full min-w-0 bg-transparent border-2 border-[var(--neon-pink)] text-white text-center p-2" />

          <input type="number" value={sotHome} onChange={(e) => setSotHome(parseInt(e.target.value)||0)} className="w-full min-w-0 bg-transparent border-2 border-[var(--neon-cyan)] text-white text-center p-2" />
          <div className="p-1 sm:p-2 text-white text-[10px] sm:text-base leading-tight break-words">On Target</div>
          <input type="number" value={sotAway} onChange={(e) => setSotAway(parseInt(e.target.value)||0)} className="w-full min-w-0 bg-transparent border-2 border-[var(--neon-pink)] text-white text-center p-2" />

          <input type="number" value={cornersHome} onChange={(e) => setCornersHome(parseInt(e.target.value)||0)} className="w-full min-w-0 bg-transparent border-2 border-[var(--neon-cyan)] text-white text-center p-2" />
          <div className="p-1 sm:p-2 text-white text-[10px] sm:text-base leading-tight break-words">Corners</div>
          <input type="number" value={cornersAway} onChange={(e) => setCornersAway(parseInt(e.target.value)||0)} className="w-full min-w-0 bg-transparent border-2 border-[var(--neon-pink)] text-white text-center p-2" />
        </div>
      </div>

      {/* GOAL EVENTS */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading text-3xl font-black uppercase tracking-widest text-white">Goal Events</h2>
          <button
            type="button"
            onClick={handleGoalAdd}
            className="flex items-center gap-2 bg-white text-black font-bold uppercase tracking-widest px-4 py-2 hover:bg-gray-200 transition-colors"
          >
            <Plus className="size-5" /> ADD GOAL
          </button>
        </div>

        <div className="space-y-4">
          {goals.map((goal, idx) => (
            <div key={idx} className="flex flex-wrap sm:flex-nowrap gap-2 sm:gap-4 items-center bg-white/5 p-3 sm:p-4 border-2 border-white/20">
              <input
                type="number"
                placeholder="Min"
                value={goal.minute}
                onChange={(e) => handleGoalChange(idx, "minute", parseInt(e.target.value) || 0)}
                className="w-16 sm:w-20 min-w-0 bg-black border-2 border-white text-white p-2 text-center"
              />
              <select
                value={goal.team}
                onChange={(e) => handleGoalChange(idx, "team", e.target.value)}
                className="flex-1 min-w-0 bg-black border-2 border-white text-white p-2 font-bold uppercase"
              >
                <option value={match.home}>{homeTeam.id}</option>
                <option value={match.away}>{awayTeam.id}</option>
              </select>
              <button
                type="button"
                onClick={() => handleGoalRemove(idx)}
                className="bg-[#e11d48] p-2 text-white hover:bg-red-600 shrink-0"
              >
                <Trash2 className="size-5 sm:size-6" />
              </button>
              <input
                type="text"
                placeholder="Player Name"
                value={goal.scorer}
                onChange={(e) => handleGoalChange(idx, "scorer", e.target.value)}
                className="w-full sm:flex-1 sm:w-auto order-last sm:order-none mt-2 sm:mt-0 min-w-0 bg-black border-2 border-white text-white p-2"
              />
            </div>
          ))}
          {goals.length === 0 && <p className="text-white/50 italic">No goals registered.</p>}
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-white text-black border-4 border-white px-8 py-6 font-heading text-3xl font-black uppercase tracking-widest hover:bg-black hover:text-[var(--neon-cyan)] transition-colors disabled:opacity-50"
      >
        {isLoading ? "SYNCHRONIZING..." : "SAVE BACKEND DATA"}
      </button>
    </form>
  );
}
