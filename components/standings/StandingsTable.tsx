'use client';

import type { Standings } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface StandingsTableProps {
  standings: Standings;
}

export function StandingsTable({ standings }: StandingsTableProps) {
  return (
    <Card className="border-slate-700 bg-slate-800/30 overflow-hidden">
      <div className="p-4">
        <h3 className="mb-4 text-lg font-semibold text-slate-100">Group {standings.group}</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="px-2 py-2 text-left font-semibold text-slate-300">Pos</th>
                <th className="px-2 py-2 text-left font-semibold text-slate-300">Team</th>
                <th className="px-2 py-2 text-center font-semibold text-slate-300">P</th>
                <th className="px-2 py-2 text-center font-semibold text-slate-300">W-D-L</th>
                <th className="px-2 py-2 text-center font-semibold text-slate-300">GD</th>
                <th className="px-2 py-2 text-center font-semibold text-slate-300">Pts</th>
              </tr>
            </thead>
            <tbody>
              {standings.entries.map((entry, idx) => (
                <tr
                  key={idx}
                  className="border-b border-slate-700/50 hover:bg-slate-800/50 transition-colors"
                >
                  <td className="px-2 py-2 font-semibold text-slate-300 w-8">
                    {entry.position}
                  </td>
                  <td className="px-2 py-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{entry.team.flag}</span>
                      <span className="text-slate-100 font-medium">{entry.team.name}</span>
                      {entry.qualificationRules && (
                        <Badge
                          variant="outline"
                          className={
                            entry.qualificationRules === 'Qualified'
                              ? 'text-green-400 border-green-400/30'
                              : 'text-red-400 border-red-400/30'
                          }
                        >
                          {entry.qualificationRules}
                        </Badge>
                      )}
                    </div>
                  </td>
                  <td className="px-2 py-2 text-center text-slate-300">
                    {entry.playedGames}
                  </td>
                  <td className="px-2 py-2 text-center text-slate-300">
                    {entry.wins}-{entry.draws}-{entry.losses}
                  </td>
                  <td className="px-2 py-2 text-center text-slate-300">
                    {entry.goalDifference > 0 ? '+' : ''}
                    {entry.goalDifference}
                  </td>
                  <td className="px-2 py-2 text-center font-bold text-blue-400">
                    {entry.points}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
}
