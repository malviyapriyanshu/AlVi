export type StepType = 
  | 'compare' 
  | 'swap' 
  | 'overwrite' 
  | 'move_pointer' 
  | 'highlight_range' 
  | 'discard_range' 
  | 'found_result'
  | 'visit'
  | 'backtrack'
  | 'enqueue'
  | 'dequeue'
  | 'compute'
  | 'use'
  | 'base_case'
  | 'result'
  | 'table_init'
  | 'table_access'
  | 'table_update'
  | 'visit_node'
  | 'highlight_node'
  | 'clear';

export interface Pointer {
  index: number;
  label: string;
}

export interface AnimationStep {
  type: StepType;
  indices?: number[];
  value?: number;
  pointers?: Pointer[];
  explanation?: string;
  // For Graph/Tree
  nodeId?: string;
  edgeFrom?: string;
  edgeTo?: string;
  visitedNodes?: string[];
  queueOrStack?: string[];
  distances?: Record<string, number>;
  shortestPath?: string[];
  // For DP
  cells?: any[][];
  highlightCells?: { i: number; j: number }[];
}
