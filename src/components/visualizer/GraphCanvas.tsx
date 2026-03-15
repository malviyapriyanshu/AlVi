import React from 'react';
import type { Graph } from '../../types/extended';

interface Props {
  graph: Graph;
  currentStep?: any;
}

const NODE_RADIUS = 22;

export const GraphCanvas: React.FC<Props> = ({ graph, currentStep }) => {
  const visited = currentStep?.visitedNodes ?? [];
  const queueStack = currentStep?.queueOrStack ?? [];
  const activeNode = currentStep?.nodeId;
  const activeEdgeFrom = currentStep?.edgeFrom;
  const activeEdgeTo = currentStep?.edgeTo;
  const distances = currentStep?.distances;
  const shortestPath = currentStep?.shortestPath ?? [];

  const getNodeColor = (nodeId: string) => {
    if (shortestPath.includes(nodeId)) return '#f59e0b';
    if (activeNode === nodeId) return '#818cf8';
    if (visited.includes(nodeId)) return '#34d399';
    if (queueStack.includes(nodeId)) return '#60a5fa';
    return '#475569';
  };

  const getEdgeColor = (from: string, to: string) => {
    if (shortestPath.includes(from) && shortestPath.includes(to)) return '#f59e0b';
    if ((activeEdgeFrom === from && activeEdgeTo === to) || (activeEdgeFrom === to && activeEdgeTo === from)) return '#818cf8';
    return '#334155';
  };

  return (
    <div className="flex-1 flex flex-col gap-4 p-4 min-h-0">
      {/* Graph SVG */}
      <div className="flex-1 relative bg-slate-900/30 rounded-2xl border border-slate-800/30 overflow-hidden flex items-center justify-center min-h-[300px]">
        <svg width="100%" height="100%" viewBox="0 0 600 300" className="max-h-full">
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
                  <text x={(from.x + to.x) / 2} y={(from.y + to.y) / 2 - 8} textAnchor="middle" fontSize="10" fill="#94a3b8" fontWeight="500">{edge.weight}</text>
                )}
              </g>
            );
          })}
          {/* Nodes */}
          {graph.nodes.map(node => (
            <g key={node.id} className="transition-all duration-300">
              <circle cx={node.x} cy={node.y} r={NODE_RADIUS} fill={getNodeColor(node.id)} stroke="#0f172a" strokeWidth={2} className="transition-all duration-300" />
              <text x={node.x} y={node.y} textAnchor="middle" dominantBaseline="middle" fontSize="13" fontWeight="600" fill="white">{node.label}</text>
              {distances && distances[node.id] !== undefined && distances[node.id] !== Infinity && (
                <text x={node.x} y={node.y + NODE_RADIUS + 14} textAnchor="middle" fontSize="10" fill="#94a3b8">d={distances[node.id]}</text>
              )}
            </g>
          ))}
        </svg>
      </div>

      {/* Step info */}
      {currentStep?.explanation && (
        <div className="shrink-0 bg-slate-800/40 rounded-xl border border-slate-700/30 px-4 py-2.5 text-sm text-slate-300">{currentStep.explanation}</div>
      )}

      {/* Queue/Stack */}
      {queueStack.length > 0 && (
        <div className="shrink-0 flex items-center gap-2 flex-wrap">
          <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Queue/Stack:</span>
          {queueStack.map((id: string, i: number) => (
            <span key={i} className="bg-blue-500/15 text-blue-300 text-xs font-mono px-2 py-0.5 rounded-md border border-blue-500/20">{id}</span>
          ))}
        </div>
      )}

      {/* Legend */}
      <div className="shrink-0 flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-slate-500">
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-500 inline-block" /> Unvisited</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-400 inline-block" /> In Queue</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-indigo-400 inline-block" /> Current</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" /> Visited</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400 inline-block" /> Shortest Path</span>
      </div>
    </div>
  );
};
