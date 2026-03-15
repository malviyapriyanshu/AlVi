import React from 'react';

interface Props {
  code: string;
  highlightLine?: number;
}

export const PseudocodeViewer: React.FC<Props> = ({ code, highlightLine }) => {
  const lines = code.split('\n');
  return (
    <div className="glass-card p-6 rounded-3xl overflow-hidden relative group">
      <div className="flex items-center justify-between mb-4 px-1">
        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Pseudocode</h3>
        {highlightLine !== undefined && (
          <div className="flex items-center gap-2">
             <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
             <span className="text-[10px] font-bold text-indigo-400">Step {highlightLine}</span>
          </div>
        )}
      </div>
      <div className="font-mono text-[11px] leading-relaxed overflow-x-auto custom-scrollbar">
        {lines.map((lineText, idx) => (
          <div key={idx} 
            className={`px-3 py-1 rounded-lg transition-all duration-300 flex gap-4
              ${highlightLine === idx 
                ? 'bg-indigo-600/20 text-indigo-400 border-l-2 border-indigo-500 -ml-[2px] shadow-[inset_10px_0_15px_-10px_rgba(99,102,241,0.2)]' 
                : 'text-slate-500 hover:text-slate-400'}`}>
            <span className="w-4 flex-shrink-0 text-right opacity-30 select-none">{idx}</span>
            <pre className="whitespace-pre">
              {lineText || ' '}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
};
