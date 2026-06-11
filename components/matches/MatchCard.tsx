'use client';

import Link from 'next/link';
import type { Match, Recommendation } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RecommendationScore } from './RecommendationScore';
import { formatMatchTime, getHumanReadableTime } from '@/lib/utils/formatting';

interface MatchCardProps {
  match: Match;
  recommendation: Recommendation;
  userTimezone: string;
}

export function MatchCard({ match, recommendation, userTimezone }: MatchCardProps) {
  const { time } = formatMatchTime(match.kickoffTime, userTimezone);

  return (
    <Link href={`/matches/${match.id}`}>
      <Card className="cursor-pointer transition-all hover:border-blue-400/50 hover:bg-slate-800/50 border-slate-700 bg-slate-800/30 p-4">
        <div className="grid grid-cols-12 gap-4">
          {/* Teams and Score */}
          <div className="col-span-7 flex flex-col justify-between">
            <div className="space-y-2">
              {/* Home Team */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{match.homeTeam.flag}</span>
                  <span className="font-semibold text-slate-100 truncate">
                    {match.homeTeam.name}
                  </span>
                </div>
                {match.score && (
                  <span className="font-bold text-slate-100">{match.score.home}</span>
                )}
              </div>

              {/* Away Team */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{match.awayTeam.flag}</span>
                  <span className="font-semibold text-slate-100 truncate">
                    {match.awayTeam.name}
                  </span>
                </div>
                {match.score && (
                  <span className="font-bold text-slate-100">{match.score.away}</span>
                )}
              </div>
            </div>

            {/* Meta info */}
            <div className="flex items-center gap-2 pt-2">
              <Badge variant="outline" className="text-xs">
                {match.stage === 'group' ? match.group : match.stage}
              </Badge>
              <span className="text-xs text-slate-400">{time}</span>
            </div>
          </div>

          {/* Score Section */}
          <div className="col-span-5 flex items-center justify-center">
            <div className="w-24">
              <RecommendationScore
                score={recommendation.score}
                verdict={recommendation.verdict}
                compact
              />
            </div>
          </div>
        </div>

        {/* Bottom: Explanation snippet */}
        <div className="mt-3 border-t border-slate-700/50 pt-3">
          <p className="line-clamp-2 text-xs text-slate-300">
            {recommendation.explanation}
          </p>
        </div>
      </Card>
    </Link>
  );
}
