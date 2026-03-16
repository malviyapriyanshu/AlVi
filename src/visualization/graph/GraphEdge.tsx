import React from 'react';
import { motion } from 'framer-motion';

interface GraphEdgeProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
  weight?: number;
  isActive: boolean;
}

export const GraphEdge: React.FC<GraphEdgeProps> = ({ x1, y1, x2, y2, color, weight, isActive }) => {
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;

  return (
    <g className="transition-all duration-700">
      {/* Background Shadow Edge */}
      <motion.line
        initial={false}
        animate={{ x1, y1, x2, y2 }}
        stroke={color}
        strokeWidth={isActive ? 8 : 2}
        strokeOpacity={isActive ? 0.1 : 0.05}
        transition={{ type: 'spring', damping: 20, stiffness: 150 }}
      />
      
      {/* Primary Edge */}
      <motion.line
        initial={false}
        animate={{ x1, y1, x2, y2 }}
        stroke={color}
        strokeWidth={isActive ? 3 : 1.5}
        strokeDasharray={isActive ? '0' : '4 4'}
        strokeLinecap="round"
        transition={{ type: 'spring', damping: 20, stiffness: 150 }}
      />

      {/* Weight Label */}
      {weight !== undefined && (
        <motion.g 
          initial={false}
          animate={{ x: midX, y: midY }}
          transition={{ type: 'spring', damping: 20, stiffness: 150 }}
        >
          <rect
            x={-10} y={-10} width={20} height={20}
            rx={6}
            fill="#020617"
            stroke={color}
            strokeWidth={1}
            strokeOpacity={isActive ? 1 : 0.2}
            className="transition-all shadow-sm"
          />
          <text
            textAnchor="middle"
            dy=".35em"
            fill={isActive ? color : '#94a3b8'}
            className="text-[9px] font-black font-mono tracking-tighter"
          >
            {weight}
          </text>
        </motion.g>
      )}

      {/* active flow effect */}
      {isActive && (
        <motion.circle
          r={2}
          fill="#ffffff"
          initial={{ offset: 0 }}
          animate={{ offset: [0, 1] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
        >
           {/* Note: In SVG we'd use animateMotion for this, but with framer we can use a clever trick or just a simple pulse */}
        </motion.circle>
      )}
    </g>
  );
};
