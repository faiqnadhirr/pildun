'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { BottomNavigation } from '@/components/layout/Navigation';
import { RecommendationScore } from '@/components/matches/RecommendationScore';
import { RecommendationFactors } from '@/components/matches/RecommendationFactors';
import { SleepImpactBadge } from '@/components/matches/SleepImpactBadge';
import { MatchDetailSkeleton } from '@/components/common/Skeleton';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useMatch, useUserPreferences } from '@/lib/hooks';
import { generateRecommendation } from '@/lib/engine/recommendationEngine';
import { TOURNAMENT_STAGES } from '@/lib/utils/constants';
import { getHumanReadableTime } from '@/lib/utils/formatting';

interface MatchDetailPageProps {
  params: { matchId: string };
}

export default function MatchDetailPage({ params }: MatchDetailPageProps) {
  const router = useRouter();
  const { match, isLoading } = useMatch(params.matchId);
  const { preferences, isLoaded } = useUserPreferences();

  if (isLoading || !isLoaded) {
    return (
      <div className="min-h-screen bg-slate-950">
        <Header />
        <main className="mx-auto max-w-4xl px-4 py-6 pb-24">
          <MatchDetailSkeleton />
        </main>
        <BottomNavigation />
      </div>
    );
  }

  if (!match) {
    return (
      <div className="min-h-screen bg-slate-950">
        <Header />
        <main className="mx-auto max-w-4xl px-4 py-6 pb-24">
          <div className="text-center py-12">
            <p className="text-slate-400">Match not found</p>
            <Button onClick={() => router.back()} className="mt-4">
              Go Back
            </Button>
          </div>
        </main>
        <BottomNavigation />
      </div>
    );
  }

  const recommendation = generateRecommendation(match, preferences!);
  const stageData = TOURNAMENT_STAGES[match.stage];
  const kickoffTime = getHumanReadableTime(match.kickoffTime, preferences!.timezone);

  return (
    <div className="min-h-screen bg-slate-950">
      <Header />

      <main className="mx-auto max-w-4xl px-4 py-6 pb-24">
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
          Back
        </button>

        <Card className="border-slate-700 bg-slate-800/30 p-6 mb-6">
          <div className="text-center mb-6">
            <p className="text-slate-400 text-sm mb-2">{stageData.label}</p>
            {match.group && (
              <Badge variant="outline" className="mb-4">
                Group {match.group}
              </Badge>
            )}
            <div className="flex items-center justify-center gap-4">
              <div>
                <div className="text-3xl mb-2">{match.homeTeam.flag}</div>
                <p className="text-slate-100 font-semibold">{match.homeTeam.name}</p>
              </div>
              <div className="text-center">
                {match.score ? (
                  <div className="text-4xl font-bold text-slate-100">
                    {match.score.home}-{match.score.away}
                  </div>
                ) : (
                  <p className="text-slate-400 text-sm">vs</p>
                )}
              </div>
              <div>
                <div className="text-3xl mb-2">{match.awayTeam.flag}</div>
                <p className="text-slate-100 font-semibold">{match.awayTeam.name}</p>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-700 pt-4 text-center">
            <p className="text-sm text-slate-400">{kickoffTime}</p>
            {match.venue && (
              <p className="text-sm text-slate-400 mt-1">{match.venue}</p>
            )}
          </div>
        </Card>

        <div className="mb-6 flex justify-center">
          <RecommendationScore
            score={recommendation.score}
            verdict={recommendation.verdict}
          />
        </div>

        <Card className="border-slate-700 bg-slate-800/30 p-6 mb-6">
          <p className="text-slate-100 leading-relaxed">
            {recommendation.explanation}
          </p>
        </Card>

        <div className="mb-6">
          <RecommendationFactors factors={recommendation.keyFactors} />
        </div>

        <div className="mb-6">
          <SleepImpactBadge sleepImpact={recommendation.sleepImpact} showDetails />
        </div>

        <Card className="border-slate-700 bg-slate-800/30 p-6 mb-6">
          <h3 className="font-semibold text-slate-100 mb-4">Team Information</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-slate-400 mb-2">
                {match.homeTeam.name}
              </p>
              <div className="space-y-1 text-sm">
                <p className="text-slate-300">
                  <span className="text-slate-400">Ranking:</span> #{match.homeTeam.ranking}
                </p>
                <p className="text-slate-300">
                  <span className="text-slate-400">Recent Form:</span>{' '}
                  {match.homeTeam.recentForm
                    .slice(0, 3)
                    .map((f) => f.result)
                    .join('')}
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm text-slate-400 mb-2">
                {match.awayTeam.name}
              </p>
              <div className="space-y-1 text-sm">
                <p className="text-slate-300">
                  <span className="text-slate-400">Ranking:</span> #{match.awayTeam.ranking}
                </p>
                <p className="text-slate-300">
                  <span className="text-slate-400">Recent Form:</span>{' '}
                  {match.awayTeam.recentForm
                    .slice(0, 3)
                    .map((f) => f.result)
                    .join('')}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {match.head2head && (
          <Card className="border-slate-700 bg-slate-800/30 p-6">
            <h3 className="font-semibold text-slate-100 mb-4">Head-to-Head</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-400">
                  {match.head2head.homeWins}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  {match.homeTeam.name} Wins
                </p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-400">
                  {match.head2head.draws}
                </p>
                <p className="text-xs text-slate-400 mt-1">Draws</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-red-400">
                  {match.head2head.awayWins}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  {match.awayTeam.name} Wins
                </p>
              </div>
            </div>
          </Card>
        )}
      </main>

      <BottomNavigation />
    </div>
  );
}
