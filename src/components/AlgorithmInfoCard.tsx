import React from 'react';
import type { AlgorithmInfo } from '../algorithms/types';
import { Clock, HardDrive, Info, Code2 } from 'lucide-react';

interface AlgorithmInfoCardProps {
  info: AlgorithmInfo;
}

export const AlgorithmInfoCard: React.FC<AlgorithmInfoCardProps> = ({ info }) => {
  return (
    <div className="bg-slate-800/80 backdrop-blur-sm p-6 rounded-xl border border-slate-700 shadow-xl w-full">
      <div className="flex items-center gap-3 mb-4 border-b border-slate-700 pb-4">
        <Info className="text-indigo-400" size={24} />
        <h2 className="text-xl font-bold text-white">{info.name}</h2>
      </div>
      
      <p className="text-slate-300 text-sm mb-6 leading-relaxed">
        {info.description}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 text-slate-400 mb-2 font-medium">
              <Clock size={16} />
              <h3 className="text-sm">Time Complexity</h3>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-slate-900/50 p-2 rounded-lg text-center border border-slate-700/50">
                <div className="text-xs text-slate-500 mb-1">Best</div>
                <div className="font-mono text-sm text-emerald-400">{info.complexity.time.best}</div>
              </div>
              <div className="bg-slate-900/50 p-2 rounded-lg text-center border border-slate-700/50">
                <div className="text-xs text-slate-500 mb-1">Average</div>
                <div className="font-mono text-sm text-yellow-400">{info.complexity.time.average}</div>
              </div>
              <div className="bg-slate-900/50 p-2 rounded-lg text-center border border-slate-700/50">
                <div className="text-xs text-slate-500 mb-1">Worst</div>
                <div className="font-mono text-sm text-red-400">{info.complexity.time.worst}</div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="flex items-center gap-2 text-slate-400 mb-2 font-medium">
              <HardDrive size={16} />
              <h3 className="text-sm">Space Complexity</h3>
            </div>
            <div className="bg-slate-900/50 p-2 rounded-lg border border-slate-700/50 inline-block">
              <span className="font-mono text-sm text-indigo-400">{info.complexity.space}</span>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 text-slate-400 mb-2 font-medium">
            <Code2 size={16} />
            <h3 className="text-sm">Pseudocode</h3>
          </div>
          <div className="bg-[#0d1117] p-4 rounded-lg border border-slate-700 h-[160px] overflow-y-auto">
            <pre className="text-xs text-slate-300 font-mono leading-relaxed">
              <code>{info.pseudocode}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
