import React from 'react';

interface PointerIndicatorProps {
  label: string;
  color?: string;
}

export const PointerIndicator: React.FC<PointerIndicatorProps> = ({ label, color = 'bg-indigo-500' }) => {
  return (
    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
      <div className={`w-0.5 h-4 ${color}`} />
      <div className={`px-2 py-0.5 rounded text-[10px] font-bold text-white shadow-lg ${color}`}>
        {label}
      </div>
    </div>
  );
};
