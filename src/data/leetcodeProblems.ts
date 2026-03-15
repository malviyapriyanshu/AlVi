import type { LeetCodeProblem } from '../types';

export const leetcodeProblems: LeetCodeProblem[] = [
  {
    algorithmId: 'bubble',
    title: 'Sort an Array',
    link: 'https://leetcode.com/problems/sort-an-array/',
    difficulty: 'Medium',
    description: 'Given an array of integers, sort the array in ascending order and return it. You must solve the problem without using any built-in functions.',
    solutionSteps: [
      'Iterate over the array multiple times.',
      'In each pass, compare adjacent elements.',
      'If the left element is larger, swap them.',
      'After each pass, the largest unsorted element bubbles to the end.',
      'Repeat until no swaps are needed.'
    ],
  },
  {
    algorithmId: 'merge',
    title: 'Sort List',
    link: 'https://leetcode.com/problems/sort-list/',
    difficulty: 'Medium',
    description: 'Given the head of a linked list, return the list after sorting it in ascending order. This is a classic divide-and-conquer problem.',
    solutionSteps: [
      'Find the middle of the list using slow/fast pointers.',
      'Recursively sort the left half and right half.',
      'Merge the two sorted halves into one sorted list.',
      'The merge step compares heads of both lists and picks the smaller.'
    ],
  },
  {
    algorithmId: 'quick',
    title: 'Kth Largest Element in an Array',
    link: 'https://leetcode.com/problems/kth-largest-element-in-an-array/',
    difficulty: 'Medium',
    description: 'Given an integer array and an integer k, return the kth largest element. This uses the partitioning idea from Quick Sort (QuickSelect).',
    solutionSteps: [
      'Pick a pivot and partition the array.',
      'If the pivot lands at position (n-k), we found the answer.',
      'If not, recurse on the correct half.',
      'Average time: O(N), worst case O(N²).'
    ],
  },
  {
    algorithmId: 'binary',
    title: 'Search in Rotated Sorted Array',
    link: 'https://leetcode.com/problems/search-in-rotated-sorted-array/',
    difficulty: 'Medium',
    description: 'A sorted array has been rotated at an unknown pivot. Given a target, return its index, or -1 if not found. You must achieve O(log N) time.',
    solutionSteps: [
      'Use binary search but determine which half is sorted.',
      'If the left half is sorted and target is in that range, search left.',
      'Otherwise, search the right half.',
      'Repeat until the target is found or the search space is exhausted.'
    ],
  },
  {
    algorithmId: 'two-pointer',
    title: 'Two Sum II - Input Array Is Sorted',
    link: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/',
    difficulty: 'Medium',
    description: 'Given a sorted array and a target, find two numbers that add up to the target. Return their 1-indexed positions.',
    solutionSteps: [
      'Place left pointer at index 0, right pointer at end.',
      'Calculate sum = arr[left] + arr[right].',
      'If sum equals target, return the indices.',
      'If sum < target, move left pointer right (increase sum).',
      'If sum > target, move right pointer left (decrease sum).'
    ],
  },
  {
    algorithmId: 'sliding-window',
    title: 'Longest Substring Without Repeating Characters',
    link: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
    difficulty: 'Medium',
    description: 'Given a string s, find the length of the longest substring without repeating characters.',
    solutionSteps: [
      'Maintain a window with two pointers (left, right).',
      'Expand the window by moving right.',
      'If a duplicate is found, shrink from the left until no duplicates.',
      'Track the maximum window size seen.'
    ],
  },
];
