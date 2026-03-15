import React from 'react';

interface TreeNodeProps {
  x: number;
  y: number;
  val: number;
  color: string;
}

export const TreeNode: React.FC<TreeNodeProps> = ({ x, y, val, color }) => (
  <g className="transition-all duration-300">
    <circle 
      cx={x} cy={y} r={18} 
      fill={color} 
      stroke="#1e293b" strokeWidth={2} 
      className="transition-all duration-500" 
    />
    <text 
      x={x} y={y} 
      textAnchor="middle" dominantBaseline="middle" 
      fontSize="12" fontWeight="700" fill="white"
    >
      {val}
    </text>
  </g>
);
