import { AlgorithmEntry } from '../types/algorithmTypes';
import { AnimationStep } from '../types/animationTypes';
import { bubbleSort, bubbleSortInfo } from '../algorithms/sorting/bubbleSort';
import { insertionSort, insertionSortInfo } from '../algorithms/sorting/insertionSort';
import { selectionSort, selectionSortInfo } from '../algorithms/sorting/selectionSort';
import { mergeSort, mergeSortInfo } from '../algorithms/sorting/mergeSort';
import { quickSort, quickSortInfo } from '../algorithms/sorting/quickSort';
import { heapSort, heapSortInfo } from '../algorithms/sorting/heapSort';
import { binarySearch, binarySearchInfo } from '../algorithms/searching/binarySearch';
import { twoPointer, twoPointerInfo } from '../algorithms/techniques/twoPointer';
import { slidingWindow, slidingWindowInfo } from '../algorithms/techniques/slidingWindow';
import { bfs, bfsInfo } from '../algorithms/graph/bfs';
import { dfs, dfsInfo } from '../algorithms/graph/dfs';
import { dijkstra, dijkstraInfo } from '../algorithms/graph/dijkstra';
import { aStar } from '../algorithms/graph/aStar';
import { fibonacciDP, fibonacciInfo } from '../algorithms/dp/fibonacciDP';
import { coinChange, coinChangeInfo } from '../algorithms/dp/coinChange';
import { longestIncreasingSubsequence } from '../algorithms/dp/longestIncreasingSubsequence';
import { knapsack } from '../algorithms/dp/knapsack';
import {
  inorderTraversal, inorderInfo,
  preorderTraversal, preorderInfo,
  postorderInfo, postorderTraversal,
  levelOrderInfo, levelOrderTraversal,
} from '../algorithms/tree/traversals';

// Centralized Category Mapping
export const ALGORITHM_CATEGORIES = {
  sorting: ["bubble", "selection", "insertion", "merge", "quick", "heap", "counting"],
  searching: ["linear", "binary", "jump", "exponential"],
  tree: ["bst", "avl", "segment", "trie", "inorder", "preorder", "postorder", "levelorder"],
  graph: ["bfs", "dfs", "dijkstra", "kruskal", "prim", "astar"],
  dp: ["fib", "coin", "lis", "knapsack"],
  techniques: ["two-pointer", "sliding-window"]
};

// Data Registry for all algorithms
export const ALL_ALGORITHMS: Record<string, AlgorithmEntry> = {
  bubble: { id: 'bubble', info: bubbleSortInfo, run: (arr: number[]) => bubbleSort(arr) },
  selection: { id: 'selection', info: selectionSortInfo, run: (arr: number[]) => selectionSort(arr) },
  insertion: { id: 'insertion', info: insertionSortInfo, run: (arr: number[]) => insertionSort(arr) },
  merge: { id: 'merge', info: mergeSortInfo, run: (arr: number[]) => mergeSort(arr) },
  quick: { id: 'quick', info: quickSortInfo, run: (arr: number[]) => quickSort(arr) },
  heap: { id: 'heap', info: heapSortInfo, run: (arr: number[]) => heapSort(arr) },
  binary: { id: 'binary', info: binarySearchInfo, run: (arr: number[], t?: any) => binarySearch(arr, t ?? 0), needsSorted: true, needsTarget: true },
  'two-pointer': { id: 'two-pointer', info: twoPointerInfo, run: (arr: number[], t?: any) => twoPointer(arr, t ?? 0), needsSorted: true, needsTarget: true },
  'sliding-window': { id: 'sliding-window', info: slidingWindowInfo, run: (arr: number[]) => slidingWindow(arr) },
  bfs: { id: 'bfs', info: bfsInfo, run: (g: any, start: string) => bfs(g, start) },
  dfs: { id: 'dfs', info: dfsInfo, run: (g: any, start: string) => dfs(g, start) },
  dijkstra: { id: 'dijkstra', info: dijkstraInfo, run: (g: any, start: string) => dijkstra(g, start) },
  astar: {
    id: 'astar',
    run: (g: any, start: string) => aStar(g, start, 'F', () => 0),
    info: {
      name: 'A* Search',
      category: 'graph',
      description: 'An informed search algorithm that uses heuristics to find the shortest path efficiently.',
      complexity: { time: { best: 'O(E)', average: 'O(E log V)', worst: 'O(E log V)' }, space: 'O(V)' },
      intuition: 'Combines the best of Dijkstra and Greedy Search by looking at both distance traveled and estimated distance remaining.',
      analogy: 'Using a GPS that knows both how far you\'ve traveled and exactly how far the destination is as the crow flies.',
      stepByStep: [
        { title: 'Initialize', description: 'Set gScore to infinity for all nodes except start.' },
        { title: 'Explore', description: 'Pick the node with the lowest fScore = gScore + hScore.' }
      ],
      whenToUse: 'Shortest path with heuristic guidance.',
      pseudocode: `fScore[node] = gScore[node] + heuristic(node, target)`
    }
  },
  fib: {
    id: 'fib',
    run: (n: number) => fibonacciDP(n),
    info: { ...fibonacciInfo, category: 'dp' }
  },
  coin: {
    id: 'coin',
    run: (data: { coins: number[], amt: number }) => coinChange(data.coins, data.amt),
    info: { ...coinChangeInfo, category: 'dp' }
  },
  lis: {
    id: 'lis',
    run: (nums: number[]) => longestIncreasingSubsequence(nums),
    info: {
      name: 'Longest Increasing Subsequence',
      category: 'dp',
      description: 'Finds the length of the longest subsequence such that all elements are sorted in increasing order.',
      complexity: { time: { best: 'O(N²)', average: 'O(N²)', worst: 'O(N²)' }, space: 'O(N)' },
      intuition: 'Building up the solution by checking all previous elements for each index.',
      analogy: 'Arranging blocks by height: at each block, check all previous ones to see which one it can stand on.',
      stepByStep: [
        { title: 'Initialize', description: 'Set DP[i] = 1 for all i.' },
        { title: 'Compare', description: 'For each i, check all prev j < i. If nums[i] > nums[j], update DP[i].' }
      ],
      whenToUse: 'Longest ordered subsequence.',
      pseudocode: `if arr[i] > arr[j]: dp[i] = max(dp[i], dp[j]+1)`
    }
  },
  knapsack: {
    id: 'knapsack',
    run: (data: { weights: number[], values: number[], cap: number }) => knapsack(data.weights, data.values, data.cap || 10),
    info: {
      name: '0/1 Knapsack',
      category: 'dp',
      description: 'Determines the maximum value that can be fit in a knapsack of target capacity.',
      complexity: { time: { best: 'O(NW)', average: 'O(NW)', worst: 'O(NW)' }, space: 'O(NW)' },
      intuition: 'For each item, do we include it or skip it based on remaining capacity?',
      analogy: 'Packing items based on value and weight constraints.',
      stepByStep: [
        { title: 'Pick/Skip', description: 'Decide whether taking an item yields better value than skipping it.' }
      ],
      whenToUse: 'Resource allocation with capacity constraints.',
      pseudocode: `dp[i][w] = max(dp[i-1][w], val[i] + dp[i-1][w-weight[i]])`
    }
  },
  inorder: { id: 'inorder', info: inorderInfo, run: (root: any) => inorderTraversal(root) },
  preorder: { id: 'preorder', info: preorderInfo, run: (root: any) => preorderTraversal(root) },
  postorder: { id: 'postorder', info: postorderInfo, run: (root: any) => postorderTraversal(root) },
  levelorder: { id: 'levelorder', info: levelOrderInfo, run: (root: any) => levelOrderTraversal(root) },
  bst: {
    id: 'bst',
    run: (nums: number[]) => [], // BST operations simulation placeholder
    info: {
      name: 'Binary Search Tree',
      category: 'tree',
      description: 'A rooted binary tree with nodes arranged such that each value in the left subtree is smaller and each value in the right subtree is larger.',
      complexity: { time: { best: 'O(log N)', average: 'O(log N)', worst: 'O(N)' }, space: 'O(N)' },
      intuition: 'Maintains sorted order dynamically while allowing for fast search, insert, and delete.',
      analogy: 'A library where books are organized such that you always know which side of the shelf to look for a specific title.',
      stepByStep: [
        { title: 'Compare', description: 'Starting from root, go left if target is smaller, right if larger.' },
        { title: 'Repeat', description: 'Continue until you find an empty spot or the target.' }
      ],
      whenToUse: 'When you need dynamic sorting and fast lookups.',
      pseudocode: `insert(root, val):\n  if val < root.val: root.left = insert(root.left, val)\n  else: root.right = insert(root.right, val)`
    }
  },
  counting: { id: 'counting', info: { ...bubbleSortInfo, name: 'Counting Sort', description: 'A non-comparison sort for integers.' }, run: (arr: any) => [] },
  linear: { id: 'linear', info: { ...binarySearchInfo, name: 'Linear Search' }, run: (arr: any) => [] },
  jump: { id: 'jump', info: { ...binarySearchInfo, name: 'Jump Search' }, run: (arr: any) => [] },
  exponential: { id: 'exponential', info: { ...binarySearchInfo, name: 'Exponential Search' }, run: (arr: any) => [] },
  kruskal: { id: 'kruskal', info: { ...bfsInfo, name: 'Kruskal\'s MST' }, run: (g: any) => [] },
  prim: { id: 'prim', info: { ...bfsInfo, name: 'Prim\'s MST' }, run: (g: any) => [] },
  avl: { id: 'avl', info: { ...bfsInfo, name: 'AVL Tree' }, run: (nums: any) => [] },
  segment: { id: 'segment', info: { ...bfsInfo, name: 'Segment Tree' }, run: (nums: any) => [] },
  trie: { id: 'trie', info: { ...bfsInfo, name: 'Trie (Prefix Tree)' }, run: (words: any) => [] },
};
