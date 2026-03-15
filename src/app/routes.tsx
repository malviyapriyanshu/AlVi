import { 
  BarChart3, GitBranch, TreePine, Layers, BarChart2, Code2, Wand2, Trophy, Map 
} from 'lucide-react';

export const TABS = [
  { id: 'visualizer', label: 'Visualizer', icon: BarChart3 },
  { id: 'graph',      label: 'Graphs',     icon: GitBranch },
  { id: 'tree',       label: 'Trees',      icon: TreePine },
  { id: 'dp',         label: 'Dynamic Programming', icon: Layers },
  { id: 'compare',    label: 'Compare',    icon: BarChart2 },
  { id: 'code',       label: 'Code It',    icon: Code2 },
  { id: 'playground', label: 'Playground', icon: Wand2 },
  { id: 'quiz',       label: 'Quiz',       icon: Trophy },
  { id: 'paths',      label: 'Learn',      icon: Map },
] as const;

export type TabId = typeof TABS[number]['id'];
