import { 
  BarChart3, GitBranch, TreePine, Layers, BarChart2, Code2, Wand2, Trophy, Map 
} from 'lucide-react';

export const TABS = [
  { id: 'visualizer', label: 'Visualizer', icon: <BarChart3 size={18} /> },
  { id: 'graph',      label: 'Graphs',     icon: <GitBranch size={18} /> },
  { id: 'tree',       label: 'Trees',      icon: <TreePine size={18} /> },
  { id: 'dp',         label: 'Dynamic Programming', icon: <Layers size={18} /> },
  { id: 'compare',    label: 'Compare',    icon: <BarChart2 size={18} /> },
  { id: 'code',       label: 'Code It',    icon: <Code2 size={18} /> },
  { id: 'playground', label: 'Playground', icon: <Wand2 size={18} /> },
  { id: 'quiz',       label: 'Quiz',       icon: <Trophy size={18} /> },
  { id: 'paths',      label: 'Learn',      icon: <Map size={18} /> },
] as const;

export type TabId = typeof TABS[number]['id'];
