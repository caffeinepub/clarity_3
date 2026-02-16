import GlassCard from '../../../components/layout/GlassCard';
import { useGetAllSessions } from '../../../hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';
import { Clock } from 'lucide-react';

export default function TimeOfDayPatternCard() {
  const { data: sessions, isLoading } = useGetAllSessions();

  const getTimeOfDayBreakdown = () => {
    if (!sessions) return { morning: 0, afternoon: 0, evening: 0, night: 0 };

    const breakdown = { morning: 0, afternoon: 0, evening: 0, night: 0 };

    sessions.forEach((session) => {
      const date = new Date(Number(session.timestamp) / 1000000);
      const hour = date.getHours();

      if (hour >= 5 && hour < 12) breakdown.morning++;
      else if (hour >= 12 && hour < 17) breakdown.afternoon++;
      else if (hour >= 17 && hour < 21) breakdown.evening++;
      else breakdown.night++;
    });

    return breakdown;
  };

  const breakdown = getTimeOfDayBreakdown();
  const entries = Object.entries(breakdown).sort((a, b) => b[1] - a[1]);
  const topTime = entries[0];
  const hasData = topTime && topTime[1] > 0;

  return (
    <GlassCard className="p-6 space-y-4">
      <div className="flex items-center gap-3">
        <Clock className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-light">Peak Decision Time</h3>
      </div>
      {isLoading ? (
        <Skeleton className="h-16 w-full" />
      ) : hasData ? (
        <div className="space-y-2">
          <p className="text-3xl font-light capitalize">{topTime[0]}</p>
          <p className="text-sm text-muted-foreground">{topTime[1]} decisions</p>
        </div>
      ) : (
        <p className="text-muted-foreground">No decisions recorded yet</p>
      )}
    </GlassCard>
  );
}
