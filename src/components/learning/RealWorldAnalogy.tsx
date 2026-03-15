import React from 'react';
import { Lightbulb } from 'lucide-react';

interface Props {
  analogy: string;
}

export const RealWorldAnalogy: React.FC<Props> = ({ analogy }) => (
  <div className="bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl p-5 border border-indigo-100 dark:border-indigo-500/20 flex gap-4 transition-all duration-300">
    <div className="flex-shrink-0 w-10 h-10 bg-indigo-600 dark:bg-indigo-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-600/20 dark:shadow-indigo-500/20">
      <Lightbulb size={24} />
    </div>
    <div className="min-w-0">
      <h3 className="text-[10px] font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-widest mb-1.5">Real-World Context</h3>
      <div className="text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed italic line-clamp-4 md:line-clamp-none">
        "{analogy}"
      </div>
    </div>
  </div>
);
