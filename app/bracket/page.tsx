'use client';

import { Header } from '@/components/layout/Header';
import { BottomNavigation } from '@/components/layout/Navigation';
import { KnockoutBracket } from '@/components/bracket/KnockoutBracket';

export default function BracketPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Header />

      <main className="mx-auto max-w-6xl px-4 py-6 pb-24">
        <h2 className="text-3xl font-bold text-slate-100 mb-2">Knockout Stage</h2>
        <p className="text-slate-400 mb-8">
          FIFA World Cup 2026 bracket
        </p>

        <KnockoutBracket />
      </main>

      <BottomNavigation />
    </div>
  );
}
