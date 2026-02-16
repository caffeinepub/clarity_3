import FadeIn from '../../../components/ux/FadeIn';
import GlassCard from '../../../components/layout/GlassCard';
import DelayedActionButton from '../../../components/ux/DelayedActionButton';

interface Stage1Props {
  onAnswer: (response: 'yes' | 'no') => void;
}

export default function Stage1ActionDeclaration({ onAnswer }: Stage1Props) {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4">
      <FadeIn>
        <GlassCard className="max-w-2xl w-full p-12 space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-5xl font-light tracking-wide">Do you want to do this?</h2>
          </div>
          <div className="flex gap-6 justify-center">
            <DelayedActionButton
              onClick={() => onAnswer('no')}
              variant="outline"
              size="lg"
              className="min-w-32"
              delay={1000}
            >
              No
            </DelayedActionButton>
            <DelayedActionButton
              onClick={() => onAnswer('yes')}
              size="lg"
              className="min-w-32"
              delay={1000}
            >
              Yes
            </DelayedActionButton>
          </div>
        </GlassCard>
      </FadeIn>
    </div>
  );
}
