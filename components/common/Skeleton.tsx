'use client';

import { Card } from '@/components/ui/card';

export function MatchCardSkeleton() {
  return (
    <Card className="border-slate-700 bg-slate-800/30 p-4 animate-pulse">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-7 space-y-3">
          <div className="h-4 bg-slate-700 rounded w-3/4"></div>
          <div className="h-4 bg-slate-700 rounded w-3/4"></div>
          <div className="h-3 bg-slate-700 rounded w-1/2"></div>
        </div>
        <div className="col-span-5">
          <div className="h-24 bg-slate-700 rounded w-full"></div>
        </div>
      </div>
    </Card>
  );
}

export function MatchDetailSkeleton() {
  return (
    <div className="space-y-6">
      <Card className="border-slate-700 bg-slate-800/30 p-6 animate-pulse">
        <div className="h-8 bg-slate-700 rounded w-1/2 mb-4"></div>
        <div className="h-40 bg-slate-700 rounded w-full"></div>
      </Card>
      <Card className="border-slate-700 bg-slate-800/30 p-6 animate-pulse">
        <div className="h-8 bg-slate-700 rounded w-1/3 mb-4"></div>
        <div className="space-y-3">
          <div className="h-4 bg-slate-700 rounded"></div>
          <div className="h-4 bg-slate-700 rounded"></div>
          <div className="h-4 bg-slate-700 rounded w-3/4"></div>
        </div>
      </Card>
    </div>
  );
}
