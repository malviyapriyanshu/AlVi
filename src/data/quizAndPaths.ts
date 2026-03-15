import type { QuizQuestion, LearningPath } from '../types/extended';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1', algorithmId: 'binary',
    question: 'What is the time complexity of Binary Search?',
    options: ['O(N)', 'O(log N)', 'O(N log N)', 'O(1)'],
    correctIndex: 1,
    explanation: 'Binary Search halves the search space each step, giving O(log N) time.',
  },
  {
    id: 'q2', algorithmId: 'bubble',
    question: 'Which sorting algorithm has the worst average-case performance?',
    options: ['Merge Sort', 'Quick Sort', 'Bubble Sort', 'Heap Sort'],
    correctIndex: 2,
    explanation: 'Bubble Sort is O(N²) on average, making it the least efficient of these.',
  },
  {
    id: 'q3', algorithmId: 'merge',
    question: 'What does Merge Sort guarantee regardless of input?',
    options: ['O(N) time', 'O(N log N) time', 'O(1) space', 'In-place sorting'],
    correctIndex: 1,
    explanation: 'Merge Sort always runs in O(N log N) — even on worst-case inputs.',
  },
  {
    id: 'q4', algorithmId: 'two-pointer',
    question: 'Two Pointer technique requires the input array to be:',
    options: ['Random', 'Sorted', 'Reversed', 'Unique elements'],
    correctIndex: 1,
    explanation: 'Two Pointer works on sorted arrays so we know whether to increase or decrease the sum.',
  },
  {
    id: 'q5', algorithmId: 'binary',
    question: 'In BFS, which data structure is used?',
    options: ['Stack', 'Queue', 'Heap', 'Deque'],
    correctIndex: 1,
    explanation: 'BFS uses a Queue (FIFO) to explore nodes level-by-level.',
  },
  {
    id: 'q6',
    question: 'Which algorithm is best for finding shortest path in a weighted graph?',
    options: ['BFS', 'DFS', "Dijkstra's", 'Binary Search'],
    correctIndex: 2,
    explanation: "Dijkstra's algorithm finds shortest paths in weighted graphs with non-negative edges.",
  },
  {
    id: 'q7', algorithmId: 'sliding-window',
    question: 'Sliding Window is most useful for problems involving:',
    options: ['Searching by value', 'Contiguous subarrays/substrings', 'Graph traversal', 'Sorting'],
    correctIndex: 1,
    explanation: 'Sliding Window efficiently handles contiguous subarray/substring problems in O(N).',
  },
  {
    id: 'q8',
    question: 'What is the base case in Fibonacci DP?',
    options: ['F(0)=0, F(1)=1', 'F(0)=1, F(1)=0', 'F(0)=1, F(1)=1', 'F(0)=0, F(1)=0'],
    correctIndex: 0,
    explanation: 'By definition, F(0)=0 and F(1)=1. All other values build on these.',
  },
  {
    id: 'q9',
    question: 'Heap Sort has which space complexity?',
    options: ['O(N)', 'O(log N)', 'O(1)', 'O(N log N)'],
    correctIndex: 2,
    explanation: 'Heap Sort is in-place — it only needs O(1) extra space (the heap is built in the array itself).',
  },
  {
    id: 'q10', algorithmId: 'quick',
    question: 'Quick Sort worst case occurs when:',
    options: ['Array is random', 'Array is already sorted', 'Array has duplicates', 'Array is small'],
    correctIndex: 1,
    explanation: 'When the array is already sorted and we pick the last element as pivot, we get O(N²) partitions.',
  },
];

export const learningPaths: LearningPath[] = [
  {
    id: 'beginner', title: 'Beginner Track', level: 'Beginner', color: 'emerald',
    description: 'Start here! Learn the most fundamental algorithms with simple analogies.',
    steps: [
      { algorithmId: 'bubble', name: 'Bubble Sort', description: 'Learn comparisons and swaps.' },
      { algorithmId: 'selection', name: 'Selection Sort', description: 'Find and place the minimum.' },
      { algorithmId: 'insertion', name: 'Insertion Sort', description: 'Build sorted portion step by step.' },
      { algorithmId: 'binary', name: 'Binary Search', description: 'Efficient searching in sorted arrays.' },
    ],
  },
  {
    id: 'intermediate', title: 'Intermediate Track', level: 'Intermediate', color: 'blue',
    description: 'Level up with divide-and-conquer and smart pointer techniques.',
    steps: [
      { algorithmId: 'merge', name: 'Merge Sort', description: 'Divide and conquer sorting.' },
      { algorithmId: 'quick', name: 'Quick Sort', description: 'Pivot-based partitioning.' },
      { algorithmId: 'two-pointer', name: 'Two Pointers', description: 'Solve pair-sum problems in O(N).' },
      { algorithmId: 'sliding-window', name: 'Sliding Window', description: 'Efficient subarray problems.' },
      { algorithmId: 'exponential', name: 'Exponential Search', description: 'Searching unbounded arrays.' },
    ],
  },
  {
    id: 'advanced', title: 'Advanced Track', level: 'Advanced', color: 'purple',
    description: 'Master graph algorithms, dynamic programming, and tree structures.',
    steps: [
      { algorithmId: 'heap', name: 'Heap Sort', description: 'Binary heap-based sorting.' },
      { algorithmId: 'bfs', name: 'BFS', description: 'Level-by-level graph traversal.' },
      { algorithmId: 'dfs', name: 'DFS', description: 'Deep graph traversal.' },
      { algorithmId: 'dijkstra', name: "Dijkstra's", description: 'Shortest path in weighted graphs.' },
      { algorithmId: 'fib-dp', name: 'Fibonacci DP', description: 'Memoization and tabulation.' },
      { algorithmId: 'coin-change', name: 'Coin Change', description: 'Classic DP problem.' },
    ],
  },
];
