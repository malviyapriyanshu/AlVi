import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';

interface GraphNodeProps {
  x: number;
  y: number;
  label: string;
  color: string;
  isActive: boolean;
  isVisited?: boolean;
}

export const GraphNode: React.FC<GraphNodeProps> = ({ x, y, label, color, isActive, isVisited }) => {
  return (
    <motion.g
      layout
      initial={false}
      animate={{ x, y }}
      transition={{ type: 'spring', damping: 20, stiffness: 150 }}
      className="cursor-pointer"
    >
      {/* Glow Effect for Active/Visited */}
      <AnimatePresence>
        {(isActive || isVisited) && (
          <motion.circle
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1.8, opacity: 0.2 }}
            exit={{ scale: 0, opacity: 0 }}
            r={24}
            fill={color}
            className="filter blur-md"
          />
        )}
      </AnimatePresence>

      {/* Outer Ring */}
      <motion.circle
        r={22}
        fill="transparent"
        stroke={color}
        strokeWidth={isActive ? 4 : 2}
        animate={{ 
          strokeWidth: isActive ? 6 : 2,
          opacity: isActive ? 1 : 0.3 
        }}
        className="transition-all duration-500"
      />

      {/* Main Node Circle */}
      <motion.circle
        r={20}
        fill={color}
        animate={{ 
          scale: isActive ? 1.15 : 1,
          boxShadow: isActive ? '0 0 20px 0px rgba(99,102,241,0.5)' : 'none'
        }}
        stroke="#ffffff"
        strokeWidth={2}
        strokeOpacity={0.1}
        className="transition-all duration-300 shadow-premium"
      />

      {/* Label */}
      <motion.text
        textAnchor="middle"
        dy=".3em"
        fill="#ffffff"
        className="text-[10px] font-black pointer-events-none uppercase tracking-tighter"
        initial={false}
        animate={{ scale: isActive ? 1.2 : 1 }}
      >
        {label}
      </motion.text>

      {/* Pulse Animation for Active */}
      {isActive && (
        <motion.circle
          r={20}
          stroke={color}
          strokeWidth={2}
          initial={{ scale: 1, opacity: 1 }}
          animate={{ scale: 1.8, opacity: 0 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeOut' }}
        />
      )}
    </motion.g>
  );
};
