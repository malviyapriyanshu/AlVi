import { AnimationStep } from '../../types/animationTypes';
import { Graph } from '../../types/extended';
import { AlgorithmInfo } from '../../types/algorithmTypes';

export const dfsInfo: AlgorithmInfo = {
  name: 'Depth-First Search',
  category: 'graph',
  description: 'Explores as far as possible along each branch before backtracking.',
  complexity: { time: { best: 'O(V+E)', average: 'O(V+E)', worst: 'O(V+E)' }, space: 'O(V)' },
  intuition: 'Going deep into a path until reaching a dead end, then backtracking.',
  analogy: 'Exploring a maze by following one path until forced to turn back.',
  stepByStep: [
    { title: 'Stack', description: 'Use a stack or recursion to keep track of the path.' },
    { title: 'Visit', description: 'Visit node, then move to an unvisited neighbor.' }
  ],
  whenToUse: 'Detecting cycles, pathfinding, or topological sorting.',
  pseudocode: `dfs(u):\n  visited.add(u)\n  for v in neighbors(u):\n    if v not in visited: dfs(v)`
};

export const dfs = (graph: Graph, startId: string): AnimationStep[] => {
  const steps: AnimationStep[] = [];
  const visited = new Set<string>();

  function traverse(u: string, p?: string) {
    visited.add(u);
    steps.push({ type: 'visit', nodeId: u, edgeFrom: p, edgeTo: u, visitedNodes: [...visited], explanation: `Exploring node ${u}` });

    const neighbors = graph.edges
      .filter(e => e.from === u || (!graph.directed && e.to === u))
      .map(e => e.from === u ? e.to : e.from);

    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        traverse(neighbor, u);
        steps.push({ type: 'backtrack', nodeId: u, visitedNodes: [...visited], explanation: `Backtracked to ${u}` });
      }
    }
  }

  traverse(startId);
  return steps;
};
