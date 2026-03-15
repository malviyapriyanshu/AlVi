import { AnimationStep } from '../../types/animationTypes';

export interface TreeNode {
  val: number;
  left?: TreeNode | null;
  right?: TreeNode | null;
  id: string;
}

export function buildSampleBST(): TreeNode {
  let nodeCounter = 0;
  const mkNode = (val: number, left?: TreeNode, right?: TreeNode): TreeNode =>
    ({ val, left, right, id: `n${nodeCounter++}` });
  return mkNode(8,
    mkNode(4, mkNode(2, mkNode(1), mkNode(3)), mkNode(6, mkNode(5), mkNode(7))),
    mkNode(12, mkNode(10, mkNode(9), mkNode(11)), mkNode(14, mkNode(13), mkNode(15)))
  );
}
