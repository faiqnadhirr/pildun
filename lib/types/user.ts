export interface UserPreferences {
  bedtime: string; // HH:mm
  wakeupTime: string; // HH:mm
  fanLevel: 'casual' | 'normal' | 'hardcore';
  timezone: string;
  favoritedTeams: string[];
  rivalTeams: string[];
  notificationsEnabled: boolean;
}

export interface ScoringFactor {
  name: string;
  points: number;
  explanation: string;
}

export interface SleepImpact {
  impactLevel: 'low' | 'medium' | 'high';
  penalty: number;
  details: string;
}

export interface Recommendation {
  score: number;
  verdict: 'must-watch' | 'worth-watching' | 'skip';
  explanation: string;
  keyFactors: ScoringFactor[];
  sleepImpact: SleepImpact;
  userContext?: {
    hasFavoritedTeam: boolean;
    hasRivalTeam: boolean;
    kickoffInUserTimezone: string;
  };
}
