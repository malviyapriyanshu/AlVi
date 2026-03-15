import type { AnimationStep, AlgorithmInfo } from '../../types';

export const insertionSortInfo: AlgorithmInfo = {
  name: 'Insertion Sort',
  category: 'sorting',
  description: 'Builds the final sorted array one item at a time. It picks each element and inserts it into its correct position among the previously sorted elements.',
  complexity: {
    time: { best: 'Ω(N)', average: 'Θ(N²)', worst: 'O(N²)' },
    space: 'O(1)',
  },
  problemContext: {
    title: 'Insertion Sort List',
    link: 'https://leetcode.com/problems/insertion-sort-list/',
    difficulty: 'Medium',
  },
  intuition: 'Think of how you sort playing cards in your hand. You pick up a new card and slide it into the correct position among the cards you have already sorted.',
  analogy: 'Sorting a hand of playing cards — you pick up each card and insert it into its proper place among the cards you already hold.',
  stepByStep: [
    { title: 'Pick', description: 'Start from the second element and consider it as the "key".' },
    { title: 'Compare', description: 'Compare the key with elements to its left.' },
    { title: 'Shift', description: 'Move larger elements one position to the right to make space.' },
    { title: 'Insert', description: 'Place the key in its correct sorted position.' },
  ],
  whenToUse: 'Excellent for small or nearly-sorted datasets. Often used as the base case in hybrid sorting algorithms like Timsort.',
  pseudocode: `for i from 1 to n-1
  key = arr[i]
  j = i - 1
  while j >= 0 and arr[j] > key
    arr[j+1] = arr[j]
    j = j - 1
  arr[j+1] = key`,
};

export const insertionSort = (array: number[]): AnimationStep[] => {
  const animations: AnimationStep[] = [];
  const arr = [...array];

  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    animations.push({ type: 'compare', indices: [i], explanation: `Picking element arr[${i}]=${key} as the key` });
    while (j >= 0 && arr[j] > key) {
      animations.push({ type: 'compare', indices: [j, j + 1], explanation: `arr[${j}]=${arr[j]} > key=${key}, shifting right` });
      animations.push({ type: 'overwrite', indices: [j + 1], value: arr[j], explanation: `Moving ${arr[j]} to index ${j + 1}` });
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
    animations.push({ type: 'overwrite', indices: [j + 1], value: key, explanation: `Inserting key=${key} at index ${j + 1}` });
    animations.push({ type: 'clear', indices: [i] });
  }
  return animations;
};
