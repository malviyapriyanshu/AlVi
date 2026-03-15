import type { AnimationStep, AlgorithmInfo } from './types';

export const bubbleSort = (array: number[]): AnimationStep[] => {
  const animations: AnimationStep[] = [];
  const arr = [...array];
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      animations.push({ type: 'compare', indices: [j, j + 1] });

      if (arr[j] > arr[j + 1]) {
        animations.push({ type: 'swap', indices: [j, j + 1] });
        
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
      
      animations.push({ type: 'clear', indices: [j, j + 1] });
    }
  }
  
  return animations;
};

export const bubbleSortInfo: AlgorithmInfo = {
  name: "Bubble Sort",
  complexity: {
    time: {
      best: "O(N)",
      average: "O(N^2)",
      worst: "O(N^2)"
    },
    space: "O(1)"
  },
  description: "Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted.",
  pseudocode: `for i from 0 to N - 1
  for j from 0 to N - i - 1
    if a[j] > a[j+1]
      swap(a[j], a[j+1])`
};
