import type { AnimationStep, AlgorithmInfo } from '../../types';

export const mergeSortInfo: AlgorithmInfo = {
  name: 'Merge Sort',
  category: 'sorting',
  description: 'A Divide and Conquer algorithm that divides the input array into two halves, recursively sorts them, and then merges the two sorted halves.',
  complexity: {
    time: { best: 'Ω(N log N)', average: 'Θ(N log N)', worst: 'O(N log N)' },
    space: 'O(N)',
  },
  problemContext: {
    title: 'Sort List',
    link: 'https://leetcode.com/problems/sort-list/',
    difficulty: 'Medium',
  },
  intuition: 'Think of a large pile of unsorted papers. Split the pile into smaller groups until each has one paper. Then merge them back in order.',
  analogy: 'Two lines of students already sorted by height. To merge them, compare the front of each line and pick the shorter student.',
  stepByStep: [
    { title: 'Divide', description: 'Split the array into two halves recursively.' },
    { title: 'Conquer', description: 'Sort the sub-arrays (base case: single element).' },
    { title: 'Merge', description: 'Combine sorted sub-arrays back into one sorted array.' },
  ],
  whenToUse: 'Highly efficient for large datasets and linked lists where stable sorting is required.',
  pseudocode: `mergeSort(arr)
  if arr.length <= 1 return arr
  mid = arr.length / 2
  left = mergeSort(arr[0..mid])
  right = mergeSort(arr[mid..n])
  return merge(left, right)`,
};

export const mergeSort = (array: number[]): AnimationStep[] => {
  const animations: AnimationStep[] = [];
  if (array.length <= 1) return animations;
  const auxArray = [...array];
  mergeSortHelper(array, 0, array.length - 1, auxArray, animations);
  return animations;
};

function mergeSortHelper(mainArray: number[], startIdx: number, endIdx: number, auxArray: number[], animations: AnimationStep[]) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxArray, animations);
}

function doMerge(mainArray: number[], startIdx: number, middleIdx: number, endIdx: number, auxArray: number[], animations: AnimationStep[]) {
  let k = startIdx, i = startIdx, j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    animations.push({ type: 'compare', indices: [i, j], explanation: `Comparing left[${i}]=${auxArray[i]} with right[${j}]=${auxArray[j]}` });
    animations.push({ type: 'clear', indices: [i, j] });
    if (auxArray[i] <= auxArray[j]) {
      animations.push({ type: 'overwrite', indices: [k], value: auxArray[i], explanation: `Placing ${auxArray[i]} at position ${k}` });
      mainArray[k++] = auxArray[i++];
    } else {
      animations.push({ type: 'overwrite', indices: [k], value: auxArray[j], explanation: `Placing ${auxArray[j]} at position ${k}` });
      mainArray[k++] = auxArray[j++];
    }
  }
  while (i <= middleIdx) {
    animations.push({ type: 'compare', indices: [i, i] });
    animations.push({ type: 'clear', indices: [i, i] });
    animations.push({ type: 'overwrite', indices: [k], value: auxArray[i] });
    mainArray[k++] = auxArray[i++];
  }
  while (j <= endIdx) {
    animations.push({ type: 'compare', indices: [j, j] });
    animations.push({ type: 'clear', indices: [j, j] });
    animations.push({ type: 'overwrite', indices: [k], value: auxArray[j] });
    mainArray[k++] = auxArray[j++];
  }
}
