import { AnimationStep } from '../../types/animationTypes';
import { AlgorithmInfo } from '../../types/algorithmTypes';

export const insertionSortInfo: AlgorithmInfo = {
  name: 'Insertion Sort',
  category: 'sorting',
  description: 'Builds the final sorted array one item at a time, by repeatedly taking the next item and inserting it into its correct position among the already-sorted items.',
  complexity: {
    time: { best: 'O(N)', average: 'O(N²)', worst: 'O(N²)' },
    space: 'O(1)',
  },
  intuition: 'Take one card from the deck and insert it into the correct position in your sorted hand.',
  analogy: 'Sorting a hand of playing cards.',
  stepByStep: [
    { title: 'Pick', description: 'Pick the next element from the unsorted part.' },
    { title: 'Insert', description: 'Shift elements to the right until the correct position is found.' },
  ],
  whenToUse: 'Small datasets or nearly sorted arrays.',
  pseudocode: `for i from 1 to n-1\n  key = arr[i]\n  j = i - 1\n  while j >= 0 and arr[j] > key\n    arr[j+1] = arr[j]\n    j--\n  arr[j+1] = key`,
};

export const insertionSort = (array: number[]): AnimationStep[] => {
  const steps: AnimationStep[] = [];
  const arr = [...array];
  const n = arr.length;

  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;
    steps.push({ type: 'compare', indices: [i, j], explanation: `Inserting ${key} into sorted portion` });
    
    while (j >= 0 && arr[j] > key) {
      steps.push({ type: 'overwrite', indices: [j + 1], value: arr[j], explanation: `Shifting ${arr[j]} right` });
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
    steps.push({ type: 'overwrite', indices: [j + 1], value: key, explanation: `Placed ${key} in correct position` });
  }
  return steps;
};
