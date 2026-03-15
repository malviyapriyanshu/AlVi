import React from 'react';
import { ArrayBar } from './ArrayBar';

interface ArrayCanvasProps {
  array: { value: number; state: any; pointers: string[] }[];
  maxValue: number;
}

export const ArrayCanvas: React.FC<ArrayCanvasProps> = ({ array, maxValue }) => {
  return (
    <div className="h-[300px] w-full bg-slate-800/40 rounded-2xl border border-slate-700/50 p-4 flex items-end justify-center gap-[2px] overflow-hidden">
      {array.map((item, idx) => (
        <ArrayBar 
          key={idx}
          value={item.value}
          maxValue={maxValue}
          state={item.state}
          pointers={item.pointers}
        />
      ))}
    </div>
  );
};
