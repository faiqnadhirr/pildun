import type { Match, ScoringFactor } from '@/lib/types';
import { TOURNAMENT_STAGES, SCORING_WEIGHTS } from '@/lib/utils/constants';
import { TOURNAMENT_STAGE_DESCRIPTIONS } from './descriptions';

export function calculateStageImportance(match: Match): ScoringFactor {
  const stageData = TOURNAMENT_STAGES[match.stage];
  const points = stageData.importance;
  const description = TOURNAMENT_STAGE_DESCRIPTIONS[match.stage];

  return {
    name: 'Tournament Stage',
    points,
    explanation: description,
  };
}

export function calculateTeamQuality(match: Match): ScoringFactor {
  const homeRanking = match.homeTeam.ranking;
  const awayRanking = match.awayTeam.ranking;
  const rankingDiff = Math.abs(homeRanking - awayRanking);

  let points = 0;
  let explanation = '';

  if (rankingDiff > 50) {
    points = 8;
    explanation = `Significant ranking gap (${Math.min(homeRanking, awayRanking)}th vs ${Math.max(homeRanking, awayRanking)}th). One-sided affair likely.`;
  } else if (rankingDiff > 20) {
    points = 12;
    explanation = `Notable ranking difference. Quality matchup but clear favorite.`;
  } else {
    points = 15;
    explanation = `Evenly matched teams. Both ranked in top 25. Competitive match expected.`;
  }

  return {
    name: 'Team Quality',
    points,
    explanation,
  };
}

export function calculateRecentForm(match: Match): ScoringFactor {
  const homeForm = match.homeTeam.recentForm.slice(0, 3);
  const awayForm = match.awayTeam.recentForm.slice(0, 3);

  const homeWins = homeForm.filter((f) => f.result === 'W').length;
  const awayWins = awayForm.filter((f) => f.result === 'W').length;

  let points = 0;
  let explanation = '';

  if (homeWins >= 2 && awayWins >= 2) {
    points = 10;
    explanation = `Both teams in excellent form. Attacking match expected.`;
  } else if ((homeWins >= 2 || awayWins >= 2) && (homeWins >= 1 && awayWins >= 1)) {
    points = 8;
    explanation = `Both teams showing good form. Good attacking potential.`;
  } else if (homeWins >= 2 || awayWins >= 2) {
    points = 6;
    explanation = `One team strong, other inconsistent. Match competitiveness varies.`;
  } else if (homeWins === 0 && awayWins === 0) {
    points = 2;
    explanation = `Both teams struggling recently. Defensive match likely.`;
  } else {
    points = 5;
    explanation = `Mixed form from both sides.`;
  }

  return {
    name: 'Recent Form',
    points,
    explanation,
  };
}

export function calculateUpsetPotential(match: Match): ScoringFactor {
  const rankingDiff = Math.abs(match.homeTeam.ranking - match.awayTeam.ranking);
  const underdog = match.homeTeam.ranking > match.awayTeam.ranking ? match.homeTeam : match.awayTeam;
  const underdogWins =underdog.recentForm.filter((f) => f.result === 'W').length;

  let points = 0;
  let explanation = '';

  if (rankingDiff > 40 && underdogWins >= 2) {
    points = 10;
    explanation = `Major upset potential. Underdog in hot form against clear favorite.`;
  } else if (rankingDiff > 30) {
    points = 7;
    explanation = `Upset is possible if underdog performs well.`;
  } else if (rankingDiff > 15) {
    points = 5;
    explanation = `Some upset potential given slight ranking gap.`;
  } else {
    points = 2;
    explanation = `Evenly matched. Upset unlikely.`;
  }

  return {
    name: 'Upset Potential',
    points,
    explanation,
  };
}

export function calculateGoalPotential(match: Match): ScoringFactor {
  const homeOffensive = match.homeTeam.recentForm.slice(0, 3).reduce((a, b) => a + b.score[0], 0) / 3;
  const awayOffensive = match.awayTeam.recentForm.slice(0, 3).reduce((a, b) => a + b.score[0], 0) / 3;
  const homeDefensive = match.homeTeam.recentForm.slice(0, 3).reduce((a, b) => a + b.score[1], 0) / 3;
  const awayDefensive = match.awayTeam.recentForm.slice(0, 3).reduce((a, b) => a + b.score[1], 0) / 3;

  const totalGoalPotential = homeOffensive + awayOffensive;
  const totalConceded = homeDefensive + awayDefensive;

  let points = 0;
  let explanation = '';

  if (totalGoalPotential > 3) {
    points = 10;
    explanation = `High-scoring potential. Both teams averaging 1.5+ goals per game.`;
  } else if (totalGoalPotential > 2) {
    points = 7;
    explanation = `Moderate goal potential. Open attacking play expected.`;
  } else if (totalConceded > 2.5) {
    points = 6;
    explanation = `Defensive vulnerabilities. Expect goals despite lower possession.`;
  } else {
    points = 3;
    explanation = `Limited goal potential. Defensive match likely.`;
  }

  return {
    name: 'Goal Potential',
    points,
    explanation,
  };
}

export function calculateRivalryFactor(match: Match): ScoringFactor {
  const rivalries = [
    { teams: ['ARG', 'BRA'], intensity: 10 },
    { teams: ['ENG', 'FRA'], intensity: 8 },
    { teams: ['GER', 'NED'], intensity: 8 },
    { teams: ['ESP', 'POR'], intensity: 6 },
    { teams: ['ITA', 'FRA'], intensity: 7 },
    { teams: ['USA', 'MEX'], intensity: 8 },
  ];

  const codes = [match.homeTeam.shortCode, match.awayTeam.shortCode].sort();
  const rivalry = rivalries.find((r) => {
    const rCodes = r.teams.sort();
    return rCodes[0] === codes[0] && rCodes[1] === codes[1];
  });

  if (rivalry) {
    return {
      name: 'Rivalry Factor',
      points: rivalry.intensity < 7 ? 4 : 6,
      explanation: `Classic rivalry between ${match.homeTeam.name} and ${match.awayTeam.name}. Extra spice!`,
    };
  }

  return {
    name: 'Rivalry Factor',
    points: 0,
    explanation: `Not a traditional rivalry.`,
  };
}

export function calculateKnockoutImplications(match: Match): ScoringFactor {
  if (match.stage === 'group') {
    return {
      name: 'Knockout Implications',
      points: 2,
      explanation: 'Group stage match. Qualification implications present.',
    };
  }

  if (match.stage === 'final') {
    return {
      name: 'Knockout Implications',
      points: 10,
      explanation: 'FINAL MATCH. Champion will be decided.',
    };
  }

  const pointsByStage: Record<string, number> = {
    'round-of-16': 5,
    quarterfinal: 8,
    semifinal: 10,
    'third-place': 3,
  };

  const points = pointsByStage[match.stage] || 5;
  const stageLabel = TOURNAMENT_STAGES[match.stage as keyof typeof TOURNAMENT_STAGES]?.label || match.stage;

  return {
    name: 'Knockout Implications',
    points,
    explanation: `${stageLabel} match. Loser goes home.`,
  };
}
