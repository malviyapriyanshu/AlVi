import { AnimationStep } from '../../types/animationTypes';

export const knapsack = (weights: number[], values: number[], capacity: number): AnimationStep[] => {
  const steps: AnimationStep[] = [];
  const n = weights.length;
  const dp: number[][] = Array.from({ length: n + 1 }, () => new Array(capacity + 1).fill(0));

  const makeCells = () => dp.map((row, i) => row.map((v, j) => ({ i, j, value: v })));

  steps.push({
    type: 'base_case',
    cells: makeCells(),
    explanation: 'Initialize DP table with 0s.'
  });

  for (let i = 1; i <= n; i++) {
    for (let w = 1; w <= capacity; w++) {
      steps.push({
        type: 'compute',
        highlightCells: [{ i, j: w }],
        explanation: `Considering item ${i} (weight: ${weights[i-1]}, value: ${values[i-1]}) for capacity ${w}`
      });

      if (weights[i-1] <= w) {
        const withItem = values[i-1] + dp[i-1][w - weights[i-1]];
        const withoutItem = dp[i-1][w];
        dp[i][w] = Math.max(withItem, withoutItem);
        
        steps.push({
          type: 'use',
          cells: makeCells(),
          highlightCells: [{ i: i-1, j: w - weights[i-1] }, { i: i-1, j: w }, { i, j: w }],
          explanation: `Max value is max(withoutItem: ${withoutItem}, withItem: ${values[i-1]} + ${dp[i-1][w-weights[i-1]]}) = ${dp[i][w]}`
        });
      } else {
        dp[i][w] = dp[i-1][w];
        steps.push({
          type: 'use',
          cells: makeCells(),
          highlightCells: [{ i: i-1, j: w }, { i, j: w }],
          explanation: `Item too heavy, taking value from previous row: ${dp[i][w]}`
        });
      }
    }
  }

  steps.push({
    type: 'result',
    cells: makeCells(),
    highlightCells: [{ i: n, j: capacity }],
    explanation: `Max value that can be put in knapsack is ${dp[n][capacity]}`
  });

  return steps;
};
