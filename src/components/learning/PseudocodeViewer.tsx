import React from 'react';

interface Props {
  code: string;
  highlightLine?: number;
}

export const PseudocodeViewer: React.FC<Props> = ({ code, highlightLine }) => {
  const lines = code.split('\n');
  return (
    <div className="bg-slate-900 dark:bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-xl group">
      {/* "IDE" Header */}
      <div className="flex items-center gap-1.5 px-4 py-2 bg-slate-800/50 border-b border-slate-800 shrink-0">
        <div className="w-2.5 h-2.5 rounded-full bg-red-400 opacity-60" />
        <div className="w-2.5 h-2.5 rounded-full bg-amber-400 opacity-60" />
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 opacity-60" />
        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">algorithm.py</span>
      </div>

      {/* Code Listing */}
      <div className="py-4 overflow-x-auto custom-scrollbar">
        <div className="font-mono text-[11px] leading-[1.6]">
          {lines.map((lineText, idx) => {
            const isHighlighted = highlightLine === idx;
            return (
              <div 
                key={idx}
                className={`flex gap-4 px-4 transition-all duration-200 group/line ${
                  isHighlighted 
                    ? 'bg-indigo-500/20 text-indigo-400 border-l-4 border-indigo-500 -ml-1 pl-3' 
                    : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'
                }`}
              >
                {/* Line Number */}
                <span className={`w-4 shrink-0 text-right font-mono text-[9px] select-none opacity-20 ${
                  isHighlighted ? 'opacity-100 text-indigo-500' : ''
                }`}>
                  {idx + 1}
                </span>

                {/* Content */}
                <pre className={`whitespace-pre font-mono tracking-tight ${
                  isHighlighted ? 'font-bold' : 'font-medium'
                }`}>
                  {lineText || ' '}
                </pre>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Info */}
      <div className="px-4 py-1.5 bg-indigo-600 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-[8px] font-black text-white/80 uppercase tracking-widest">Execution Trace</span>
        <span className="text-[8px] font-mono font-bold text-white/60 uppercase tracking-widest">UTF-8</span>
      </div>
    </div>
  );
};
