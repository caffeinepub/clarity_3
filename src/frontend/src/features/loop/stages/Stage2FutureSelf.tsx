import { useState } from 'react';
import FadeIn from '../../../components/ux/FadeIn';
import GlassCard from '../../../components/layout/GlassCard';
import DelayedActionButton from '../../../components/ux/DelayedActionButton';
import { Textarea } from '@/components/ui/textarea';

interface Stage2Props {
  futureResponse: 'yes' | 'no' | null;
  followUpType: 'proud' | 'five-years' | null;
  onAnswerFuture: (response: 'yes' | 'no') => void;
  onAnswerFollowUp: (response: string) => void;
}

export default function Stage2FutureSelf({
  futureResponse,
  followUpType,
  onAnswerFuture,
  onAnswerFollowUp,
}: Stage2Props) {
  const [followUpText, setFollowUpText] = useState('');

  if (!futureResponse) {
    return (
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4">
        <FadeIn>
          <GlassCard className="max-w-2xl w-full p-12 space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-light tracking-wide leading-relaxed">
                Is this right for your future self?
              </h2>
            </div>
            <div className="flex gap-6 justify-center">
              <DelayedActionButton
                onClick={() => onAnswerFuture('no')}
                variant="outline"
                size="lg"
                className="min-w-32"
                delay={1200}
              >
                No
              </DelayedActionButton>
              <DelayedActionButton
                onClick={() => onAnswerFuture('yes')}
                size="lg"
                className="min-w-32"
                delay={1200}
              >
                Yes
              </DelayedActionButton>
            </div>
          </GlassCard>
        </FadeIn>
      </div>
    );
  }

  const followUpQuestion =
    followUpType === 'proud'
      ? 'Would you proudly tell someone you love about this choice?'
      : 'If this choice repeats for 5 years, where do you end up?';

  const isTextRequired = followUpType === 'five-years';

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4">
      <FadeIn delay={300}>
        <GlassCard className="max-w-2xl w-full p-12 space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-light tracking-wide leading-relaxed">{followUpQuestion}</h2>
          </div>
          {isTextRequired ? (
            <div className="space-y-4">
              <Textarea
                value={followUpText}
                onChange={(e) => setFollowUpText(e.target.value)}
                placeholder="Take a moment to reflect..."
                className="min-h-32 text-lg bg-background/50"
                autoFocus
              />
              <DelayedActionButton
                onClick={() => onAnswerFollowUp(followUpText)}
                disabled={!followUpText.trim()}
                size="lg"
                className="w-full"
                delay={800}
              >
                Continue
              </DelayedActionButton>
            </div>
          ) : (
            <div className="flex gap-6 justify-center">
              <DelayedActionButton
                onClick={() => onAnswerFollowUp('no')}
                variant="outline"
                size="lg"
                className="min-w-32"
                delay={1200}
              >
                No
              </DelayedActionButton>
              <DelayedActionButton
                onClick={() => onAnswerFollowUp('yes')}
                size="lg"
                className="min-w-32"
                delay={1200}
              >
                Yes
              </DelayedActionButton>
            </div>
          )}
        </GlassCard>
      </FadeIn>
    </div>
  );
}
