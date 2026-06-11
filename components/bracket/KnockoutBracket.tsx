'use client';

import { Card } from '@/components/ui/card';

export function KnockoutBracket() {
  return (
    <Card className="border-slate-700 bg-slate-800/30 p-6 overflow-x-auto">
      <h2 className="mb-6 text-2xl font-bold text-slate-100">Knockout Stage</h2>

      <svg
        viewBox="0 0 1200 600"
        className="min-w-full"
        style={{ height: 'auto' }}
      >
        {/* Round of 16 - 8 matches */}
        <g>
          <text x="20" y="25" className="fill-slate-400 text-sm font-semibold">Round of 16</text>
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <g key={`r16-${i}`}>
              <rect x="50" y={50 + i * 70} width="140" height="60" fill="none" stroke="#334155" strokeWidth="1" rx="4" />
              <text x="60" y={72 + i * 70} className="fill-slate-300 text-xs font-semibold">
                Team {i + 1}
              </text>
              <text x="60" y={92 + i * 70} className="fill-slate-400 text-xs">
                vs Team {i + 2}
              </text>
              {/* Lines to quarterfinals */}
              <line
                x1="190"
                y1={80 + i * 70}
                x2="240"
                y2={
                  (i < 2 ? 100 : i < 4 ? 240 : i < 6 ? 380 : 520) +
                  (i % 2) * 40
                }
                stroke="#475569"
                strokeWidth="1"
              />
            </g>
          ))}
        </g>

        {/* Quarterfinals - 4 matches */}
        <g>
          <text x="270" y="25" className="fill-slate-400 text-sm font-semibold">Quarterfinals</text>
          {[0, 1, 2, 3].map((i) => (
            <g key={`qf-${i}`}>
              <rect x="240" y={70 + i * 135} width="140" height="60" fill="none" stroke="#334155" strokeWidth="1" rx="4" />
              <text x="250" y={92 + i * 135} className="fill-slate-300 text-xs font-semibold">
                Winner {i + 1}
              </text>
              {/* Lines to semifinals */}
              <line
                x1="380"
                y1={100 + i * 135}
                x2="430"
                y2={(i < 2 ? 140 : 320)}
                stroke="#475569"
                strokeWidth="1"
              />
            </g>
          ))}
        </g>

        {/* Semifinals - 2 matches */}
        <g>
          <text x="460" y="25" className="fill-slate-400 text-sm font-semibold">Semifinals</text>
          {[0, 1].map((i) => (
            <g key={`sf-${i}`}>
              <rect x="430" y={90 + i * 280} width="140" height="60" fill="none" stroke="#334155" strokeWidth="1" rx="4" />
              <text x="440" y={112 + i * 280} className="fill-slate-300 text-xs font-semibold">
                SF Winner {i + 1}
              </text>
              {/* Lines to final */}
              <line
                x1="570"
                y1={120 + i * 280}
                x2="620"
                y2="180"
                stroke="#475569"
                strokeWidth="1"
              />
            </g>
          ))}
        </g>

        {/* Final */}
        <g>
          <text x="650" y="25" className="fill-slate-400 text-sm font-semibold">Final</text>
          <rect x="620" y="150" width="140" height="60" fill="none" stroke="#3b82f6" strokeWidth="2" rx="4" />
          <text x="630" y="172" className="fill-blue-400 text-xs font-bold">
            CHAMPION
          </text>
          <text x="630" y="192" className="fill-slate-400 text-xs">
            TBD
          </text>
        </g>

        {/* Third Place */}
        <g>
          <text x="800" y="25" className="fill-slate-400 text-sm font-semibold">3rd Place</text>
          <rect x="800" y="150" width="140" height="60" fill="none" stroke="#94a3b8" strokeWidth="1" rx="4" />
          <text x="810" y="172" className="fill-slate-300 text-xs font-semibold">
            SF Loser 1
          </text>
          <text x="810" y="192" className="fill-slate-400 text-xs">
            vs SF Loser 2
          </text>
        </g>
      </svg>

      <p className="mt-6 text-xs text-slate-400">
        🏆 Bracket is populated as matches are played. Currently in group stage.
      </p>
    </Card>
  );
}
