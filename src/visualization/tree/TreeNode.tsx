import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../theme/themeProvider';

interface TreeNodeProps {
  x: number;
  y: number;
  val: number;
  color: string;
  isActive?: boolean;
}

export const TreeNode: React.FC<TreeNodeProps> = ({ x, y, val, color, isActive }) => {
  const { resolvedTheme } = useTheme();
  const isDefault = color === '#334155' || color === '#e2e8f0';

  return (
    <motion.g
      layout
      initial={false}
      animate={{ x, y }}
      transition={{ type: 'spring', damping: 20, stiffness: 150 }}
      className="cursor-pointer select-none"
    >
      {/* Active Glow */}
      <AnimatePresence>
        {isActive && (
          <motion.circle
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 2, opacity: 0.15 }}
            exit={{ scale: 0, opacity: 0 }}
            r={18}
            fill={color}
            className="filter blur-xl"
          />
        )}
      </AnimatePresence>

      {/* Outer Ring */}
      <motion.circle
        r={22}
        fill="transparent"
        stroke={color}
        strokeWidth={isActive ? 3 : 1}
        animate={{ 
          opacity: isActive ? 1 : 0.2,
          scale: isActive ? 1.1 : 1
        }}
      />

      {/* Main Node */}
      <motion.circle
        r={18}
        fill={color}
        animate={{ 
          scale: isActive ? 1.1 : 1
        }}
        stroke="#ffffff"
        strokeWidth={1}
        strokeOpacity={0.1}
        className="shadow-premium"
      />

      {/* Value */}
      <motion.text
        textAnchor="middle"
        dy=".35em"
        fill="#ffffff"
        className="text-[10px] font-black font-sans tracking-tight"
        animate={{ scale: isActive ? 1.2 : 1 }}
      >
        {val}
      </motion.text>

      {/* Pulse for Active */}
      {isActive && (
        <motion.circle
          r={18}
          stroke={color}
          strokeWidth={2}
          initial={{ scale: 1, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeOut' }}
        />
      )}
    </motion.g>
  );
};
