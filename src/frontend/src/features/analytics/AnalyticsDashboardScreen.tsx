import FadeIn from '../../components/ux/FadeIn';
import ReconsiderationRateCard from './widgets/ReconsiderationRateCard';
import CategoryBreakdownCard from './widgets/CategoryBreakdownCard';
import TimeOfDayPatternCard from './widgets/TimeOfDayPatternCard';

export default function AnalyticsDashboardScreen() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <FadeIn>
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-light tracking-wide">Analytics</h1>
            <p className="text-muted-foreground text-lg">Patterns in your decision-making journey</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ReconsiderationRateCard />
            <CategoryBreakdownCard />
            <TimeOfDayPatternCard />
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
