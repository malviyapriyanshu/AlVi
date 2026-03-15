import { AnimationStep } from '../../types/animationTypes';
import { AlgorithmInfo } from '../../types/algorithmTypes';

export const mergeSortInfo: AlgorithmInfo = {
  name: 'Merge Sort',
  category: 'sorting',
  description: 'Divide-and-conquer algorithm that divides the input array into two halves, recursively calls itself for the two halves, and then merges the two sorted halves.',
  complexity: {
    time: { best: 'O(N log N)', average: 'O(N log N)', worst: 'O(N log N)' },
    space: 'O(N)',
  },
  intuition: 'Keep splitting until you reach single elements, then merge them back in sorted order.',
  analogy: 'Organizing a large document by splitting it among team members and then combining their sorted parts.',
  stepByStep: [
    { title: 'Divide', description: 'Split the array in the middle.' },
    { title: 'Conquer', description: 'Recursively sort the two halves.' },
    { title: 'Merge', description: 'Combine the sorted halves back together.' },
  ],
  whenToUse: 'Stable sort is needed, or for large datasets.',
  pseudocode: `mergeSort(arr):\n  if n <= 1 return\n  mid = n / 2\n  L = mergeSort(arr[0..mid])\n  R = mergeSort(arr[mid..n])\n  merge(L, R)`,
};

export const mergeSort = (array: number[]): AnimationStep[] => {
  const steps: AnimationStep[] = [];
  const arr = [...array];

  function merge(start: number, mid: number, end: number) {
    const leftArr = arr.slice(start, mid + 1);
    const rightArr = arr.slice(mid + 1, end + 1);
    let i = 0, j = 0, k = start;

    while (i < leftArr.length && j < rightArr.length) {
      steps.push({ 
        type: 'compare', 
        indices: [start + i, mid + 1 + j], 
        explanation: `Comparing sub-array elements`,
        line: 5 // merge(L, R) - active comparison
      });
      if (leftArr[i] <= rightArr[j]) {
        steps.push({ 
          type: 'overwrite', 
          indices: [k], 
          value: leftArr[i], 
          explanation: `Placing ${leftArr[i]} from left half`,
          line: 5
        });
        arr[k++] = leftArr[i++];
      } else {
        steps.push({ 
          type: 'overwrite', 
          indices: [k], 
          value: rightArr[j], 
          explanation: `Placing ${rightArr[j]} from right half`,
          line: 5
        });
        arr[k++] = rightArr[j++];
      }
    }
    while (i < leftArr.length) {
      steps.push({ type: 'overwrite', indices: [k], value: leftArr[i], explanation: `Placing remaining from left half` });
      arr[k++] = leftArr[i++];
    }
    while (j < rightArr.length) {
      steps.push({ type: 'overwrite', indices: [k], value: rightArr[j], explanation: `Placing remaining from right half` });
      arr[k++] = rightArr[j++];
    }
  }

  function sort(start: number, end: number) {
    if (start < end) {
      const mid = Math.floor((start + end) / 2);
      sort(start, mid);
      sort(mid + 1, end);
      merge(start, mid, end);
    }
  }

  sort(0, arr.length - 1);
  return steps;
};
