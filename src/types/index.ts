export * from './animationTypes';
export * from './algorithmTypes';

export interface LeetCodeProblem {
  title: string;
  link: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  solutionSteps: string[];
  algorithmId: string;
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
