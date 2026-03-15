import type { AnimationStep } from './types';

export const binarySearchInfo = {
  name: 'Binary Search',
  complexity: {
    time: {
      best: 'Ω(1)',
      average: 'Θ(log N)',
      worst: 'O(log N)',
    },
    space: 'O(1)',
  },
  description: 'Binary Search is a fast search algorithm with run-time complexity of Ο(log n). This search algorithm works on the principle of divide and conquer. For this algorithm to work properly, the data collection should be in a sorted form.',
  pseudocode: `function binarySearch(arr, target)
  left = 0, right = n - 1
  while left <= right
    mid = floor((left + right) / 2)
    if arr[mid] == target
      return mid
    else if arr[mid] < target
      left = mid + 1
    else
      right = mid - 1
  return -1`,
};

export const binarySearch = (array: number[], target: number): AnimationStep[] => {
  const animations: AnimationStep[] = [];
  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    // Set pointers for current state
    animations.push({ 
      type: 'set_pointers', 
      indices: [],
      pointers: [
        { index: left, label: 'L' },
        { index: mid, label: 'M' },
        { index: right, label: 'R' }
      ]
    });

    // Briefly highlight the mid comparison
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
      // Discard left half
      const discardedIndices = [];
      for (let i = left; i <= mid; i++) discardedIndices.push(i);
      animations.push({ type: 'mark_discarded', indices: discardedIndices });
      
      left = mid + 1;
    } else {
      // Discard right half
      const discardedIndices = [];
      for (let i = mid; i <= right; i++) discardedIndices.push(i);
      animations.push({ type: 'mark_discarded', indices: discardedIndices });
      
      right = mid - 1;
    }
  }

  // Not found
  animations.push({ type: 'set_pointers', indices: [], pointers: [] });
  return animations;
};
