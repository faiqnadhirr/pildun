import type { Match, Recommendation, UserPreferences } from '@/lib/types';
import { SCORING_WEIGHTS, VERDICT_THRESHOLDS } from '@/lib/utils/constants';
import { formatMatchTime, getHumanReadableTime } from '@/lib/utils/formatting';
import * as ScoringFactors from './scoringFactors';
import { calculateSleepCost } from './sleepCostCalculator';

export function generateRecommendation(
  match: Match,
  userPreferences: UserPreferences
): Recommendation {
  // Calculate all scoring factors
  const stageImportance = ScoringFactors.calculateStageImportance(match);
  const teamQuality = ScoringFactors.calculateTeamQuality(match);
  const recentForm = ScoringFactors.calculateRecentForm(match);
  const upsetPotential = ScoringFactors.calculateUpsetPotential(match);
  const goalPotential = ScoringFactors.calculateGoalPotential(match);
  const rivalryFactor = ScoringFactors.calculateRivalryFactor(match);
  const knockoutImplications = ScoringFactors.calculateKnockoutImplications(match);

  // Calculate sleep cost
  const sleepImpact = calculateSleepCost(
    match.kickoffTime,
    userPreferences.bedtime,
    userPreferences.wakeupTime,
    userPreferences.fanLevel,
    userPreferences.timezone
  );

  // Calculate base score
  let score =
    50 +
    stageImportance.points +
    teamQuality.points +
    recentForm.points +
    upsetPotential.points +
    goalPotential.points +
    rivalryFactor.points +
    knockoutImplications.points -
    sleepImpact.penalty;

  // Check for favorited team bonus
  const hasFavoritedTeam =
    userPreferences.favoritedTeams.includes(match.homeTeam.id) ||
    userPreferences.favoritedTeams.includes(match.awayTeam.id);

  if (hasFavoritedTeam) {
    score += SCORING_WEIGHTS.favoritedTeamBonus;
  }

  // Check for rival team penalty
  const hasRivalTeam =
    userPreferences.rivalTeams.includes(match.homeTeam.id) ||
    userPreferences.rivalTeams.includes(match.awayTeam.id);

  if (hasRivalTeam) {
    score += SCORING_WEIGHTS.rivalTeamPenalty;
  }

  // Clamp score between 0-100
  const finalScore = Math.min(100, Math.max(0, score));

  // Determine verdict
  let verdict: 'must-watch' | 'worth-watching' | 'skip';
  if (finalScore >= VERDICT_THRESHOLDS.mustWatch) {
    verdict = 'must-watch';
  } else if (finalScore >= VERDICT_THRESHOLDS.worthWatching) {
    verdict = 'worth-watching';
  } else {
    verdict = 'skip';
  }

  // Select top 3-4 factors for explanation
  const allFactors = [
    stageImportance,
    teamQuality,
    recentForm,
    goalPotential,
    knockoutImplications,
  ];
  const keyFactors = allFactors.sort((a, b) => b.points - a.points).slice(0, 4);

  // Generate explanation
  const explanation = generateExplanation(
    match,
    keyFactors,
    verdict,
    userPreferences,
    sleepImpact
  );

  const userContext = {
    hasFavoritedTeam,
    hasRivalTeam,
    kickoffInUserTimezone: getHumanReadableTime(match.kickoffTime, userPreferences.timezone),
  };

  return {
    score: finalScore,
    verdict,
    explanation,
    keyFactors,
    sleepImpact,
    userContext,
  };
}

function generateExplanation(
  match: Match,
  keyFactors: any[],
  verdict: string,
  userPreferences: UserPreferences,
  sleepImpact: any
): string {
  const factorTexts = keyFactors.map((f) => f.explanation).join(' ');

  let explanation = `${match.homeTeam.name} vs ${match.awayTeam.name} is a `;

  if (verdict === 'must-watch') {
    explanation += `MUST-WATCH match. `;
  } else if (verdict === 'worth-watching') {
    explanation += `worth watching. `;
  } else {
    explanation += `match you can probably skip. `;
  }

  explanation += factorTexts;

  if (sleepImpact.impactLevel === 'high') {
    explanation += ` However, the ${sleepImpact.details}`;
  }

  return explanation;
}

export function groupMatchesByVerdict(matches: Match[], userPreferences: UserPreferences) {
  const mustWatch: Recommendation[] = [];
  const worthWatching: Recommendation[] = [];
  const skip: Recommendation[] = [];

  matches.forEach((match) => {
    const rec = generateRecommendation(match, userPreferences);

    if (rec.verdict === 'must-watch') {
      mustWatch.push(rec);
    } else if (rec.verdict === 'worth-watching') {
      worthWatching.push(rec);
    } else {
      skip.push(rec);
    }
  });

  return {
    mustWatch: mustWatch.sort((a, b) => b.score - a.score),
    worthWatching: worthWatching.sort((a, b) => b.score - a.score),
    skip: skip.sort((a, b) => b.score - a.score),
  };
}
