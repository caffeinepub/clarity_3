export type LoopStage = 'idle' | 'stage1' | 'stage2' | 'stage3' | 'stage3-gate' | 'stage4' | 'complete';

export interface LoopState {
  stage: LoopStage;
  actionTitle: string;
  stage1Response: 'yes' | 'no' | null;
  stage2FutureResponse: 'yes' | 'no' | null;
  stage2FollowUpResponse: string;
  stage2FollowUpType: 'proud' | 'five-years' | null;
  stage3Decision: 'continue' | 'reconsider' | null;
  stage3GateAccepted: boolean;
  category: string;
  reconsideredCount: number;
}

export const CATEGORIES = [
  { value: 'reason', label: 'Reason' },
  { value: 'habit', label: 'Habit' },
  { value: 'emotion', label: 'Emotion' },
  { value: 'convenience', label: 'Convenience' },
  { value: 'social', label: 'Social' },
  { value: 'health', label: 'Health' },
  { value: 'productivity', label: 'Productivity' },
];
