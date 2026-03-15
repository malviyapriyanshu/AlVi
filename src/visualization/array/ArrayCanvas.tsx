import React from 'react';
import { ArrayBar } from './ArrayBar';

interface ArrayCanvasProps {
  array: { value: number; state: any; pointers: string[] }[];
  maxValue: number;
}

export const ArrayCanvas: React.FC<ArrayCanvasProps> = ({ array, maxValue }) => {
  return (
    <div className="flex-1 w-full flex flex-col items-center justify-center px-6 py-6">
      <div className="flex flex-1 items-end justify-center gap-[2px] md:gap-1 w-full max-w-5xl">
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
