import { AnimationStep } from '../../types/animationTypes';
import { TreeNode } from './binarySearchTree';
import { AlgorithmInfo } from '../../types/algorithmTypes';

// ===================== INORDER =====================
export const inorderInfo: AlgorithmInfo = {
  name: 'Inorder Traversal',
  category: 'tree',
  description: 'Visits nodes in the order: Left → Root → Right. For a BST, this produces sorted output.',
  complexity: { time: { best: 'O(N)', average: 'O(N)', worst: 'O(N)' }, space: 'O(H)' },
  intuition: 'Visiting nodes in ascending order for a BST.',
  analogy: 'Reading a book from left to right, visiting each chapter in order.',
  stepByStep: [
    { title: 'Visit Left', description: 'Recursively visit the left subtree.' },
    { title: 'Visit Root', description: 'Process the current node.' },
    { title: 'Visit Right', description: 'Recursively visit the right subtree.' }
  ],
  whenToUse: 'When you need nodes in sorted order from a BST.',
  pseudocode: `def inorder(node):\n  if node:\n    inorder(node.left)\n    visit(node)\n    inorder(node.right)`
};

export const inorderTraversal = (root: TreeNode): AnimationStep[] => {
  const steps: AnimationStep[] = [];
  const visited: string[] = [];

  const traverse = (node: TreeNode | null | undefined) => {
    if (!node) return;
    steps.push({ type: 'highlight_node', nodeId: node.id, explanation: `Moving to left child of ${node.val}`, line: 2 });
    traverse(node.left);
    visited.push(node.id);
    steps.push({ type: 'visit_node', nodeId: node.id, visitedNodes: [...visited], explanation: `Visiting node ${node.val}`, line: 3 });
    steps.push({ type: 'highlight_node', nodeId: node.id, explanation: `Moving to right child of ${node.val}`, line: 4 });
    traverse(node.right);
  };

  traverse(root);
  return steps;
};

// ===================== PREORDER =====================
export const preorderInfo: AlgorithmInfo = {
  name: 'Preorder Traversal',
  category: 'tree',
  description: 'Visits nodes in the order: Root → Left → Right. Useful for creating a copy of the tree.',
  complexity: { time: { best: 'O(N)', average: 'O(N)', worst: 'O(N)' }, space: 'O(H)' },
  intuition: 'Visit yourself first, then explore children.',
  analogy: 'Like scanning a directory: first note the folder name, then look inside subfolders.',
  stepByStep: [
    { title: 'Visit Root', description: 'Process the current node first.' },
    { title: 'Visit Left', description: 'Recursively visit the left subtree.' },
    { title: 'Visit Right', description: 'Recursively visit the right subtree.' }
  ],
  whenToUse: 'When you need to serialize/copy a tree, or explore root-first.',
  pseudocode: `def preorder(node):\n  if node:\n    visit(node)\n    preorder(node.left)\n    preorder(node.right)`
};

export const preorderTraversal = (root: TreeNode): AnimationStep[] => {
  const steps: AnimationStep[] = [];
  const visited: string[] = [];

  const traverse = (node: TreeNode | null | undefined) => {
    if (!node) return;
    visited.push(node.id);
    steps.push({ type: 'visit_node', nodeId: node.id, visitedNodes: [...visited], explanation: `Visiting root node ${node.val}`, line: 2 });
    steps.push({ type: 'highlight_node', nodeId: node.id, explanation: `Moving to left child of ${node.val}`, line: 3 });
    traverse(node.left);
    steps.push({ type: 'highlight_node', nodeId: node.id, explanation: `Moving to right child of ${node.val}`, line: 4 });
    traverse(node.right);
  };

  traverse(root);
  return steps;
};

// ===================== POSTORDER =====================
export const postorderInfo: AlgorithmInfo = {
  name: 'Postorder Traversal',
  category: 'tree',
  description: 'Visits nodes in the order: Left → Right → Root. Useful for deleting trees and evaluating expressions.',
  complexity: { time: { best: 'O(N)', average: 'O(N)', worst: 'O(N)' }, space: 'O(H)' },
  intuition: 'Handle children before the parent — bottom-up processing.',
  analogy: 'Like cleaning a room: pick up all items first (children), then sweep the floor (root).',
  stepByStep: [
    { title: 'Visit Left', description: 'Recursively visit the left subtree.' },
    { title: 'Visit Right', description: 'Recursively visit the right subtree.' },
    { title: 'Visit Root', description: 'Process the current node last.' }
  ],
  whenToUse: 'When deleting a tree, evaluating postfix expressions, or bottom-up calculations.',
  pseudocode: `def postorder(node):\n  if node:\n    postorder(node.left)\n    postorder(node.right)\n    visit(node)`
};

export { postorderTraversal } from './postorderTraversal';

// ===================== LEVEL ORDER =====================
export const levelOrderInfo: AlgorithmInfo = {
  name: 'Level-Order Traversal',
  category: 'tree',
  description: 'Visits nodes level by level from top to bottom, left to right. Uses a queue (BFS approach on trees).',
  complexity: { time: { best: 'O(N)', average: 'O(N)', worst: 'O(N)' }, space: 'O(W)' },
  intuition: 'Explore all nodes at the same depth before going deeper.',
  analogy: 'Like reading a family tree generation by generation.',
  stepByStep: [
    { title: 'Enqueue Root', description: 'Add the root node to a queue.' },
    { title: 'Process Level', description: 'Dequeue nodes one by one, enqueue their children.' },
    { title: 'Repeat', description: 'Continue until the queue is empty.' }
  ],
  whenToUse: 'When you need to process nodes level by level, or find shortest path in a tree.',
  pseudocode: `def levelOrder(root):\n  queue = [root]\n  while queue:\n    node = queue.pop(0)\n    visit(node)\n    if node.left: queue.append(node.left)\n    if node.right: queue.append(node.right)`
};

export { levelOrderTraversal } from './levelOrderTraversal';
