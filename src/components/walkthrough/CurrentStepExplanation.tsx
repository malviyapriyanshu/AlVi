import React from 'react';
import { MessageSquare } from 'lucide-react';

interface Props {
  explanation?: string;
}

export const CurrentStepExplanation: React.FC<Props> = ({ explanation }) => {
  if (!explanation) return null;
  return (
    <div className="bg-slate-800/60 rounded-2xl border border-slate-700/50 p-5 flex gap-4 h-full min-h-[100px]">
      <div className="flex-shrink-0 w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center text-slate-400">
        <MessageSquare size={16} />
      </div>
      <div>
        <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Step Analysis</h3>
        <p className="text-sm text-slate-200 leading-relaxed font-medium">
          {explanation}
        </p>
      </div>
    </div>
  );
};
