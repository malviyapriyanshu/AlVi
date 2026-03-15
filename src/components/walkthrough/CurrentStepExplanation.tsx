import React from 'react';
import { MessageSquare } from 'lucide-react';

interface Props { explanation: string }

export const CurrentStepExplanation: React.FC<Props> = ({ explanation }) => {
  if (!explanation) return null;
  return (
    <div className="bg-slate-800/60 rounded-2xl border border-slate-700/50 p-4 flex items-start gap-3">
      <div className="bg-emerald-500/10 p-1.5 rounded-lg mt-0.5 flex-shrink-0">
        <MessageSquare className="text-emerald-400" size={16} />
      </div>
      <p className="text-sm text-slate-300 leading-relaxed">{explanation}</p>
    </div>
  );
};
