import type { AnimationStep, AlgorithmInfo } from '../../types';

export const twoPointerInfo: AlgorithmInfo = {
  name: 'Two Pointers (Pair Sum)',
  category: 'technique',
  description: 'Uses two indices walking through a sorted array from opposite ends to efficiently find a pair of elements that sum to a target value.',
  complexity: {
    time: { best: 'Ω(1)', average: 'Θ(N)', worst: 'O(N)' },
    space: 'O(1)',
  },
  problemContext: {
    title: 'Two Sum II - Input Array Is Sorted',
    link: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/',
    difficulty: 'Medium',
  },
  intuition: 'Two people at opposite ends of ordered numbers. If sum is too small, the left person steps forward. If too big, the right person steps backward.',
  analogy: 'Like tuning a radio with two dials — one coarse, one fine — to hit the exact frequency.',
  stepByStep: [
    { title: 'Initialize', description: 'Place one pointer at the start and another at the end.' },
    { title: 'Calculate Sum', description: 'Add the two pointed-to elements.' },
    { title: 'Adjust', description: 'If sum < target, increment left. If sum > target, decrement right.' },
  ],
  whenToUse: 'Perfect for pair-finding in sorted arrays, palindrome checks, and partitioning problems.',
  pseudocode: `left = 0, right = n-1
while left < right
  sum = arr[left] + arr[right]
  if sum == target: return [left, right]
  if sum < target: left++
  else: right--`,
};

export const twoPointer = (array: number[], target: number): AnimationStep[] => {
  const animations: AnimationStep[] = [];
  let left = 0;
  let right = array.length - 1;

  while (left < right) {
    animations.push({
      type: 'set_pointers', indices: [],
      pointers: [{ index: left, label: 'L' }, { index: right, label: 'R' }],
      explanation: `Pointers at L=${left} (val=${array[left]}), R=${right} (val=${array[right]})`,
    });
    const sum = array[left] + array[right];
    animations.push({ type: 'compare', indices: [left, right], explanation: `Sum = ${array[left]} + ${array[right]} = ${sum}, target = ${target}` });

    if (sum === target) {
      animations.push({ type: 'clear', indices: [left, right] });
      animations.push({ type: 'mark_found', indices: [left, right], explanation: `Found pair! arr[${left}]=${array[left]} + arr[${right}]=${array[right]} = ${target}` });
      return animations;
    }
    animations.push({ type: 'clear', indices: [left, right] });
    if (sum < target) left++;
    else right--;
  }
  animations.push({ type: 'set_pointers', indices: [], pointers: [] });
  return animations;
};
