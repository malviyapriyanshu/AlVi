import React from 'react';
import { GraphNode } from './GraphNode';
import { GraphEdge } from './GraphEdge';
import { Graph, GraphAnimationStep } from '../../types/extended';

import { useThemeStore } from '../../state/useThemeStore';

interface GraphCanvasProps {
  graph: Graph;
  currentStep?: GraphAnimationStep;
}

export const GraphCanvas: React.FC<GraphCanvasProps> = ({ graph, currentStep }) => {
  const { theme } = useThemeStore();
  const visited = currentStep?.visitedNodes ?? [];
  const queueStack = currentStep?.queueOrStack ?? [];
  const activeNode = currentStep?.nodeId;
  const activeEdgeFrom = currentStep?.edgeFrom;
  const activeEdgeTo = currentStep?.edgeTo;
  const shortestPath = currentStep?.shortestPath ?? [];

  const getNodeColor = (nodeId: string) => {
    // Standard Colors based on requirements:
    // Sorted/Result -> Success (Emerald)
    // Active/Pointer -> Info (Blue/Indigo)
    // Processing -> Warning (Yellow/Amber)
    if (shortestPath.includes(nodeId)) return '#10b981'; // Emerald-500
    if (activeNode === nodeId) return '#6366f1';        // Indigo-500
    if (visited.includes(nodeId)) return '#059669';       // Emerald-600
    if (queueStack.includes(nodeId)) return '#f59e0b';    // Amber-500
    return theme === 'dark' ? '#334155' : '#e2e8f0';     // Slate-700 or Slate-200
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
    <div className="flex-1 w-full bg-transparent p-4 md:p-8 flex items-center justify-center overflow-hidden relative">
      <svg width="100%" height="100%" viewBox="0 0 600 400" className="drop-shadow-xl md:drop-shadow-2xl max-w-full max-h-full">
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
          
          let edgeColor = theme === 'dark' ? '#1e293b' : '#cbd5e1'; // Default
          if (isEdgeInShortestPath(edge.from, edge.to)) edgeColor = '#10b981';
          else if (isEdgeActive(edge.from, edge.to)) edgeColor = '#6366f1';

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
