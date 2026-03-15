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
  <g className="transition-all duration-300">
    <line 
      x1={x1} y1={y1} x2={x2} y2={y2} 
      stroke={color} 
      strokeWidth={isActive ? 4 : 2} 
      strokeOpacity={isActive ? 1 : 0.3} 
      className="transition-all duration-500" 
      strokeLinecap="round"
    />
    {isActive && (
       <line 
         x1={x1} y1={y1} x2={x2} y2={y2} 
         stroke={color} 
         strokeWidth={8} 
         strokeOpacity={0.15} 
         className="animate-pulse" 
         strokeLinecap="round"
       />
    )}
    {weight !== undefined && (
      <g transform={`translate(${(x1 + x2) / 2}, ${(y1 + y2) / 2})`}>
        <rect 
          x="-12" y="-12" width="24" height="18" 
          fill="#0f172a" rx="4" 
          className="stroke-slate-800" strokeWidth="1"
        />
        <text 
          textAnchor="middle" dy="1" 
          fontSize="10" fontWeight="900" fill="#64748b"
        >
          {weight}
        </text>
      </g>
    )}
  </g>
);
