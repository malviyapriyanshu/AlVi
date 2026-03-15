import { AnimationStep } from '../../types/animationTypes';
import { AlgorithmInfo } from '../../types/algorithmTypes';

export const twoPointerInfo: AlgorithmInfo = {
  name: 'Two Pointers (Pair Sum)',
  category: 'techniques',
  description: 'Efficiently find a pair of elements that sum to a target value using two indices.',
  complexity: {
    time: { best: 'Ω(1)', average: 'Θ(N)', worst: 'O(N)' },
    space: 'O(1)',
  },
  intuition: 'Walking from opposite ends. Adjust boundaries based on sum compared to target.',
  analogy: 'Tuning two dials to hit a frequency.',
  stepByStep: [
    { title: 'Sum', description: 'Add values at both pointers.' },
    { title: 'Adjust', description: 'Move left in if too small, right in if too big.' },
  ],
  whenToUse: 'Pair-finding in sorted arrays.',
  pseudocode: `left = 0, right = n-1\nwhile left < right\n  sum = arr[left] + arr[right]\n  if sum == target return [left, right]\n  if sum < target left++\n  else right--`,
};

export const twoPointer = (array: number[], target: number): AnimationStep[] => {
  const steps: AnimationStep[] = [];
  let left = 0;
  let right = array.length - 1;

  while (left < right) {
    steps.push({
      type: 'move_pointer',
      pointers: [{ index: left, label: 'L' }, { index: right, label: 'R' }],
      explanation: `L=${left} (${array[left]}), R=${right} (${array[right]}). Sum=${array[left] + array[right]}`
    });
    const sum = array[left] + array[right];
    steps.push({ type: 'compare', indices: [left, right], explanation: `Checking sum ${sum} against target ${target}` });

    if (sum === target) {
      steps.push({ type: 'found_result', indices: [left, right], explanation: `Success! ${array[left]} + ${array[right]} = ${target}` });
      return steps;
    }
    if (sum < target) left++;
    else right--;
  }
  return steps;
};
