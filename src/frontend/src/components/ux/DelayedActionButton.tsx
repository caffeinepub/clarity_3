import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import type { VariantProps } from 'class-variance-authority';
import { buttonVariants } from '@/components/ui/button';

interface DelayedActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  delay?: number;
}

export default function DelayedActionButton({
  delay = 800,
  disabled,
  children,
  ...props
}: DelayedActionButtonProps) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(false);
    const timer = setTimeout(() => {
      setIsReady(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <Button disabled={disabled || !isReady} {...props}>
      {children}
    </Button>
  );
}
