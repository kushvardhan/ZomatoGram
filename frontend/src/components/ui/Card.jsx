import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

const Card = React.forwardRef(({
  children,
  className,
  variant = 'default',
  hover = false,
  interactive = false,
  animate = true,
  onClick,
  ...props
}, ref) => {
  const variants = {
    default: 'card',
    hover: 'card-hover',
    interactive: 'card-interactive',
  };

  const classes = cn(
    variants[hover ? 'hover' : interactive ? 'interactive' : variant],
    className
  );

  const CardComponent = animate ? motion.div : 'div';
  const animationProps = animate ? {
    whileHover: hover || interactive ? { y: -4, scale: 1.02 } : undefined,
    whileTap: interactive ? { scale: 0.98 } : undefined,
    transition: { duration: 0.2 }
  } : {};

  return (
    <CardComponent
      ref={ref}
      className={classes}
      onClick={onClick}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      {...animationProps}
      {...props}
    >
      {children}
    </CardComponent>
  );
});

const CardHeader = React.forwardRef(({
  children,
  className,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn('px-6 py-4 border-b border-neutral-200 dark:border-neutral-700', className)}
      {...props}
    >
      {children}
    </div>
  );
});

const CardContent = React.forwardRef(({
  children,
  className,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn('px-6 py-4', className)}
      {...props}
    >
      {children}
    </div>
  );
});

const CardFooter = React.forwardRef(({
  children,
  className,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn('px-6 py-4 border-t border-neutral-200 dark:border-neutral-700', className)}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';
CardHeader.displayName = 'CardHeader';
CardContent.displayName = 'CardContent';
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardContent, CardFooter };
export default Card;
