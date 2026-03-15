import React from 'react';
import { GraphNode } from './GraphNode';
import { GraphEdge } from './GraphEdge';
import { Graph, GraphAnimationStep } from '../../types/extended';

interface GraphCanvasProps {
  graph: Graph;
  currentStep?: GraphAnimationStep;
}

export const GraphCanvas: React.FC<GraphCanvasProps> = ({ graph, currentStep }) => {
  const visited = currentStep?.visitedNodes ?? [];
  const queueStack = currentStep?.queueOrStack ?? [];
  const activeNode = currentStep?.nodeId;
  const activeEdgeFrom = currentStep?.edgeFrom;
  const activeEdgeTo = currentStep?.edgeTo;
  const shortestPath = currentStep?.shortestPath ?? [];

  const getNodeColor = (nodeId: string) => {
    // Standard Colors: Blue (Pointer), Yellow (Processing/Queue), Green (Result/Visited)
    if (shortestPath.includes(nodeId)) return '#10b981'; // Emerald-500 (Success)
    if (activeNode === nodeId) return '#3b82f6';        // Blue-500 (Pointer/Active)
    if (visited.includes(nodeId)) return '#059669';       // Emerald-600 (Visited)
    if (queueStack.includes(nodeId)) return '#eab308';    // Yellow-500 (Comparison/Processing)
    return '#334155'; // Slate-700 (Default)
  };

  const isEdgeActive = (from: string, to: string) => {
    return (activeEdgeFrom === from && activeEdgeTo === to) || (activeEdgeFrom === to && activeEdgeTo === from);
  };

  const isEdgeInShortestPath = (from: string, to: string) => {
    if (!shortestPath.length) return false;
    const fromIdx = shortestPath.indexOf(from);
    const toIdx = shortestPath.indexOf(to);
    return fromIdx !== -1 && toIdx !== -1 && Math.abs(fromIdx - toIdx) === 1;
  };

  return (
    <div className="flex-1 w-full bg-slate-900/50 rounded-[32px] border border-slate-800/60 p-8 flex items-center justify-center overflow-hidden relative">
      <svg width="100%" height="100%" viewBox="0 0 600 400" className="drop-shadow-2xl">
        <defs>
           <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
           </filter>
        </defs>

        {graph.edges.map((edge, i) => {
          const from = graph.nodes.find(n => n.id === edge.from);
          const to = graph.nodes.find(n => n.id === edge.to);
          if (!from || !to) return null;
          
          let edgeColor = '#1e293b'; // Default
          if (isEdgeInShortestPath(edge.from, edge.to)) edgeColor = '#10b981';
          else if (isEdgeActive(edge.from, edge.to)) edgeColor = '#3b82f6';

          return (
            <GraphEdge 
              key={i}
              x1={from.x} y1={from.y} x2={to.x} y2={to.y} 
              color={edgeColor}
              weight={edge.weight}
              isActive={isEdgeActive(edge.from, edge.to) || isEdgeInShortestPath(edge.from, edge.to)}
            />
          );
        })}
        {graph.nodes.map(node => (
          <GraphNode 
            key={node.id}
            x={node.x} y={node.y}
            label={node.label}
            color={getNodeColor(node.id)}
            isActive={activeNode === node.id}
          />
        ))}
      </svg>
    </div>
  );
};
