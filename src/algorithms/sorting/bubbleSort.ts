import { AnimationStep } from '../../types/animationTypes';
import { AlgorithmInfo } from '../../types/algorithmTypes';

export const bubbleSortInfo: AlgorithmInfo = {
  name: 'Bubble Sort',
  category: 'sorting',
  description: 'Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
  complexity: {
    time: { best: 'Ω(N)', average: 'Θ(N²)', worst: 'O(N²)' },
    space: 'O(1)',
  },
  intuition: 'The largest elements "bubble up" to their correct positions at the end of the list.',
  analogy: 'Like carbonated bubbles in a soda rising to the surface.',
  stepByStep: [
    { title: 'Compare', description: 'Look at two adjacent elements.' },
    { title: 'Swap', description: 'If the left element is greater than the right, swap them.' },
  ],
  whenToUse: 'Small datasets or educational purposes.',
  pseudocode: `for i from 0 to n-1\n  for j from 0 to n-i-2\n    if arr[j] > arr[j+1]\n      swap(arr[j], arr[j+1])`,
};

export const bubbleSort = (array: number[]): AnimationStep[] => {
  const steps: AnimationStep[] = [];
  const arr = [...array];
  const n = arr.length;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({ type: 'compare', indices: [j, j + 1], explanation: `Comparing ${arr[j]} and ${arr[j + 1]}` });
      if (arr[j] > arr[j + 1]) {
        steps.push({ type: 'swap', indices: [j, j + 1], explanation: `Swapping ${arr[j]} and ${arr[j + 1]}` });
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return steps;
};
