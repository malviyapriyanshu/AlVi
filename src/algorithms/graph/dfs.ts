import type { GraphAnimationStep, Graph } from '../../types/extended';

export const dfsInfo = {
  name: 'Depth-First Search',
  category: 'graph' as const,
  description: 'Explores as far as possible along each branch before backtracking. Uses a stack (or recursion). Great for connectivity and cycle detection.',
  complexity: { time: { best: 'O(V+E)', average: 'O(V+E)', worst: 'O(V+E)' }, space: 'O(V)' },
  problemContext: { title: 'Course Schedule', link: 'https://leetcode.com/problems/course-schedule/', difficulty: 'Medium' as const },
  intuition: 'Like exploring a maze by always going as deep as possible before turning back.',
  analogy: 'Like reading a book — you finish a chapter fully before moving to the next, not skimming a paragraph from each.',
  stepByStep: [
    { title: 'Push Start', description: 'Push the starting node to a stack.' },
    { title: 'Pop & Visit', description: 'Pop the top node, mark it visited.' },
    { title: 'Push Neighbors', description: 'Push all unvisited neighbors onto the stack.' },
    { title: 'Repeat', description: 'Continue until the stack is empty.' },
  ],
  whenToUse: 'Cycle detection, topological sort, connected components, path finding in mazes.',
  pseudocode: `stack = [start]
visited = {}
while stack:
  node = stack.pop()
  if node not visited:
    visited.add(node)
    for neighbor in graph[node]:
      stack.push(neighbor)`,
};

export function dfs(graph: Graph, startId: string): GraphAnimationStep[] {
  const steps: GraphAnimationStep[] = [];
  const visited = new Set<string>();
  const stack: string[] = [startId];
  const parentMap: Record<string, string | null> = { [startId]: null };

  steps.push({ type: 'enqueue', nodeId: startId, visitedNodes: [], queueOrStack: [...stack], parentMap: { ...parentMap }, explanation: `Starting DFS from node ${startId}. Push to stack.` });

  while (stack.length > 0) {
    const current = stack.pop()!;
    if (visited.has(current)) continue;
    visited.add(current);
    steps.push({ type: 'visit', nodeId: current, visitedNodes: [...visited], queueOrStack: [...stack], parentMap: { ...parentMap }, explanation: `Pop node ${current} from stack. Mark as visited.` });

    const neighbors = graph.edges.filter(e => e.from === current || (!graph.directed && e.to === current));
    for (const edge of [...neighbors].reverse()) {
      const neighbor = edge.from === current ? edge.to : edge.from;
      steps.push({ type: 'explore_edge', nodeId: neighbor, edgeFrom: current, edgeTo: neighbor, visitedNodes: [...visited], queueOrStack: [...stack], parentMap: { ...parentMap }, explanation: `Exploring edge ${current} → ${neighbor}` });
      if (!visited.has(neighbor)) {
        stack.push(neighbor);
        if (!parentMap[neighbor]) parentMap[neighbor] = current;
        steps.push({ type: 'enqueue', nodeId: neighbor, visitedNodes: [...visited], queueOrStack: [...stack], parentMap: { ...parentMap }, explanation: `${neighbor} unvisited. Push to stack.` });
      }
    }
  }
  return steps;
}
