import type { AnimationStep, AlgorithmInfo } from './types';

export const mergeSort = (array: number[]): AnimationStep[] => {
  const animations: AnimationStep[] = [];
  if (array.length <= 1) return animations;
  
  const auxiliaryArray = [...array];
  const originalArray = [...array];
  
  mergeSortHelper(originalArray, 0, originalArray.length - 1, auxiliaryArray, animations);
  
  return animations;
};

const mergeSortHelper = (
  mainArray: number[],
  startIdx: number,
  endIdx: number,
  auxiliaryArray: number[],
  animations: AnimationStep[]
) => {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  
  merge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
};

const merge = (
  mainArray: number[],
  startIdx: number,
  middleIdx: number,
  endIdx: number,
  auxiliaryArray: number[],
  animations: AnimationStep[]
) => {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  
  while (i <= middleIdx && j <= endIdx) {
    animations.push({ type: 'compare', indices: [i, j] });
    animations.push({ type: 'clear', indices: [i, j] });
    
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      animations.push({ type: 'overwrite', indices: [k], value: auxiliaryArray[i] });
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      animations.push({ type: 'overwrite', indices: [k], value: auxiliaryArray[j] });
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  
  while (i <= middleIdx) {
    animations.push({ type: 'compare', indices: [i, i] });
    animations.push({ type: 'clear', indices: [i, i] });
    animations.push({ type: 'overwrite', indices: [k], value: auxiliaryArray[i] });
    mainArray[k++] = auxiliaryArray[i++];
  }
  
  while (j <= endIdx) {
    animations.push({ type: 'compare', indices: [j, j] });
    animations.push({ type: 'clear', indices: [j, j] });
    animations.push({ type: 'overwrite', indices: [k], value: auxiliaryArray[j] });
    mainArray[k++] = auxiliaryArray[j++];
  }
};

export const mergeSortInfo: AlgorithmInfo = {
  name: "Merge Sort",
  complexity: {
    time: {
      best: "O(N log N)",
      average: "O(N log N)",
      worst: "O(N log N)"
    },
    space: "O(N)"
  },
  description: "Merge Sort is a divide-and-conquer algorithm that divides the input array into two halves, calls itself for the two halves, and then merges the two sorted halves. A separate merge() function is used for merging two halves.",
  pseudocode: `MergeSort(arr, l, r)
  if l < r
    m = l + (r - l) / 2
    MergeSort(arr, l, m)
    MergeSort(arr, m + 1, r)
    Merge(arr, l, m, r)`
};
