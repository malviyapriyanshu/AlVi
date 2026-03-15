import { AnimationStep } from '../../types/animationTypes';
import { Graph } from '../../types/extended';
import { AlgorithmInfo } from '../../types/algorithmTypes';

export const dijkstraInfo: AlgorithmInfo = {
  name: "Dijkstra's Algorithm",
  category: 'graph',
  description: 'Finds the shortest paths between nodes in a graph with non-negative edge weights.',
  complexity: { time: { best: 'O(E log V)', average: 'O(E log V)', worst: 'O(E log V)' }, space: 'O(V)' },
  intuition: 'Greedily choosing the closest unvisited node and updating its neighbors.',
  analogy: 'Finding the fastest route between cities on a map.',
  stepByStep: [
    { title: 'Initialize', description: 'Set distances to all nodes as ∞, start node as 0.' },
    { title: 'Relax', description: 'Pick node with smallest distance, update neighbors if shorter path exists.' }
  ],
  whenToUse: 'Shortest path in weighted graphs.',
  pseudocode: `dist[start] = 0\nwhile nodes:\n  u = min_dist(nodes)\n  for v in neighbors(u):\n    dist[v] = min(dist[v], dist[u] + w(u,v))`
};

export const dijkstra = (graph: Graph, startId: string): AnimationStep[] => {
  const steps: AnimationStep[] = [];
  const distances: Record<string, number> = {};
  const visited = new Set<string>();
  const parent: Record<string, string | null> = {};

  graph.nodes.forEach(n => distances[n.id] = Infinity);
  distances[startId] = 0;

  steps.push({ 
    type: 'visit', 
    nodeId: startId, 
    explanation: `Initialize distances. Start at ${startId}`,
    line: 0 // Corresponds to pseudocode line 0: dist[start] = 0
  });

  while (visited.size < graph.nodes.length) { // Corresponds to pseudocode line 1: while nodes:
    let u: string | null = null;
    let minDist = Infinity;

    graph.nodes.forEach(n => {
      if (!visited.has(n.id) && distances[n.id] < minDist) {
        minDist = distances[n.id];
        u = n.id;
      }
    });

    if (u === null) break;
    visited.add(u);
    steps.push({ 
      type: 'dequeue', 
      nodeId: u, 
      visitedNodes: [...visited], 
      distances: { ...distances }, 
      explanation: `Picking node ${u} with shortest distance ${minDist}`,
      line: 2 // Corresponds to pseudocode line 2: u = min_dist(nodes)
    });

    const neighbors = graph.edges.filter(e => e.from === u || (!graph.directed && e.to === u));

    for (const edge of neighbors) { // Corresponds to pseudocode line 3: for v in neighbors(u):
      const v = edge.from === u ? edge.to : edge.from;
      if (!visited.has(v)) {
        const weight = edge.weight ?? 1;
        const newDist = distances[u!] + weight;
        if (newDist < distances[v]) {
          distances[v] = newDist;
          parent[v] = u;
          steps.push({ 
            type: 'enqueue', 
            nodeId: v, 
            edgeFrom: u!, 
            edgeTo: v, 
            distances: { ...distances }, 
            explanation: `Update distance to ${v}: ${newDist}`,
            line: 4 // Corresponds to pseudocode line 4: dist[v] = min(dist[v], dist[u] + w(u,v))
          });
        }
      }
    }
  }
  return steps;
};
