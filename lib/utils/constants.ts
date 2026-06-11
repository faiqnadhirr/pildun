export const TOURNAMENT_STAGES = {
  group: { label: 'Group Stage', importance: 8 },
  'round-of-16': { label: 'Round of 16', importance: 12 },
  quarterfinal: { label: 'Quarterfinal', importance: 18 },
  semifinal: { label: 'Semifinal', importance: 20 },
  final: { label: 'Final', importance: 25 },
  'third-place': { label: 'Third Place Match', importance: 5 },
} as const;

export const FAN_LEVELS = {
  casual: { label: 'Casual Fan', sleepMultiplier: 4 },
  normal: { label: 'Normal Fan', sleepMultiplier: 3 },
  hardcore: { label: 'Hardcore Fan', sleepMultiplier: 1 },
} as const;

export const SCORING_WEIGHTS = {
  stageImportance: { max: 25 },
  teamQuality: { max: 15 },
  recentForm: { max: 10 },
  upsetPotential: { max: 10 },
  goalPotential: { max: 10 },
  rivalryFactor: { max: 10 },
  knockoutImplications: { max: 10 },
  sleepCostPenalty: { max: 25 },
  favoritedTeamBonus: 5,
  rivalTeamPenalty: -5,
} as const;

export const VERDICT_THRESHOLDS = {
  mustWatch: 90,
  worthWatching: 70,
  skip: 0,
} as const;

export const CACHE_TTL = {
  matches: 15 * 60 * 1000,
  standings: 30 * 60 * 1000,
  teams: 24 * 60 * 60 * 1000,
  recommendation: 60 * 60 * 1000,
} as const;

export const DEFAULT_USER_PREFERENCES = {
  bedtime: '23:00',
  wakeupTime: '07:00',
  fanLevel: 'normal' as const,
  timezone: 'UTC',
  favoritedTeams: [],
  rivalTeams: [],
  notificationsEnabled: true,
};
