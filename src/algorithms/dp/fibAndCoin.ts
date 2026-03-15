import type { DPAnimationStep, DPCell } from '../../types/extended';

export const fibonacciInfo = {
  name: 'Fibonacci (DP)',
  category: 'dp' as const,
  description: 'Computes the Nth Fibonacci number using dynamic programming — storing previous results to avoid redundant computation.',
  complexity: { time: { best: 'O(N)', average: 'O(N)', worst: 'O(N)' }, space: 'O(N)' },
  problemContext: { title: 'Fibonacci Number', link: 'https://leetcode.com/problems/fibonacci-number/', difficulty: 'Easy' as const },
  intuition: 'Instead of computing F(n-1) and F(n-2) recursively (exponential time), store them in a table.',
  analogy: 'Like writing down the answer on a cheat sheet rather than solving the same math problem again and again.',
  stepByStep: [
    { title: 'Base Cases', description: 'dp[0] = 0, dp[1] = 1' },
    { title: 'Fill Table', description: 'dp[i] = dp[i-1] + dp[i-2] for i from 2 to N' },
    { title: 'Return', description: 'The answer is dp[N]' },
  ],
  whenToUse: 'Any problem with overlapping subproblems (Fibonacci, climbing stairs, coin change).',
  pseudocode: `dp[0] = 0, dp[1] = 1
for i from 2 to n:
  dp[i] = dp[i-1] + dp[i-2]
return dp[n]`,
};

export function fibonacciDP(n: number = 10): DPAnimationStep[] {
  const steps: DPAnimationStep[] = [];
  const dp: number[] = new Array(n + 1).fill(0);
  dp[0] = 0;
  if (n > 0) dp[1] = 1;

  const makeCells = (): DPCell[][] => [[...dp.map((v, i) => ({ i: 0, j: i, value: v }))]];

  steps.push({ type: 'base_case', cells: makeCells(), highlightCells: [{ i: 0, j: 0 }, { i: 0, j: 1 }], explanation: `Base cases: dp[0]=0, dp[1]=1` });

  for (let i = 2; i <= n; i++) {
    steps.push({ type: 'compute', cells: makeCells(), highlightCells: [{ i: 0, j: i - 1 }, { i: 0, j: i - 2 }], explanation: `Computing dp[${i}] = dp[${i - 1}] + dp[${i - 2}] = ${dp[i - 1]} + ${dp[i - 2]}` });
    dp[i] = dp[i - 1] + dp[i - 2];
    steps.push({ type: 'use', cells: makeCells(), highlightCells: [{ i: 0, j: i }], explanation: `dp[${i}] = ${dp[i]}` });
  }

  steps.push({ type: 'result', cells: makeCells(), highlightCells: [{ i: 0, j: n }], explanation: `Result: F(${n}) = ${dp[n]}` });
  return steps;
}

export const coinChangeInfo = {
  name: 'Coin Change (DP)',
  category: 'dp' as const,
  description: 'Find the minimum number of coins needed to make a target amount. Uses bottom-up DP by computing the answer for all smaller amounts first.',
  complexity: { time: { best: 'O(N×M)', average: 'O(N×M)', worst: 'O(N×M)' }, space: 'O(N)' },
  problemContext: { title: 'Coin Change', link: 'https://leetcode.com/problems/coin-change/', difficulty: 'Medium' as const },
  intuition: 'Build solutions for amounts 0 to target. For each amount, try every coin and take the best.',
  analogy: 'Like building a price list at a store, from 1 cent to the full amount.',
  stepByStep: [
    { title: 'Initialize', description: 'dp[0] = 0, dp[i] = ∞ for i > 0' },
    { title: 'Fill', description: 'For each amount, try each coin: dp[amount] = min(dp[amount], dp[amount-coin]+1)' },
    { title: 'Return', description: 'Answer is dp[target] (or -1 if unchanged)' },
  ],
  whenToUse: 'Minimum cost/count problems with choices that can be reused.',
  pseudocode: `dp = [∞] * (amount + 1), dp[0] = 0
for each amount from 1 to target:
  for each coin in coins:
    if coin <= amount:
      dp[amount] = min(dp[amount], dp[amount-coin]+1)`,
};

export function coinChangeDP(coins: number[] = [1, 3, 5], amount: number = 11): DPAnimationStep[] {
  const steps: DPAnimationStep[] = [];
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  const makeCells = (): DPCell[][] => [[...dp.map((v, i) => ({ i: 0, j: i, value: v === Infinity ? -1 : v }))]];

  steps.push({ type: 'base_case', cells: makeCells(), highlightCells: [{ i: 0, j: 0 }], explanation: `Initialize: dp[0]=0 (0 coins for amount 0), all others = ∞` });

  for (let amt = 1; amt <= amount; amt++) {
    for (const coin of coins) {
      if (coin <= amt) {
        steps.push({ type: 'compute', cells: makeCells(), highlightCells: [{ i: 0, j: amt - coin }, { i: 0, j: amt }], explanation: `Coin ${coin}: try dp[${amt}] = min(dp[${amt}], dp[${amt - coin}]+1)` });
        if (dp[amt - coin] + 1 < dp[amt]) {
          dp[amt] = dp[amt - coin] + 1;
          steps.push({ type: 'use', cells: makeCells(), highlightCells: [{ i: 0, j: amt }], explanation: `Updated dp[${amt}] = ${dp[amt]} (use coin ${coin})` });
        }
      }
    }
  }
  steps.push({ type: 'result', cells: makeCells(), highlightCells: [{ i: 0, j: amount }], explanation: `Min coins for ${amount} = ${dp[amount] === Infinity ? 'impossible (-1)' : dp[amount]}` });
  return steps;
}
