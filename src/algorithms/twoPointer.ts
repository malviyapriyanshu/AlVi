import type { AnimationStep } from './types';

export const twoPointerInfo = {
  name: 'Two Pointers (Pair Sum)',
  complexity: {
    time: {
      best: 'Ω(1)',
      average: 'Θ(N)',
      worst: 'O(N)',
    },
    space: 'O(1)',
  },
  description: 'The Two Pointer technique is commonly used to search or manipulate arrays. In this visualization, we use two pointers starting from both ends of the sorted array to find a pair of elements that sum up to the target value. If the sum is smaller, we move the left pointer to increase the sum. If the sum is larger, we move the right pointer to decrease the sum.',
  pseudocode: `function pairSum(arr, target)
  left = 0
  right = length(arr) - 1
  
  while left < right
    sum = arr[left] + arr[right]
    if sum == target
      return [left, right]
    else if sum < target
      left++
    else
      right--
      
  return null`,
};

export const twoPointerReverse = (array: number[], target: number): AnimationStep[] => {
  const animations: AnimationStep[] = [];
  let left = 0;
  let right = array.length - 1;

  while (left < right) {
    // Set pointers for current state
    animations.push({ 
      type: 'set_pointers', 
      indices: [],
      pointers: [
        { index: left, label: 'L' },
        { index: right, label: 'R' }
      ]
    });
    
    // Highlight the comparison
    animations.push({ type: 'compare', indices: [left, right] });
    
    const sum = array[left] + array[right];
    
    if (sum === target) {
      // Found solution
      animations.push({ type: 'clear', indices: [left, right] });
      animations.push({ type: 'mark_found', indices: [left, right] });
      return animations;
    }
    
    // Clear highlights before moving
    animations.push({ type: 'clear', indices: [left, right] });

    if (sum < target) {
      left++;
    } else {
      right--;
    }
  }

  // Not found
  animations.push({ type: 'set_pointers', indices: [], pointers: [] });
  return animations;
};
