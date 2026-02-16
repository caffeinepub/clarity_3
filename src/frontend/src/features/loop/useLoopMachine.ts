import { useState } from 'react';
import type { LoopState, LoopStage } from './types';

const initialState: LoopState = {
  stage: 'idle',
  actionTitle: '',
  stage1Response: null,
  stage2FutureResponse: null,
  stage2FollowUpResponse: '',
  stage2FollowUpType: null,
  stage3Decision: null,
  stage3GateAccepted: false,
  category: '',
  reconsideredCount: 0,
};

export function useLoopMachine() {
  const [state, setState] = useState<LoopState>(initialState);

  const setActionTitle = (title: string) => {
    setState((prev) => ({ ...prev, actionTitle: title, stage: 'stage1' }));
  };

  const answerStage1 = (response: 'yes' | 'no') => {
    if (response === 'no') {
      setState(initialState);
    } else {
      setState((prev) => ({ ...prev, stage1Response: response, stage: 'stage2' }));
    }
  };

  const answerStage2Future = (response: 'yes' | 'no') => {
    setState((prev) => ({
      ...prev,
      stage2FutureResponse: response,
      stage2FollowUpType: response === 'yes' ? 'proud' : 'five-years',
    }));
  };

  const answerStage2FollowUp = (response: string) => {
    setState((prev) => ({ ...prev, stage2FollowUpResponse: response, stage: 'stage3' }));
  };

  const answerStage3 = (decision: 'continue' | 'reconsider') => {
    if (decision === 'reconsider') {
      setState((prev) => ({
        ...initialState,
        reconsideredCount: prev.reconsideredCount + 1,
      }));
    } else {
      setState((prev) => ({ ...prev, stage3Decision: decision, stage: 'stage3-gate' }));
    }
  };

  const acceptConsequences = () => {
    setState((prev) => ({ ...prev, stage3GateAccepted: true, stage: 'stage4' }));
  };

  const setCategory = (category: string) => {
    setState((prev) => ({ ...prev, category }));
  };

  const completeLoop = () => {
    setState((prev) => ({ ...prev, stage: 'complete' }));
  };

  const reset = () => {
    setState(initialState);
  };

  return {
    state,
    setActionTitle,
    answerStage1,
    answerStage2Future,
    answerStage2FollowUp,
    answerStage3,
    acceptConsequences,
    setCategory,
    completeLoop,
    reset,
  };
}
