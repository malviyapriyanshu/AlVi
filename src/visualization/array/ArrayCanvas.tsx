import React from 'react';
import { ArrayBar, BarState } from './ArrayBar';
import { motion } from 'framer-motion';

interface Props {
  array: { value: number; state: BarState }[];
  maxValue: number;
}

export const ArrayCanvas: React.FC<Props> = ({ array, maxValue }) => {
  return (
    <div className="flex-1 w-full bg-background-secondary rounded-[32px] border border-border p-3 sm:p-6 md:p-10 flex items-end justify-center min-h-[350px] sm:min-h-[400px] relative overflow-hidden group/canvas shadow-inner">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      
      {/* Aesthetic Accents */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full border border-border bg-background-primary/50 backdrop-blur-sm text-[10px] font-black text-text-secondary uppercase tracking-[0.25em] z-10 transition-all group-hover/canvas:border-accent-primary/20 group-hover/canvas:text-text-primary">
         Live Processing Core
      </div>

      <motion.div 
        layout
        className="flex-1 h-full flex items-end gap-[1px] sm:gap-[4px] max-w-[1200px] mx-auto w-full"
      >
        {array.map((item, idx) => (
          <ArrayBar 
            key={idx} 
            value={item.value} 
            max={maxValue} 
            state={item.state} 
            index={idx}
            showLabel={array.length <= 30}
          />
        ))}
      </motion.div>
    </div>
  );
};
