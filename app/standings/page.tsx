'use client';

import { Header } from '@/components/layout/Header';
import { BottomNavigation } from '@/components/layout/Navigation';
import { StandingsTable } from '@/components/standings/StandingsTable';
import { useStandings } from '@/lib/hooks';
import { Card } from '@/components/ui/card';

export default function StandingsPage() {
  const { standings, isLoading } = useStandings();

  return (
    <div className="min-h-screen bg-slate-950">
      <Header />

      <main className="mx-auto max-w-4xl px-4 py-6 pb-24">
        <h2 className="text-3xl font-bold text-slate-100 mb-2">Tournament Standings</h2>
        <p className="text-slate-400 mb-8">
          Group stage standings and qualification status
        </p>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="border-slate-700 bg-slate-800/30 h-40 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {standings.map((standing) => (
              <StandingsTable key={standing.group} standings={standing} />
            ))}
          </div>
        )}

        {/* Legend */}
        <Card className="border-slate-700 bg-slate-800/30 p-4 mt-8">
          <h3 className="font-semibold text-slate-100 mb-3">Legend</h3>
          <div className="space-y-2 text-sm text-slate-400">
            <p>
              <span className="font-semibold">P</span> - Matches Played
            </p>
            <p>
              <span className="font-semibold">W-D-L</span> - Wins, Draws, Losses
            </p>
            <p>
              <span className="font-semibold">GD</span> - Goal Difference
            </p>
            <p>
              <span className="font-semibold">Pts</span> - Points (Win=3, Draw=1)
            </p>
          </div>
        </Card>
      </main>

      <BottomNavigation />
    </div>
  );
}
