import React from 'react';
import type { AlgorithmInfo } from '../algorithms/types';
import { Brain, Lightbulb, BookOpen, Clock, Zap, ExternalLink } from 'lucide-react';

interface AlgorithmInfoCardProps {
  info: AlgorithmInfo;
}

export const AlgorithmInfoCard: React.FC<AlgorithmInfoCardProps> = ({ info }) => {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header & Description */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-indigo-500/10 p-2 rounded-lg">
              <BookOpen className="text-indigo-400" size={24} />
            </div>
            <h2 className="text-2xl font-bold text-white">{info.name}</h2>
          </div>
          <p className="text-slate-300 leading-relaxed mb-6">
            {info.description}
          </p>

          <div className="flex flex-wrap gap-4">
             <div className="flex items-center gap-2 bg-slate-900/50 px-3 py-1.5 rounded-lg border border-slate-700">
                <Clock className="text-slate-400" size={16} />
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Time: {info.complexity.time.average}</span>
             </div>
             <div className="flex items-center gap-2 bg-slate-900/50 px-3 py-1.5 rounded-lg border border-slate-700">
                <Zap className="text-slate-400" size={16} />
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Space: {info.complexity.space}</span>
             </div>
             <a 
               href={info.problemContext.link} 
               target="_blank" 
               rel="noopener noreferrer"
               className="flex items-center gap-2 bg-indigo-600/10 hover:bg-indigo-600/20 px-3 py-1.5 rounded-lg border border-indigo-500/30 transition-colors group"
             >
                <div className="w-2 h-2 rounded-full bg-indigo-500" />
                <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider">LeetCode: {info.problemContext.title}</span>
                <ExternalLink size={14} className="text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
             </a>
          </div>
        </div>

        {/* Analogy Card */}
        <div className="bg-indigo-600/10 rounded-2xl p-6 border border-indigo-500/20 relative overflow-hidden group">
           <div className="absolute -right-4 -top-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
              <Lightbulb size={120} className="text-indigo-400" />
           </div>
           
           <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="text-indigo-400" size={20} />
              <h3 className="text-sm font-bold text-indigo-300 uppercase tracking-widest">Real-World Analogy</h3>
           </div>
           <p className="text-indigo-100/80 text-sm leading-relaxed italic z-10 relative">
             "{info.analogy}"
           </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Deep Dive Sections */}
        <div className="flex flex-col gap-6">
          <div className="bg-slate-800/40 rounded-2xl p-6 border border-slate-700/50">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="text-emerald-400" size={20} />
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">The Intuition</h3>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              {info.intuition}
            </p>
          </div>

          <div className="bg-slate-800/40 rounded-2xl p-6 border border-slate-700/50">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">When to use?</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              {info.whenToUse}
            </p>
          </div>
        </div>

        {/* Implementation / Steps */}
        <div className="bg-slate-800/80 rounded-2xl border border-slate-700 p-6">
           <div className="flex flex-col gap-6">
              <div>
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Logic Breakdown</h3>
                <div className="space-y-4">
                  {info.stepByStep.map((step, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-400">
                        {idx + 1}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-200">{step.title}</h4>
                        <p className="text-xs text-slate-400 mt-0.5">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Pseudo Code</h3>
                <pre className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-indigo-400 text-xs overflow-x-auto leading-relaxed">
                  <code>{info.pseudocode}</code>
                </pre>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
