import { createRouter, RouterProvider, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import LoginButton from './components/auth/LoginButton';
import AuthGate from './components/auth/AuthGate';
import MinimalNav from './components/layout/MinimalNav';
import LoopScreen from './features/loop/LoopScreen';
import PastDecisionsScreen from './features/history/PastDecisionsScreen';
import SessionDetailsScreen from './features/history/SessionDetailsScreen';
import AnalyticsDashboardScreen from './features/analytics/AnalyticsDashboardScreen';

function Layout() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/assets/generated/clarity-logo.dim_512x512.png" alt="Clarity" className="h-10 w-10" />
            <h1 className="text-xl font-light tracking-wide">Clarity</h1>
          </div>
          <div className="flex items-center gap-6">
            {isAuthenticated && <MinimalNav />}
            <LoginButton />
          </div>
        </div>
      </header>
      <main className="flex-1 pt-20">
        <Outlet />
      </main>
      <footer className="py-6 text-center text-sm text-muted-foreground border-t border-border/30">
        <p>
          © {new Date().getFullYear()} · Built with love using{' '}
          <a
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground transition-colors"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}

const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => (
    <AuthGate>
      <LoopScreen />
    </AuthGate>
  ),
});

const historyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/history',
  component: () => (
    <AuthGate>
      <PastDecisionsScreen />
    </AuthGate>
  ),
});

const sessionDetailsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/history/$sessionId',
  component: () => (
    <AuthGate>
      <SessionDetailsScreen />
    </AuthGate>
  ),
});

const analyticsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/analytics',
  component: () => (
    <AuthGate>
      <AnalyticsDashboardScreen />
    </AuthGate>
  ),
});

const routeTree = rootRoute.addChildren([indexRoute, historyRoute, sessionDetailsRoute, analyticsRoute]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}
