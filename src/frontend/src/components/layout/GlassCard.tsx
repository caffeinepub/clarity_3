import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function GlassCard({ children, className, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        'backdrop-blur-xl bg-card/30 border border-border/50 rounded-2xl shadow-2xl',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
