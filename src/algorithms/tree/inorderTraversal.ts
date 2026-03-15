import { AnimationStep } from '../../types/animationTypes';
import { TreeNode } from './binarySearchTree';

export const inorderTraversal = (root: TreeNode | null): AnimationStep[] => {
  const steps: AnimationStep[] = [];
  
  function traverse(node: TreeNode | null) {
    if (!node) return;
    
    steps.push({ type: 'visit_node', nodeId: node.id, explanation: `Moving to left child of ${node.val}` });
    traverse(node.left ?? null);
    
    steps.push({ type: 'highlight_node', nodeId: node.id, explanation: `Visiting node ${node.val}` });
    
    steps.push({ type: 'visit_node', nodeId: node.id, explanation: `Moving to right child of ${node.val}` });
    traverse(node.right ?? null);
  }

  traverse(root);
  return steps;
};
