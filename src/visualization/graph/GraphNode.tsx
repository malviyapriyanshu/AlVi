import React from 'react';

interface GraphNodeProps {
  x: number;
  y: number;
  label: string;
  color: string;
}

export const GraphNode: React.FC<GraphNodeProps> = ({ x, y, label, color }) => (
  <g className="transition-all duration-300">
    <circle 
      cx={x} cy={y} r={22} 
      fill={color} 
      stroke="#1e293b" strokeWidth={2} 
      className="transition-all duration-500 shadow-xl" 
    />
    <text 
      x={x} y={y} 
      textAnchor="middle" dominantBaseline="middle" 
      fontSize="13" fontWeight="600" fill="white"
    >
      {label}
    </text>
  </g>
);
