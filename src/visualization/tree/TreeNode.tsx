import React from 'react';
import { useThemeStore } from '../../state/useThemeStore';

interface TreeNodeProps {
  x: number;
  y: number;
  val: number;
  color: string;
  isActive?: boolean;
}

export const TreeNode: React.FC<TreeNodeProps> = ({ x, y, val, color, isActive }) => {
  const { theme } = useThemeStore();
  const gradientId = `grad-tree-${color.replace('#', '')}`;
  const isDefault = color === '#334155' || color === '#e2e8f0';
  const labelColor = isDefault && theme === 'light' ? '#64748b' : '#ffffff';

  return (
    <g className="transition-all duration-700 select-none group">
      <defs>
        <radialGradient id={gradientId}>
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor={color} stopOpacity={0.85} />
        </radialGradient>
      </defs>

      {/* Dynamic Glow for Active State */}
      {isActive && (
        <circle 
          cx={x} cy={y} r={28} 
          fill={color} 
          className="opacity-15 animate-ping" 
        />
      )}
      
      {/* Node Shadow */}
      <circle 
        cx={x} cy={y} r={20} 
        fill="black" 
        className="opacity-5 group-hover:opacity-10 transition-opacity" 
        transform="translate(1, 2)" 
      />

      {/* Main Bar (The Node itself) */}
      <circle 
        cx={x} cy={y} r={20} 
        fill={`url(#${gradientId})`}
        stroke={theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.03)'} 
        strokeWidth={isActive ? 3 : 1}
        className={`transition-all duration-500 transform ${isActive ? 'scale-110' : 'scale-100'}`} 
      />

      {/* Glossy Top-Light */}
      <circle 
        cx={x - 5} cy={y - 5} r={7} 
        fill="white" 
        className="opacity-10 pointer-events-none" 
      />

      {/* Value */}
      <text 
        x={x} y={y} 
        textAnchor="middle" 
        dominantBaseline="middle" 
        fontSize="11" 
        fontWeight="800" 
        fill={labelColor}
        className="font-sans tracking-tight drop-shadow-sm pointer-events-none transition-colors duration-500"
      >
        {val}
      </text>
    </g>
  );
};
