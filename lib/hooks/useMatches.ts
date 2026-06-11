'use client';

import { useEffect, useState } from 'react';
import type { Match } from '@/lib/types';
import { mockMatches, getMatchesForDate, getMatchById } from '@/lib/data/mockMatches';

export function useMatches(dateFilter?: Date) {
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    try {
      // Simulating API call delay
      const timer = setTimeout(() => {
        if (dateFilter) {
          const filtered = getMatchesForDate(dateFilter);
          setMatches(filtered);
        } else {
          // Get all upcoming matches
          const now = new Date();
          const upcoming = mockMatches.filter(
            (m) => new Date(m.kickoffTime) >= now && m.status !== 'finished'
          );
          setMatches(upcoming);
        }
        setIsLoading(false);
      }, 300);

      return () => clearTimeout(timer);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load matches');
      setIsLoading(false);
    }
  }, [dateFilter]);

  return { matches, isLoading, error };
}

export function useMatch(matchId: string) {
  const [match, setMatch] = useState<Match | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    try {
      const timer = setTimeout(() => {
        const found = getMatchById(matchId);
        if (found) {
          setMatch(found);
        } else {
          setError('Match not found');
        }
        setIsLoading(false);
      }, 200);

      return () => clearTimeout(timer);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load match');
      setIsLoading(false);
    }
  }, [matchId]);

  return { match, isLoading, error };
}
