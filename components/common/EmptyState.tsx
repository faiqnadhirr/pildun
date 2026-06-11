'use client';

import { Card } from '@/components/ui/card';

interface EmptyStateProps {
  icon?: string;
  title: string;
  description: string;
}

export function EmptyState({ icon = '⚽', title, description }: EmptyStateProps) {
  return (
    <Card className="border-slate-700 bg-slate-800/30 p-12 text-center">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-slate-100 mb-2">{title}</h3>
      <p className="text-slate-400">{description}</p>
    </Card>
  );
}
