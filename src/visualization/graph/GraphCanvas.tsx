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
    if (shortestPath.includes(nodeId)) return '#f59e0b';
    if (activeNode === nodeId) return '#818cf8';
    if (visited.includes(nodeId)) return '#34d399';
    if (queueStack.includes(nodeId)) return '#60a5fa';
    return '#475569';
  };

  const isEdgeActive = (from: string, to: string) => {
    return (activeEdgeFrom === from && activeEdgeTo === to) || (activeEdgeFrom === to && activeEdgeTo === from);
  };

  return (
    <div className="relative bg-slate-900 rounded-2xl border border-slate-700/50 overflow-hidden" style={{ height: 320 }}>
      <svg width="100%" height="100%" viewBox="0 0 600 300">
        {graph.edges.map((edge, i) => {
          const from = graph.nodes.find(n => n.id === edge.from);
          const to = graph.nodes.find(n => n.id === edge.to);
          if (!from || !to) return null;
          return (
            <GraphEdge 
              key={i}
              x1={from.x} y1={from.y} x2={to.x} y2={to.y} 
              color={isEdgeActive(edge.from, edge.to) ? '#818cf8' : '#334155'}
              weight={edge.weight}
              isActive={isEdgeActive(edge.from, edge.to)}
            />
          );
        })}
        {graph.nodes.map(node => (
          <GraphNode 
            key={node.id}
            x={node.x} y={node.y}
            label={node.label}
            color={getNodeColor(node.id)}
          />
        ))}
      </svg>
    </div>
  );
};
