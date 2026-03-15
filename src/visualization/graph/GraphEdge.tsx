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
  <g>
    <line 
      x1={x1} y1={y1} x2={x2} y2={y2} 
      stroke={color} 
      strokeWidth={isActive ? 3 : 1.5} 
      strokeOpacity={0.8} 
      className="transition-all duration-300" 
    />
    {weight !== undefined && (
      <text 
        x={(x1 + x2) / 2} y={(y1 + y2) / 2 - 6} 
        textAnchor="middle" fontSize="11" fill="#94a3b8"
      >
        {weight}
      </text>
    )}
  </g>
);
