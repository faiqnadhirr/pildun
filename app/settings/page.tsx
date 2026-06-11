'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { BottomNavigation } from '@/components/layout/Navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useUserPreferences } from '@/lib/hooks';
import { DEFAULT_USER_PREFERENCES, FAN_LEVELS } from '@/lib/utils/constants';
import type { UserPreferences } from '@/lib/types';

const TIMEZONES = [
  'UTC',
  'America/New_York',
  'America/Los_Angeles',
  'America/Chicago',
  'Europe/London',
  'Europe/Paris',
  'Asia/Tokyo',
  'Asia/Shanghai',
  'Australia/Sydney',
  'America/Toronto',
  'America/Mexico_City',
  'America/Denver',
  'America/Anchorage',
  'Pacific/Auckland',
];

const TOP_TEAMS = [
  { id: 'ARG', name: '🇦🇷 Argentina' },
  { id: 'FRA', name: '🇫🇷 France' },
  { id: 'ENG', name: '🏴󐁧󐁢󐁥󐁮󐁧󐁿 England' },
  { id: 'BRA', name: '🇧🇷 Brazil' },
  { id: 'ESP', name: '🇪🇸 Spain' },
  { id: 'GER', name: '🇩🇪 Germany' },
  { id: 'NED', name: '🇳🇱 Netherlands' },
  { id: 'BEL', name: '🇧🇪 Belgium' },
  { id: 'ITA', name: '🇮🇹 Italy' },
  { id: 'POR', name: '🇵🇹 Portugal' },
  { id: 'USA', name: '🇺🇸 USA' },
  { id: 'MEX', name: '🇲🇽 Mexico' },
];

export default function SettingsPage() {
  const { preferences, isLoaded, updatePreferences } = useUserPreferences();
  const [formData, setFormData] = useState<UserPreferences>(DEFAULT_USER_PREFERENCES);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (isLoaded && preferences) {
      setFormData(preferences);
    }
  }, [isLoaded, preferences]);

  const handleSave = () => {
    updatePreferences(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleReset = () => {
    setFormData(DEFAULT_USER_PREFERENCES);
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-slate-950">
        <Header />
        <main className="mx-auto max-w-2xl px-4 py-6 pb-24">
          <p className="text-slate-400">Loading...</p>
        </main>
        <BottomNavigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <Header />

      <main className="mx-auto max-w-2xl px-4 py-6 pb-24">
        <h2 className="text-3xl font-bold text-slate-100 mb-2">Settings</h2>
        <p className="text-slate-400 mb-8">Customize your watch advisor preferences</p>

        {isSaved && (
          <div className="mb-6 rounded-lg bg-green-900/20 border border-green-700 text-green-300 p-3 text-sm">
            ✓ Settings saved successfully!
          </div>
        )}

        <div className="space-y-6">
          {/* Sleep Schedule */}
          <Card className="border-slate-700 bg-slate-800/30 p-6">
            <h3 className="text-lg font-semibold text-slate-100 mb-4">Sleep Schedule</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Bedtime
                </label>
                <input
                  type="time"
                  value={formData.bedtime}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      bedtime: e.target.value,
                    }))
                  }
                  className="w-full rounded-lg bg-slate-900 border border-slate-700 text-slate-100 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Wake-up Time
                </label>
                <input
                  type="time"
                  value={formData.wakeupTime}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      wakeupTime: e.target.value,
                    }))
                  }
                  className="w-full rounded-lg bg-slate-900 border border-slate-700 text-slate-100 px-3 py-2"
                />
              </div>
            </div>
          </Card>

          {/* Timezone */}
          <Card className="border-slate-700 bg-slate-800/30 p-6">
            <h3 className="text-lg font-semibold text-slate-100 mb-4">Timezone</h3>
            <select
              value={formData.timezone}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  timezone: e.target.value,
                }))
              }
              className="w-full rounded-lg bg-slate-900 border border-slate-700 text-slate-100 px-3 py-2"
            >
              {TIMEZONES.map((tz) => (
                <option key={tz} value={tz}>
                  {tz}
                </option>
              ))}
            </select>
          </Card>

          {/* Fan Level */}
          <Card className="border-slate-700 bg-slate-800/30 p-6">
            <h3 className="text-lg font-semibold text-slate-100 mb-4">Fan Level</h3>
            <div className="space-y-3">
              {Object.entries(FAN_LEVELS).map(([key, value]) => (
                <label key={key} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="fanLevel"
                    value={key}
                    checked={formData.fanLevel === key}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        fanLevel: e.target.value as any,
                      }))
                    }
                    className="rounded-full"
                  />
                  <span className="text-slate-300">{value.label}</span>
                  <span className="text-xs text-slate-400">
                    (Sleep penalty: {value.sleepMultiplier}x)
                  </span>
                </label>
              ))}
            </div>
          </Card>

          {/* Favorited Teams */}
          <Card className="border-slate-700 bg-slate-800/30 p-6">
            <h3 className="text-lg font-semibold text-slate-100 mb-4">Favorited Teams</h3>
            <div className="grid grid-cols-2 gap-2">
              {TOP_TEAMS.map((team) => (
                <label
                  key={team.id}
                  className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-slate-700/50 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={formData.favoritedTeams.includes(team.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData((prev) => ({
                          ...prev,
                          favoritedTeams: [...prev.favoritedTeams, team.id],
                        }));
                      } else {
                        setFormData((prev) => ({
                          ...prev,
                          favoritedTeams: prev.favoritedTeams.filter((t) => t !== team.id),
                        }));
                      }
                    }}
                    className="rounded"
                  />
                  <span className="text-slate-300 text-sm">{team.name}</span>
                </label>
              ))}
            </div>
          </Card>

          {/* Rival Teams */}
          <Card className="border-slate-700 bg-slate-800/30 p-6">
            <h3 className="text-lg font-semibold text-slate-100 mb-4">Rival Teams</h3>
            <div className="grid grid-cols-2 gap-2">
              {TOP_TEAMS.map((team) => (
                <label
                  key={team.id}
                  className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-slate-700/50 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={formData.rivalTeams.includes(team.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData((prev) => ({
                          ...prev,
                          rivalTeams: [...prev.rivalTeams, team.id],
                        }));
                      } else {
                        setFormData((prev) => ({
                          ...prev,
                          rivalTeams: prev.rivalTeams.filter((t) => t !== team.id),
                        }));
                      }
                    }}
                    className="rounded"
                  />
                  <span className="text-slate-300 text-sm">{team.name}</span>
                </label>
              ))}
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={handleSave}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            >
              Save Changes
            </Button>
            <Button
              onClick={handleReset}
              variant="outline"
              className="flex-1 border-slate-700 text-slate-300 hover:bg-slate-800"
            >
              Reset to Defaults
            </Button>
          </div>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
}
