export interface LeetCodeProblem {
  algorithmId: string;
  title: string;
  link: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface SolutionStep {
  title: string;
  description: string;
}

export interface ProblemSolution {
  problemId: string;
  steps: SolutionStep[];
}
