export type AnimationType = 
  | 'compare' 
  | 'swap' 
  | 'overwrite' 
  | 'clear' 
  | 'found'
  | 'set_pointers'
  | 'mark_discarded'
  | 'mark_found';

export interface Pointer {
  index: number;
  label: string;
}

export interface AnimationStep {
  type: AnimationType;
  indices: number[];
  value?: number;
  pointers?: Pointer[];
}

export interface AlgorithmComplexity {
  time: {
    best: string;
    average: string;
    worst: string;
  };
  space: string;
}

export interface Step {
  title: string;
  description: string;
}

export interface AlgorithmInfo {
  name: string;
  complexity: AlgorithmComplexity;
  description: string;
  pseudocode: string;
  problemContext: {
    title: string;
    link: string;
  };
  intuition: string;
  analogy: string;
  stepByStep: Step[];
  whenToUse: string;
}
