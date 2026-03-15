import type { AnimationStep, AlgorithmInfo } from '../../types';

export const quickSortInfo: AlgorithmInfo = {
  name: 'Quick Sort',
  category: 'sorting',
  description: 'A Divide and Conquer algorithm that picks a pivot element and partitions the array around it so smaller elements go left and larger elements go right.',
  complexity: {
    time: { best: 'Ω(N log N)', average: 'Θ(N log N)', worst: 'O(N²)' },
    space: 'O(log N)',
  },
  problemContext: {
    title: 'Kth Largest Element in an Array',
    link: 'https://leetcode.com/problems/kth-largest-element-in-an-array/',
    difficulty: 'Medium',
  },
  intuition: 'Pick one person as a "pivot". Everyone shorter goes left, everyone taller goes right. The pivot is now in its final position. Repeat for the left and right groups.',
  analogy: 'Sorting a deck of cards by picking one card, putting all smaller cards left and all larger right.',
  stepByStep: [
    { title: 'Pick Pivot', description: 'Select an element (usually the last) as the pivot.' },
    { title: 'Partition', description: 'Move smaller elements left and larger elements right of the pivot.' },
    { title: 'Recursion', description: 'Apply the same logic to the left and right sub-arrays.' },
  ],
  whenToUse: 'The standard sorting algorithm in most languages due to great average-case performance and in-place sorting.',
  pseudocode: `quickSort(arr, low, high)
  if low < high
    pivotIdx = partition(arr, low, high)
    quickSort(arr, low, pivotIdx - 1)
    quickSort(arr, pivotIdx + 1, high)`,
};

export const quickSort = (array: number[]): AnimationStep[] => {
  const animations: AnimationStep[] = [];
  const arr = [...array];
  quickSortHelper(arr, 0, arr.length - 1, animations);
  return animations;
};

function quickSortHelper(arr: number[], low: number, high: number, animations: AnimationStep[]) {
  if (low < high) {
    const pivotIdx = partition(arr, low, high, animations);
    quickSortHelper(arr, low, pivotIdx - 1, animations);
    quickSortHelper(arr, pivotIdx + 1, high, animations);
  }
}

function partition(arr: number[], low: number, high: number, animations: AnimationStep[]): number {
  const pivot = arr[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    animations.push({ type: 'compare', indices: [j, high], explanation: `Comparing arr[${j}]=${arr[j]} with pivot=${pivot}` });
    if (arr[j] <= pivot) {
      i++;
      animations.push({ type: 'swap', indices: [i, j], explanation: `${arr[j]} ≤ pivot, swapping arr[${i}] and arr[${j}]` });
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    animations.push({ type: 'clear', indices: [j, high] });
  }
  animations.push({ type: 'swap', indices: [i + 1, high], explanation: `Placing pivot ${pivot} at its final position ${i + 1}` });
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}
