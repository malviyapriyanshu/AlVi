import { AnimationStep } from '../../types/animationTypes';
import { AlgorithmInfo } from '../../types/algorithmTypes';

export const selectionSortInfo: AlgorithmInfo = {
  name: 'Selection Sort',
  category: 'sorting',
  description: 'DIVIDED into a sorted and an unsorted part. It repeatedly selects the smallest element from the unsorted part and moves it to the sorted part.',
  complexity: {
    time: { best: 'O(N²)', average: 'O(N²)', worst: 'O(N²)' },
    space: 'O(1)',
  },
  intuition: 'Always pick the smallest remaining item and put it in its place.',
  analogy: 'Like ordering cards in your hand by repeatedly picking the smallest card from the table.',
  stepByStep: [
    { title: 'Find Min', description: 'Find the minimum element in the unsorted part.' },
    { title: 'Swap', description: 'Swap it with the first element of the unsorted part.' },
  ],
  whenToUse: 'When memory is limited and simple implementation is preferred.',
  pseudocode: `for i from 0 to n-1\n  min_idx = i\n  for j from i+1 to n-1\n    if arr[j] < arr[min_idx]\n      min_idx = j\n  swap(arr[i], arr[min_idx])`,
};

export const selectionSort = (array: number[]): AnimationStep[] => {
  const steps: AnimationStep[] = [];
  const arr = [...array];
  const n = arr.length;

  for (let i = 0; i < n; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      steps.push({ type: 'compare', indices: [minIdx, j], explanation: `Checking if ${arr[j]} is smaller than current min ${arr[minIdx]}` });
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      steps.push({ type: 'swap', indices: [i, minIdx], explanation: `Swapping ${arr[i]} with new min ${arr[minIdx]}` });
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
  return steps;
};
