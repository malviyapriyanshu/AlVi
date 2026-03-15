import type { AnimationStep, AlgorithmInfo } from './types';

export const twoPointerInfo: AlgorithmInfo = {
  name: 'Two Pointers (Pair Sum)',
  description: 'The Two Pointer technique is a common pattern used to search or manipulate arrays efficiently. It usually involves two indices that "walk" through the data together.',
  complexity: {
    time: { best: 'Ω(1)', average: 'Θ(N)', worst: 'O(N)' },
    space: 'O(1)',
  },
  problemContext: {
    title: 'Two Sum II - Input Array Is Sorted',
    link: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/',
  },
  intuition: 'Imagine two people standing at opposite ends of a row of ordered numbers. They are trying to find two numbers that sum exactly to a target. If their sum is too small, the person at the small end moves forward. If too big, the person at the large end moves backward.',
  analogy: 'Think of tuning a radio with two dials—one for coarse adjustment and one for fine adjustment—trying to hit the exact frequency.',
  stepByStep: [
    { title: 'Initialize', description: 'Start one pointer at index 0 and another at the end.' },
    { title: 'Calculate Sum', description: 'Check the sum of the two elements.' },
    { title: 'Adjust Pointers', description: 'If sum < target, increment left. If sum > target, decrement right.' }
  ],
  whenToUse: 'Perfect for searching pairs inside a sorted array or for reversing/partitioning strings and lists.',
  pseudocode: `while left < right
  sum = arr[left] + arr[right]
  if sum == target: return [left, right]
  if sum < target: left++
  else: right--`,
};

export const twoPointerReverse = (array: number[], target: number): AnimationStep[] => {
  const animations: AnimationStep[] = [];
  let left = 0;
  let right = array.length - 1;

  while (left < right) {
    animations.push({ 
      type: 'set_pointers', 
      indices: [],
      pointers: [
        { index: left, label: 'L' },
        { index: right, label: 'R' }
      ]
    });
    
    animations.push({ type: 'compare', indices: [left, right] });
    
    const sum = array[left] + array[right];
    
    if (sum === target) {
      animations.push({ type: 'clear', indices: [left, right] });
      animations.push({ type: 'mark_found', indices: [left, right] });
      return animations;
    }
    
    animations.push({ type: 'clear', indices: [left, right] });

    if (sum < target) {
      left++;
    } else {
      right--;
    }
  }

  animations.push({ type: 'set_pointers', indices: [], pointers: [] });
  return animations;
};
