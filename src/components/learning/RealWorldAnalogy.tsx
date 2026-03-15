import React from 'react';
import { Lightbulb } from 'lucide-react';

interface Props { analogy: string }

export const RealWorldAnalogy: React.FC<Props> = ({ analogy }) => (
  <div className="bg-indigo-600/10 rounded-2xl p-5 border border-indigo-500/20 relative overflow-hidden group">
    <div className="absolute -right-4 -top-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
      <Lightbulb size={100} className="text-indigo-400" />
    </div>
    <div className="flex items-center gap-2 mb-3">
      <Lightbulb className="text-indigo-400" size={18} />
      <h3 className="text-[11px] font-bold text-indigo-300 uppercase tracking-widest">Real-World Analogy</h3>
    </div>
    <p className="text-indigo-100/80 text-sm leading-relaxed italic z-10 relative">"{analogy}"</p>
  </div>
);
