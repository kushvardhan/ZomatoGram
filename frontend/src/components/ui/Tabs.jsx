import React, { useState, createContext, useContext } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

const TabsContext = createContext();

const Tabs = ({
  defaultValue,
  value: controlledValue,
  onValueChange,
  children,
  className,
  orientation = 'horizontal',
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const setValue = (newValue) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  };

  return (
    <TabsContext.Provider value={{ value, setValue, orientation }}>
      <div
        className={cn(
          'w-full',
          orientation === 'vertical' && 'flex',
          className
        )}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
};

const TabsList = ({ children, className }) => {
  const { orientation } = useContext(TabsContext);

  return (
    <div
      className={cn(
        'inline-flex items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-800 p-1',
        orientation === 'vertical' && 'flex-col h-fit',
        orientation === 'horizontal' && 'w-full',
        className
      )}
      role="tablist"
      aria-orientation={orientation}
    >
      {children}
    </div>
  );
};

const TabsTrigger = ({ value, children, className, disabled = false }) => {
  const { value: selectedValue, setValue } = useContext(TabsContext);
  const isSelected = selectedValue === value;

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        isSelected
          ? 'bg-white dark:bg-neutral-700 text-neutral-950 dark:text-neutral-50 shadow-sm'
          : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      role="tab"
      aria-selected={isSelected}
      aria-controls={`panel-${value}`}
      id={`tab-${value}`}
      onClick={() => !disabled && setValue(value)}
      disabled={disabled}
    >
      {isSelected && (
        <motion.div
          className="absolute inset-0 bg-white dark:bg-neutral-700 rounded-md shadow-sm"
          layoutId="activeTab"
          transition={{ duration: 0.2 }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
};

const TabsContent = ({ value, children, className }) => {
  const { value: selectedValue } = useContext(TabsContext);
  const isSelected = selectedValue === value;

  if (!isSelected) return null;

  return (
    <motion.div
      className={cn('mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2', className)}
      role="tabpanel"
      aria-labelledby={`tab-${value}`}
      id={`panel-${value}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

export { Tabs, TabsList, TabsTrigger, TabsContent };
export default Tabs;
