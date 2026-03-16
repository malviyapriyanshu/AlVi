import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';

export type BarState = 'default' | 'comparing' | 'swap' | 'sorted' | 'pivot' | 'overwrite' | 'discarded' | 'found';

interface Props {
  value: number;
  max: number;
  state: BarState;
  index: number;
  showLabel?: boolean;
}

const stateColors: Record<BarState, { bar: string; glow: string; text: string }> = {
  default:   { bar: 'bg-slate-300 dark:bg-slate-800',           glow: 'shadow-none',                    text: 'text-text-secondary' },
  comparing: { bar: 'bg-amber-400 dark:bg-amber-500',           glow: 'shadow-glow-amber',             text: 'text-amber-600 dark:text-amber-400' },
  swap:      { bar: 'bg-rose-500 animate-pulse',               glow: 'shadow-glow-red',               text: 'text-rose-600 dark:text-rose-400' },
  sorted:    { bar: 'bg-emerald-500',                          glow: 'shadow-glow-emerald',           text: 'text-emerald-600 dark:text-emerald-400' },
  pivot:     { bar: 'bg-accent-primary animate-bounce-short',  glow: 'shadow-glow-indigo',            text: 'text-accent-primary' },
  overwrite: { bar: 'bg-sky-500',                              glow: 'shadow-glow-indigo',            text: 'text-sky-600 dark:text-sky-400' },
  discarded: { bar: 'bg-slate-100 dark:bg-slate-900 opacity-30', glow: 'shadow-none',                    text: 'text-slate-300 dark:text-slate-700' },
  found:     { bar: 'bg-yellow-400',                           glow: 'shadow-glow-amber scale-110',   text: 'text-yellow-600 dark:text-yellow-400 font-black' },
};

export const ArrayBar: React.FC<Props> = ({ value, max, state, index, showLabel = true }) => {
  const heightPercent = (value / max) * 100;
  const colors = stateColors[state];

  return (
    <div className="flex-1 flex flex-col items-center group relative h-full">
      {/* Value Label */}
      <AnimatePresence>
        {showLabel && (
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "absolute -top-10 text-[10px] sm:text-xs font-mono font-black select-none pointer-events-none transition-colors duration-300",
              colors.text
            )}
          >
            {value}
          </motion.span>
        )}
      </AnimatePresence>

      {/* Bar */}
      <div className="w-full flex-1 flex flex-col justify-end min-h-0 pt-12 pb-2">
        <motion.div
          layout
          initial={{ height: 0 }}
          animate={{ height: `${Math.max(heightPercent, 4)}%` }}
          transition={{ type: 'spring', damping: 15, stiffness: 100 }}
          className={cn(
            "w-[85%] mx-auto rounded-t-xl transition-all duration-300 relative overflow-hidden",
            colors.bar,
            state !== 'default' && colors.glow
          )}
        >
          {/* Shine effect for active states */}
          {state !== 'default' && (
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
            />
          )}

          {/* Indicator Dot for mobile or tight views */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white/20" />
        </motion.div>
      </div>

      {/* Index Label */}
      <span className="mt-2 text-[8px] sm:text-[9px] font-black text-text-secondary opacity-40 uppercase tracking-widest font-mono">
        {index.toString().padStart(2, '0')}
      </span>
    </div>
  );
};
