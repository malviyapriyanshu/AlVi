export type AnimationType = 'compare' | 'swap' | 'overwrite' | 'clear';

export interface AnimationStep {
  type: AnimationType;
  indices: number[];
  value?: number;
}

export interface AlgorithmComplexity {
  time: {
    best: string;
    average: string;
    worst: string;
  };
  space: string;
}

export interface AlgorithmInfo {
  name: string;
  complexity: AlgorithmComplexity;
  description: string;
  pseudocode: string;
}
