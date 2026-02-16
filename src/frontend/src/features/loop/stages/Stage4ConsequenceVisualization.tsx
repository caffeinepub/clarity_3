import { useState, useEffect, useRef } from 'react';
import FadeIn from '../../../components/ux/FadeIn';
import DelayedActionButton from '../../../components/ux/DelayedActionButton';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Stage4Props {
  onComplete: () => void;
}

export default function Stage4ConsequenceVisualization({ onComplete }: Stage4Props) {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('/assets/audio/heartbeat.mp3');
    audioRef.current.loop = true;
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (soundEnabled) {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }
  }, [soundEnabled]);

  return (
    <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center px-4 relative">
      <div className="absolute top-8 right-8">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="rounded-full"
        >
          {soundEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
        </Button>
      </div>

      <div className="w-full max-w-6xl grid grid-cols-2 gap-8 mb-12">
        <FadeIn delay={500}>
          <div className="h-96 backdrop-blur-xl bg-accent/20 border border-border/50 rounded-2xl p-8 flex flex-col items-center justify-center space-y-6 animate-pulse-slow">
            <div className="w-32 h-32 rounded-full bg-primary/30 animate-pulse" />
            <h3 className="text-2xl font-light tracking-wide text-center">Immediate pleasure.</h3>
          </div>
        </FadeIn>

        <FadeIn delay={1500}>
          <div className="h-96 backdrop-blur-xl bg-destructive/10 border border-destructive/30 rounded-2xl p-8 flex flex-col items-center justify-center space-y-6 animate-pulse-slower">
            <div className="w-32 h-32 rounded-full bg-destructive/20 animate-pulse" />
            <h3 className="text-2xl font-light tracking-wide text-center">Long-term effect.</h3>
          </div>
        </FadeIn>
      </div>

      <FadeIn delay={3000}>
        <DelayedActionButton onClick={onComplete} size="lg" className="min-w-48" delay={2000}>
          Complete Reflection
        </DelayedActionButton>
      </FadeIn>
    </div>
  );
}
