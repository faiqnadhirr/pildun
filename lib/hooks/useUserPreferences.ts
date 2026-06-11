'use client';

import { useEffect, useState } from 'react';
import type { UserPreferences } from '@/lib/types';
import {
  loadUserPreferences,
  saveUserPreferences,
  updateUserPreferences as updatePrefs,
} from '@/lib/storage/userPreferences';

export function useUserPreferences() {
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load preferences on mount
    const loaded = loadUserPreferences();
    setPreferences(loaded);
    setIsLoaded(true);
  }, []);

  const updatePreferences = (updates: Partial<UserPreferences>) => {
    const updated = updatePrefs(updates);
    setPreferences(updated);
  };

  return {
    preferences,
    isLoaded,
    updatePreferences,
    savePreferences: (prefs: UserPreferences) => {
      saveUserPreferences(prefs);
      setPreferences(prefs);
    },
  };
}
