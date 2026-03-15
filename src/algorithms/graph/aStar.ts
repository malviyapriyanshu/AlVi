import { AnimationStep } from '../../types/animationTypes';
import { Graph } from '../../types/extended';

export const aStar = (graph: Graph, startId: string, targetId: string, heuristic: (nodeId: string) => number): AnimationStep[] => {
  const steps: AnimationStep[] = [];
  const openSet = new Set<string>([startId]);
  const gScore: Record<string, number> = {};
  const fScore: Record<string, number> = {};
  const parentMap: Record<string, string | null> = {};

  graph.nodes.forEach(n => {
    gScore[n.id] = Infinity;
    fScore[n.id] = Infinity;
  });

  gScore[startId] = 0;
  fScore[startId] = heuristic(startId);

  steps.push({
    type: 'visit',
    nodeId: startId,
    explanation: `Starting A* Search from ${startId}. Initializing scores.`,
    distances: { ...fScore }
  });

  while (openSet.size > 0) {
    const current = [...openSet].reduce((a, b) => fScore[a] < fScore[b] ? a : b);
    
    if (current === targetId) {
      const path: string[] = [];
      let temp: string | null = current;
      while (temp) {
        path.unshift(temp);
        temp = parentMap[temp] || null;
      }
      steps.push({
        type: 'found_result',
        nodeId: current,
        shortestPath: path,
        explanation: 'Target found! Reconstructing path.'
      });
      return steps;
    }

    openSet.delete(current);
    
    steps.push({
      type: 'dequeue',
      nodeId: current,
      explanation: `Exploring node ${current} with fScore ${fScore[current]}`
    });

    const neighbors = graph.edges.filter(e => e.from === current || (!graph.directed && e.to === current));
    
    for (const edge of neighbors) {
      const neighbor = edge.from === current ? edge.to : edge.from;
      const weight = edge.weight ?? 1;
      const tentativeGScore = gScore[current] + weight;

      if (tentativeGScore < gScore[neighbor]) {
        parentMap[neighbor] = current;
        gScore[neighbor] = tentativeGScore;
        fScore[neighbor] = gScore[neighbor] + heuristic(neighbor);
        
        if (!openSet.has(neighbor)) {
          openSet.add(neighbor);
          steps.push({
            type: 'enqueue',
            nodeId: neighbor,
            explanation: `Updating neighbor ${neighbor}. gScore: ${gScore[neighbor]}, fScore: ${fScore[neighbor]}`
          });
        }
      }
    }
  }

  return steps;
};
