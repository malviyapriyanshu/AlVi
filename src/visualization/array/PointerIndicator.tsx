import React from 'react';

interface PointerIndicatorProps {
  label: string;
  color?: string;
  isBottom?: boolean;
}

export const PointerIndicator: React.FC<PointerIndicatorProps> = ({ 
  label, 
  color = 'bg-blue-500', 
  isBottom = true 
}) => {
  return (
    <div className={`flex flex-col items-center animate-in fade-in slide-in-from-${isBottom ? 'bottom' : 'top'}-2 duration-300`}>
      {!isBottom && (
        <div className={`px-2 py-0.5 rounded-md text-[9px] font-black text-white shadow-lg ${color} border border-white/20 mb-1`}>
          {label}
        </div>
      )}
      <div className={`w-0.5 h-6 ${color} shadow-[0_0_10px_rgba(0,0,0,0.5)]`} />
      {isBottom && (
        <div className={`px-2 py-0.5 rounded-md text-[9px] font-black text-white shadow-lg ${color} border border-white/20 mt-1`}>
          {label}
        </div>
      )}
    </div>
  );
};
