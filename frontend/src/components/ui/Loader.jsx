import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

const Loader = ({ 
  size = 'md', 
  variant = 'spinner',
  className,
  color = 'primary'
}) => {
  const sizes = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };

  const colors = {
    primary: 'border-primary-600',
    secondary: 'border-neutral-600',
    white: 'border-white',
  };

  if (variant === 'spinner') {
    return (
      <div
        className={cn(
          'spinner',
          sizes[size],
          colors[color],
          className
        )}
      />
    );
  }

  if (variant === 'dots') {
    return (
      <div className={cn('flex space-x-1', className)}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className={cn(
              'rounded-full bg-primary-600',
              size === 'xs' && 'w-1 h-1',
              size === 'sm' && 'w-1.5 h-1.5',
              size === 'md' && 'w-2 h-2',
              size === 'lg' && 'w-3 h-3',
              size === 'xl' && 'w-4 h-4',
            )}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.1,
            }}
          />
        ))}
      </div>
    );
  }

  if (variant === 'pulse') {
    return (
      <motion.div
        className={cn(
          'rounded-full bg-primary-600',
          sizes[size],
          className
        )}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
        }}
      />
    );
  }

  if (variant === 'bars') {
    return (
      <div className={cn('flex space-x-1', className)}>
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className={cn(
              'bg-primary-600 rounded-sm',
              size === 'xs' && 'w-0.5 h-3',
              size === 'sm' && 'w-1 h-4',
              size === 'md' && 'w-1 h-6',
              size === 'lg' && 'w-1.5 h-8',
              size === 'xl' && 'w-2 h-12',
            )}
            animate={{
              scaleY: [1, 0.5, 1],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.1,
            }}
          />
        ))}
      </div>
    );
  }

  return null;
};

const LoadingOverlay = ({ 
  isLoading, 
  children, 
  className,
  loaderProps = {},
  message = 'Loading...'
}) => {
  return (
    <div className={cn('relative', className)}>
      {children}
      {isLoading && (
        <div className="absolute inset-0 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm flex items-center justify-center z-10">
          <div className="text-center">
            <Loader {...loaderProps} />
            {message && (
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                {message}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const FullPageLoader = ({ 
  message = 'Loading...', 
  loaderProps = {} 
}) => {
  return (
    <div className="fixed inset-0 bg-white dark:bg-neutral-900 flex items-center justify-center z-50">
      <div className="text-center">
        <Loader size="xl" {...loaderProps} />
        <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
          {message}
        </p>
      </div>
    </div>
  );
};

export { Loader, LoadingOverlay, FullPageLoader };
export default Loader;
