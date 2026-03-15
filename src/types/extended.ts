// Graph types
export interface GraphNode {
  id: string;
  label: string;
  x: number;
  y: number;
}

export interface GraphEdge {
  from: string;
  to: string;
  weight?: number;
}

export interface Graph {
  nodes: GraphNode[];
  edges: GraphEdge[];
  directed?: boolean;
}

export type GraphStepType = 'visit' | 'enqueue' | 'dequeue' | 'explore_edge' | 'found' | 'backtrack' | 'shortest_path' | 'update_distance';

export interface GraphAnimationStep {
  type: GraphStepType;
  nodeId?: string;
  edgeFrom?: string;
  edgeTo?: string;
  visitedNodes: string[];
  queueOrStack: string[];
  distances?: Record<string, number>;
  parentMap?: Record<string, string | null>;
  shortestPath?: string[];
  explanation: string;
}

// Tree types
export interface TreeNode {
  val: number;
  left?: TreeNode | null;
  right?: TreeNode | null;
  id: string;
  x?: number;
  y?: number;
  depth?: number;
}

export type TreeStepType = 'visit' | 'go_left' | 'go_right' | 'backtrack' | 'enqueue' | 'dequeue' | 'compare';

export interface TreeAnimationStep {
  type: TreeStepType;
  nodeId: string;
  visitedNodes: string[];
  currentPath: string[];
  levelOrder?: string[];
  explanation: string;
}

// DP types
export interface DPCell {
  i: number;
  j: number;
  value: number;
  isComputing?: boolean;
  isUsed?: boolean;
}

export type DPStepType = 'compute' | 'use' | 'base_case' | 'result';

export interface DPAnimationStep {
  type: DPStepType;
  cells: DPCell[][];
  highlightCells: { i: number; j: number }[];
  explanation: string;
}

// Quiz types
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  algorithmId?: string;
}

// Learning path types
export interface LearningStep {
  algorithmId: string;
  name: string;
  description: string;
}

export interface LearningPath {
  id: string;
  title: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  steps: LearningStep[];
  color: string;
}

// Progress types
export interface UserProgress {
  viewedAlgorithms: string[];
  solvedProblems: string[];
  quizScores: Record<string, number>;
  completedPaths: string[];
  totalTimeSpent: number;
  lastVisited?: string;
}

// Metrics types  
export interface AlgorithmRunMetrics {
  algorithmId: string;
  comparisons: number;
  swaps: number;
  overwrites: number;
  timeMs: number;
  arraySize: number;
}
