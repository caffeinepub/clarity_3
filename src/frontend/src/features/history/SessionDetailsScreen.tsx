import { useParams, useNavigate } from '@tanstack/react-router';
import FadeIn from '../../components/ux/FadeIn';
import GlassCard from '../../components/layout/GlassCard';
import { useGetAllSessions } from '../../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';

export default function SessionDetailsScreen() {
  const { sessionId } = useParams({ from: '/history/$sessionId' });
  const navigate = useNavigate();
  const { data: sessions } = useGetAllSessions();

  const session = sessions?.[parseInt(sessionId)];

  if (!session) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <GlassCard className="p-12 text-center">
          <p className="text-muted-foreground text-lg">Session not found.</p>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <FadeIn>
        <div className="space-y-8">
          <Button variant="ghost" onClick={() => navigate({ to: '/history' })} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to History
          </Button>

          <GlassCard className="p-8 space-y-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <h1 className="text-3xl font-light flex-1">{session.actionTitle}</h1>
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                  {format(new Date(Number(session.timestamp) / 1000000), 'MMM d, yyyy h:mm a')}
                </span>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <span
                  className={
                    session.finalDecision === 'Reconsidered' ? 'text-primary' : 'text-muted-foreground'
                  }
                >
                  Decision: {session.finalDecision}
                </span>
                <span className="text-muted-foreground">·</span>
                <span className="text-muted-foreground">Outcome: {session.outcome}</span>
              </div>
            </div>

            <div className="border-t border-border/30 pt-6 space-y-4">
              <h2 className="text-xl font-light">Reflection Responses</h2>
              {session.stageResponses.map((response, index) => (
                <div key={index} className="space-y-2 p-4 bg-background/30 rounded-lg">
                  {response.option && (
                    <p className="text-sm text-muted-foreground">Choice: {response.option}</p>
                  )}
                  {response.response && (
                    <p className="text-base">{response.response}</p>
                  )}
                  {response.category && (
                    <p className="text-sm text-muted-foreground">Category: {response.category}</p>
                  )}
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </FadeIn>
    </div>
  );
}
