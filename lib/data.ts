// ─────────────────────────────────────────────────────────────
// The eFootball World Cup — Tournament data (EA SPORTS FC 26)
// ─────────────────────────────────────────────────────────────

export type TeamId = "ENG" | "ARG" | "FRA" | "POR" | "TBD";

export interface Team {
  id: TeamId;
  country: string;
  player: string;
  code: string; // ISO code for flag CDN
  color: string; // brand accent (oklch/hex)
  manager: string;
}

export interface GoalEvent {
  minute: number;
  team: TeamId;
  scorer: string;
}

export interface Match {
  id: number;
  matchday: number;
  home: TeamId;
  away: TeamId;
  homeScore: number | null;
  awayScore: number | null;
  status: "completed" | "upcoming";
  kickoff: string; // ISO datetime
  stadium: string;
  mvp?: string;
  possession?: { home: number; away: number };
  shots?: { home: number; away: number };
  shotsOnTarget?: { home: number; away: number };
  corners?: { home: number; away: number };
  goals?: GoalEvent[];
  stage?: "group" | "knockout";
}

import db from '../data.json';

export const teams: Record<TeamId, Team> = db.teams as Record<TeamId, Team>;

export const teamList: Team[] = [teams.ENG, teams.ARG, teams.FRA, teams.POR];

export function flagUrl(code: string, size: "w160" | "w320" | "w640" = "w320") {
  return `https://flagcdn.com/${size}/${code}.png`;
}

export const matches: Match[] = db.matches as Match[];

export interface StandingRow {
  team: Team;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDiff: number;
  points: number;
  rank: number;
  form: ("W" | "D" | "L")[];
}

export function computeStandings(): StandingRow[] {
  const rows: Record<TeamId, StandingRow> = {} as Record<TeamId, StandingRow>;

  for (const t of teamList) {
    rows[t.id] = {
      team: t,
      played: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDiff: 0,
      points: 0,
      rank: 0,
      form: [],
    };
  }

  for (const m of matches) {
    if (m.stage === "knockout") continue;
    if (
      m.status !== "completed" ||
      m.homeScore === null ||
      m.awayScore === null
    )
      continue;
    const h = rows[m.home];
    const a = rows[m.away];
    h.played++;
    a.played++;
    h.goalsFor += m.homeScore;
    h.goalsAgainst += m.awayScore;
    a.goalsFor += m.awayScore;
    a.goalsAgainst += m.homeScore;
    if (m.homeScore > m.awayScore) {
      h.wins++;
      a.losses++;
      h.points += 3;
      h.form.push("W");
      a.form.push("L");
    } else if (m.homeScore < m.awayScore) {
      a.wins++;
      h.losses++;
      a.points += 3;
      a.form.push("W");
      h.form.push("L");
    } else {
      h.draws++;
      a.draws++;
      h.points += 1;
      a.points += 1;
      h.form.push("D");
      a.form.push("D");
    }
  }

  Object.values(rows).forEach((r) => {
    r.goalDiff = r.goalsFor - r.goalsAgainst;
  });

  const sorted = Object.values(rows).sort((x, y) => {
    // Ranked by POINTS, tiebreaker GOAL DIFFERENCE, then GOALS SCORED
    if (y.points !== x.points) return y.points - x.points;
    if (y.goalDiff !== x.goalDiff) return y.goalDiff - x.goalDiff;
    return y.goalsFor - x.goalsFor;
  });

  sorted.forEach((r, i) => {
    r.rank = i + 1;
  });

  return sorted;
}

export function getMatch(id: number) {
  return matches.find((m) => m.id === id);
}

export const completedMatches = matches.filter((m) => m.status === "completed");
export const upcomingMatches = matches.filter((m) => m.status === "upcoming");

export function nextMatch(): Match | undefined {
  return [...upcomingMatches].sort(
    (a, b) => new Date(a.kickoff).getTime() - new Date(b.kickoff).getTime(),
  )[0];
}

// ── Aggregate tournament statistics ──
export interface TournamentStats {
  totalMatches: number;
  playedMatches: number;
  totalGoals: number;
  avgGoals: number;
  topScorer: { team: Team; goals: number };
  bestAttack: { team: Team; goals: number };
  mostWins: { team: Team; wins: number };
  highestScoringMatch: Match;
  goalsByTeam: {
    name: string;
    country: string;
    goals: number;
    conceded: number;
    fill: string;
  }[];
  winsByTeam: { name: string; country: string; wins: number; fill: string }[];
}

const chartColors: Record<TeamId, string> = {
  ENG: "var(--chart-5)",
  ARG: "var(--chart-3)",
  FRA: "var(--chart-1)",
  POR: "var(--chart-2)",
};

export function getStats(): TournamentStats {
  const standings = computeStandings();
  const played = completedMatches.length;
  const totalGoals = completedMatches.reduce(
    (sum, m) => sum + (m.homeScore ?? 0) + (m.awayScore ?? 0),
    0,
  );

  const byGoals = [...standings].sort((a, b) => b.goalsFor - a.goalsFor);
  const byWins = [...standings].sort((a, b) => b.wins - a.wins);

  const highestScoringMatch = [...completedMatches].sort(
    (a, b) =>
      (b.homeScore ?? 0) +
      (b.awayScore ?? 0) -
      ((a.homeScore ?? 0) + (a.awayScore ?? 0)),
  )[0];

  return {
    totalMatches: matches.length,
    playedMatches: played,
    totalGoals,
    avgGoals: played === 0 ? 0 : Number((totalGoals / played).toFixed(2)),
    topScorer: { team: byGoals[0].team, goals: byGoals[0].goalsFor },
    bestAttack: { team: byGoals[0].team, goals: byGoals[0].goalsFor },
    mostWins: { team: byWins[0].team, wins: byWins[0].wins },
    highestScoringMatch,
    goalsByTeam: standings.map((s) => ({
      name: s.team.player,
      country: s.team.country,
      goals: s.goalsFor,
      conceded: s.goalsAgainst,
      fill: s.team.color,
    })),
    winsByTeam: standings.map((s) => ({
      name: s.team.country,
      country: s.team.country,
      wins: s.wins,
      fill: s.team.color,
    })),
  };
}

export interface Honours {
  champion: Team;
  runnerUp: Team;
  goldenBoot: { team: Team; goals: number };
  goldenBall: { team: Team };
}

export function getHonours(): Honours {
  const standings = computeStandings();
  const byGoals = [...standings].sort((a, b) => b.goalsFor - a.goalsFor);
  return {
    champion: standings[0].team,
    runnerUp: standings[1].team,
    goldenBoot: { team: byGoals[0].team, goals: byGoals[0].goalsFor },
    goldenBall: { team: standings[0].team },
  };
}
