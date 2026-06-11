'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Trophy, Brackets, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/standings', label: 'Standings', icon: Trophy },
  { href: '/bracket', label: 'Bracket', icon: Brackets },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-slate-800 bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 md:hidden">
      <div className="flex justify-around">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href}>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                'flex h-auto flex-col gap-1 rounded-none px-3 py-2 text-xs',
                pathname === href
                  ? 'text-blue-400 border-t-2 border-blue-400'
                  : 'text-slate-400 hover:text-slate-200'
              )}
            >
              <Icon className="h-5 w-5" />
              {label}
            </Button>
          </Link>
        ))}
      </div>
    </nav>
  );
}
