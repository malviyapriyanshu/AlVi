import React from 'react';

interface Props {
  code: string;
}

export const PseudocodeViewer: React.FC<Props> = ({ code }) => (
  <div className="bg-slate-800/80 rounded-2xl border border-slate-700 p-5">
    <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-4">Pseudocode</h3>
    <pre className="font-mono text-xs text-indigo-300 leading-relaxed overflow-x-auto">
      {code}
    </pre>
  </div>
);
