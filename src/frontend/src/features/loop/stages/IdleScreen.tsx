import { useState } from 'react';
import FadeIn from '../../../components/ux/FadeIn';
import GlassCard from '../../../components/layout/GlassCard';
import { Input } from '@/components/ui/input';
import DelayedActionButton from '../../../components/ux/DelayedActionButton';

interface IdleScreenProps {
  onStart: (actionTitle: string) => void;
}

export default function IdleScreen({ onStart }: IdleScreenProps) {
  const [actionTitle, setActionTitle] = useState('');

  const handleStart = () => {
    if (actionTitle.trim()) {
      onStart(actionTitle.trim());
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4">
      <FadeIn>
        <GlassCard className="max-w-2xl w-full p-12 space-y-8">
          <div className="space-y-4 text-center">
            <h2 className="text-4xl font-light tracking-wide">What are you considering?</h2>
            <p className="text-muted-foreground text-lg">
              Name the action or decision you're contemplating.
            </p>
          </div>
          <div className="space-y-4">
            <Input
              value={actionTitle}
              onChange={(e) => setActionTitle(e.target.value)}
              placeholder="e.g., Buying something I don't need..."
              className="text-lg py-6 bg-background/50"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && actionTitle.trim()) {
                  handleStart();
                }
              }}
              autoFocus
            />
            <DelayedActionButton
              onClick={handleStart}
              disabled={!actionTitle.trim()}
              size="lg"
              className="w-full"
              delay={500}
            >
              Begin Reflection
            </DelayedActionButton>
          </div>
        </GlassCard>
      </FadeIn>
    </div>
  );
}
