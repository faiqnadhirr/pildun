'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { BottomNavigation } from '@/components/layout/Navigation';
import { MatchCard } from '@/components/matches/MatchCard';
import { MatchCardSkeleton } from '@/components/common/Skeleton';
import { EmptyState } from '@/components/common/EmptyState';
import { useMatches, useUserPreferences } from '@/lib/hooks';
import { generateRecommendation } from '@/lib/engine/recommendationEngine';
import type { Match, Recommendation } from '@/lib/types';

interface MatchWithRec {
  match: Match;
  recommendation: Recommendation;
}

export default function HomePage() {
  const { matches, isLoading } = useMatches(new Date());
  const { preferences, isLoaded } = useUserPreferences();
  const [matchesWithRecs, setMatchesWithRecs] = useState<{
    mustWatch: MatchWithRec[];
    worthWatching: MatchWithRec[];
    skip: MatchWithRec[];
  }>({ mustWatch: [], worthWatching: [], skip: [] });

  useEffect(() => {
    if (!isLoaded || !preferences) return;

    const withRecs = matches.map((match) => ({
      match,
      recommendation: generateRecommendation(match, preferences),
    }));

    const grouped = {
      mustWatch: withRecs.filter((m) => m.recommendation.verdict === 'must-watch'),
      worthWatching: withRecs.filter((m) => m.recommendation.verdict === 'worth-watching'),
      skip: withRecs.filter((m) => m.recommendation.verdict === 'skip'),
    };

    setMatchesWithRecs(grouped);
  }, [matches, isLoaded, preferences]);

  if (isLoading || !isLoaded) {
    return (
      <div className="min-h-screen bg-slate-950">
        <Header />
        <main className="mx-auto max-w-4xl px-4 py-6 pb-24">
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <MatchCardSkeleton key={i} />
            ))}
          </div>
        </main>
        <BottomNavigation />
      </div>
    );
  }

  const totalMatches = matches.length;

  return (
    <div className="min-h-screen bg-slate-950">
      <Header />

      <main className="mx-auto max-w-4xl px-4 py-6 pb-24">
        {/* Header Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-100 mb-2">
            Today's Matches
          </h2>
          <p className="text-slate-400">
            {totalMatches} match{totalMatches !== 1 ? 'es' : ''} found
          </p>
        </div>

        {/* Must Watch Section */}
        {matchesWithRecs.mustWatch.length > 0 && (
          <section className="mb-8">
            <div className="mb-4 flex items-center gap-2">
              <span className="text-2xl">🔥</span>
              <h3 className="text-xl font-bold text-green-400">
                Must Watch ({matchesWithRecs.mustWatch.length})
              </h3>
            </div>
            <div className="space-y-3">
              {matchesWithRecs.mustWatch.map(({ match, recommendation }) => (
                <MatchCard
                  key={match.id}
                  match={match}
                  recommendation={recommendation}
                  userTimezone={preferences!.timezone}
                />
              ))}
            </div>
          </section>
        )}

        {/* Worth Watching Section */}
        {matchesWithRecs.worthWatching.length > 0 && (
          <section className="mb-8">
            <div className="mb-4 flex items-center gap-2">
              <span className="text-2xl">👍</span>
              <h3 className="text-xl font-bold text-blue-400">
                Worth Watching ({matchesWithRecs.worthWatching.length})
              </h3>
            </div>
            <div className="space-y-3">
              {matchesWithRecs.worthWatching.map(({ match, recommendation }) => (
                <MatchCard
                  key={match.id}
                  match={match}
                  recommendation={recommendation}
                  userTimezone={preferences!.timezone}
                />
              ))}
            </div>
          </section>
        )}

        {/* Skip Section */}
        {matchesWithRecs.skip.length > 0 && (
          <section className="mb-8">
            <div className="mb-4 flex items-center gap-2">
              <span className="text-2xl">⏭️</span>
              <h3 className="text-xl font-bold text-slate-400">
                Skip ({matchesWithRecs.skip.length})
              </h3>
            </div>
            <div className="space-y-3">
              {matchesWithRecs.skip.map(({ match, recommendation }) => (
                <MatchCard
                  key={match.id}
                  match={match}
                  recommendation={recommendation}
                  userTimezone={preferences!.timezone}
                />
              ))}
            </div>
          </section>
        )}

        {totalMatches === 0 && (
          <EmptyState
            icon="📅"
            title="No Matches Today"
            description="Check back later for upcoming matches!"
          />
        )}
      </main>

      <BottomNavigation />
    </div>
  );
}
