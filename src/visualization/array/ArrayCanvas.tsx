import React from 'react';
import { ArrayBar } from './ArrayBar';

interface ArrayCanvasProps {
  array: { value: number; state: any; pointers: string[] }[];
  maxValue: number;
}

export const ArrayCanvas: React.FC<ArrayCanvasProps> = ({ array, maxValue }) => (
  <div className="flex-1 w-full flex flex-col items-end justify-end px-6 pt-8 pb-4 overflow-hidden">
    <div className="flex items-end justify-center gap-[3px] md:gap-[4px] w-full max-w-5xl mx-auto h-full">
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
