export function formatMatchTime(
  isoTime: string,
  timezone: string = 'UTC'
): { time: string; date: string } {
  try {
    const date = new Date(isoTime);
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    const parts = formatter.formatToParts(date);
    const dateStr = parts
      .slice(0, 3)
      .map((p) => p.value)
      .join('/');
    const timeStr = parts
      .slice(4, 6)
      .map((p) => p.value)
      .join(':');

    return { time: timeStr, date: dateStr };
  } catch {
    return { time: '00:00', date: '00/00/0000' };
  }
}

export function formatScore(home: number, away: number): string {
  return `${home} - ${away}`;
}

export function formatTeamName(name: string): string {
  return name.length > 20 ? name.substring(0, 17) + '...' : name;
}

export function formatTimeDifference(hours: number): string {
  if (hours < 1) {
    const mins = Math.round(hours * 60);
    return `${mins}m ago`;
  }
  if (hours < 24) {
    return `${Math.round(hours)}h ago`;
  }
  const days = Math.round(hours / 24);
  return `${days}d ago`;
}

export function isWithinTimeRange(
  checkTime: string,
  startTime: string,
  endTime: string
): boolean {
  const [checkHour, checkMin] = checkTime.split(':').map(Number);
  const [startHour, startMin] = startTime.split(':').map(Number);
  const [endHour, endMin] = endTime.split(':').map(Number);

  const checkMinutes = checkHour * 60 + checkMin;
  const startMinutes = startHour * 60 + startMin;
  const endMinutes = endHour * 60 + endMin;

  if (startMinutes <= endMinutes) {
    return checkMinutes >= startMinutes && checkMinutes <= endMinutes;
  }
  // Handle overnight times (e.g., 22:00 to 07:00)
  return checkMinutes >= startMinutes || checkMinutes <= endMinutes;
}

export function calculateHoursUntil(kickoffTime: string): number {
  const now = new Date();
  const kickoff = new Date(kickoffTime);
  const diff = kickoff.getTime() - now.getTime();
  return diff / (1000 * 60 * 60);
}

export function getHumanReadableTime(kickoffTime: string, timezone: string): string {
  const { time, date } = formatMatchTime(kickoffTime, timezone);
  const hoursUntil = calculateHoursUntil(kickoffTime);

  if (hoursUntil < 0) {
    return 'Match finished';
  }
  if (hoursUntil < 1) {
    return 'Starting soon';
  }
  if (hoursUntil < 24) {
    return `Today at ${time}`;
  }
  return `${date} at ${time}`;
}
