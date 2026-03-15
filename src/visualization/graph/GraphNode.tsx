import React from 'react';
import { useThemeStore } from '../../state/useThemeStore';

interface GraphNodeProps {
  x: number;
  y: number;
  label: string;
  color: string;
  isActive?: boolean;
}

export const GraphNode: React.FC<GraphNodeProps> = ({ x, y, label, color, isActive }) => {
  const { theme } = useThemeStore();
  
  // Dynamic gradient ID per color/state if needed, but we can reuse common ones
  const gradientId = `grad-${color.replace('#', '')}`;
  const isDefault = color === '#334155' || color === '#e2e8f0';
  const labelColor = isDefault && theme === 'light' ? '#64748b' : '#ffffff';

  return (
    <g className="transition-all duration-700 select-none cursor-default group">
      <defs>
        <radialGradient id={gradientId}>
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor={color} stopOpacity={0.8} />
        </radialGradient>
      </defs>

      {/* Ripple effect for active nodes */}
      {isActive && (
        <circle 
          cx={x} cy={y} r={32} 
          fill={color} 
          className="opacity-10 animate-ping" 
        />
      )}
      
      {/* Node Glow / Shadow */}
      <circle 
        cx={x} cy={y} r={24} 
        fill="black" 
        className="opacity-10 group-hover:opacity-20 transition-opacity" 
        transform="translate(2, 3)" 
      />

      {/* Main Node Circle */}
      <circle 
        cx={x} cy={y} r={24} 
        fill={`url(#${gradientId})`}
        stroke={theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.03)'} 
        strokeWidth={isActive ? 3 : 1}
        className={`transition-all duration-500 transform ${isActive ? 'scale-110 drop-shadow-xl' : 'scale-100'}`} 
      />

      {/* Inner Highlight (Glossy effect) */}
      <circle 
        cx={x - 6} cy={y - 6} r={8} 
        fill="white" 
        className="opacity-10 pointer-events-none" 
      />

      {/* Label */}
      <text 
        x={x} y={y} 
        textAnchor="middle" 
        dominantBaseline="middle" 
        fontSize="13" 
        fontWeight="800" 
        fill={labelColor}
        className="font-sans tracking-tight pointer-events-none drop-shadow-sm transition-colors duration-500"
      >
        {label}
      </text>
    </g>
  );
};
