import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn';

const Dropdown = ({
  trigger,
  children,
  className,
  align = 'left',
  offset = 8,
  closeOnClick = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const alignmentClasses = {
    left: 'left-0',
    right: 'right-0',
    center: 'left-1/2 transform -translate-x-1/2',
  };

  const handleItemClick = () => {
    if (closeOnClick) {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative inline-block">
      <div
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer"
      >
        {trigger}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dropdownRef}
            className={cn(
              'absolute z-dropdown mt-2 min-w-48 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 py-1',
              alignmentClasses[align],
              className
            )}
            style={{ top: `calc(100% + ${offset}px)` }}
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.1 }}
            onClick={handleItemClick}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const DropdownItem = ({
  children,
  onClick,
  disabled = false,
  className,
  ...props
}) => {
  return (
    <button
      className={cn(
        'w-full text-left px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

const DropdownDivider = ({ className }) => (
  <hr className={cn('my-1 border-neutral-200 dark:border-neutral-700', className)} />
);

const DropdownLabel = ({ children, className }) => (
  <div className={cn('px-4 py-2 text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider', className)}>
    {children}
  </div>
);

// Select Component using Dropdown
const Select = ({
  value,
  onChange,
  options = [],
  placeholder = 'Select an option',
  className,
  disabled = false,
  error,
  ...props
}) => {
  const selectedOption = options.find(option => option.value === value);

  const trigger = (
    <div
      className={cn(
        'input flex items-center justify-between cursor-pointer',
        error && 'input-error',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      <span className={selectedOption ? 'text-neutral-900 dark:text-neutral-100' : 'text-neutral-400'}>
        {selectedOption ? selectedOption.label : placeholder}
      </span>
      <ChevronDown className="w-4 h-4 text-neutral-400" />
    </div>
  );

  return (
    <Dropdown trigger={trigger} {...props}>
      {options.map((option) => (
        <DropdownItem
          key={option.value}
          onClick={() => onChange(option.value)}
          disabled={option.disabled}
        >
          {option.label}
        </DropdownItem>
      ))}
    </Dropdown>
  );
};

export { Dropdown, DropdownItem, DropdownDivider, DropdownLabel, Select };
export default Dropdown;
