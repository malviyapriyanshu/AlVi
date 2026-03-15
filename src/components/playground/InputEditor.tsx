import React, { useState } from 'react';
import { Wand2 } from 'lucide-react';

interface PlaygroundConfig {
  array: number[];
  target: number | null;
  windowSize: number;
}

interface Props {
  onApply: (config: PlaygroundConfig) => void;
}

export const InputEditor: React.FC<Props> = ({ onApply }) => {
  const [arrayStr, setArrayStr] = useState('3, 1, 5, 2, 8, 4, 7');
  const [targetStr, setTargetStr] = useState('5');
  const [windowSize, setWindowSize] = useState(3);
  const [error, setError] = useState('');

  const handleApply = () => {
    setError('');
    try {
      const array = arrayStr.split(',').map(s => {
        const n = parseInt(s.trim(), 10);
        if (isNaN(n)) throw new Error(`"${s.trim()}" is not a number`);
        if (n < 1 || n > 500) throw new Error('Values must be between 1 and 500');
        return n;
      });
      if (array.length < 2 || array.length > 50) throw new Error('Array must have 2–50 elements');
      const target = targetStr.trim() ? parseInt(targetStr.trim(), 10) : null;
      onApply({ array, target, windowSize });
    } catch (e) {
      setError(String(e).replace('Error: ', ''));
    }
  };

  return (
    <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-5 flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Wand2 className="text-indigo-400" size={18} />
        <h3 className="text-sm font-bold text-white">Algorithm Playground</h3>
        <span className="text-xs text-slate-500">— use your own inputs</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Array (comma-separated)</label>
          <input
            type="text" value={arrayStr} onChange={e => setArrayStr(e.target.value)}
            placeholder="e.g. 3, 1, 5, 2, 8"
            className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Target Value (optional)</label>
          <input
            type="number" value={targetStr} onChange={e => setTargetStr(e.target.value)}
            placeholder="e.g. 5"
            className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Window Size (for Sliding Window)</label>
          <input
            type="number" min={2} max={10} value={windowSize} onChange={e => setWindowSize(parseInt(e.target.value, 10))}
            className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>
      </div>

      {error && <p className="text-xs text-rose-400 bg-rose-500/10 rounded-lg px-3 py-2 border border-rose-500/20">{error}</p>}

      <button onClick={handleApply}
        className="self-start flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-all shadow-lg shadow-indigo-500/20">
        <Wand2 size={16} /> Apply to Visualizer
      </button>
    </div>
  );
};
