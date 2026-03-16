import React from 'react';
import { TreeNode as TreeComponent } from './TreeNode';
import { TreeNode, TreeAnimationStep } from '../../types/extended';
import { useThemeStore } from '../../state/useThemeStore';

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
  const { theme } = useThemeStore();
  
  // Center positions based on root
  const positions = assignPositions(root, 300, 50, 140);
  const visited = currentStep?.visitedNodes ?? [];
  const activeNodeId = currentStep?.nodeId;

  const getNodeColor = (nodeId: string) => {
    if (nodeId === activeNodeId) return '#6366f1'; // Indigo-500
    if (visited.includes(nodeId))  return '#10b981'; // Emerald-500
    return theme === 'dark' ? '#334155' : '#e2e8f0'; // Default
  };

  return (
    <div className="flex-1 w-full bg-transparent flex items-center justify-center overflow-hidden relative">
      <svg width="100%" height="100%" viewBox="0 0 600 400" className="max-w-full max-h-full p-8">
        {/* Render Edges first to be behind nodes */}
        {positions.map((node) => {
          const edgeColor = theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)';
          return (
            <React.Fragment key={`edges-group-${node.id}`}>
              {node.left && (
                <line 
                  x1={node.x} y1={node.y} 
                  x2={positions.find(p => p.id === node.left?.id)?.x || node.x} 
                  y2={positions.find(p => p.id === node.left?.id)?.y || node.y}
                  stroke={edgeColor} 
                  strokeWidth={1.5}
                  strokeDasharray="4,4"
                  className="transition-all duration-500"
                />
              )}
              {node.right && (
                <line 
                  x1={node.x} y1={node.y} 
                  x2={positions.find(p => p.id === node.right?.id)?.x || node.x} 
                  y2={positions.find(p => p.id === node.right?.id)?.y || node.y}
                  stroke={edgeColor} 
                  strokeWidth={1.5}
                  strokeDasharray="4,4"
                  className="transition-all duration-500"
                />
              )}
            </React.Fragment>
          );
        })}

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
