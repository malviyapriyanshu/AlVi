import { 
  BarChart3, GitBranch, TreePine, Layers, BarChart2, Code2, Wand2, Trophy, Map 
} from 'lucide-react';

export const TABS = [
  { id: 'sorting',    label: 'Sorting',    icon: BarChart3 },
  { id: 'searching',  label: 'Searching',  icon: Map },
  { id: 'tree',       label: 'Tree',       icon: TreePine },
  { id: 'graph',      label: 'Graph',      icon: GitBranch },
  { id: 'dp',         label: 'DP',         icon: Layers },
  { id: 'techniques', label: 'Techniques', icon: Wand2 },
  { id: 'comparison', label: 'Race',       icon: BarChart3 },
  { id: 'quiz',       label: 'Quiz',       icon: Trophy },
  { id: 'paths',      label: 'Learn',      icon: BarChart2 },
] as const;

export type TabId = typeof TABS[number]['id'];
