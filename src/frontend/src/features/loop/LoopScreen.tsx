import { useLoopMachine } from './useLoopMachine';
import IdleScreen from './stages/IdleScreen';
import Stage1ActionDeclaration from './stages/Stage1ActionDeclaration';
import Stage2FutureSelf from './stages/Stage2FutureSelf';
import Stage3ForcedReflection from './stages/Stage3ForcedReflection';
import Stage3Gate from './stages/Stage3Gate';
import Stage4ConsequenceVisualization from './stages/Stage4ConsequenceVisualization';
import CompletionScreen from './stages/CompletionScreen';

export default function LoopScreen() {
  const machine = useLoopMachine();

  switch (machine.state.stage) {
    case 'idle':
      return <IdleScreen onStart={machine.setActionTitle} />;
    case 'stage1':
      return <Stage1ActionDeclaration onAnswer={machine.answerStage1} />;
    case 'stage2':
      return (
        <Stage2FutureSelf
          futureResponse={machine.state.stage2FutureResponse}
          followUpType={machine.state.stage2FollowUpType}
          onAnswerFuture={machine.answerStage2Future}
          onAnswerFollowUp={machine.answerStage2FollowUp}
        />
      );
    case 'stage3':
      return (
        <Stage3ForcedReflection
          actionTitle={machine.state.actionTitle}
          stage2FutureResponse={machine.state.stage2FutureResponse}
          onDecision={machine.answerStage3}
        />
      );
    case 'stage3-gate':
      return <Stage3Gate onAccept={machine.acceptConsequences} />;
    case 'stage4':
      return (
        <Stage4ConsequenceVisualization
          onComplete={() => machine.completeLoop()}
        />
      );
    case 'complete':
      return (
        <CompletionScreen
          state={machine.state}
          onSetCategory={machine.setCategory}
          onReset={machine.reset}
        />
      );
    default:
      return <IdleScreen onStart={machine.setActionTitle} />;
  }
}
