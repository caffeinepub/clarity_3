import FadeIn from '../../../components/ux/FadeIn';
import GlassCard from '../../../components/layout/GlassCard';
import DelayedActionButton from '../../../components/ux/DelayedActionButton';

interface Stage3GateProps {
  onAccept: () => void;
}

export default function Stage3Gate({ onAccept }: Stage3GateProps) {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4">
      <FadeIn>
        <GlassCard className="max-w-2xl w-full p-12 space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-light tracking-wide leading-relaxed">
              Accept the consequences knowingly?
            </h2>
          </div>
          <div className="flex justify-center">
            <DelayedActionButton onClick={onAccept} size="lg" className="min-w-48" delay={2000}>
              I Accept
            </DelayedActionButton>
          </div>
        </GlassCard>
      </FadeIn>
    </div>
  );
}
