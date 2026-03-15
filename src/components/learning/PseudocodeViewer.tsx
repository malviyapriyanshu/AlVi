import React from 'react';

interface Props {
  code: string;
  highlightLine?: number;
}

export const PseudocodeViewer: React.FC<Props> = ({ code, highlightLine }) => {
  const lines = code.split('\n');
  return (
    <div className="surface-card p-3 md:p-4 overflow-hidden bg-gray-50/50 dark:bg-slate-900/50">
      <div className="font-mono text-[11px] leading-relaxed overflow-x-auto custom-scrollbar">
        {lines.map((lineText, idx) => (
          <div key={idx}
            className={`px-3 py-1 rounded-lg transition-all duration-300 flex gap-4
              ${highlightLine === idx
                ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-l-2 border-indigo-500 -ml-[2px]'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'}`}>
            <span className="w-5 flex-shrink-0 text-right opacity-30 select-none text-slate-500">{idx}</span>
            <pre className="whitespace-pre font-medium">{lineText || ' '}</pre>
          </div>
        ))}
      </div>
    </div>
  );
};
