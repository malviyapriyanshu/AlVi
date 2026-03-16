import React from 'react';
import { motion } from 'framer-motion';

export const AmbientBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Primary Glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.1, 0.05],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-accent-primary rounded-full blur-[120px]"
      />
      
      {/* Secondary Glow */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.03, 0.08, 0.03],
          x: [0, -40, 0],
          y: [0, -60, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-400 rounded-full blur-[100px]"
      />

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
    </div>
  );
};
