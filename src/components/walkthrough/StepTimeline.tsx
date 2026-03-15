import React from 'react';

interface Props {
  totalSteps: number;
  currentStepIndex: number;
  onChange: (index: number) => void;
}

export const StepTimeline: React.FC<Props> = ({ totalSteps, currentStepIndex, onChange }) => {
  return (
    <div className="flex gap-0.5 w-full h-2 mt-2">
      {Array.from({ length: totalSteps }).map((_, i) => (
        <button
          key={i}
          onClick={() => onChange(i)}
          className={`flex-1 rounded-sm transition-all duration-200 ${
            i === currentStepIndex 
              ? 'bg-indigo-500 h-3 -translate-y-0.5' 
              : i < currentStepIndex ? 'bg-indigo-900/40' : 'bg-slate-800'
          } hover:bg-indigo-400/50`}
        />
      ))}
    </div>
  );
};
