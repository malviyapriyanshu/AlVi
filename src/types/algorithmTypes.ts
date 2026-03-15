import { AnimationStep } from './animationTypes';

export type AlgorithmCategory = 'sorting' | 'searching' | 'techniques' | 'graph' | 'tree' | 'dp';

export interface Complexity {
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
  category: AlgorithmCategory;
  description: string;
  complexity: Complexity;
  intuition: string;
  analogy: string;
  stepByStep: LogicStep[];
  whenToUse: string;
  pseudocode: string;
}

export interface AlgorithmEntry {
  id: string;
  info: AlgorithmInfo;
  run: (data: any, target?: any) => AnimationStep[];
  needsSorted?: boolean;
  needsTarget?: boolean;
}
