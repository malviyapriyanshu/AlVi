import { AnimationStep } from '../../types/animationTypes';
import { AlgorithmInfo } from '../../types/algorithmTypes';

export const fibonacciInfo: AlgorithmInfo = {
  name: 'Fibonacci (DP)',
  category: 'dp',
  description: 'Calculates the Nth Fibonacci number using dynamic programming (tabulation).',
  complexity: { time: { best: 'O(N)', average: 'O(N)', worst: 'O(N)' }, space: 'O(N)' },
  intuition: 'Building up the solution from smaller subproblems.',
  analogy: 'Building a staircase where each step rests on the two below it.',
  stepByStep: [
    { title: 'Base Cases', description: 'Fib(0)=0, Fib(1)=1.' },
    { title: 'Tabulate', description: 'Fib(i) = Fib(i-1) + Fib(i-2).' }
  ],
  whenToUse: 'When computing large Fibonacci numbers efficiently.',
  pseudocode: `memo = [0, 1]\nfor i from 2 to n:\n  memo[i] = memo[i-1] + memo[i-2]`
};

export const fibonacciDP = (n: number): AnimationStep[] => {
  const steps: AnimationStep[] = [];
  const dp = new Array(n + 1).fill(-1);
  dp[0] = 0;
  dp[1] = 1;

  steps.push({ 
    type: 'table_init', 
    table: [...dp], 
    explanation: `Start with base cases Fib(0)=0, Fib(1)=1` 
  });

  for (let i = 2; i <= n; i++) {
    steps.push({ 
      type: 'table_access', 
      indices: [i - 1, i - 2], 
      table: [...dp],
      explanation: `Calculating Fib(${i}) using Fib(${i - 1}) and Fib(${i - 2})` 
    });
    dp[i] = dp[i - 1] + dp[i - 2];
    steps.push({ 
      type: 'table_update', 
      indices: [i], 
      table: [...dp],
      value: dp[i], 
      explanation: `Fib(${i}) = ${dp[i]}` 
    });
  }
  return steps;
};
