import type { AnimationStep, AlgorithmInfo } from './types';

export const quickSortInfo: AlgorithmInfo = {
  name: 'Quick Sort',
  description: 'QuickSort is a Divide and Conquer algorithm. It picks an element as pivot and partitions the given array around the picked pivot.',
  complexity: {
    time: { best: 'Ω(N log N)', average: 'Θ(N log N)', worst: 'O(N²)' },
    space: 'O(log N)',
  },
  problemContext: {
    title: 'Kth Largest Element (Partitioning)',
    link: 'https://leetcode.com/problems/kth-largest-element-in-an-array/',
  },
  intuition: 'Think of "sorting by rank". You pick one person as a "pivot". Everyone shorter than the pivot goes to the left, and everyone taller goes to the right. Now the pivot is in its absolute final sorted position, and you just repeat for the left and right groups.',
  analogy: 'Sorting a deck of cards by picking one card and putting all smaller cards on its left and all larger on its right.',
  stepByStep: [
    { title: 'Pick Pivot', description: 'Select an element to be the "middle-man".' },
    { title: 'Partition', description: 'Move smaller elements left and larger elements right.' },
    { title: 'Recursion', description: 'Apply the same logic to the left and right sides.' }
  ],
  whenToUse: 'The standard sorting algorithm in most programming languages due to its great average-case performance and in-place sorting.',
  pseudocode: `quickSort(arr, low, high)
  if low < high
    pivotIndex = partition(arr, low, high)
    quickSort(arr, low, pivotIndex - 1)
    quickSort(arr, pivotIndex + 1, high)`,
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
    animations.push({ type: 'compare', indices: [j, high] });
    if (arr[j] <= pivot) {
      i++;
      animations.push({ type: 'swap', indices: [i, j] });
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    animations.push({ type: 'clear', indices: [j, high] });
  }

  animations.push({ type: 'swap', indices: [i + 1, high] });
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}
