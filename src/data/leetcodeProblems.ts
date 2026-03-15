import type { LeetCodeProblem } from '../types';

export const leetcodeProblems: LeetCodeProblem[] = [
  // ===================== SORTING =====================
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
  // ===================== SEARCHING & TECHNIQUES =====================
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
  // ===================== GRAPH =====================
  {
    algorithmId: 'bfs',
    title: 'Number of Islands',
    link: 'https://leetcode.com/problems/number-of-islands/',
    difficulty: 'Medium',
    description: 'Given an m×n 2D grid of "1"s (land) and "0"s (water), count the number of islands. An island is surrounded by water and is formed by connecting adjacent lands.',
    solutionSteps: [
      'Iterate through every cell in the grid.',
      'When a "1" is found, increment the island count.',
      'Use BFS to explore all connected "1"s and mark them visited.',
      'Continue until all cells are processed.'
    ],
  },
  {
    algorithmId: 'dfs',
    title: 'Clone Graph',
    link: 'https://leetcode.com/problems/clone-graph/',
    difficulty: 'Medium',
    description: 'Given a reference to a node in a connected undirected graph, return a deep copy (clone) of the graph.',
    solutionSteps: [
      'Use DFS to traverse the original graph.',
      'For each node, create a clone and store it in a hash map.',
      'For each neighbor, recursively clone if not yet cloned.',
      'Connect the cloned node to its cloned neighbors.'
    ],
  },
  {
    algorithmId: 'dijkstra',
    title: 'Network Delay Time',
    link: 'https://leetcode.com/problems/network-delay-time/',
    difficulty: 'Medium',
    description: 'There are n network nodes. Given a list of travel times as directed edges, determine how long it takes for a signal to reach all nodes from a given source.',
    solutionSteps: [
      'Build an adjacency list from the edges.',
      'Use Dijkstra\'s algorithm with a min-heap.',
      'Process the node with the smallest distance first.',
      'Update distances to neighbors if a shorter path is found.',
      'The answer is the maximum distance among all nodes.'
    ],
  },
  // ===================== TREE =====================
  {
    algorithmId: 'inorder',
    title: 'Binary Tree Inorder Traversal',
    link: 'https://leetcode.com/problems/binary-tree-inorder-traversal/',
    difficulty: 'Easy',
    description: 'Given the root of a binary tree, return the inorder traversal of its nodes\' values (Left → Root → Right).',
    solutionSteps: [
      'If the current node is null, return.',
      'Recursively traverse the left subtree.',
      'Visit (record) the current node.',
      'Recursively traverse the right subtree.',
      'For a BST, this gives sorted order.'
    ],
  },
  {
    algorithmId: 'preorder',
    title: 'Binary Tree Preorder Traversal',
    link: 'https://leetcode.com/problems/binary-tree-preorder-traversal/',
    difficulty: 'Easy',
    description: 'Given the root of a binary tree, return the preorder traversal of its nodes\' values (Root → Left → Right).',
    solutionSteps: [
      'Visit (record) the current node first.',
      'Recursively traverse the left subtree.',
      'Recursively traverse the right subtree.',
      'This order is useful for serialization and tree copying.'
    ],
  },
  {
    algorithmId: 'postorder',
    title: 'Binary Tree Postorder Traversal',
    link: 'https://leetcode.com/problems/binary-tree-postorder-traversal/',
    difficulty: 'Easy',
    description: 'Given the root of a binary tree, return the postorder traversal of its nodes\' values (Left → Right → Root).',
    solutionSteps: [
      'Recursively traverse the left subtree.',
      'Recursively traverse the right subtree.',
      'Visit (record) the current node last.',
      'This order is useful for deleting trees and evaluating expressions.'
    ],
  },
  {
    algorithmId: 'levelorder',
    title: 'Binary Tree Level Order Traversal',
    link: 'https://leetcode.com/problems/binary-tree-level-order-traversal/',
    difficulty: 'Medium',
    description: 'Given the root of a binary tree, return the level order traversal of its nodes\' values (i.e., from left to right, level by level).',
    solutionSteps: [
      'Initialize a queue with the root node.',
      'While the queue is not empty, dequeue a node.',
      'Record the node\'s value.',
      'Enqueue the node\'s left and right children if they exist.',
      'Group results by level for the final output.'
    ],
  },
  // ===================== DP =====================
  {
    algorithmId: 'fib',
    title: 'Fibonacci Number',
    link: 'https://leetcode.com/problems/fibonacci-number/',
    difficulty: 'Easy',
    description: 'The Fibonacci numbers form a sequence where each number is the sum of the two preceding ones. Given n, calculate F(n).',
    solutionSteps: [
      'Base cases: F(0) = 0, F(1) = 1.',
      'Use a DP table to store computed values.',
      'For each i from 2 to n: dp[i] = dp[i-1] + dp[i-2].',
      'Return dp[n].'
    ],
  },
  {
    algorithmId: 'coin',
    title: 'Coin Change',
    link: 'https://leetcode.com/problems/coin-change/',
    difficulty: 'Medium',
    description: 'Given coins of different denominations and a total amount, find the fewest number of coins needed to make up that amount.',
    solutionSteps: [
      'Create a DP array of size amount+1, filled with Infinity.',
      'Set dp[0] = 0 (base case: 0 coins for amount 0).',
      'For each amount from 1 to target, try each coin.',
      'dp[i] = min(dp[i], dp[i - coin] + 1) if coin <= i.',
      'Return dp[amount] if it\'s not Infinity, else -1.'
    ],
  },
];
