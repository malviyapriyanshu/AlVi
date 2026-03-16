import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface Props {
  code: string;
  language?: string;
}

export const SourceCodeViewer: React.FC<Props> = ({ code, language = 'typescript' }) => {
  // Very simple syntax highlighting for demonstration
  // In a real app, we'd use prism-react-renderer or highlight.js
  const lines = code.split('\n');

  return (
    <div className="bg-slate-950 rounded-2xl border border-slate-800 p-4 font-mono text-[10px] leading-relaxed shadow-inner overflow-x-auto custom-scrollbar group">
      <div className="flex flex-col gap-1">
        {lines.map((line, i) => (
          <div key={i} className="flex gap-4 group/line">
            <span className="w-4 text-right text-slate-700 select-none group-hover/line:text-slate-500 transition-colors">
              {i + 1}
            </span>
            <code className="text-slate-300 whitespace-pre">
               {line.split(/(\s+|[(){}[\].,;]|\b(?:export|const|let|var|function|return|if|else|for|while|await|async|interface|type)\b)/).map((part, j) => {
                 if (/^(?:export|const|let|var|function|return|if|else|for|while|await|async|interface|type)$/.test(part)) {
                   return <span key={j} className="text-pink-500">{part}</span>;
                 }
                 if (/^[(){}[\].,;]$/.test(part)) {
                   return <span key={j} className="text-slate-500">{part}</span>;
                 }
                 if (/^\s+$/.test(part)) {
                   return <span key={j}>{part}</span>;
                 }
                 if (/^[0-9]+$/.test(part)) {
                   return <span key={j} className="text-orange-400">{part}</span>;
                 }
                 return <span key={j}>{part}</span>;
               })}
            </code>
          </div>
        ))}
      </div>
    </div>
  );
};
