import { useNavigate } from '@tanstack/react-router';
import FadeIn from '../../components/ux/FadeIn';
import GlassCard from '../../components/layout/GlassCard';
import { useGetAllSessions } from '../../hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';

export default function PastDecisionsScreen() {
  const navigate = useNavigate();
  const { data: sessions, isLoading } = useGetAllSessions();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="space-y-6">
          <Skeleton className="h-12 w-64" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <FadeIn>
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-light tracking-wide">Past Decisions</h1>
            <p className="text-muted-foreground text-lg">
              {sessions?.length || 0} reflection{sessions?.length !== 1 ? 's' : ''} recorded
            </p>
          </div>

          {!sessions || sessions.length === 0 ? (
            <GlassCard className="p-12 text-center">
              <p className="text-muted-foreground text-lg">No decisions recorded yet.</p>
            </GlassCard>
          ) : (
            <div className="space-y-4">
              {sessions.map((session, index) => (
                <FadeIn key={index} delay={index * 100}>
                  <GlassCard
                    className="p-6 cursor-pointer hover:bg-card/50 transition-all"
                    onClick={() =>
                      navigate({
                        to: '/history/$sessionId',
                        params: { sessionId: index.toString() },
                      })
                    }
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-xl font-light flex-1">{session.actionTitle}</h3>
                        <span className="text-sm text-muted-foreground whitespace-nowrap">
                          {format(new Date(Number(session.timestamp) / 1000000), 'MMM d, yyyy')}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span
                          className={
                            session.finalDecision === 'Reconsidered'
                              ? 'text-primary'
                              : 'text-muted-foreground'
                          }
                        >
                          {session.finalDecision}
                        </span>
                        <span className="text-muted-foreground">·</span>
                        <span className="text-muted-foreground">{session.outcome}</span>
                      </div>
                    </div>
                  </GlassCard>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </FadeIn>
    </div>
  );
}
