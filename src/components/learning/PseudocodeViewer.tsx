import React from 'react';

interface Props { code: string }

export const PseudocodeViewer: React.FC<Props> = ({ code }) => (
  <div className="bg-slate-800/80 rounded-2xl border border-slate-700 p-5">
    <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-4">Pseudo Code</h3>
    <pre className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-indigo-400 text-xs overflow-x-auto leading-relaxed">
      <code>{code}</code>
    </pre>
  </div>
);
