import React from 'react';
import { TreeNode as TreeComponent } from './TreeNode';
import { TreeNode, TreeAnimationStep } from '../../types/extended';

interface TreeCanvasProps {
  root: TreeNode;
  currentStep?: TreeAnimationStep;
}

function assignPositions(node: TreeNode | null | undefined, x: number, y: number, spread: number): (TreeNode & { x: number; y: number })[] {
  if (!node) return [];
  const result: (TreeNode & { x: number; y: number })[] = [{ ...node, x, y }];
  result.push(...assignPositions(node.left, x - spread, y + 70, spread * 0.52));
  result.push(...assignPositions(node.right, x + spread, y + 70, spread * 0.52));
  return result;
}

export const TreeCanvas: React.FC<TreeCanvasProps> = ({ root, currentStep }) => {
  const positions = assignPositions(root, 300, 35, 120);
  const visited = currentStep?.visitedNodes ?? [];
  const activeNodeId = currentStep?.nodeId;

  const getNodeColor = (nodeId: string) => {
    if (nodeId === activeNodeId) return '#818cf8';
    if (visited.includes(nodeId)) return '#34d399';
    return '#334155';
  };

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-700/50 overflow-hidden" style={{ height: 300 }}>
      <svg width="100%" height="100%" viewBox="0 0 600 280">
        {positions.map((node, idx) => (
          <TreeComponent 
            key={node.id}
            x={node.x} y={node.y}
            val={node.val}
            color={getNodeColor(node.id)}
          />
        ))}
      </svg>
    </div>
  );
};
