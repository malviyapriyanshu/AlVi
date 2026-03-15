import React, { useState, useCallback, useEffect, useRef } from 'react';
import type { TreeNode, TreeAnimationStep } from '../../types/extended';
import { Play, Pause, SkipForward, SkipBack, RotateCcw } from 'lucide-react';

interface PositionedNode extends TreeNode {
  x: number;
  y: number;
}

function assignPositions(node: TreeNode | null | undefined, x: number, y: number, spread: number): PositionedNode[] {
  if (!node) return [];
  const result: PositionedNode[] = [{ ...node, x, y }];
  result.push(...assignPositions(node.left, x - spread, y + 70, spread * 0.52));
  result.push(...assignPositions(node.right, x + spread, y + 70, spread * 0.52));
  return result;
}

function getEdges(node: TreeNode | null | undefined, positions: PositionedNode[]): { from: PositionedNode; to: PositionedNode }[] {
  if (!node) return [];
  const edges: { from: PositionedNode; to: PositionedNode }[] = [];
  const pos = positions.find(p => p.id === node.id);
  if (!pos) return [];
  if (node.left) {
    const childPos = positions.find(p => p.id === node.left!.id);
    if (childPos) { edges.push({ from: pos, to: childPos }); edges.push(...getEdges(node.left, positions)); }
  }
  if (node.right) {
    const childPos = positions.find(p => p.id === node.right!.id);
    if (childPos) { edges.push({ from: pos, to: childPos }); edges.push(...getEdges(node.right, positions)); }
  }
  return edges;
}

interface Props {
  root: TreeNode;
  steps: TreeAnimationStep[];
  speed?: number;
}

const NODE_R = 18;

export const TreeCanvas: React.FC<Props> = ({ root, steps, speed = 700 }) => {
  const [stepIdx, setStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const timerRef = useRef<number | null>(null);

  const positions = assignPositions(root, 300, 35, 120);
  const edges = getEdges(root, positions);
  const currentStep = steps[stepIdx] as TreeAnimationStep | undefined;

  const advance = useCallback(() => {
    setStepIdx(prev => {
      if (prev >= steps.length - 1) { setIsPlaying(false); return prev; }
      return prev + 1;
    });
  }, [steps.length]);

  useEffect(() => {
    if (isPlaying) timerRef.current = window.setInterval(advance, speed);
    else if (timerRef.current) clearInterval(timerRef.current);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isPlaying, advance, speed]);

  useEffect(() => { setStepIdx(0); setIsPlaying(false); }, [steps]);

  const visited = currentStep?.visitedNodes ?? [];
  const path = currentStep?.currentPath ?? [];
  const activeNodeId = currentStep?.nodeId;

  const getNodeFill = (nodeId: string) => {
    if (nodeId === activeNodeId) return '#818cf8';
    if (visited.includes(nodeId)) return '#34d399';
    if (path.includes(nodeId)) return '#60a5fa';
    return '#334155';
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-slate-900 rounded-2xl border border-slate-700/50 overflow-hidden" style={{ height: 300 }}>
        <svg width="100%" height="100%" viewBox="0 0 600 280">
          {edges.map((e, i) => (
            <line key={i} x1={e.from.x} y1={e.from.y} x2={e.to.x} y2={e.to.y} stroke="#334155" strokeWidth={1.5} />
          ))}
          {positions.map(node => (
            <g key={node.id} className="transition-all duration-300">
              <circle cx={node.x} cy={node.y} r={NODE_R} fill={getNodeFill(node.id)} stroke="#1e293b" strokeWidth={2} className="transition-all duration-500" />
              <text x={node.x} y={node.y} textAnchor="middle" dominantBaseline="middle" fontSize="12" fontWeight="700" fill="white">{node.val}</text>
            </g>
          ))}
        </svg>
      </div>

      {currentStep?.explanation && (
        <div className="bg-slate-800/60 rounded-xl border border-slate-700/50 px-4 py-2.5 text-sm text-slate-300">{currentStep.explanation}</div>
      )}

      {visited.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-slate-500 uppercase tracking-wider">Visited order:</span>
          {visited.map((id, i) => {
            const node = positions.find(p => p.id === id);
            return <span key={i} className="bg-emerald-500/20 text-emerald-300 text-xs font-mono px-2 py-0.5 rounded-md border border-emerald-500/30">{node?.val}</span>;
          })}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button onClick={() => setStepIdx(0)} className="p-1.5 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"><RotateCcw size={14} /></button>
          <button onClick={() => setStepIdx(Math.max(0, stepIdx - 1))} className="p-1.5 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"><SkipBack size={14} /></button>
          <button onClick={() => setIsPlaying(!isPlaying)} className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors">
            {isPlaying ? <Pause size={16} /> : <Play size={16} className="fill-current" />}
          </button>
          <button onClick={() => setStepIdx(Math.min(steps.length - 1, stepIdx + 1))} className="p-1.5 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"><SkipForward size={14} /></button>
        </div>
        <span className="text-xs text-slate-500">{stepIdx + 1} / {steps.length}</span>
      </div>

      <div className="flex gap-4 text-[10px] text-slate-500">
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-slate-600 inline-block" /> Unvisited</span>
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-blue-400 inline-block" /> In Path</span>
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-indigo-400 inline-block" /> Current</span>
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" /> Visited</span>
      </div>
    </div>
  );
};
