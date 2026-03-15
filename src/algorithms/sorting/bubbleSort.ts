import type { AnimationStep, AlgorithmInfo } from '../../types';

export const bubbleSortInfo: AlgorithmInfo = {
  name: 'Bubble Sort',
  category: 'sorting',
  description: 'A simple comparison-based sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
  complexity: {
    time: { best: 'Ω(N)', average: 'Θ(N²)', worst: 'O(N²)' },
    space: 'O(1)',
  },
  problemContext: {
    title: 'Sort an Array',
    link: 'https://leetcode.com/problems/sort-an-array/',
    difficulty: 'Medium',
  },
  intuition: 'Imagine you are standing in a line with your friends, and you want to order everyone by height. You compare yourself to the person next to you. If you are taller, you swap places. As you do this repeatedly, the tallest person eventually "bubbles up" to the end of the line.',
  analogy: 'Like carbonated bubbles in a soda rising to the surface, the largest elements in our array "bubble up" to their correct positions at the end of the list.',
  stepByStep: [
    { title: 'Compare', description: 'Look at two adjacent elements.' },
    { title: 'Swap', description: 'If the left element is greater than the right, swap them.' },
    { title: 'Repeat', description: 'Continue this for the entire array until no more swaps are needed.' },
  ],
  whenToUse: 'Use Bubble Sort only for very small datasets or for educational purposes to understand the basics of sorting and swapping logic.',
  pseudocode: `for i from 0 to n-1
  for j from 0 to n-i-2
    if arr[j] > arr[j+1]
      swap(arr[j], arr[j+1])`,
};

export const bubbleSort = (array: number[]): AnimationStep[] => {
  const animations: AnimationStep[] = [];
  const arr = [...array];
  const n = arr.length;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      animations.push({ type: 'compare', indices: [j, j + 1], explanation: `Comparing arr[${j}]=${arr[j]} with arr[${j + 1}]=${arr[j + 1]}` });
      if (arr[j] > arr[j + 1]) {
        animations.push({ type: 'swap', indices: [j, j + 1], explanation: `${arr[j]} > ${arr[j + 1]}, swapping them` });
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
      animations.push({ type: 'clear', indices: [j, j + 1] });
    }
  }
  return animations;
};
