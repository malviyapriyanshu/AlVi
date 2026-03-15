import React from 'react';
import { Lightbulb } from 'lucide-react';

interface Props {
  analogy: string;
}

export const RealWorldAnalogy: React.FC<Props> = ({ analogy }) => (
  <div className="bg-indigo-600/10 rounded-2xl p-5 border border-indigo-500/20 flex gap-4">
    <div className="flex-shrink-0 w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
      <Lightbulb size={24} />
    </div>
    <div>
      <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-1">Real-World Analogy</h3>
      <div className="text-sm text-slate-300 leading-relaxed italic">"{analogy}"</div>
    </div>
  </div>
);
