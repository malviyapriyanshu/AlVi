import React from 'react';

interface GraphNodeProps {
  x: number;
  y: number;
  label: string;
  color: string;
  isActive?: boolean;
}

import { useThemeStore } from '../../state/useThemeStore';

export const GraphNode: React.FC<GraphNodeProps> = ({ x, y, label, color, isActive }) => {
  const { theme } = useThemeStore();
  const isDefault = color === '#334155' || color === '#e2e8f0';
  const labelColor = (isDefault && theme === 'light') ? '#475569' : 'white';

  return (
    <g className="transition-all duration-700 select-none cursor-default">
      {/* Outer Glow for Active State */}
      {isActive && (
        <circle 
          cx={x} cy={y} r={32} 
          fill={color} 
          className="opacity-20 animate-pulse" 
        />
      )}
      
      {/* Main Node */}
      <circle 
        cx={x} cy={y} r={24} 
        fill={color} 
        stroke={theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'} 
        strokeWidth={2} 
        className={`transition-all duration-500 ${isActive ? 'scale-110 shadow-glow-indigo' : ''}`} 
      />
      
      {/* Label */}
      <text 
        x={x} y={y} 
        textAnchor="middle" dominantBaseline="middle" 
        fontSize="12" fontWeight="800" 
        fill={labelColor}
        className="drop-shadow-sm tracking-tight"
      >
        {label}
      </text>
    </g>
  );
};
