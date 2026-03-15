import React from 'react';

interface GraphEdgeProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
  weight?: number;
  isActive?: boolean;
}

export const GraphEdge: React.FC<GraphEdgeProps> = ({ x1, y1, x2, y2, color, weight, isActive }) => (
  <g className="transition-all duration-300 pointer-events-none">
    {/* Background Glow Line */}
    {isActive && (
       <line 
         x1={x1} y1={y1} x2={x2} y2={y2} 
         stroke={color} 
         strokeWidth={10} 
         strokeOpacity={0.15} 
         className="animate-pulse" 
         strokeLinecap="round"
       />
    )}
    
    {/* Main Connecting Line */}
    <line 
      x1={x1} y1={y1} x2={x2} y2={y2} 
      stroke={color} 
      strokeWidth={isActive ? 3.5 : 1.5} 
      strokeOpacity={isActive ? 1 : 0.25} 
      className="transition-all duration-500" 
      strokeLinecap="round"
      strokeDasharray={isActive ? 'none' : '4,4'}
    />

    {/* Edge Weight Pill */}
    {weight !== undefined && (
      <g transform={`translate(${(x1 + x2) / 2}, ${(y1 + y2) / 2})`}>
        <rect 
          x="-10" y="-8" width="20" height="16" 
          fill={isActive ? color : '#1e293b'} 
          rx="4" 
          className="transition-colors duration-500 shadow-sm"
        />
        <text 
          textAnchor="middle" 
          dominantBaseline="central"
          fontSize="9" 
          fontWeight="900" 
          fill={isActive ? 'white' : '#94a3b8'}
          className="tracking-tighter"
        >
          {weight}
        </text>
      </g>
    )}
  </g>
);
