import type { AnimationStep, AlgorithmInfo } from '../../types';

export const heapSortInfo: AlgorithmInfo = {
  name: 'Heap Sort',
  category: 'sorting',
  description: 'Uses a binary heap data structure to sort elements. It first builds a max-heap, then repeatedly extracts the maximum element and places it at the end.',
  complexity: {
    time: { best: 'Ω(N log N)', average: 'Θ(N log N)', worst: 'O(N log N)' },
    space: 'O(1)',
  },
  intuition: 'Imagine a tournament bracket. The winner of each match moves up. The overall champion (max element) is at the top. We remove the champion, reorganize the tournament, and find the next champion.',
  analogy: 'A sports tournament where the strongest player always rises to the top. Once crowned, they step aside, and the remaining players compete again.',
  stepByStep: [
    { title: 'Build Heap', description: 'Arrange the array into a max-heap structure.' },
    { title: 'Extract Max', description: 'Swap the root (max) with the last unsorted element.' },
    { title: 'Heapify', description: 'Restore the heap property for the remaining elements.' },
  ],
  whenToUse: 'Guaranteed O(N log N) performance with O(1) extra space. Great when worst-case performance matters.',
  pseudocode: `buildMaxHeap(arr)
for i from n-1 down to 1
  swap(arr[0], arr[i])
  heapify(arr, 0, i)`,
};

function heapify(arr: number[], n: number, i: number, animations: AnimationStep[]) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < n) {
    animations.push({ type: 'compare', indices: [left, largest], explanation: `Comparing left child arr[${left}]=${arr[left]} with parent arr[${largest}]=${arr[largest]}` });
    if (arr[left] > arr[largest]) largest = left;
    animations.push({ type: 'clear', indices: [left, i] });
  }
  if (right < n) {
    animations.push({ type: 'compare', indices: [right, largest], explanation: `Comparing right child arr[${right}]=${arr[right]} with current largest arr[${largest}]=${arr[largest]}` });
    if (arr[right] > arr[largest]) largest = right;
    animations.push({ type: 'clear', indices: [right, i] });
  }

  if (largest !== i) {
    animations.push({ type: 'swap', indices: [i, largest], explanation: `Swapping arr[${i}]=${arr[i]} with arr[${largest}]=${arr[largest]}` });
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest, animations);
  }
}

export const heapSort = (array: number[]): AnimationStep[] => {
  const animations: AnimationStep[] = [];
  const arr = [...array];
  const n = arr.length;

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i, animations);
  }

  for (let i = n - 1; i > 0; i--) {
    animations.push({ type: 'swap', indices: [0, i], explanation: `Moving max element ${arr[0]} to its final position at index ${i}` });
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0, animations);
  }

  return animations;
};
