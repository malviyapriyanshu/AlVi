import type { AnimationStep, AlgorithmInfo } from './types';

export const quickSort = (array: number[]): AnimationStep[] => {
  const animations: AnimationStep[] = [];
  const arr = [...array];
  
  quickSortHelper(arr, 0, arr.length - 1, animations);
  
  return animations;
};

const quickSortHelper = (
  arr: number[],
  startIdx: number,
  endIdx: number,
  animations: AnimationStep[]
) => {
  if (startIdx < endIdx) {
    const partitionIdx = partition(arr, startIdx, endIdx, animations);
    quickSortHelper(arr, startIdx, partitionIdx - 1, animations);
    quickSortHelper(arr, partitionIdx + 1, endIdx, animations);
  }
};

const partition = (
  arr: number[],
  startIdx: number,
  endIdx: number,
  animations: AnimationStep[]
): number => {
  const pivotValue = arr[endIdx];
  let pivotIdx = startIdx;
  
  for (let i = startIdx; i < endIdx; i++) {
    animations.push({ type: 'compare', indices: [i, endIdx] });
    animations.push({ type: 'clear', indices: [i, endIdx] });
    
    if (arr[i] < pivotValue) {
      if (i !== pivotIdx) {
        animations.push({ type: 'swap', indices: [i, pivotIdx] });
        animations.push({ type: 'clear', indices: [i, pivotIdx] });
        
        let temp = arr[i];
        arr[i] = arr[pivotIdx];
        arr[pivotIdx] = temp;
      }
      pivotIdx++;
    }
  }
  
  if (pivotIdx !== endIdx) {
    animations.push({ type: 'swap', indices: [pivotIdx, endIdx] });
    animations.push({ type: 'clear', indices: [pivotIdx, endIdx] });
    
    let temp = arr[pivotIdx];
    arr[pivotIdx] = arr[endIdx];
    arr[endIdx] = temp;
  }
  
  return pivotIdx;
};

export const quickSortInfo: AlgorithmInfo = {
  name: "Quick Sort",
  complexity: {
    time: {
      best: "O(N log N)",
      average: "O(N log N)",
      worst: "O(N^2)"
    },
    space: "O(log N)"
  },
  description: "Quick Sort is a divide-and-conquer algorithm. It picks an element as a pivot and partitions the given array around the picked pivot, placing it in its correct position in the sorted array.",
  pseudocode: `QuickSort(arr, low, high)
  if low < high
    pi = partition(arr, low, high)
    QuickSort(arr, low, pi - 1)
    QuickSort(arr, pi + 1, high)
    
partition(arr, low, high)
  pivot = arr[high]
  i = low - 1
  for j = low to high - 1
    if arr[j] < pivot
      i++
      swap arr[i] with arr[j]
  swap arr[i + 1] with arr[high]
  return i + 1`
};
