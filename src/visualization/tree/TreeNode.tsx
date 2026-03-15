import React from 'react';

interface TreeNodeProps {
  x: number;
  y: number;
  val: number;
  color: string;
  isActive?: boolean;
}

export const TreeNode: React.FC<TreeNodeProps> = ({ x, y, val, color, isActive }) => (
  <g className="transition-all duration-700 select-none">
    {/* Outer Glow for Active State */}
    {isActive && (
      <circle 
        cx={x} cy={y} r={28} 
        fill={color} 
        className="opacity-20 animate-pulse" 
      />
    )}
    
    {/* Main Node */}
    <circle 
      cx={x} cy={y} r={20} 
      fill={color} 
      stroke="#ffffff20" strokeWidth={3} 
      className={`transition-all duration-500 shadow-premium ${isActive ? 'scale-110' : ''}`} 
    />
    
    {/* Value */}
    <text 
      x={x} y={y} 
      textAnchor="middle" dominantBaseline="middle" 
      fontSize="11" fontWeight="900" 
      fill="white"
      className="drop-shadow-md"
    >
      {val}
    </text>
  </g>
);
