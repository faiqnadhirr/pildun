'use client';

import { cn } from '@/lib/utils';

interface RecommendationScoreProps {
  score: number;
  verdict: 'must-watch' | 'worth-watching' | 'skip';
  compact?: boolean;
}

const verdictColors = {
  'must-watch': 'text-green-400 bg-green-400/10 border-green-400/30',
  'worth-watching': 'text-blue-400 bg-blue-400/10 border-blue-400/30',
  skip: 'text-slate-400 bg-slate-400/10 border-slate-400/30',
};

const verdictLabels = {
  'must-watch': '🔥 MUST WATCH',
  'worth-watching': '👍 Worth Watching',
  skip: '⏭️ Skip',
};

export function RecommendationScore({
  score,
  verdict,
  compact = false,
}: RecommendationScoreProps) {
  if (compact) {
    return (
      <div
        className={cn(
          'rounded-full px-3 py-1 text-xs font-bold border',
          verdictColors[verdict]
        )}
      >
        {score}/100
      </div>
    );
  }

  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative h-40 w-40">
        {/* Background circle */}
        <svg className="absolute inset-0 h-40 w-40 -rotate-90">
          <circle
            cx="80"
            cy="80"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-slate-700"
          />
          {/* Score circle */}
          <circle
            cx="80"
            cy="80"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className={cn(
              'transition-all duration-500',
              verdict === 'must-watch'
                ? 'text-green-400'
                : verdict === 'worth-watching'
                  ? 'text-blue-400'
                  : 'text-slate-400'
            )}
            strokeLinecap="round"
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-slate-50">{Math.round(score)}</span>
          <span className="text-xs text-slate-400">/100</span>
        </div>
      </div>

      <div
        className={cn(
          'rounded-lg border px-4 py-2 font-semibold',
          verdictColors[verdict]
        )}
      >
        {verdictLabels[verdict]}
      </div>
    </div>
  );
}
