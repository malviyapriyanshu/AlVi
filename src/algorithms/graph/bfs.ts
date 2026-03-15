import type { GraphAnimationStep, Graph } from '../../types/extended';

export const bfsInfo = {
  name: 'Breadth-First Search',
  category: 'graph' as const,
  description: 'Explores all neighbors of a node before moving to the next level. Uses a queue. Finds the shortest path in unweighted graphs.',
  complexity: { time: { best: 'O(V+E)', average: 'O(V+E)', worst: 'O(V+E)' }, space: 'O(V)' },
  problemContext: { title: 'Number of Islands', link: 'https://leetcode.com/problems/number-of-islands/', difficulty: 'Medium' as const },
  intuition: 'Like ripples in a pond — explore all nodes at distance 1, then distance 2, then 3, layer by layer.',
  analogy: 'Like searching a building floor-by-floor: explore every room on floor 1 before going to floor 2.',
  stepByStep: [
    { title: 'Enqueue Start', description: 'Add the starting node to a queue and mark it visited.' },
    { title: 'Dequeue', description: 'Remove the front node from the queue.' },
    { title: 'Explore Neighbors', description: 'For each unvisited neighbor, enqueue it and mark visited.' },
    { title: 'Repeat', description: 'Continue until the queue is empty.' },
  ],
  whenToUse: 'Shortest path in unweighted graphs, level-order traversals, finding connected components.',
  pseudocode: `queue = [start]
visited = {start}
while queue:
  node = queue.dequeue()
  for neighbor in graph[node]:
    if neighbor not visited:
      queue.enqueue(neighbor)
      visited.add(neighbor)`,
};

export function bfs(graph: Graph, startId: string): GraphAnimationStep[] {
  const steps: GraphAnimationStep[] = [];
  const visited = new Set<string>();
  const queue: string[] = [startId];
  const parentMap: Record<string, string | null> = { [startId]: null };
  visited.add(startId);

  steps.push({ type: 'enqueue', nodeId: startId, visitedNodes: [], queueOrStack: [startId], parentMap: { ...parentMap }, explanation: `Starting BFS from node ${startId}. Enqueue it.` });

  while (queue.length > 0) {
    const current = queue.shift()!;
    steps.push({ type: 'dequeue', nodeId: current, visitedNodes: [...visited], queueOrStack: [...queue], parentMap: { ...parentMap }, explanation: `Dequeue node ${current}. Mark as visited.` });

    const neighbors = graph.edges.filter(e => e.from === current || (!graph.directed && e.to === current));
    for (const edge of neighbors) {
      const neighbor = edge.from === current ? edge.to : edge.from;
      steps.push({ type: 'explore_edge', nodeId: neighbor, edgeFrom: current, edgeTo: neighbor, visitedNodes: [...visited], queueOrStack: [...queue], parentMap: { ...parentMap }, explanation: `Exploring edge ${current} → ${neighbor}` });
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
        parentMap[neighbor] = current;
        steps.push({ type: 'enqueue', nodeId: neighbor, visitedNodes: [...visited], queueOrStack: [...queue], parentMap: { ...parentMap }, explanation: `${neighbor} is unvisited. Enqueue it.` });
      }
    }
  }
  return steps;
}
