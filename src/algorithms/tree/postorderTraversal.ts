import { AnimationStep } from '../../types/animationTypes';
import { TreeNode } from './binarySearchTree';

export function postorderTraversal(root: TreeNode | null | undefined): AnimationStep[] {
  const steps: AnimationStep[] = [];
  const visited: string[] = [];

  function postorder(node: TreeNode | null | undefined) {
    if (!node) return;
    steps.push({ type: 'highlight_node', nodeId: node.id, explanation: `Traversing left subtree of ${node.val}`, line: 1 });
    postorder(node.left);
    steps.push({ type: 'highlight_node', nodeId: node.id, explanation: `Traversing right subtree of ${node.val}`, line: 2 });
    postorder(node.right);
    visited.push(node.id);
    steps.push({ type: 'visit_node', nodeId: node.id, visitedNodes: [...visited], explanation: `Visiting node ${node.val} (both subtrees done)`, line: 3 });
  }
  postorder(root);
  return steps;
}
