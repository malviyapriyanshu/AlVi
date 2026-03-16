import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Dna, 
  Search, 
  Network, 
  GitBranch, 
  Box, 
  BarChart3, 
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Award,
  Layers
} from 'lucide-react';
import { TabId } from '../../app/routes';
import { cn } from '../../utils/cn';

interface SidebarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const navItems = [
  { id: 'sorting',    label: 'Sorting',    icon: Dna },
  { id: 'searching',  label: 'Searching',  icon: Search },
  { id: 'graph',      label: 'Graphs',     icon: Network },
  { id: 'tree',       label: 'Trees',      icon: GitBranch },
  { id: 'dp',         label: 'DP',         icon: Box },
  { id: 'techniques', label: 'Techniques', icon: TrendingUp },
  { id: 'quiz',       label: 'Assessment', icon: Award },
  { id: 'paths',      label: 'Progress',   icon: BarChart3 },
];

export const ModernSidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 260 }}
      className="h-full bg-background-primary flex flex-col relative z-20"
    >
      {/* Header */}
      <div className="h-16 flex items-center px-6 mb-4 border-b border-border/50">
        <div className="w-9 h-9 rounded-xl bg-accent-primary flex items-center justify-center text-white shadow-glow-indigo shrink-0">
          <Layers size={20} />
        </div>
        {!isCollapsed && (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="ml-3 font-black text-xl tracking-tighter text-text-primary uppercase"
          >
            AlgoVis<span className="text-accent-primary">.</span>
          </motion.span>
        )}
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-3 space-y-1 overflow-hidden overflow-y-auto custom-scrollbar">
         <p className={cn(
           "px-4 text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] mb-4 transition-opacity",
           isCollapsed ? "opacity-0" : "opacity-40"
         )}>
           Core modules
         </p>
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id as TabId)}
              className={cn(
                "w-full group relative flex items-center gap-3 px-3 py-2 rounded-2xl transition-all duration-300",
                isActive 
                  ? "bg-accent-primary/5 text-accent-primary" 
                  : "text-text-secondary hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-text-primary"
              )}
            >
              <div className={cn(
                "shrink-0 w-10 h-10 flex items-center justify-center rounded-xl transition-all",
                isActive ? "bg-accent-primary text-white shadow-glow-indigo" : "bg-background-secondary group-hover:bg-background-primary"
              )}>
                <item.icon size={20} />
              </div>

              {!isCollapsed && (
                <div className="flex flex-col items-start leading-none pt-0.5">
                   <span className="font-bold text-sm tracking-tight">{item.label}</span>
                   <span className="text-[10px] opacity-40 font-bold uppercase tracking-widest mt-1">Module</span>
                </div>
              )}

              {/* Active Indicator */}
              {isActive && (
                <motion.div
                  layoutId="active-nav-indicator"
                  className="absolute right-0 w-1 h-6 bg-accent-primary rounded-l-full"
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border mt-auto">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full h-11 flex items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 text-text-secondary transition-colors"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <div className="flex items-center gap-3 font-black text-[10px] uppercase tracking-widest"><ChevronLeft size={16} /> Hide Workspace</div>}
        </button>
      </div>
    </motion.aside>
  );
};
