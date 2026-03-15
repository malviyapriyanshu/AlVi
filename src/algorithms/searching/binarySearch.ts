import { AnimationStep } from '../../types/animationTypes';
import { AlgorithmInfo } from '../../types/algorithmTypes';

export const binarySearchInfo: AlgorithmInfo = {
  name: 'Binary Search',
  category: 'searching',
  description: 'Fast search algorithm for sorted arrays by repeatedly dividing the search interval in half.',
  complexity: {
    time: { best: 'Ω(1)', average: 'Θ(log N)', worst: 'O(log N)' },
    space: 'O(1)',
  },
  intuition: 'Like finding a name in a phonebook: open to the middle, decide if you need the left or right half.',
  analogy: 'The "Higher or Lower" guessing game.',
  stepByStep: [
    { title: 'Check Middle', description: 'Compare target to the middle element.' },
    { title: 'Discard Half', description: 'Eliminate half the searching space.' },
  ],
  whenToUse: 'On large, sorted datasets.',
  pseudocode: `while left <= right\n  mid = floor((left + right) / 2)\n  if arr[mid] == target return mid\n  if arr[mid] < target left = mid + 1\n  else right = mid - 1`,
};

export const binarySearch = (array: number[], target: number): AnimationStep[] => {
  const steps: AnimationStep[] = [];
  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    steps.push({
      type: 'move_pointer',
      pointers: [{ index: left, label: 'L' }, { index: mid, label: 'M' }, { index: right, label: 'R' }],
      explanation: `Set boundaries: L=${left}, R=${right}. Checking midpoint M=${mid}`
    });

    steps.push({ type: 'compare', indices: [mid], explanation: `Is ${array[mid]} equal to ${target}?` });

    if (array[mid] === target) {
      steps.push({ type: 'found_result', indices: [mid], explanation: `Target ${target} found at index ${mid}!` });
      return steps;
    }

    if (array[mid] < target) {
      steps.push({ 
        type: 'discard_range', 
        indices: Array.from({ length: mid - left + 1 }, (_, i) => left + i),
        explanation: `${array[mid]} < ${target}, discarding left portion`
      });
      left = mid + 1;
    } else {
      steps.push({ 
        type: 'discard_range', 
        indices: Array.from({ length: right - mid + 1 }, (_, i) => mid + i),
        explanation: `${array[mid]} > ${target}, discarding right portion`
      });
      right = mid - 1;
    }
  }
  return steps;
};
