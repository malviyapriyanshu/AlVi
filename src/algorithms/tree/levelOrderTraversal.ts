import { AnimationStep } from '../../types/animationTypes';
import { TreeNode } from './binarySearchTree';

export function levelOrderTraversal(root: TreeNode | null | undefined): AnimationStep[] {
  const steps: AnimationStep[] = [];
  if (!root) return steps;
  const visited: string[] = [];
  const queue: TreeNode[] = [root];

  while (queue.length > 0) {
    const node = queue.shift()!;
    visited.push(node.id);
    steps.push({ type: 'dequeue', nodeId: node.id, visitedNodes: [...visited], explanation: `Visiting node ${node.val} from queue` });
    if (node.left) {
      steps.push({ type: 'enqueue', nodeId: node.left.id, explanation: `Enqueuing left child ${node.left.val}` });
      queue.push(node.left);
    }
    if (node.right) {
      steps.push({ type: 'enqueue', nodeId: node.right.id, explanation: `Enqueuing right child ${node.right.val}` });
      queue.push(node.right);
    }
  }
  return steps;
}
