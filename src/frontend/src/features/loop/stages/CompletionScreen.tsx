import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import FadeIn from '../../../components/ux/FadeIn';
import GlassCard from '../../../components/layout/GlassCard';
import DelayedActionButton from '../../../components/ux/DelayedActionButton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSaveSession } from '../../../hooks/useQueries';
import { CATEGORIES, type LoopState } from '../types';
import type { StageResponse } from '../../../backend';
import { toast } from 'sonner';

interface CompletionScreenProps {
  state: LoopState;
  onSetCategory: (category: string) => void;
  onReset: () => void;
}

export default function CompletionScreen({ state, onSetCategory, onReset }: CompletionScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();
  const saveSessionMutation = useSaveSession();

  const handleSave = async () => {
    const stageResponses: StageResponse[] = [
      {
        response: state.stage1Response || '',
        impulseStrength: '',
        reason: '',
        feeling: '',
        category: selectedCategory,
        option: state.stage1Response || '',
      },
      {
        response: state.stage2FollowUpResponse,
        impulseStrength: '',
        reason: '',
        feeling: '',
        category: selectedCategory,
        option: state.stage2FutureResponse || '',
      },
    ];

    const finalDecision = state.reconsideredCount > 0 ? 'Reconsidered' : 'Continued';
    const outcome = state.stage3GateAccepted ? 'Accepted consequences' : 'Completed';

    try {
      await saveSessionMutation.mutateAsync({
        actionTitle: state.actionTitle,
        stageResponses,
        finalDecision,
        outcome,
        timing: new Date().toISOString(),
      });
      toast.success('Session saved successfully');
      onReset();
    } catch (error) {
      toast.error('Failed to save session');
      console.error(error);
    }
  };

  const handleSkip = () => {
    onReset();
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4">
      <FadeIn>
        <GlassCard className="max-w-2xl w-full p-12 space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-light tracking-wide">Reflection Complete</h2>
            <p className="text-muted-foreground text-lg">
              Would you like to categorize this decision for future insights?
            </p>
          </div>

          <div className="space-y-4">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full text-lg py-6 bg-background/50">
                <SelectValue placeholder="Select a category (optional)" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex gap-4">
              <DelayedActionButton
                onClick={handleSkip}
                variant="outline"
                size="lg"
                className="flex-1"
                delay={500}
              >
                Skip
              </DelayedActionButton>
              <DelayedActionButton
                onClick={handleSave}
                size="lg"
                className="flex-1"
                delay={500}
                disabled={saveSessionMutation.isPending}
              >
                {saveSessionMutation.isPending ? 'Saving...' : 'Save & Continue'}
              </DelayedActionButton>
            </div>

            <div className="pt-4 text-center">
              <button
                onClick={() => navigate({ to: '/history' })}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors underline"
              >
                View Past Decisions
              </button>
            </div>
          </div>
        </GlassCard>
      </FadeIn>
    </div>
  );
}
