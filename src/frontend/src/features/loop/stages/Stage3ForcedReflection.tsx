import FadeIn from '../../../components/ux/FadeIn';
import GlassCard from '../../../components/layout/GlassCard';
import DelayedActionButton from '../../../components/ux/DelayedActionButton';

interface Stage3Props {
  actionTitle: string;
  stage2FutureResponse: 'yes' | 'no' | null;
  onDecision: (decision: 'continue' | 'reconsider') => void;
}

export default function Stage3ForcedReflection({ actionTitle, stage2FutureResponse, onDecision }: Stage3Props) {
  const alignmentText =
    stage2FutureResponse === 'no'
      ? 'You said it may not align with your future.'
      : 'You said it aligns with your future.';

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4">
      <FadeIn>
        <GlassCard className="max-w-3xl w-full p-12 space-y-12">
          <div className="text-center space-y-6">
            <div className="space-y-3">
              <p className="text-2xl font-light text-muted-foreground">You said you want this:</p>
              <h2 className="text-4xl font-light tracking-wide">{actionTitle}</h2>
            </div>
            <div className="pt-4">
              <p className="text-2xl font-light text-muted-foreground">{alignmentText}</p>
            </div>
          </div>
          <div className="flex gap-6 justify-center">
            <DelayedActionButton
              onClick={() => onDecision('reconsider')}
              variant="outline"
              size="lg"
              className="min-w-40"
              delay={1500}
            >
              Reconsider
            </DelayedActionButton>
            <DelayedActionButton
              onClick={() => onDecision('continue')}
              size="lg"
              className="min-w-40"
              delay={1500}
            >
              Continue Anyway
            </DelayedActionButton>
          </div>
        </GlassCard>
      </FadeIn>
    </div>
  );
}
