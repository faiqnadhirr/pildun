'use client';

import type { ScoringFactor } from '@/lib/types';
import { Card } from '@/components/ui/card';

interface RecommendationFactorsProps {
  factors: ScoringFactor[];
}

export function RecommendationFactors({ factors }: RecommendationFactorsProps) {
  if (factors.length === 0) {
    return null;
  }

  return (
    <Card className="border-slate-700 bg-slate-800/30 p-4">
      <h3 className="mb-4 font-semibold text-slate-100">Key Factors</h3>
      <div className="space-y-3">
        {factors.map((factor, idx) => (
          <div key={idx} className="border-l-2 border-blue-400/30 pl-3">
            <div className="flex items-center justify-between mb-1">
              <p className="font-medium text-sm text-slate-100">{factor.name}</p>
              <span className="inline-block rounded-full bg-blue-400/10 px-2 py-0.5 text-xs font-semibold text-blue-400">
                +{factor.points}
              </span>
            </div>
            <p className="text-xs text-slate-400">{factor.explanation}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
