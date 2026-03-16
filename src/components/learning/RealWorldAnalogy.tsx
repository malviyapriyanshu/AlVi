import React from 'react';
import { Lightbulb, Info } from 'lucide-react';

interface Props {
  analogy: string;
}

export const RealWorldAnalogy: React.FC<Props> = ({ analogy }) => (
  <div className="bg-amber-50 dark:bg-amber-500/5 rounded-2xl p-5 border border-amber-100 dark:border-amber-900/30 flex gap-4 transition-all duration-300">
    <div className="flex-shrink-0 w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-white shadow-sm ring-4 ring-amber-500/10">
      <Info size={20} strokeWidth={2.5} />
    </div>
    <div className="min-w-0">
      <h3 className="text-[9px] font-black text-amber-700 dark:text-amber-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
         <Lightbulb size={10} /> Conceptual Analogy
      </h3>
      <div className="text-[13px] font-bold text-slate-800 dark:text-slate-200 leading-relaxed italic pr-2">
        "{analogy}"
      </div>
    </div>
  </div>
);
