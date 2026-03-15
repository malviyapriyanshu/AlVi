import { AnimationStep } from '../../types/animationTypes';
import { AlgorithmInfo } from '../../types/algorithmTypes';

export const coinChangeInfo: AlgorithmInfo = {
  name: 'Coin Change',
  category: 'dp',
  description: 'Finds the minimum number of coins needed to make a certain amount.',
  complexity: { time: { best: 'O(N*M)', average: 'O(N*M)', worst: 'O(N*M)' }, space: 'O(N)' },
  intuition: 'For each amount, try every coin and pick the best result.',
  analogy: 'Finding the fewest number of bills to pay for an item.',
  stepByStep: [
    { title: 'Init', description: 'Set dp[0]=0, others to ∞.' },
    { title: 'Update', description: 'dp[i] = min(dp[i], dp[i-coin] + 1).' }
  ],
  whenToUse: 'Change-making problems or optimization problems.',
  pseudocode: `dp[0] = 0\nfor i from 1 to amt:\n  for c in coins:\n    if i >= c: dp[i] = min(dp[i], dp[i-c] + 1)`
};

export const coinChange = (coins: number[], amount: number): AnimationStep[] => {
  const steps: AnimationStep[] = [];
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  steps.push({ 
    type: 'table_init', 
    table: [...dp], 
    explanation: `Initialize dp table. dp[0]=0, others set to ∞`,
    line: 0 // dp[0] = 0
  });

  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (i >= coin) {
        steps.push({ 
            type: 'table_access', 
            indices: [i - coin, i], 
            table: [...dp],
            explanation: `Checking if using coin ${coin} improves current solution for amount ${i}`,
            line: 3 // if i >= c: dp[i] = min(dp[i], dp[i-c] + 1)
        });
        const res = dp[i - coin] + 1;
        if (res < dp[i]) {
          dp[i] = res;
          steps.push({ 
            type: 'table_update', 
            indices: [i], 
            table: [...dp],
            value: dp[i], 
            explanation: `Amount ${i}: Found better solution using coin ${coin}. New min coins: ${dp[i]}`,
            line: 3
          });
        }
      }
    }
  }
  return steps;
};
