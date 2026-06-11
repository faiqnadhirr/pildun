'use client';

import type { UserPreferences } from '@/lib/types';
import { DEFAULT_USER_PREFERENCES } from '@/lib/utils/constants';

const PREFERENCES_KEY = 'wca_user_preferences';

export function saveUserPreferences(prefs: UserPreferences): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(prefs));
  } catch (e) {
    console.error('Failed to save preferences:', e);
  }
}

export function loadUserPreferences(): UserPreferences {
  if (typeof window === 'undefined') return DEFAULT_USER_PREFERENCES;
  try {
    const stored = localStorage.getItem(PREFERENCES_KEY);
    if (stored) {
      return JSON.parse(stored) as UserPreferences;
    }
  } catch (e) {
    console.error('Failed to load preferences:', e);
  }
  return DEFAULT_USER_PREFERENCES;
}

export function resetUserPreferences(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(PREFERENCES_KEY);
  } catch (e) {
    console.error('Failed to reset preferences:', e);
  }
}

export function updateUserPreferences(
  updates: Partial<UserPreferences>
): UserPreferences {
  const current = loadUserPreferences();
  const updated = { ...current, ...updates };
  saveUserPreferences(updated);
  return updated;
}
