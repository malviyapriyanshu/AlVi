import React, { useEffect, useRef, useState, useCallback } from 'react';
import type { Graph, GraphAnimationStep } from '../../types/extended';
import { Play, Pause, SkipForward, SkipBack, RotateCcw } from 'lucide-react';

interface Props {
  graph: Graph;
  steps: GraphAnimationStep[];
  speed?: number;
}

const NODE_RADIUS = 22;

export const GraphCanvas: React.FC<Props> = ({ graph, steps, speed = 800 }) => {
  const [stepIdx, setStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const timerRef = useRef<number | null>(null);

  const currentStep = steps[stepIdx] as GraphAnimationStep | undefined;

  const advance = useCallback(() => {
    setStepIdx(prev => {
      if (prev >= steps.length - 1) { setIsPlaying(false); return prev; }
      return prev + 1;
    });
  }, [steps.length]);

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = window.setInterval(advance, speed);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isPlaying, advance, speed]);

  useEffect(() => { setStepIdx(0); setIsPlaying(false); }, [graph, steps]);

  const visited = currentStep?.visitedNodes ?? [];
  const queueStack = currentStep?.queueOrStack ?? [];
  const activeNode = currentStep?.nodeId;
  const activeEdgeFrom = currentStep?.edgeFrom;
  const activeEdgeTo = currentStep?.edgeTo;
  const distances = currentStep?.distances;
  const shortestPath = currentStep?.shortestPath ?? [];

  const getNodeColor = (nodeId: string) => {
    if (shortestPath.includes(nodeId)) return '#f59e0b'; // amber
    if (activeNode === nodeId) return '#818cf8'; // indigo
    if (visited.includes(nodeId)) return '#34d399'; // emerald
    if (queueStack.includes(nodeId)) return '#60a5fa'; // blue
    return '#475569'; // slate
  };

  const getEdgeColor = (from: string, to: string) => {
    if (shortestPath.includes(from) && shortestPath.includes(to)) return '#f59e0b';
    if ((activeEdgeFrom === from && activeEdgeTo === to) || (activeEdgeFrom === to && activeEdgeTo === from)) return '#818cf8';
    return '#334155';
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="relative bg-slate-900 rounded-2xl border border-slate-700/50 overflow-hidden" style={{ height: 320 }}>
        <svg width="100%" height="100%" viewBox="0 0 600 300">
          {/* Edges */}
          {graph.edges.map((edge, i) => {
            const from = graph.nodes.find(n => n.id === edge.from);
            const to = graph.nodes.find(n => n.id === edge.to);
            if (!from || !to) return null;
            const color = getEdgeColor(edge.from, edge.to);
            return (
              <g key={i}>
                <line x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke={color} strokeWidth={color === '#334155' ? 1.5 : 3} strokeOpacity={0.8} className="transition-all duration-300" />
                {edge.weight !== undefined && (
                  <text x={(from.x + to.x) / 2} y={(from.y + to.y) / 2 - 6} textAnchor="middle" fontSize="11" fill="#94a3b8">{edge.weight}</text>
                )}
              </g>
            );
          })}
          {/* Nodes */}
          {graph.nodes.map(node => (
            <g key={node.id} className="transition-all duration-300">
              <circle cx={node.x} cy={node.y} r={NODE_RADIUS} fill={getNodeColor(node.id)} stroke="#1e293b" strokeWidth={2} className="transition-all duration-300" />
              <text x={node.x} y={node.y} textAnchor="middle" dominantBaseline="middle" fontSize="13" fontWeight="600" fill="white">{node.label}</text>
              {distances && distances[node.id] !== undefined && distances[node.id] !== Infinity && (
                <text x={node.x} y={node.y + NODE_RADIUS + 12} textAnchor="middle" fontSize="10" fill="#94a3b8">d={distances[node.id]}</text>
              )}
            </g>
          ))}
        </svg>
      </div>

      {/* Step explanation */}
      {currentStep?.explanation && (
        <div className="bg-slate-800/60 rounded-xl border border-slate-700/50 px-4 py-2.5 text-sm text-slate-300">{currentStep.explanation}</div>
      )}

      {/* Queue/Stack display */}
      {queueStack.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-slate-500 uppercase tracking-wider">Queue/Stack:</span>
          {queueStack.map((id, i) => (
            <span key={i} className="bg-blue-500/20 text-blue-300 text-xs font-mono px-2 py-0.5 rounded-md border border-blue-500/30">{id}</span>
          ))}
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button onClick={() => setStepIdx(0)} className="p-1.5 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"><RotateCcw size={14} /></button>
          <button onClick={() => setStepIdx(Math.max(0, stepIdx - 1))} className="p-1.5 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"><SkipBack size={14} /></button>
          <button onClick={() => setIsPlaying(!isPlaying)} className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors">
            {isPlaying ? <Pause size={16} /> : <Play size={16} className="fill-current" />}
          </button>
          <button onClick={() => setStepIdx(Math.min(steps.length - 1, stepIdx + 1))} className="p-1.5 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"><SkipForward size={14} /></button>
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span>{stepIdx + 1} / {steps.length}</span>
          <div className="w-24 bg-slate-700 rounded-full h-1"><div className="bg-indigo-500 h-1 rounded-full transition-all" style={{ width: `${((stepIdx + 1) / steps.length) * 100}%` }} /></div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-slate-500">
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-slate-500 inline-block" /> Unvisited</span>
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-blue-400 inline-block" /> In Queue</span>
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-indigo-400 inline-block" /> Current</span>
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" /> Visited</span>
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" /> Shortest Path</span>
      </div>
    </div>
  );
};
