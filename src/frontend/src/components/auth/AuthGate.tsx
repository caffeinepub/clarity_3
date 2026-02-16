import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { Button } from '@/components/ui/button';
import FadeIn from '../ux/FadeIn';
import GlassCard from '../layout/GlassCard';

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const { identity, login, loginStatus } = useInternetIdentity();

  if (!identity) {
    return (
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4">
        <FadeIn>
          <GlassCard className="max-w-md w-full text-center space-y-6 p-12">
            <div className="space-y-3">
              <h2 className="text-3xl font-light tracking-wide">Welcome to Clarity</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                A quiet space for reflection.
                <br />
                Sign in to begin your journey.
              </p>
            </div>
            <Button
              onClick={login}
              disabled={loginStatus === 'logging-in'}
              size="lg"
              className="w-full"
            >
              {loginStatus === 'logging-in' ? 'Connecting...' : 'Sign In'}
            </Button>
          </GlassCard>
        </FadeIn>
      </div>
    );
  }

  return <>{children}</>;
}
