import GlassCard from '../../../components/layout/GlassCard';
import { useGetCategoryAnalysis } from '../../../hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';
import { Tag } from 'lucide-react';

export default function CategoryBreakdownCard() {
  const { data: categories, isLoading } = useGetCategoryAnalysis();

  const getCategoryArray = () => {
    if (!categories) return [];
    return [
      { name: 'Reason', count: Number(categories.reason) },
      { name: 'Habit', count: Number(categories.habit) },
      { name: 'Emotion', count: Number(categories.emotion) },
      { name: 'Convenience', count: Number(categories.convenience) },
      { name: 'Social', count: Number(categories.social) },
      { name: 'Health', count: Number(categories.health) },
      { name: 'Productivity', count: Number(categories.productivity) },
    ].sort((a, b) => b.count - a.count);
  };

  const categoryArray = getCategoryArray();
  const topCategory = categoryArray[0];
  const hasData = topCategory && topCategory.count > 0;

  return (
    <GlassCard className="p-6 space-y-4">
      <div className="flex items-center gap-3">
        <Tag className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-light">Most Common Category</h3>
      </div>
      {isLoading ? (
        <Skeleton className="h-16 w-full" />
      ) : hasData ? (
        <div className="space-y-2">
          <p className="text-3xl font-light">{topCategory.name}</p>
          <p className="text-sm text-muted-foreground">{topCategory.count} decisions</p>
        </div>
      ) : (
        <p className="text-muted-foreground">No categorized decisions yet</p>
      )}
    </GlassCard>
  );
}
