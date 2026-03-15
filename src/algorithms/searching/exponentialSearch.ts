import type { AnimationStep, AlgorithmInfo } from '../../types';

export const exponentialSearchInfo: AlgorithmInfo = {
  name: 'Exponential Search',
  category: 'searching',
  description: 'Works by finding a range where the target element might exist by doubling the index, then applying binary search within that range.',
  complexity: {
    time: { best: 'Ω(1)', average: 'Θ(log N)', worst: 'O(log N)' },
    space: 'O(1)',
  },
  problemContext: {
    title: 'Search Insert Position',
    link: 'https://leetcode.com/problems/search-insert-position/',
    difficulty: 'Easy',
  },
  intuition: 'Instead of checking every position, you take increasingly larger jumps (1, 2, 4, 8, 16...) until you overshoot, then perform binary search in the last valid range.',
  analogy: 'Like searching for a page in a book by flipping forward in larger and larger chunks until you pass the page, then flipping back page by page.',
  stepByStep: [
    { title: 'Exponential Jump', description: 'Start at index 1 and double the index until arr[i] > target.' },
    { title: 'Binary Search', description: 'Perform binary search in the range [i/2, min(i, n-1)].' },
  ],
  whenToUse: 'Particularly useful for unbounded or infinite arrays where you don\'t know the size upfront.',
  pseudocode: `i = 1
while i < n and arr[i] <= target
  i = i * 2
binarySearch(arr, i/2, min(i, n-1), target)`,
};

export const exponentialSearch = (array: number[], target: number): AnimationStep[] => {
  const animations: AnimationStep[] = [];
  if (array[0] === target) {
    animations.push({ type: 'mark_found', indices: [0], explanation: `Found target ${target} at index 0!` });
    return animations;
  }

  let i = 1;
  while (i < array.length && array[i] <= target) {
    animations.push({ type: 'compare', indices: [i], explanation: `Exponential jump: checking arr[${i}]=${array[i]} vs target=${target}` });
    animations.push({ type: 'clear', indices: [i] });
    i *= 2;
  }

  let left = Math.floor(i / 2);
  let right = Math.min(i, array.length - 1);

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    animations.push({
      type: 'set_pointers', indices: [],
      pointers: [{ index: left, label: 'L' }, { index: mid, label: 'M' }, { index: right, label: 'R' }],
      explanation: `Binary search phase: L=${left}, M=${mid}, R=${right}`,
    });
    animations.push({ type: 'compare', indices: [mid], explanation: `Checking arr[${mid}]=${array[mid]} vs target=${target}` });
    animations.push({ type: 'clear', indices: [mid] });

    if (array[mid] === target) {
      animations.push({ type: 'mark_found', indices: [mid], explanation: `Found target ${target} at index ${mid}!` });
      return animations;
    }
    if (array[mid] < target) {
      const disc = []; for (let j = left; j <= mid; j++) disc.push(j);
      animations.push({ type: 'mark_discarded', indices: disc });
      left = mid + 1;
    } else {
      const disc = []; for (let j = mid; j <= right; j++) disc.push(j);
      animations.push({ type: 'mark_discarded', indices: disc });
      right = mid - 1;
    }
  }
  animations.push({ type: 'set_pointers', indices: [], pointers: [] });
  return animations;
};
