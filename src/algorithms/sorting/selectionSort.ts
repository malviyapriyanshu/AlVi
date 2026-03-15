import type { AnimationStep, AlgorithmInfo } from '../../types';

export const selectionSortInfo: AlgorithmInfo = {
  name: 'Selection Sort',
  category: 'sorting',
  description: 'Divides the array into a sorted and unsorted region. It repeatedly selects the smallest element from the unsorted region and moves it to the end of the sorted region.',
  complexity: {
    time: { best: 'Ω(N²)', average: 'Θ(N²)', worst: 'O(N²)' },
    space: 'O(1)',
  },
  problemContext: {
    title: 'Sort Colors',
    link: 'https://leetcode.com/problems/sort-colors/',
    difficulty: 'Medium',
  },
  intuition: 'Imagine picking the shortest person from a crowd and placing them first, then picking the next shortest, and so on. You are "selecting" the minimum each time.',
  analogy: 'Like a teacher lining up students by height — scanning the whole line for the shortest student and placing them at the front, then repeating.',
  stepByStep: [
    { title: 'Scan', description: 'Find the minimum element in the unsorted portion.' },
    { title: 'Swap', description: 'Swap it with the first unsorted element.' },
    { title: 'Expand', description: 'The sorted boundary moves one step to the right.' },
  ],
  whenToUse: 'Useful when memory writes are expensive (it makes at most O(N) swaps), but generally outperformed by insertion sort.',
  pseudocode: `for i from 0 to n-1
  minIdx = i
  for j from i+1 to n-1
    if arr[j] < arr[minIdx]
      minIdx = j
  swap(arr[i], arr[minIdx])`,
};

export const selectionSort = (array: number[]): AnimationStep[] => {
  const animations: AnimationStep[] = [];
  const arr = [...array];

  for (let i = 0; i < arr.length - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < arr.length; j++) {
      animations.push({ type: 'compare', indices: [j, minIdx], explanation: `Comparing arr[${j}]=${arr[j]} with current min arr[${minIdx}]=${arr[minIdx]}` });
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
      animations.push({ type: 'clear', indices: [j, minIdx] });
    }
    if (minIdx !== i) {
      animations.push({ type: 'swap', indices: [i, minIdx], explanation: `Found minimum ${arr[minIdx]} at index ${minIdx}, swapping with index ${i}` });
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
  return animations;
};
