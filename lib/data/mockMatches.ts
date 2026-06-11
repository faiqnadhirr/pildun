import type { Match, Team } from '@/lib/types';

const mockTeams: Record<string, Team> = {
  ARG: {
    id: 'ARG',
    name: 'Argentina',
    shortCode: 'ARG',
    flag: '🇦🇷',
    ranking: 1,
    recentForm: [
      { opponent: 'Paraguay', result: 'W', score: [2, 0], date: '2025-01-20' },
      { opponent: 'Chile', result: 'W', score: [1, 0], date: '2025-01-15' },
      { opponent: 'Peru', result: 'D', score: [1, 1], date: '2025-01-10' },
    ],
  },
  FRA: {
    id: 'FRA',
    name: 'France',
    shortCode: 'FRA',
    flag: '🇫🇷',
    ranking: 2,
    recentForm: [
      { opponent: 'Germany', result: 'W', score: [2, 1], date: '2025-01-20' },
      { opponent: 'Belgium', result: 'W', score: [3, 0], date: '2025-01-15' },
      { opponent: 'Spain', result: 'L', score: [0, 1], date: '2025-01-10' },
    ],
  },
  ENG: {
    id: 'ENG',
    name: 'England',
    shortCode: 'ENG',
    flag: '🏴󐁧󐁢󐁥󐁮󐁧󐁿',
    ranking: 5,
    recentForm: [
      { opponent: 'Netherlands', result: 'D', score: [2, 2], date: '2025-01-20' },
      { opponent: 'Scotland', result: 'W', score: [3, 1], date: '2025-01-15' },
      { opponent: 'Wales', result: 'W', score: [2, 0], date: '2025-01-10' },
    ],
  },
  BRA: {
    id: 'BRA',
    name: 'Brazil',
    shortCode: 'BRA',
    flag: '🇧🇷',
    ranking: 4,
    recentForm: [
      { opponent: 'Uruguay', result: 'W', score: [2, 1], date: '2025-01-20' },
      { opponent: 'Colombia', result: 'D', score: [1, 1], date: '2025-01-15' },
      { opponent: 'Venezuela', result: 'W', score: [3, 0], date: '2025-01-10' },
    ],
  },
  ESP: {
    id: 'ESP',
    name: 'Spain',
    shortCode: 'ESP',
    flag: '🇪🇸',
    ranking: 3,
    recentForm: [
      { opponent: 'Portugal', result: 'W', score: [2, 0], date: '2025-01-20' },
      { opponent: 'Italy', result: 'W', score: [1, 0], date: '2025-01-15' },
      { opponent: 'France', result: 'W', score: [1, 0], date: '2025-01-10' },
    ],
  },
  GER: {
    id: 'GER',
    name: 'Germany',
    shortCode: 'GER',
    flag: '🇩🇪',
    ranking: 6,
    recentForm: [
      { opponent: 'Netherlands', result: 'W', score: [2, 1], date: '2025-01-20' },
      { opponent: 'Poland', result: 'W', score: [3, 0], date: '2025-01-15' },
      { opponent: 'France', result: 'L', score: [1, 2], date: '2025-01-10' },
    ],
  },
  JPN: {
    id: 'JPN',
    name: 'Japan',
    shortCode: 'JPN',
    flag: '🇯🇵',
    ranking: 24,
    recentForm: [
      { opponent: 'South Korea', result: 'D', score: [1, 1], date: '2025-01-20' },
      { opponent: 'Australia', result: 'L', score: [0, 2], date: '2025-01-15' },
      { opponent: 'China', result: 'W', score: [3, 0], date: '2025-01-10' },
    ],
  },
  USA: {
    id: 'USA',
    name: 'USA',
    shortCode: 'USA',
    flag: '🇺🇸',
    ranking: 16,
    recentForm: [
      { opponent: 'Mexico', result: 'W', score: [2, 1], date: '2025-01-20' },
      { opponent: 'Canada', result: 'D', score: [1, 1], date: '2025-01-15' },
      { opponent: 'Panama', result: 'W', score: [2, 0], date: '2025-01-10' },
    ],
  },
  MEX: {
    id: 'MEX',
    name: 'Mexico',
    shortCode: 'MEX',
    flag: '🇲🇽',
    ranking: 13,
    recentForm: [
      { opponent: 'USA', result: 'L', score: [1, 2], date: '2025-01-20' },
      { opponent: 'Costa Rica', result: 'W', score: [2, 0], date: '2025-01-15' },
      { opponent: 'Jamaica', result: 'W', score: [3, 1], date: '2025-01-10' },
    ],
  },
  NED: {
    id: 'NED',
    name: 'Netherlands',
    shortCode: 'NED',
    flag: '🇳🇱',
    ranking: 8,
    recentForm: [
      { opponent: 'Belgium', result: 'W', score: [2, 0], date: '2025-01-20' },
      { opponent: 'England', result: 'D', score: [2, 2], date: '2025-01-15' },
      { opponent: 'Germany', result: 'L', score: [1, 2], date: '2025-01-10' },
    ],
  },
  BEL: {
    id: 'BEL',
    name: 'Belgium',
    shortCode: 'BEL',
    flag: '🇧🇪',
    ranking: 7,
    recentForm: [
      { opponent: 'Portugal', result: 'L', score: [0, 2], date: '2025-01-20' },
      { opponent: 'Netherlands', result: 'L', score: [0, 2], date: '2025-01-15' },
      { opponent: 'France', result: 'L', score: [0, 3], date: '2025-01-10' },
    ],
  },
  ITA: {
    id: 'ITA',
    name: 'Italy',
    shortCode: 'ITA',
    flag: '🇮🇹',
    ranking: 10,
    recentForm: [
      { opponent: 'Greece', result: 'W', score: [2, 1], date: '2025-01-20' },
      { opponent: 'Spain', result: 'L', score: [0, 1], date: '2025-01-15' },
      { opponent: 'Albania', result: 'W', score: [3, 0], date: '2025-01-10' },
    ],
  },
  POR: {
    id: 'POR',
    name: 'Portugal',
    shortCode: 'POR',
    flag: '🇵🇹',
    ranking: 11,
    recentForm: [
      { opponent: 'Belgium', result: 'W', score: [2, 0], date: '2025-01-20' },
      { opponent: 'Spain', result: 'L', score: [0, 2], date: '2025-01-15' },
      { opponent: 'Czech Republic', result: 'W', score: [1, 0], date: '2025-01-10' },
    ],
  },
};

export const mockMatches: Match[] = [
  // Group Stage - Today's matches
  {
    id: 'match-1',
    homeTeam: mockTeams['ARG'],
    awayTeam: mockTeams['FRA'],
    kickoffTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
    stage: 'group',
    status: 'scheduled',
    group: 'A',
    venue: 'SoFi Stadium, Los Angeles',
    head2head: { homeWins: 0, draws: 1, awayWins: 0 },
  },
  {
    id: 'match-2',
    homeTeam: mockTeams['ENG'],
    awayTeam: mockTeams['ESP'],
    kickoffTime: new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString(),
    stage: 'group',
    status: 'scheduled',
    group: 'B',
    venue: 'MetLife Stadium, New Jersey',
    head2head: { homeWins: 6, draws: 5, awayWins: 3 },
  },
  {
    id: 'match-3',
    homeTeam: mockTeams['BRA'],
    awayTeam: mockTeams['USA'],
    kickoffTime: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
    stage: 'group',
    status: 'scheduled',
    group: 'C',
    venue: 'NRG Stadium, Houston',
    head2head: { homeWins: 3, draws: 1, awayWins: 0 },
  },
  {
    id: 'match-4',
    homeTeam: mockTeams['GER'],
    awayTeam: mockTeams['NED'],
    kickoffTime: new Date(Date.now() + 11 * 60 * 60 * 1000).toISOString(),
    stage: 'group',
    status: 'scheduled',
    group: 'D',
    venue: 'AT&T Stadium, Dallas',
    head2head: { homeWins: 4, draws: 3, awayWins: 2 },
  },

  // More group stage matches
  {
    id: 'match-5',
    homeTeam: mockTeams['JPN'],
    awayTeam: mockTeams['MEX'],
    kickoffTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    stage: 'group',
    status: 'scheduled',
    group: 'E',
    venue: 'Levi\'s Stadium, San Francisco',
    head2head: { homeWins: 0, draws: 2, awayWins: 1 },
  },
  {
    id: 'match-6',
    homeTeam: mockTeams['ITA'],
    awayTeam: mockTeams['POR'],
    kickoffTime: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
    stage: 'group',
    status: 'scheduled',
    group: 'F',
    venue: 'Mercedes-Benz Stadium, Atlanta',
    head2head: { homeWins: 2, draws: 1, awayWins: 1 },
  },

  // Late night match (sleep test)
  {
    id: 'match-7',
    homeTeam: mockTeams['ESP'],
    awayTeam: mockTeams['BRA'],
    kickoffTime: new Date(Date.now() + 13 * 60 * 60 * 1000).toISOString(),
    stage: 'group',
    status: 'scheduled',
    group: 'A',
    venue: 'Rogers Centre, Toronto',
    head2head: { homeWins: 2, draws: 1, awayWins: 2 },
  },

  // Past matches (for demonstration)
  {
    id: 'match-past-1',
    homeTeam: mockTeams['ARG'],
    awayTeam: mockTeams['BRA'],
    kickoffTime: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    stage: 'group',
    status: 'finished',
    group: 'A',
    score: { home: 3, away: 2, halfTime: [1, 1] },
    venue: 'MetLife Stadium, New Jersey',
  },
];

export function getMatchesForDate(date: Date): Match[] {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  return mockMatches.filter((match) => {
    const matchDate = new Date(match.kickoffTime);
    return matchDate >= startOfDay && matchDate <= endOfDay;
  });
}

export function getMatchById(matchId: string): Match | undefined {
  return mockMatches.find((m) => m.id === matchId);
}
