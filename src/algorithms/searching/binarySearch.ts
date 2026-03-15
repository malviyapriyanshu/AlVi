import type { AnimationStep, AlgorithmInfo } from '../../types';

export const binarySearchInfo: AlgorithmInfo = {
  name: 'Binary Search',
  category: 'searching',
  description: 'A fast search algorithm that works on sorted arrays by repeatedly dividing the search interval in half.',
  complexity: {
    time: { best: 'Ω(1)', average: 'Θ(log N)', worst: 'O(log N)' },
    space: 'O(1)',
  },
  problemContext: {
    title: 'Search in Rotated Sorted Array',
    link: 'https://leetcode.com/problems/search-in-rotated-sorted-array/',
    difficulty: 'Medium',
  },
  intuition: 'Like finding a name in a phonebook: open to the middle, decide if you need the left or right half, and repeat.',
  analogy: 'The "Higher or Lower" guessing game. Guess 50 out of 1-100, told "Higher" — you instantly discard 1-50.',
  stepByStep: [
    { title: 'Sorted Array', description: 'Requires the array to be sorted first.' },
    { title: 'Check Middle', description: 'Compare the target to the middle element.' },
    { title: 'Discard Half', description: 'Move the left or right boundary to eliminate half the search space.' },
  ],
  whenToUse: 'Essential for high-performance searching on large, sorted datasets.',
  pseudocode: `while left <= right
  mid = (left + right) / 2
  if arr[mid] == target: return mid
  if arr[mid] < target: left = mid + 1
  else: right = mid - 1`,
};

export const binarySearch = (array: number[], target: number): AnimationStep[] => {
  const animations: AnimationStep[] = [];
  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    animations.push({
      type: 'set_pointers', indices: [],
      pointers: [{ index: left, label: 'L' }, { index: mid, label: 'M' }, { index: right, label: 'R' }],
      explanation: `Setting pointers: L=${left}, M=${mid}, R=${right}`,
    });
    animations.push({ type: 'compare', indices: [mid], explanation: `Checking arr[${mid}]=${array[mid]} against target=${target}` });
    animations.push({ type: 'clear', indices: [mid] });

    if (array[mid] === target) {
      animations.push({ type: 'set_pointers', indices: [], pointers: [{ index: mid, label: 'M' }] });
      animations.push({ type: 'mark_found', indices: [mid], explanation: `Found target ${target} at index ${mid}!` });
      return animations;
    }
    if (array[mid] < target) {
      const disc = []; for (let i = left; i <= mid; i++) disc.push(i);
      animations.push({ type: 'mark_discarded', indices: disc, explanation: `arr[${mid}]=${array[mid]} < ${target}, discarding left half` });
      left = mid + 1;
    } else {
      const disc = []; for (let i = mid; i <= right; i++) disc.push(i);
      animations.push({ type: 'mark_discarded', indices: disc, explanation: `arr[${mid}]=${array[mid]} > ${target}, discarding right half` });
      right = mid - 1;
    }
  }
  animations.push({ type: 'set_pointers', indices: [], pointers: [] });
  return animations;
};
