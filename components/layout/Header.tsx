'use client';

import Link from 'next/link';
import { Settings, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">⚽</span>
          <div>
            <h1 className="text-lg font-bold text-blue-400">World Cup</h1>
            <p className="text-xs text-slate-400">Watch Advisor</p>
          </div>
        </Link>

        <Link href="/settings">
          <Button size="icon" variant="ghost" className="text-slate-400 hover:text-slate-200">
            <Settings className="h-5 w-5" />
          </Button>
        </Link>
      </div>
    </header>
  );
}
