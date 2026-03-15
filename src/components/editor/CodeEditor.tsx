import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Play, CheckCircle2, XCircle } from 'lucide-react';
import type { AnimationStep } from '../../types';

interface CodeTemplate {
  language: string;
  defaultCode: string;
  problemTitle: string;
  validate: (fn: (arr: number[], target: number) => unknown, arr: number[], target: number) => boolean;
  generateSteps: (arr: number[], target: number) => AnimationStep[];
  hint: string;
}

const BINARY_SEARCH_TEMPLATE: CodeTemplate = {
  language: 'javascript',
  problemTitle: 'Binary Search — Write the function',
  hint: 'Return the index where target is found, or -1.',
  defaultCode: `// Implement Binary Search
// Return the index of target in arr, or -1 if not found.
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    // Your code here...

  }
  return -1;
}`,
  validate: (fn, arr, target) => {
    try {
      const result = fn(arr, target);
      return arr[result as number] === target;
    } catch { return false; }
  },
  generateSteps: (arr, target) => {
    const steps: AnimationStep[] = [];
    let left = 0, right = arr.length - 1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      steps.push({ type: 'set_pointers', indices: [], pointers: [{ index: left, label: 'L' }, { index: mid, label: 'M' }, { index: right, label: 'R' }] });
      steps.push({ type: 'compare', indices: [mid] });
      if (arr[mid] === target) { steps.push({ type: 'mark_found', indices: [mid] }); break; }
      if (arr[mid] < target) { steps.push({ type: 'mark_discarded', indices: Array.from({ length: mid - left + 1 }, (_, k) => left + k) }); left = mid + 1; }
      else { steps.push({ type: 'mark_discarded', indices: Array.from({ length: right - mid + 1 }, (_, k) => mid + k) }); right = mid - 1; }
    }
    return steps;
  },
};

interface Props {
  onGenerateSteps?: (steps: AnimationStep[]) => void;
}

export const CodeEditor: React.FC<Props> = ({ onGenerateSteps }) => {
  const [code, setCode] = useState(BINARY_SEARCH_TEMPLATE.defaultCode);
  const [status, setStatus] = useState<'idle' | 'pass' | 'fail'>('idle');
  const [error, setError] = useState('');
  const arr = [1, 3, 5, 7, 9, 11, 14, 17, 21, 24];
  const target = 14;

  const runCode = () => {
    setError('');
    try {
      // eslint-disable-next-line no-new-func
      const userFn = new Function('arr', 'target', code.replace(/function binarySearch\(arr, target\)/, 'return (function(arr, target)') + ')');
      const fn = (a: number[], t: number) => userFn(a, t);
      const pass = BINARY_SEARCH_TEMPLATE.validate(fn, [...arr], target);
      setStatus(pass ? 'pass' : 'fail');
      if (pass && onGenerateSteps) {
        onGenerateSteps(BINARY_SEARCH_TEMPLATE.generateSteps([...arr], target));
      }
      if (!pass) setError('Your function returned an incorrect result. Check your logic!');
    } catch (e) {
      setStatus('fail');
      setError(String(e));
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-white">{BINARY_SEARCH_TEMPLATE.problemTitle}</h3>
          <p className="text-xs text-slate-400 mt-0.5">{BINARY_SEARCH_TEMPLATE.hint}</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500 font-mono bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-700">
          arr = [{arr.join(', ')}] &nbsp;•&nbsp; target = {target}
        </div>
      </div>

      <div className="rounded-xl overflow-hidden border border-slate-700/50" style={{ height: 260 }}>
        <Editor
          height="260px"
          defaultLanguage="javascript"
          value={code}
          onChange={v => setCode(v ?? '')}
          theme="vs-dark"
          options={{ minimap: { enabled: false }, fontSize: 13, lineNumbers: 'on', scrollBeyondLastLine: false, padding: { top: 12 } }}
        />
      </div>

      <div className="flex items-center gap-3">
        <button onClick={runCode}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-all shadow-lg shadow-indigo-500/20">
          <Play size={16} className="fill-current" /> Run & Visualize
        </button>
        {status === 'pass' && (
          <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold">
            <CheckCircle2 size={18} /> Tests passed! Watch the visualization →
          </div>
        )}
        {status === 'fail' && (
          <div className="flex items-center gap-2 text-rose-400 text-sm">
            <XCircle size={18} /> {error || 'Incorrect. Try again!'}
          </div>
        )}
      </div>
    </div>
  );
};
