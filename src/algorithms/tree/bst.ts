import type { TreeAnimationStep, TreeNode } from '../../types/extended';

export const inorderInfo = {
  name: 'Binary Search Tree',
  category: 'tree' as const,
  description: 'A BST stores values so that left subtree values are smaller and right subtree values are larger. Inorder traversal visits nodes in sorted order.',
  complexity: { time: { best: 'O(N)', average: 'O(N)', worst: 'O(N)' }, space: 'O(H)' },
  problemContext: { title: 'Validate Binary Search Tree', link: 'https://leetcode.com/problems/validate-binary-search-tree/', difficulty: 'Medium' as const },
  intuition: 'Inorder: Left → Root → Right. For a BST, this always gives a sorted sequence.',
  analogy: 'Reading a music sheet from left to right — naturally follows the musical order.',
  stepByStep: [
    { title: 'Go Left', description: 'Recursively traverse the left subtree.' },
    { title: 'Visit Root', description: 'Process the current node.' },
    { title: 'Go Right', description: 'Recursively traverse the right subtree.' },
  ],
  whenToUse: 'BST validation, sorted output from BST, finding kth smallest element.',
  pseudocode: `inorder(node):
  if node is null: return
  inorder(node.left)
  visit(node)
  inorder(node.right)`,
};

let nodeCounter = 0;
export function buildSampleBST(): TreeNode {
  nodeCounter = 0;
  const mkNode = (val: number, left?: TreeNode, right?: TreeNode): TreeNode =>
    ({ val, left, right, id: `n${nodeCounter++}` });
  return mkNode(8,
    mkNode(4, mkNode(2, mkNode(1), mkNode(3)), mkNode(6, mkNode(5), mkNode(7))),
    mkNode(12, mkNode(10, mkNode(9), mkNode(11)), mkNode(14, mkNode(13), mkNode(15)))
  );
}

export function inorderTraversal(root: TreeNode | null | undefined): TreeAnimationStep[] {
  const steps: TreeAnimationStep[] = [];
  const visited: string[] = [];
  const path: string[] = [];

  function inorder(node: TreeNode | null | undefined) {
    if (!node) return;
    path.push(node.id);
    steps.push({ type: 'go_left', nodeId: node.id, visitedNodes: [...visited], currentPath: [...path], explanation: `Visit node ${node.val}. Go left first.` });
    inorder(node.left);
    visited.push(node.id);
    steps.push({ type: 'visit', nodeId: node.id, visitedNodes: [...visited], currentPath: [...path], explanation: `Visit node ${node.val} (Left done ✓)` });
    inorder(node.right);
    path.pop();
    steps.push({ type: 'backtrack', nodeId: node.id, visitedNodes: [...visited], currentPath: [...path], explanation: `Backtrack from node ${node.val}` });
  }
  inorder(root);
  return steps;
}

export function preorderTraversal(root: TreeNode | null | undefined): TreeAnimationStep[] {
  const steps: TreeAnimationStep[] = [];
  const visited: string[] = [];
  const path: string[] = [];

  function preorder(node: TreeNode | null | undefined) {
    if (!node) return;
    path.push(node.id);
    visited.push(node.id);
    steps.push({ type: 'visit', nodeId: node.id, visitedNodes: [...visited], currentPath: [...path], explanation: `Visit node ${node.val} first (Root → Left → Right)` });
    preorder(node.left);
    preorder(node.right);
    path.pop();
  }
  preorder(root);
  return steps;
}

export function levelOrderTraversal(root: TreeNode | null | undefined): TreeAnimationStep[] {
  const steps: TreeAnimationStep[] = [];
  if (!root) return steps;
  const visited: string[] = [];
  const queue: TreeNode[] = [root];

  while (queue.length > 0) {
    const node = queue.shift()!;
    visited.push(node.id);
    steps.push({ type: 'visit', nodeId: node.id, visitedNodes: [...visited], currentPath: [], levelOrder: [...visited], explanation: `Level-order: visit node ${node.val}` });
    if (node.left) { steps.push({ type: 'enqueue', nodeId: node.left.id, visitedNodes: [...visited], currentPath: [], explanation: `Enqueue left child ${node.left.val}` }); queue.push(node.left); }
    if (node.right) { steps.push({ type: 'enqueue', nodeId: node.right.id, visitedNodes: [...visited], currentPath: [], explanation: `Enqueue right child ${node.right.val}` }); queue.push(node.right); }
  }
  return steps;
}
