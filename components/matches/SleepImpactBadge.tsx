'use client';

import type { SleepImpact } from '@/lib/types';
import { cn } from '@/lib/utils';

interface SleepImpactBadgeProps {
  sleepImpact: SleepImpact;
  showDetails?: boolean;
}

const impactIcons = {
  low: '😴',
  medium: '⚠️',
  high: '🚨',
};

const impactColors = {
  low: 'bg-green-900/20 border-green-700 text-green-300',
  medium: 'bg-yellow-900/20 border-yellow-700 text-yellow-300',
  high: 'bg-red-900/20 border-red-700 text-red-300',
};

const impactLabels = {
  low: 'Low Sleep Impact',
  medium: 'Medium Sleep Impact',
  high: 'High Sleep Impact',
};

export function SleepImpactBadge({ sleepImpact, showDetails = false }: SleepImpactBadgeProps) {
  return (
    <div
      className={cn(
        'rounded-lg border p-3',
        impactColors[sleepImpact.impactLevel]
      )}
    >
      <div className="flex items-center gap-2">
        <span className="text-lg">{impactIcons[sleepImpact.impactLevel]}</span>
        <div className="flex-1">
          <p className="font-semibold text-sm">{impactLabels[sleepImpact.impactLevel]}</p>
          {showDetails && (
            <p className="text-xs opacity-90 mt-1">{sleepImpact.details}</p>
          )}
        </div>
        {!showDetails && (
          <span className="text-xs font-semibold whitespace-nowrap">
            -{sleepImpact.penalty} pts
          </span>
        )}
      </div>
    </div>
  );
}
