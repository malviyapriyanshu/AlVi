import { AnimationStep } from '../../types/animationTypes';
import { TreeNode } from './binarySearchTree';
import { AlgorithmInfo } from '../../types/algorithmTypes';

export const inorderInfo: AlgorithmInfo = {
  name: 'Inorder Traversal',
  category: 'tree',
  description: 'Visits nodes in the order: Left, Root, Right.',
  complexity: { time: { best: 'O(N)', average: 'O(N)', worst: 'O(N)' }, space: 'O(H)' },
  intuition: 'Visiting nodes in ascending order for a BST.',
  analogy: 'Reading a book from left to right.',
  stepByStep: [
    { title: 'Visit Left', description: 'Recursively visit the left subtree.' },
    { title: 'Visit Root', description: 'Process the current node.' },
    { title: 'Visit Right', description: 'Recursively visit the right subtree.' }
  ],
  whenToUse: 'When you need nodes in sorted order from a BST.',
  pseudocode: `def traverse(node):\n  if node:\n    traverse(node.left)\n    visit(node)\n    traverse(node.right)`
};

export const inorderTraversal = (root: TreeNode): AnimationStep[] => {
  const steps: AnimationStep[] = [];
  const visited: string[] = [];

  const traverse = (node: TreeNode | null | undefined) => {
    if (!node) return;

    steps.push({ 
      type: 'highlight_node', 
      nodeId: node.id, 
      explanation: `Moving to left child of ${node.val}`,
      line: 2 // Corresponds to traverse(node.left)
    });
    traverse(node.left);

    visited.push(node.id);
    steps.push({ 
      type: 'visit_node', 
      nodeId: node.id, 
      visitedNodes: [...visited],
      explanation: `Visiting node ${node.val}`,
      line: 3 // Corresponds to visit(node)
    });

    steps.push({ 
      type: 'highlight_node', 
      nodeId: node.id, 
      explanation: `Moving to right child of ${node.val}`,
      line: 4 // Corresponds to traverse(node.right)
    });
    traverse(node.right);
  };

  traverse(root);
  return steps;
};
