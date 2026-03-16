import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Layers, Dna, Search, Network, GitBranch, Box, TrendingUp, Award, BarChart3 } from 'lucide-react';
import { useAlgorithmStore } from '../../state/useAlgorithmStore';
import { cn } from '../../utils/cn';
import { motion, AnimatePresence } from 'framer-motion';

const categoryItems = [
  { id: 'sorting',    label: 'Sorting',    icon: Dna },
  { id: 'searching',  label: 'Searching',  icon: Search },
  { id: 'graph',      label: 'Graphs',     icon: Network },
  { id: 'tree',       label: 'Trees',      icon: GitBranch },
  { id: 'dp',         label: 'DP',         icon: Box },
  { id: 'techniques', label: 'Techniques', icon: TrendingUp },
  { id: 'comparison', label: 'Race',       icon: BarChart3 },
  { id: 'quiz',       label: 'Assessment', icon: Award },
  { id: 'paths',      label: 'Progress',   icon: BarChart3 },
];

export const CategoryDropdown: React.FC = () => {
  const { selectedCategory, setSelectedCategory } = useAlgorithmStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedItem = categoryItems.find(item => item.id === selectedCategory) || categoryItems[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-black transition-all duration-300",
          isOpen 
            ? "bg-background-primary border-accent-primary shadow-glow-indigo" 
            : "bg-background-secondary border-border text-text-secondary hover:text-text-primary hover:border-accent-primary/50 shadow-sm"
        )}
      >
        <div className={cn(
          "p-1 rounded-lg shrink-0",
          isOpen ? "bg-accent-primary text-white" : "bg-accent-primary/10 text-accent-primary"
        )}>
           <selectedItem.icon size={12} />
        </div>
        <span className="truncate uppercase tracking-wider hidden xs:block">{selectedItem.label}</span>
        <ChevronDown size={12} className={cn("transition-transform duration-300 shrink-0", isOpen && "rotate-180")} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-[calc(100%+8px)] left-0 z-[110] w-56 bg-background-primary border border-border rounded-2xl shadow-premium overflow-hidden p-1"
          >
            <p className="px-3 py-2 text-[8px] font-black text-text-secondary uppercase tracking-[0.2em] opacity-40">
              Select Domain
            </p>
            <div className="space-y-0.5">
              {categoryItems.map((item) => {
                const isActive = selectedCategory === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => { setSelectedCategory(item.id); setIsOpen(false); }}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200",
                      isActive
                        ? "bg-accent-primary text-white"
                        : "text-text-secondary hover:bg-background-secondary hover:text-text-primary"
                    )}
                  >
                    <item.icon size={14} />
                    <span className="text-xs font-bold">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
