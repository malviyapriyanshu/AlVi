import React from 'react';
import { TreeNode as TreeComponent } from './TreeNode';
import { TreeNode, TreeAnimationStep } from '../../types/extended';

interface TreeCanvasProps {
  root: TreeNode;
  currentStep?: TreeAnimationStep;
}

interface PositionedNode extends TreeNode {
  x: number;
  y: number;
}

function assignPositions(node: TreeNode | null | undefined, x: number, y: number, spread: number): PositionedNode[] {
  if (!node) return [];
  const result: PositionedNode[] = [{ ...node, x, y }];
  if (node.left) result.push(...assignPositions(node.left, x - spread, y + 80, spread * 0.5));
  if (node.right) result.push(...assignPositions(node.right, x + spread, y + 80, spread * 0.5));
  return result;
}

export const TreeCanvas: React.FC<TreeCanvasProps> = ({ root, currentStep }) => {
  const positions = assignPositions(root, 300, 40, 140);
  const visited = currentStep?.visitedNodes ?? [];
  const activeNodeId = currentStep?.nodeId;

  const getNodeColor = (nodeId: string) => {
    if (nodeId === activeNodeId) return '#3b82f6'; // Blue-500 (Active)
    if (visited.includes(nodeId)) return '#10b981';  // Emerald-500 (Visited)
    return '#334155'; // Slate-700 (Default)
  };

  return (
    <div className="flex-1 w-full bg-slate-900/50 rounded-[32px] border border-slate-800/60 p-8 flex items-center justify-center overflow-hidden relative">
      <svg width="100%" height="100%" viewBox="0 0 600 400" className="drop-shadow-2xl">
        {/* Render Edges first */}
        {positions.map((node) => (
          <React.Fragment key={`edges-${node.id}`}>
            {node.left && (
              <line 
                x1={node.x} y1={node.y} 
                x2={positions.find(p => p.id === node.left?.id)?.x || node.x} 
                y2={positions.find(p => p.id === node.left?.id)?.y || node.y}
                stroke="#ffffff10" strokeWidth={2}
                className="transition-all duration-500"
              />
            )}
            {node.right && (
              <line 
                x1={node.x} y1={node.y} 
                x2={positions.find(p => p.id === node.right?.id)?.x || node.x} 
                y2={positions.find(p => p.id === node.right?.id)?.y || node.y}
                stroke="#ffffff10" strokeWidth={2}
                className="transition-all duration-500"
              />
            )}
          </React.Fragment>
        ))}

        {/* Render Nodes */}
        {positions.map((node) => (
          <TreeComponent 
            key={node.id}
            x={node.x} y={node.y}
            val={node.val}
            color={getNodeColor(node.id)}
            isActive={node.id === activeNodeId}
          />
        ))}
      </svg>
    </div>
  );
};
