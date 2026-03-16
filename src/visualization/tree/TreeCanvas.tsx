import React, { useMemo } from 'react';
import { TreeNode as TreeNodeComp } from './TreeNode';
import { TreeNode } from '../../algorithms/tree/binarySearchTree';
import { AnimationStep } from '../../types/animationTypes';
import { useTheme } from '../../theme/themeProvider';
import { motion } from 'framer-motion';

interface TreeCanvasProps {
  root: TreeNode;
  currentStep?: AnimationStep;
}

interface RenderNode {
  id: string;
  val: number;
  x: number;
  y: number;
  parentId?: string;
}

export const TreeCanvas: React.FC<TreeCanvasProps> = ({ root, currentStep }) => {
  const { resolvedTheme } = useTheme();
  const visited = currentStep?.visitedNodes ?? [];
  const activeNodeId = currentStep?.nodeId;

  const nodesToRender = useMemo(() => {
    const list: RenderNode[] = [];
    const traverse = (node: TreeNode, x: number, y: number, offset: number, parentId?: string) => {
      list.push({ id: node.id, val: node.val, x, y, parentId });
      if (node.left)  traverse(node.left,  x - offset, y + 80, offset / 2, node.id);
      if (node.right) traverse(node.right, x + offset, y + 80, offset / 2, node.id);
    };
    traverse(root, 300, 50, 120);
    return list;
  }, [root]);

  const getNodeColor = (nodeId: string) => {
    if (activeNodeId === nodeId) return '#6366f1'; // Indigo
    if (visited.includes(nodeId)) return '#10b981'; // Emerald
    return resolvedTheme === 'dark' ? '#334155' : '#e2e8f0';
  };

  return (
    <div className="flex-1 w-full flex items-center justify-center p-4 sm:p-8 overflow-hidden min-h-[300px] sm:min-h-[500px] relative transition-all duration-1000">
      <div className="absolute top-4 sm:top-6 left-4 sm:left-8 flex sm:flex-col gap-3 sm:gap-2 bg-background-primary/40 backdrop-blur-sm p-2 rounded-xl sm:bg-transparent sm:p-0">
         <LegendItem color="bg-indigo-500" label="Cursor" />
         <LegendItem color="bg-emerald-500" label="Memory" />
      </div>

      <svg width="100%" height="100%" viewBox="0 0 600 500" className="max-w-full max-h-full">
        {/* Draw Edges first */}
        {nodesToRender.map(node => {
          if (!node.parentId) return null;
          const parent = nodesToRender.find(n => n.id === node.parentId)!;
          const isActive = (activeNodeId === node.id && visited.includes(parent.id));
          
          return (
            <motion.line
              key={`e-${node.id}`}
              initial={false}
              animate={{ x1: parent.x, y1: parent.y, x2: node.x, y2: node.y }}
              stroke={isActive ? '#6366f1' : (resolvedTheme === 'dark' ? '#1e293b' : '#cbd5e1')}
              strokeWidth={isActive ? 3 : 1.5}
              strokeDasharray={isActive ? '0' : '4 4'}
              transition={{ type: 'spring', damping: 20, stiffness: 150 }}
            />
          );
        })}

        {/* Draw Nodes */}
        {nodesToRender.map(node => (
          <TreeNodeComp
            key={node.id}
            x={node.x} y={node.y}
            val={node.val}
            color={getNodeColor(node.id)}
            isActive={activeNodeId === node.id}
          />
        ))}
      </svg>
    </div>
  );
};

const LegendItem = ({ color, label }: { color: string, label: string }) => (
  <div className="flex items-center gap-2">
    <div className={`w-2 h-2 rounded-full ${color}`} />
    <span className="text-[9px] font-black text-text-secondary uppercase tracking-widest">{label}</span>
  </div>
);
