import type { AnimationStep, AlgorithmInfo } from './types';

export const binarySearchInfo: AlgorithmInfo = {
  name: 'Binary Search',
  description: 'Binary Search is a fast search algorithm with Ο(log n) run-time complexity. It uses "Divide and Conquer" to narrow down the search space by half each iteration.',
  complexity: {
    time: { best: 'Ω(1)', average: 'Θ(log N)', worst: 'O(log N)' },
    space: 'O(1)',
  },
  problemContext: {
    title: 'Search in Rotated Sorted Array',
    link: 'https://leetcode.com/problems/search-in-rotated-sorted-array/',
  },
  intuition: 'Think of finding a name in a physical phonebook. You open the book exactly in the middle. If the name is alphabetically smaller, you ignore the entire right half of the book and repeat the process for the left half.',
  analogy: 'The "Higher or Lower" game. If I think of a number between 1-100 and you guess 50, and I say "Higher", you immediately throw away numbers 1-50.',
  stepByStep: [
    { title: 'Sorted Array', description: 'Requires the list to be sorted first.' },
    { title: 'Check Middle', description: 'Compare our target to the element at the center.' },
    { title: 'Discard Half', description: 'Move the Left or Right boundary to eliminate the incorrect half.' }
  ],
  whenToUse: 'Essential for high-performance searching on large, sorted datasets.',
  pseudocode: `while left <= right
  mid = (left + right) / 2
  if arr[mid] == target: return mid
  if arr[mid] < target: left = mid + 1
  else: right = mid - 1`,
};

export const binarySearch = (array: number[], target: number): AnimationStep[] => {
  const animations: AnimationStep[] = [];
  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    animations.push({ 
      type: 'set_pointers', 
      indices: [],
      pointers: [
        { index: left, label: 'L' },
        { index: mid, label: 'M' },
        { index: right, label: 'R' }
      ]
    });

    animations.push({ type: 'compare', indices: [mid] });
    animations.push({ type: 'clear', indices: [mid] });

    if (array[mid] === target) {
      animations.push({ 
        type: 'set_pointers', 
        indices: [],
        pointers: [{ index: mid, label: 'M' }]
      });
      animations.push({ type: 'mark_found', indices: [mid] });
      return animations;
    }

    if (array[mid] < target) {
      const discardedIndices = [];
      for (let i = left; i <= mid; i++) discardedIndices.push(i);
      animations.push({ type: 'mark_discarded', indices: discardedIndices });
      left = mid + 1;
    } else {
      const discardedIndices = [];
      for (let i = mid; i <= right; i++) discardedIndices.push(i);
      animations.push({ type: 'mark_discarded', indices: discardedIndices });
      right = mid - 1;
    }
  }

  animations.push({ type: 'set_pointers', indices: [], pointers: [] });
  return animations;
};
