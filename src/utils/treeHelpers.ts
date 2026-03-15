import { TreeNode } from '../algorithms/tree/binarySearchTree';

export const findNodeById = (node: TreeNode | null | undefined, id: string): TreeNode | null => {
  if (!node) return null;
  if (node.id === id) return node;
  return findNodeById(node.left, id) || findNodeById(node.right, id);
};

export const getTreeHeight = (node: TreeNode | null | undefined): number => {
  if (!node) return 0;
  return 1 + Math.max(getTreeHeight(node.left), getTreeHeight(node.right));
};
