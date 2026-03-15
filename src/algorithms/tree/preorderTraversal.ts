import { AnimationStep } from '../../types/animationTypes';
import { TreeNode } from './binarySearchTree';

export function preorderTraversal(root: TreeNode | null | undefined): AnimationStep[] {
  const steps: AnimationStep[] = [];
  const visited: string[] = [];

  function preorder(node: TreeNode | null | undefined) {
    if (!node) return;
    visited.push(node.id);
    steps.push({ type: 'visit', nodeId: node.id, visitedNodes: [...visited], explanation: `Visiting root node ${node.val}` });
    preorder(node.left);
    preorder(node.right);
  }
  preorder(root);
  return steps;
}
