import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'whatsapp' | 'call';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  children?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      icon: Icon,
      iconPosition = 'left',
      loading = false,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseClasses = cn(
      'inline-flex items-center justify-center gap-2 rounded-xl font-semibold',
      'transition-all duration-200 ease-out',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
      'active:scale-[0.98]'
    );

    const variants = {
      primary: cn(
        'bg-primary-600 text-white',
        'hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-500/25',
        'focus:ring-primary-500'
      ),
      secondary: cn(
        'bg-white text-primary-600 border-2 border-primary-600',
        'hover:bg-primary-50',
        'focus:ring-primary-500'
      ),
      outline: cn(
        'border-2 border-gray-300 text-gray-700 bg-white',
        'hover:border-primary-500 hover:text-primary-600 hover:bg-primary-50',
        'focus:ring-primary-500'
      ),
      ghost: cn(
        'text-primary-600 bg-transparent',
        'hover:bg-primary-50',
        'focus:ring-primary-500'
      ),
      whatsapp: cn(
        'bg-[#25D366] text-white',
        'hover:bg-[#20BD5A] hover:shadow-lg hover:shadow-green-500/25',
        'focus:ring-green-500'
      ),
      call: cn(
        'bg-blue-600 text-white',
        'hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/25',
        'focus:ring-blue-500'
      ),
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
      icon: 'p-3',
    };

    const iconSizes = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
      icon: 'w-5 h-5',
    };

    return (
      <button
        ref={ref}
        className={cn(baseClasses, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {loading ? (
          <span
            className={cn('animate-spin rounded-full border-2 border-current border-t-transparent', iconSizes[size])}
            aria-hidden="true"
          />
        ) : Icon && iconPosition === 'left' ? (
          <Icon className={iconSizes[size]} aria-hidden="true" />
        ) : null}
        
        {children}
        
        {!loading && Icon && iconPosition === 'right' && (
          <Icon className={iconSizes[size]} aria-hidden="true" />
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
