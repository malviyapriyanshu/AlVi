import type { AnimationStep, AlgorithmInfo } from '../../types';

export const slidingWindowInfo: AlgorithmInfo = {
  name: 'Sliding Window',
  category: 'technique',
  description: 'Maintains a "window" of elements that slides across the array to efficiently solve problems involving contiguous subarrays or substrings.',
  complexity: {
    time: { best: 'Ω(N)', average: 'Θ(N)', worst: 'O(N)' },
    space: 'O(1)',
  },
  problemContext: {
    title: 'Longest Substring Without Repeating Characters',
    link: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
    difficulty: 'Medium',
  },
  intuition: 'Imagine looking through a window that slides along a wall of paintings. You can only see k paintings at a time. As the window moves, one painting leaves and a new one enters.',
  analogy: 'A magnifying glass sliding over a line of text, examining a fixed-length portion at a time to find the best passage.',
  stepByStep: [
    { title: 'Initialize Window', description: 'Start with a window covering the first k elements.' },
    { title: 'Slide', description: 'Move the window one step right: remove the leftmost, add the next rightmost.' },
    { title: 'Track Best', description: 'Keep track of the maximum/minimum sum seen so far.' },
  ],
  whenToUse: 'Ideal for problems asking about contiguous subarrays of fixed or variable length (max sum, longest substring, etc.).',
  pseudocode: `windowSum = sum(arr[0..k-1])
maxSum = windowSum
for i from k to n-1
  windowSum += arr[i] - arr[i-k]
  maxSum = max(maxSum, windowSum)
return maxSum`,
};

export const slidingWindow = (array: number[], windowSize: number = 3): AnimationStep[] => {
  const animations: AnimationStep[] = [];
  const k = Math.min(windowSize, array.length);
  let windowSum = 0;
  let maxSum = -Infinity;
  let maxStart = 0;

  for (let i = 0; i < k; i++) {
    windowSum += array[i];
    const hlIndices = []; for (let j = 0; j <= i; j++) hlIndices.push(j);
    animations.push({ type: 'highlight_range', indices: hlIndices, explanation: `Building initial window: adding arr[${i}]=${array[i]}, window sum = ${windowSum}` });
  }
  maxSum = windowSum;

  animations.push({
    type: 'set_pointers', indices: [],
    pointers: [{ index: 0, label: 'L' }, { index: k - 1, label: 'R' }],
    explanation: `Initial window [0..${k - 1}], sum = ${windowSum}`,
  });

  for (let i = k; i < array.length; i++) {
    animations.push({ type: 'compare', indices: [i - k], explanation: `Removing arr[${i - k}]=${array[i - k]} from window` });
    animations.push({ type: 'mark_discarded', indices: [i - k] });

    windowSum = windowSum - array[i - k] + array[i];

    const hlIndices = []; for (let j = i - k + 1; j <= i; j++) hlIndices.push(j);
    animations.push({
      type: 'set_pointers', indices: [],
      pointers: [{ index: i - k + 1, label: 'L' }, { index: i, label: 'R' }],
      explanation: `Window [${i - k + 1}..${i}], sum = ${windowSum}`,
    });
    animations.push({ type: 'highlight_range', indices: hlIndices, explanation: `Adding arr[${i}]=${array[i]}, new window sum = ${windowSum}` });

    if (windowSum > maxSum) {
      maxSum = windowSum;
      maxStart = i - k + 1;
    }
  }

  const foundIndices = []; for (let j = maxStart; j < maxStart + k; j++) foundIndices.push(j);
  animations.push({ type: 'set_pointers', indices: [], pointers: [] });
  for (let idx = 0; idx < array.length; idx++) {
    if (!foundIndices.includes(idx)) {
      animations.push({ type: 'clear', indices: [idx] });
    }
  }
  animations.push({ type: 'mark_found', indices: foundIndices, explanation: `Maximum sum window [${maxStart}..${maxStart + k - 1}] with sum = ${maxSum}` });

  return animations;
};
