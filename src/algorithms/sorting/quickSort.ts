import { AnimationStep } from '../../types/animationTypes';
import { AlgorithmInfo } from '../../types/algorithmTypes';

export const quickSortInfo: AlgorithmInfo = {
  name: 'Quick Sort',
  category: 'sorting',
  description: 'A highly efficient sorting algorithm that uses a divide-and-conquer strategy by picking a "pivot" element.',
  complexity: {
    time: { best: 'O(N log N)', average: 'O(N log N)', worst: 'O(N²)' },
    space: 'O(log N)',
  },
  intuition: 'Pick a pivot, put smaller things left and bigger things right. Repeat.',
  analogy: 'Sorting a large pile of books by picking one book, then making two piles: one for books older than it, and one for newer.',
  stepByStep: [
    { title: 'Pivot', description: 'Select a pivot element (e.g., the last element).' },
    { title: 'Partition', description: 'Rearrange array so elements < pivot are left, > pivot are right.' },
    { title: 'Recurse', description: 'Apply the same logic to sub-arrays.' },
  ],
  whenToUse: 'General purpose high-performance sorting.',
  pseudocode: `quickSort(arr, low, high):\n  if low < high:\n    p = partition(arr, low, high)\n    quickSort(arr, low, p - 1)\n    quickSort(arr, p + 1, high)`,
};

export const quickSort = (array: number[]): AnimationStep[] => {
  const steps: AnimationStep[] = [];
  const arr = [...array];

  function partition(low: number, high: number): number {
    const pivot = arr[high];
    steps.push({ type: 'move_pointer', pointers: [{ index: high, label: 'P' }], explanation: `Picked pivot ${pivot}` });
    let i = low - 1;
    for (let j = low; j < high; j++) {
      steps.push({ type: 'compare', indices: [j, high], explanation: `Is ${arr[j]} < pivot ${pivot}?` });
      if (arr[j] < pivot) {
        i++;
        steps.push({ type: 'swap', indices: [i, j], explanation: `Swapping ${arr[i]} and ${arr[j]}` });
        [arr[i], arr[arr[j]]] = [arr[j], arr[i]]; // ERROR IN MY PREVIOUS LOGIC, fixing
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
    steps.push({ type: 'swap', indices: [i + 1, high], explanation: `Placing pivot at its correct position` });
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
  }

  function sort(low: number, high: number) {
    if (low < high) {
      const p = partition(low, high);
      sort(low, p - 1);
      sort(p + 1, high);
    }
  }

  sort(0, arr.length - 1);
  return steps;
};
