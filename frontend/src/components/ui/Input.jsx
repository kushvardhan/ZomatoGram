import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

const Input = React.forwardRef(({
  label,
  error,
  success,
  helperText,
  leftIcon,
  rightIcon,
  className,
  type = 'text',
  placeholder,
  disabled = false,
  required = false,
  animate = true,
  ...props
}, ref) => {
  const inputId = React.useId();
  const errorId = React.useId();
  const helperId = React.useId();

  const inputClasses = cn(
    'input',
    error && 'input-error',
    success && 'input-success',
    leftIcon && 'pl-10',
    rightIcon && 'pr-10',
    disabled && 'opacity-50 cursor-not-allowed',
    className
  );

  const InputComponent = animate ? motion.input : 'input';
  const animationProps = animate ? {
    whileFocus: { scale: 1.01 },
    transition: { duration: 0.1 }
  } : {};

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-neutral-400">{leftIcon}</span>
          </div>
        )}
        
        <InputComponent
          ref={ref}
          id={inputId}
          type={type}
          placeholder={placeholder}
          className={inputClasses}
          disabled={disabled}
          required={required}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={cn(
            error && errorId,
            helperText && helperId
          )}
          {...animationProps}
          {...props}
        />
        
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-neutral-400">{rightIcon}</span>
          </div>
        )}
      </div>
      
      {error && (
        <p id={errorId} className="mt-2 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
      
      {helperText && !error && (
        <p id={helperId} className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
          {helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
