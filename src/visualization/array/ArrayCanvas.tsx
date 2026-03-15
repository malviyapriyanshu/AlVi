import React from 'react';
import { ArrayBar } from './ArrayBar';

interface ArrayCanvasProps {
  array: { value: number; state: any; pointers: string[] }[];
  maxValue: number;
}

export const ArrayCanvas: React.FC<ArrayCanvasProps> = ({ array, maxValue }) => {
  return (
    <div className="flex-1 w-full flex items-center justify-center py-20 overflow-visible mt-10 mb-10">
      <div className="flex items-end justify-center gap-1 w-full max-w-5xl h-[350px]">
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
    </div>
  );
};
