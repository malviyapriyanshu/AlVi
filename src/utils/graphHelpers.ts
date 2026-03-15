import { Graph } from '../types/extended';

export const getNeighbors = (graph: Graph, nodeId: string) => {
  return graph.edges
    .filter(e => e.from === nodeId || (!graph.directed && e.to === nodeId))
    .map(e => e.from === nodeId ? e.to : e.from);
};

export const getEdgeWeight = (graph: Graph, fromId: string, toId: string) => {
  const edge = graph.edges.find(e => 
    (e.from === fromId && e.to === toId) || (!graph.directed && e.from === toId && e.to === fromId)
  );
  return edge?.weight ?? 1;
};
