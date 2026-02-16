import GlassCard from '../../../components/layout/GlassCard';
import { useGetReconsiderationRate } from '../../../hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';
import { RotateCcw } from 'lucide-react';

export default function ReconsiderationRateCard() {
  const { data: rate, isLoading } = useGetReconsiderationRate();

  return (
    <GlassCard className="p-6 space-y-4">
      <div className="flex items-center gap-3">
        <RotateCcw className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-light">Reconsideration Rate</h3>
      </div>
      {isLoading ? (
        <Skeleton className="h-16 w-full" />
      ) : (
        <div className="space-y-2">
          <p className="text-5xl font-light">{rate}%</p>
          <p className="text-sm text-muted-foreground">
            of decisions were reconsidered before finalizing
          </p>
        </div>
      )}
    </GlassCard>
  );
}
