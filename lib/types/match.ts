export type TournamentStage =
  | 'group'
  | 'round-of-16'
  | 'quarterfinal'
  | 'semifinal'
  | 'final'
  | 'third-place';

export type MatchStatus = 'scheduled' | 'live' | 'finished' | 'postponed';

export interface MatchResult {
  opponent: string;
  result: 'W' | 'D' | 'L';
  score: [number, number];
  date: string;
}

export interface Team {
  id: string;
  name: string;
  shortCode: string;
  flag: string;
  ranking: number;
  recentForm: MatchResult[];
}

export interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  kickoffTime: string; // ISO 8601 UTC
  stage: TournamentStage;
  status: MatchStatus;
  venue?: string;
  group?: string; // A, B, C, D
  score?: {
    home: number;
    away: number;
    halfTime?: [number, number];
  };
  head2head?: {
    homeWins: number;
    draws: number;
    awayWins: number;
  };
}

export interface Standings {
  group: string;
  entries: StandingsEntry[];
}

export interface StandingsEntry {
  position: number;
  team: Team;
  playedGames: number;
  wins: number;
  draws: number;
  losses: number;
  points: number;
  goalDifference: number;
  goalsFor: number;
  goalsAgainst: number;
  qualificationRules?: string;
}
