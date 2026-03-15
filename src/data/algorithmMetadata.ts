import { AlgorithmEntry } from '../types/algorithmTypes';
import { bubbleSort, bubbleSortInfo } from '../algorithms/sorting/bubbleSort';
import { insertionSort, insertionSortInfo } from '../algorithms/sorting/insertionSort';
import { selectionSort, selectionSortInfo } from '../algorithms/sorting/selectionSort';
import { mergeSort, mergeSortInfo } from '../algorithms/sorting/mergeSort';
import { quickSort, quickSortInfo } from '../algorithms/sorting/quickSort';
import { binarySearch, binarySearchInfo } from '../algorithms/searching/binarySearch';
import { twoPointer, twoPointerInfo } from '../algorithms/techniques/twoPointer';
import { slidingWindow, slidingWindowInfo } from '../algorithms/techniques/slidingWindow';
import { bfs, bfsInfo } from '../algorithms/graph/bfs';
import { dfs, dfsInfo } from '../algorithms/graph/dfs';
import { dijkstra, dijkstraInfo } from '../algorithms/graph/dijkstra';
import { fibonacciDP, fibonacciInfo } from '../algorithms/dp/fibonacciDP';
import { coinChange, coinChangeInfo } from '../algorithms/dp/coinChange';
import {
  inorderTraversal, inorderInfo,
  preorderTraversal, preorderInfo,
  postorderInfo, postorderTraversal,
  levelOrderInfo, levelOrderTraversal,
} from '../algorithms/tree/traversals';

export const algorithmRegistry: Record<string, AlgorithmEntry> = {
  bubble: { id: 'bubble', info: bubbleSortInfo, run: bubbleSort },
  selection: { id: 'selection', info: selectionSortInfo, run: selectionSort },
  insertion: { id: 'insertion', info: insertionSortInfo, run: insertionSort },
  merge: { id: 'merge', info: mergeSortInfo, run: mergeSort },
  quick: { id: 'quick', info: quickSortInfo, run: quickSort },
  binary: { id: 'binary', info: binarySearchInfo, run: (arr, t) => binarySearch(arr, t!), needsSorted: true, needsTarget: true },
  'two-pointer': { id: 'two-pointer', info: twoPointerInfo, run: (arr, t) => twoPointer(arr, t!), needsSorted: true, needsTarget: true },
  'sliding-window': { id: 'sliding-window', info: slidingWindowInfo, run: (arr) => slidingWindow(arr) },
  bfs: { id: 'bfs', info: bfsInfo, run: (g, start) => bfs(g, start) },
  dfs: { id: 'dfs', info: dfsInfo, run: (g, start) => dfs(g, start) },
  dijkstra: { id: 'dijkstra', info: dijkstraInfo, run: (g, start) => dijkstra(g, start) },
  fib: { id: 'fib', info: fibonacciInfo, run: (n) => fibonacciDP(n) },
  coin: { id: 'coin', info: coinChangeInfo, run: (coins, amt) => coinChange(coins, amt) },
  inorder: { id: 'inorder', info: inorderInfo, run: (root) => inorderTraversal(root) },
  preorder: { id: 'preorder', info: preorderInfo, run: (root) => preorderTraversal(root) },
  postorder: { id: 'postorder', info: postorderInfo, run: (root) => postorderTraversal(root) },
  levelorder: { id: 'levelorder', info: levelOrderInfo, run: (root) => levelOrderTraversal(root) },
};

export const algorithmCategories = [
  {
    title: 'Sorting',
    options: [
      { id: 'bubble', name: 'Bubble Sort' },
      { id: 'selection', name: 'Selection Sort' },
      { id: 'insertion', name: 'Insertion Sort' },
      { id: 'merge', name: 'Merge Sort' },
      { id: 'quick', name: 'Quick Sort' },
    ],
  },
  {
    title: 'Searching & Techniques',
    options: [
      { id: 'binary', name: 'Binary Search' },
      { id: 'two-pointer', name: 'Two Pointers' },
      { id: 'sliding-window', name: 'Sliding Window' },
    ],
  },
  {
    title: 'Graph Algorithms',
    options: [
      { id: 'bfs', name: 'Breadth-First Search' },
      { id: 'dfs', name: 'Depth-First Search' },
      { id: 'dijkstra', name: "Dijkstra's Shortest Path" },
    ],
  },
  {
    title: 'Tree Traversals',
    options: [
      { id: 'inorder', name: 'Inorder Traversal (LNR)' },
      { id: 'preorder', name: 'Preorder Traversal (NLR)' },
      { id: 'postorder', name: 'Postorder Traversal (LRN)' },
      { id: 'levelorder', name: 'Level-Order Traversal (BFS)' },
    ],
  },
  {
    title: 'Dynamic Programming',
    options: [
      { id: 'fib', name: 'Fibonacci' },
      { id: 'coin', name: 'Coin Change' },
    ],
  },
];
