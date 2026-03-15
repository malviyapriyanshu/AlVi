import { AnimationStep } from '../../types/animationTypes';
import { Graph } from '../../types/extended';
import { AlgorithmInfo } from '../../types/algorithmTypes';

export const bfsInfo: AlgorithmInfo = {
  name: 'Breadth-First Search',
  category: 'graph',
  description: 'Explores neighbors at the current depth before moving to the next level.',
  complexity: { time: { best: 'O(V+E)', average: 'O(V+E)', worst: 'O(V+E)' }, space: 'O(V)' },
  intuition: 'Exploring layer by layer, like ripples in a pond.',
  analogy: 'Spreading news through a neighborhood.',
  stepByStep: [
    { title: 'Queue', description: 'Add start node to a queue.' },
    { title: 'Explore', description: 'Take a node, visit neighbors, add them to queue.' }
  ],
  whenToUse: 'Finding shortest path in unweighted graphs.',
  pseudocode: `queue = [start]\nvisited = {start}\nwhile queue:\n  u = queue.pop(0)\n  for v in neighbors(u):\n    if v not in visited:\n      visited.add(v)\n      queue.append(v)`
};

export const bfs = (graph: Graph, startId: string): AnimationStep[] => {
  const steps: AnimationStep[] = [];
  const visited = new Set<string>();
  const queue: string[] = [startId];
  visited.add(startId);

  steps.push({ 
    type: 'enqueue', 
    nodeId: startId, 
    explanation: `Start BFS from node ${startId}`,
    line: 0 // Corresponds to pseudocode line 0: queue = [start] and line 1: visited = {start}
  });

  while (queue.length > 0) { // Corresponds to pseudocode line 2: while queue:
    const current = queue.shift()!;
    steps.push({ 
      type: 'dequeue', 
      nodeId: current, 
      visitedNodes: [...visited], 
      queueOrStack: [...queue], 
      explanation: `Processing node ${current}`,
      line: 3 // Corresponds to pseudocode line 3: u = queue.pop(0)
    });

    const neighbors = graph.edges
      .filter(e => e.from === current || (!graph.directed && e.to === current))
      .map(e => e.from === current ? e.to : e.from);

    for (const neighbor of neighbors) { // Corresponds to pseudocode line 4: for v in neighbors(u):
      if (!visited.has(neighbor)) { // Corresponds to pseudocode line 5: if v not in visited:
        visited.add(neighbor); // Corresponds to pseudocode line 6: visited.add(v)
        queue.push(neighbor); // Corresponds to pseudocode line 7: queue.append(v)
        steps.push({ 
          type: 'enqueue', 
          nodeId: neighbor, 
          edgeFrom: current, 
          edgeTo: neighbor, 
          visitedNodes: [...visited], 
          queueOrStack: [...queue], 
          explanation: `Found new neighbor ${neighbor}`,
          line: 7 // Corresponds to pseudocode line 7: queue.append(v)
        });
      }
    }
  }
  return steps;
};
