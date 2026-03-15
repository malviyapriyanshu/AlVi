import type { AlgorithmEntry } from '../types';
import { bubbleSort, bubbleSortInfo } from '../algorithms/sorting/bubbleSort';
import { insertionSort, insertionSortInfo } from '../algorithms/sorting/insertionSort';
import { selectionSort, selectionSortInfo } from '../algorithms/sorting/selectionSort';
import { mergeSort, mergeSortInfo } from '../algorithms/sorting/mergeSort';
import { quickSort, quickSortInfo } from '../algorithms/sorting/quickSort';
import { heapSort, heapSortInfo } from '../algorithms/sorting/heapSort';
import { binarySearch, binarySearchInfo } from '../algorithms/searching/binarySearch';
import { exponentialSearch, exponentialSearchInfo } from '../algorithms/searching/exponentialSearch';
import { twoPointer, twoPointerInfo } from '../algorithms/techniques/twoPointer';
import { slidingWindow, slidingWindowInfo } from '../algorithms/techniques/slidingWindow';

export const algorithmRegistry: Record<string, AlgorithmEntry> = {
  bubble:       { id: 'bubble',       info: bubbleSortInfo,       run: bubbleSort },
  insertion:    { id: 'insertion',    info: insertionSortInfo,    run: insertionSort },
  selection:    { id: 'selection',    info: selectionSortInfo,    run: selectionSort },
  merge:        { id: 'merge',        info: mergeSortInfo,        run: mergeSort },
  quick:        { id: 'quick',        info: quickSortInfo,        run: quickSort },
  heap:         { id: 'heap',         info: heapSortInfo,         run: heapSort },
  binary:       { id: 'binary',       info: binarySearchInfo,     run: (arr, t) => binarySearch(arr, t!), needsSorted: true, needsTarget: true },
  exponential:  { id: 'exponential',  info: exponentialSearchInfo, run: (arr, t) => exponentialSearch(arr, t!), needsSorted: true, needsTarget: true },
  'two-pointer': { id: 'two-pointer', info: twoPointerInfo,       run: (arr, t) => twoPointer(arr, t!), needsSorted: true, needsTarget: true },
  'sliding-window': { id: 'sliding-window', info: slidingWindowInfo, run: (arr) => slidingWindow(arr) },
};

export const algorithmCategories = [
  {
    title: 'Sorting Algorithms',
    options: [
      { id: 'bubble', name: 'Bubble Sort' },
      { id: 'selection', name: 'Selection Sort' },
      { id: 'insertion', name: 'Insertion Sort' },
      { id: 'merge', name: 'Merge Sort' },
      { id: 'quick', name: 'Quick Sort' },
      { id: 'heap', name: 'Heap Sort' },
    ],
  },
  {
    title: 'Searching Algorithms',
    options: [
      { id: 'binary', name: 'Binary Search' },
      { id: 'exponential', name: 'Exponential Search' },
    ],
  },
  {
    title: 'Techniques',
    options: [
      { id: 'two-pointer', name: 'Two Pointers' },
      { id: 'sliding-window', name: 'Sliding Window' },
    ],
  },
];
