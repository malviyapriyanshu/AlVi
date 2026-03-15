export type AnimationType =
  | 'compare'
  | 'swap'
  | 'overwrite'
  | 'clear'
  | 'found'
  | 'set_pointers'
  | 'mark_discarded'
  | 'mark_found'
  | 'move_pointer'
  | 'highlight_range'
  | 'discard_range'
  | 'found_result';

export interface Pointer {
  index: number;
  label: string;
}

export interface AnimationStep {
  type: AnimationType;
  indices: number[];
  value?: number;
  pointers?: Pointer[];
  explanation?: string;
}

export interface AlgorithmComplexity {
  time: {
    best: string;
    average: string;
    worst: string;
  };
  space: string;
}

export interface LogicStep {
  title: string;
  description: string;
}

export interface AlgorithmInfo {
  name: string;
  category: 'sorting' | 'searching' | 'technique';
  complexity: AlgorithmComplexity;
  description: string;
  pseudocode: string;
  problemContext: {
    title: string;
    link: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
  };
  intuition: string;
  analogy: string;
  stepByStep: LogicStep[];
  whenToUse: string;
}

export type BarState =
  | 'default'
  | 'comparing'
  | 'swapping'
  | 'sorted'
  | 'found'
  | 'left_boundary'
  | 'right_boundary'
  | 'mid_element'
  | 'discarded'
  | 'highlighted';

export interface ArrayElement {
  value: number;
  state: BarState;
  pointers: string[];
}

export interface AlgorithmEntry {
  id: string;
  info: AlgorithmInfo;
  run: (array: number[], target?: number) => AnimationStep[];
  needsSorted?: boolean;
  needsTarget?: boolean;
}

export interface LeetCodeProblem {
  title: string;
  link: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  solutionSteps: string[];
  algorithmId: string;
}
