import type { GraphAnimationStep, Graph } from '../../types/extended';

export const dijkstraInfo = {
  name: "Dijkstra's Algorithm",
  category: 'graph' as const,
  description: 'Finds the shortest path from a source node to all other nodes in a weighted graph with non-negative edge weights.',
  complexity: { time: { best: 'O((V+E) log V)', average: 'O((V+E) log V)', worst: 'O(V²)' }, space: 'O(V)' },
  problemContext: { title: 'Network Delay Time', link: 'https://leetcode.com/problems/network-delay-time/', difficulty: 'Medium' as const },
  intuition: "Always explore the currently closest unvisited node. Like a greedy approach that expands the 'known shortest path' frontier.",
  analogy: 'GPS navigation: always take the shortest known road, update estimates as you find better routes.',
  stepByStep: [
    { title: 'Initialize', description: 'Set distance to start = 0, all others = ∞.' },
    { title: 'Pick Minimum', description: 'Select the unvisited node with smallest known distance.' },
    { title: 'Relax Edges', description: 'Update neighbors if a shorter path is found.' },
    { title: 'Repeat', description: 'Until all nodes are visited.' },
  ],
  whenToUse: 'Shortest path in weighted graphs with non-negative weights (GPS, network routing).',
  pseudocode: `dist = {start: 0, all others: ∞}
while unvisited nodes exist:
  u = node with min dist
  for each neighbor v of u:
    if dist[u] + weight(u,v) < dist[v]:
      dist[v] = dist[u] + weight(u,v)`,
};

export function dijkstra(graph: Graph, startId: string): GraphAnimationStep[] {
  const steps: GraphAnimationStep[] = [];
  const distances: Record<string, number> = {};
  const visited = new Set<string>();
  const parentMap: Record<string, string | null> = {};
  const unvisited = new Set<string>();

  graph.nodes.forEach(n => {
    distances[n.id] = n.id === startId ? 0 : Infinity;
    parentMap[n.id] = null;
    unvisited.add(n.id);
  });

  steps.push({ type: 'visit', nodeId: startId, visitedNodes: [], queueOrStack: [...unvisited], distances: { ...distances }, parentMap: { ...parentMap }, explanation: `Initialize: dist[${startId}]=0, all others=∞` });

  while (unvisited.size > 0) {
    const current = [...unvisited].reduce((a, b) => distances[a] <= distances[b] ? a : b);
    if (distances[current] === Infinity) break;

    unvisited.delete(current);
    visited.add(current);
    steps.push({ type: 'dequeue', nodeId: current, visitedNodes: [...visited], queueOrStack: [...unvisited], distances: { ...distances }, parentMap: { ...parentMap }, explanation: `Visit node ${current} (shortest dist = ${distances[current]})` });

    for (const edge of graph.edges) {
      let neighbor: string | null = null;
      let weight = edge.weight ?? 1;
      if (edge.from === current) neighbor = edge.to;
      else if (!graph.directed && edge.to === current) { neighbor = edge.from; }
      if (!neighbor || !unvisited.has(neighbor)) continue;

      const newDist = distances[current] + weight;
      steps.push({ type: 'explore_edge', nodeId: neighbor, edgeFrom: current, edgeTo: neighbor, visitedNodes: [...visited], queueOrStack: [...unvisited], distances: { ...distances }, parentMap: { ...parentMap }, explanation: `Check edge ${current}→${neighbor} (weight ${weight}). New dist = ${newDist}` });

      if (newDist < distances[neighbor]) {
        distances[neighbor] = newDist;
        parentMap[neighbor] = current;
        steps.push({ type: 'update_distance', nodeId: neighbor, visitedNodes: [...visited], queueOrStack: [...unvisited], distances: { ...distances }, parentMap: { ...parentMap }, explanation: `Relax: dist[${neighbor}] updated to ${newDist}` });
      }
    }
  }

  // Reconstruct shortest paths
  const shortestPath: string[] = [];
  let node = graph.nodes.find(n => n.id !== startId)?.id;
  if (node) {
    while (node && parentMap[node] !== undefined) {
      shortestPath.unshift(node);
      node = parentMap[node] ?? undefined;
    }
    shortestPath.unshift(startId);
    steps.push({ type: 'shortest_path', visitedNodes: [...visited], queueOrStack: [], distances: { ...distances }, parentMap: { ...parentMap }, shortestPath, explanation: `Shortest paths found from ${startId}!` });
  }
  return steps;
}
