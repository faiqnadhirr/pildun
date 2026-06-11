'use client';

import { useEffect, useState } from 'react';
import type { Standings } from '@/lib/types';
import { getAllGroupStandings, getGroupStandings } from '@/lib/data/mockStandings';

export function useStandings(group?: string) {
  const [standings, setStandings] = useState<Standings[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    try {
      const timer = setTimeout(() => {
        if (group) {
          const groupStandings = getGroupStandings(group);
          if (groupStandings) {
            setStandings([groupStandings]);
          } else {
            setError(`Group ${group} not found`);
          }
        } else {
          const allStandings = getAllGroupStandings();
          setStandings(allStandings);
        }
        setIsLoading(false);
      }, 300);

      return () => clearTimeout(timer);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load standings');
      setIsLoading(false);
    }
  }, [group]);

  return { standings, isLoading, error };
}
