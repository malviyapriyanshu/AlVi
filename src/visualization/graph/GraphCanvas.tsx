import React from 'react';
import { GraphNode } from './GraphNode';
import { GraphEdge } from './GraphEdge';
import { Graph, GraphAnimationStep } from '../../types/extended';
import { useTheme } from '../../theme/themeProvider';

interface GraphCanvasProps {
  graph: Graph;
  currentStep?: GraphAnimationStep;
}

export const GraphCanvas: React.FC<GraphCanvasProps> = ({ graph, currentStep }) => {
  const { resolvedTheme } = useTheme();
  
  const visited = currentStep?.visitedNodes ?? [];
  const queueStack = currentStep?.queueOrStack ?? [];
  const activeNode = currentStep?.nodeId;
  const activeEdgeFrom = currentStep?.edgeFrom;
  const activeEdgeTo = currentStep?.edgeTo;
  const shortestPath = currentStep?.shortestPath ?? [];

  const getNodeColor = (nodeId: string) => {
    if (shortestPath.includes(nodeId)) return '#10b981'; // Emerald-500
    if (activeNode === nodeId) return '#6366f1';        // Indigo-500
    if (visited.includes(nodeId)) return '#059669';       // Emerald-600
    if (queueStack.includes(nodeId)) return '#f59e0b';    // Amber-500
    return resolvedTheme === 'dark' ? '#334155' : '#e2e8f0'; 
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
    <div className="flex-1 w-full bg-transparent p-2 sm:p-4 md:p-8 flex items-center justify-center overflow-hidden relative min-h-[300px] sm:min-h-[500px]">
      <div className="absolute top-4 sm:top-6 left-4 sm:left-8 flex sm:flex-col gap-3 sm:gap-2 bg-background-primary/40 backdrop-blur-sm p-2 rounded-xl sm:bg-transparent sm:p-0">
         <LegendItem color="bg-indigo-500" label="Active" />
         <LegendItem color="bg-emerald-500" label="Visited" />
         <LegendItem color="bg-amber-500" label="Fringe" />
      </div>

      <svg width="100%" height="100%" viewBox="0 0 600 400" className="max-w-full max-h-full">
        {graph.edges.map((edge, i) => {
          const from = graph.nodes.find(n => n.id === edge.from);
          const to = graph.nodes.find(n => n.id === edge.to);
          if (!from || !to) return null;
          
          let edgeColor = resolvedTheme === 'dark' ? '#1e293b' : '#cbd5e1'; 
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
            isVisited={visited.includes(node.id)}
          />
        ))}
      </svg>
    </div>
  );
};

const LegendItem = ({ color, label }: { color: string, label: string }) => (
  <div className="flex items-center gap-2">
    <div className={`w-2 h-2 rounded-full ${color}`} />
    <span className="text-[9px] font-black text-text-secondary uppercase tracking-widest">{label}</span>
  </div>
);
