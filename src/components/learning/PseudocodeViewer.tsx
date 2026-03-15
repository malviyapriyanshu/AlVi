import React from 'react';

interface Props {
  code: string;
  highlightLine?: number;
}

export const PseudocodeViewer: React.FC<Props> = ({ code, highlightLine }) => {
  const lines = code.split('\n');
  return (
    <div className="surface-card p-4 overflow-hidden">
      <div className="font-mono text-[11px] leading-relaxed overflow-x-auto custom-scrollbar">
        {lines.map((lineText, idx) => (
          <div key={idx}
            className={`px-3 py-1 rounded-lg transition-all duration-300 flex gap-3
              ${highlightLine === idx
                ? 'bg-indigo-500/10 text-indigo-300 border-l-2 border-indigo-500 -ml-[2px]'
                : 'text-slate-500 hover:text-slate-400'}`}>
            <span className="w-4 flex-shrink-0 text-right opacity-30 select-none text-slate-600">{idx}</span>
            <pre className="whitespace-pre">{lineText || ' '}</pre>
          </div>
        ))}
      </div>
    </div>
  );
};
