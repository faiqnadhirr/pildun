import type { SleepImpact } from '@/lib/types';
import { FAN_LEVELS } from '@/lib/utils/constants';
import { formatMatchTime, isWithinTimeRange, calculateHoursUntil } from '@/lib/utils/formatting';

export function calculateSleepCost(
  kickoffTime: string,
  bedtime: string,
  wakeupTime: string,
  fanLevel: 'casual' | 'normal' | 'hardcore',
  timezone: string
): SleepImpact {
  const { time: matchTimeLocal } = formatMatchTime(kickoffTime, timezone);

  // Check if match is during sleep time
  const isDuringSleep = isWithinTimeRange(matchTimeLocal, bedtime, wakeupTime);

  // Check if match is close to sleep time (within 1 hour before bed)
  const hoursUntilMatch = calculateHoursUntil(kickoffTime);
  const matchIsLate = hoursUntilMatch > 0 && hoursUntilMatch < 1;

  const fanLevelData = FAN_LEVELS[fanLevel];
  let penalty = 0;
  let impactLevel: 'low' | 'medium' | 'high' = 'low';
  let details = '';

  if (isDuringSleep) {
    // Estimate sleep loss (match is ~2 hours)
    const sleepLossHours = 2;
    penalty = Math.min(25, sleepLossHours * fanLevelData.sleepMultiplier);
    impactLevel = penalty > 15 ? 'high' : penalty > 8 ? 'medium' : 'low';
    details = `Match at ${matchTimeLocal} conflicts with sleep schedule (${bedtime}-${wakeupTime}). You'll lose ~${sleepLossHours} hours of sleep.`;
  } else if (matchIsLate) {
    penalty = fanLevel === 'casual' ? 10 : fanLevel === 'normal' ? 5 : 0;
    impactLevel = penalty > 5 ? 'medium' : 'low';
    details = penalty > 0 
      ? `Late kickoff at ${matchTimeLocal}. You might be tired tomorrow.`
      : `Late kickoff but manageable for a true fan.`;
  } else {
    penalty = 0;
    impactLevel = 'low';
    details = `Perfect timing. No sleep conflict.`;
  }

  return {
    impactLevel,
    penalty,
    details,
  };
}
