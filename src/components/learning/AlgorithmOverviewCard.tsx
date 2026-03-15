import React from 'react';
import type { AlgorithmInfo } from '../../types';
import { BookOpen, Clock, Zap, ExternalLink } from 'lucide-react';

interface Props { info: AlgorithmInfo }

export const AlgorithmOverviewCard: React.FC<Props> = ({ info }) => (
  <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 shadow-sm">
    <div className="flex items-center gap-3 mb-4">
      <div className="bg-indigo-500/10 p-2 rounded-lg">
        <BookOpen className="text-indigo-400" size={22} />
      </div>
      <h2 className="text-xl font-bold text-white">{info.name}</h2>
    </div>
    <p className="text-slate-300 text-sm leading-relaxed mb-5">{info.description}</p>
    <div className="flex flex-wrap gap-3">
      <div className="flex items-center gap-2 bg-slate-900/50 px-3 py-1.5 rounded-lg border border-slate-700">
        <Clock className="text-slate-400" size={14} />
        <span className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">Time: {info.complexity.time.average}</span>
      </div>
      <div className="flex items-center gap-2 bg-slate-900/50 px-3 py-1.5 rounded-lg border border-slate-700">
        <Zap className="text-slate-400" size={14} />
        <span className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">Space: {info.complexity.space}</span>
      </div>
      <a
        href={info.problemContext.link} target="_blank" rel="noopener noreferrer"
        className="flex items-center gap-2 bg-indigo-600/10 hover:bg-indigo-600/20 px-3 py-1.5 rounded-lg border border-indigo-500/30 transition-colors group"
      >
        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${info.problemContext.difficulty === 'Easy' ? 'bg-emerald-500/20 text-emerald-400' : info.problemContext.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>{info.problemContext.difficulty}</span>
        <span className="text-[11px] font-semibold text-indigo-300 uppercase tracking-wider">{info.problemContext.title}</span>
        <ExternalLink size={12} className="text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </a>
    </div>
  </div>
);
