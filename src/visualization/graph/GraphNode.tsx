import React from 'react';

interface GraphNodeProps {
  x: number;
  y: number;
  label: string;
  color: string;
  isActive?: boolean;
}

export const GraphNode: React.FC<GraphNodeProps> = ({ x, y, label, color, isActive }) => (
  <g className="transition-all duration-700 select-none">
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
      stroke="#ffffff20" strokeWidth={3} 
      className={`transition-all duration-500 shadow-premium ${isActive ? 'scale-110' : ''}`} 
    />
    
    {/* Label */}
    <text 
      x={x} y={y} 
      textAnchor="middle" dominantBaseline="middle" 
      fontSize="11" fontWeight="900" 
      fill="white"
      className="drop-shadow-md"
    >
      {label}
    </text>
  </g>
);
