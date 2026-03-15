import { AnimationStep } from '../../types/animationTypes';

export const longestIncreasingSubsequence = (nums: number[]): AnimationStep[] => {
  const steps: AnimationStep[] = [];
  const n = nums.length;
  if (n === 0) return steps;

  const dp = new Array(n).fill(1);
  
  const makeCells = () => [[...dp.map((v, i) => ({ i: 0, j: i, value: v }))]];

  steps.push({
    type: 'base_case',
    cells: makeCells(),
    explanation: 'Initialize DP array with 1 (each element is an increasing subsequence of length 1).'
  });

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      steps.push({
        type: 'compare',
        indices: [i, j],
        explanation: `Comparing nums[${i}]=${nums[i]} and nums[${j}]=${nums[j]}`
      });

      if (nums[i] > nums[j]) {
        if (dp[j] + 1 > dp[i]) {
          dp[i] = dp[j] + 1;
          steps.push({
            type: 'compute',
            cells: makeCells(),
            highlightCells: [{ i: 0, j: i }, { i: 0, j: j }],
            explanation: `nums[${i}] > nums[${j}], updating dp[${i}] to ${dp[i]}`
          });
        }
      }
    }
  }

  const result = Math.max(...dp);
  steps.push({
    type: 'result',
    cells: makeCells(),
    explanation: `The Longest Increasing Subsequence length is ${result}`
  });

  return steps;
};
