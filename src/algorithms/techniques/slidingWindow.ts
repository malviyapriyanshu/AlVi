import { AnimationStep } from '../../types/animationTypes';
import { AlgorithmInfo } from '../../types/algorithmTypes';

export const slidingWindowInfo: AlgorithmInfo = {
  name: 'Sliding Window',
  category: 'techniques',
  description: 'Maintains a "window" of elements that slides across the array to solve contiguous subarray problems.',
  complexity: {
    time: { best: 'Ω(N)', average: 'Θ(N)', worst: 'O(N)' },
    space: 'O(1)',
  },
  intuition: 'Looking through a moving window that only shows a few elements at a time.',
  analogy: 'A magnifying glass sliding over a line of text.',
  stepByStep: [
    { title: 'Init', description: 'Create initial window of size k.' },
    { title: 'Slide', description: 'Move window right: remove leftmost, add next rightmost.' },
  ],
  whenToUse: 'Contiguous subarray problems.',
  pseudocode: `for i from k to n-1:\n  sum += arr[i] - arr[i-k]\n  maxSum = max(maxSum, sum)`,
};

export const slidingWindow = (array: number[], windowSize: number = 3): AnimationStep[] => {
  const steps: AnimationStep[] = [];
  const k = Math.min(windowSize, array.length);
  let windowSum = 0;
  let maxSum = -Infinity;
  let maxStart = 0;

  for (let i = 0; i < k; i++) {
    windowSum += array[i];
    steps.push({ 
      type: 'highlight_range', 
      indices: Array.from({ length: i + 1 }, (_, j) => j),
      explanation: `Building initial window: added ${array[i]}, sum=${windowSum}` 
    });
  }
  maxSum = windowSum;

  for (let i = k; i < array.length; i++) {
    steps.push({ 
      type: 'discard_range', 
      indices: [i - k], 
      explanation: `Removing ${array[i - k]} from window` 
    });

    windowSum = windowSum - array[i - k] + array[i];
    
    steps.push({
      type: 'move_pointer',
      pointers: [{ index: i - k + 1, label: 'L' }, { index: i, label: 'R' }],
      explanation: `Window [${i - k + 1}..${i}], sum=${windowSum}`
    });

    if (windowSum > maxSum) {
      maxSum = windowSum;
      maxStart = i - k + 1;
    }
  }

  steps.push({ 
    type: 'found_result', 
    indices: Array.from({ length: k }, (_, j) => maxStart + j),
    explanation: `Max sum window found with sum ${maxSum}`
  });

  return steps;
};
