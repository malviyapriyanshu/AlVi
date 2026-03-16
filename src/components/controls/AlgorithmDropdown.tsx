import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronDown, Search, Terminal, Sparkles, Box, Zap } from 'lucide-react';
import { useAlgorithmStore } from '../../state/useAlgorithmStore';
import { ALL_ALGORITHMS, ALGORITHM_CATEGORIES } from '../../data/algorithmRegistry';
import { AlgorithmEntry } from '../../types/algorithmTypes';
import { cn } from '../../utils/cn';
import { motion, AnimatePresence } from 'framer-motion';

interface AlgorithmDropdownProps {
  label: string;
  disabled?: boolean;
}

export const AlgorithmDropdown: React.FC<AlgorithmDropdownProps> = ({ label, disabled }) => {
  const { selectedAlgorithmId, setSelectedAlgorithmId, selectedCategory } = useAlgorithmStore();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const filteredAlgorithms = useMemo(() => {
    // Current category filtering
    const categoryIds = (ALGORITHM_CATEGORIES as any)[selectedCategory] || [];
    const algorithms = categoryIds.map((id: string) => ALL_ALGORITHMS[id]).filter(Boolean) as AlgorithmEntry[];
    
    // Also include other algorithms if they match search? 
    // Usually a dropdown in this context might should show all or just current category.
    // Given the 3-column layout, we'll keep it to category but allow global search in command palette.
    
    if (!searchQuery) return algorithms;
    return algorithms.filter(algo => 
      algo.info.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [selectedCategory, searchQuery]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === 'ArrowDown') setIsOpen(true);
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex(prev => (prev + 1) % Math.max(filteredAlgorithms.length, 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex(prev => (prev - 1 + filteredAlgorithms.length) % Math.max(filteredAlgorithms.length, 1));
        break;
      case 'Enter':
        e.preventDefault();
        if (filteredAlgorithms[activeIndex]) {
          setSelectedAlgorithmId(filteredAlgorithms[activeIndex].id);
          setIsOpen(false);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        break;
    }
  };

  const selectedOption = useMemo(() => 
    ALL_ALGORITHMS[selectedAlgorithmId]?.info,
    [selectedAlgorithmId]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setSearchQuery('');
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className={cn(
          "relative flex w-full items-center justify-between rounded-2xl border px-4 py-2.5 text-sm font-black transition-all duration-300",
          isOpen 
            ? "bg-background-primary border-accent-primary shadow-glow-indigo" 
            : "bg-background-secondary border-border text-text-secondary hover:text-text-primary hover:border-accent-primary/50 shadow-sm",
          disabled && "opacity-40 cursor-not-allowed"
        )}
      >
        <div className="flex items-center gap-3 truncate">
          <div className={cn(
            "p-1.5 rounded-lg transition-colors",
            isOpen ? "bg-accent-primary text-white" : "bg-background-primary text-text-secondary"
          )}>
            <Box size={14} />
          </div>
          <div className="flex flex-col items-start leading-none gap-1">
            <span className="text-[8px] font-black text-text-secondary uppercase tracking-[0.2em]">{label}</span>
            <span className="truncate text-text-primary text-xs tracking-tight">{selectedOption?.name || 'Select Module...'}</span>
          </div>
        </div>
        <ChevronDown size={14} className={cn("text-text-secondary transition-transform duration-500", isOpen && "rotate-180 text-accent-primary")} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-[calc(100%+12px)] z-[100] w-full min-w-[300px] bg-background-primary border border-border rounded-3xl shadow-premium overflow-hidden"
          >
            {/* Search Header */}
            <div className="p-4 bg-background-secondary/50 border-b border-border transition-colors group-focus-within:bg-background-secondary">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary opacity-40" size={14} />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Engine Search..."
                  value={searchQuery}
                  onKeyDown={handleKeyDown}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-background-primary border border-border rounded-xl py-2 pl-10 pr-4 text-xs font-bold text-text-primary placeholder:text-text-secondary/40 focus:outline-none focus:border-accent-primary transition-all"
                />
              </div>
            </div>

            {/* List */}
            <div className="p-2 overflow-y-auto max-h-[320px] custom-scrollbar">
              {filteredAlgorithms.length > 0 ? (
                <div className="space-y-1">
                  {filteredAlgorithms.map((algo, index) => {
                    const isSelected = selectedAlgorithmId === algo.id;
                    const isActive = activeIndex === index;
                    return (
                      <button
                        key={algo.id}
                        onClick={() => { setSelectedAlgorithmId(algo.id); setIsOpen(false); }}
                        onMouseEnter={() => setActiveIndex(index)}
                        className={cn(
                          "w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200",
                          (isSelected || isActive)
                            ? "bg-accent-primary text-white shadow-glow-indigo"
                            : "text-text-secondary hover:bg-background-secondary hover:text-text-primary"
                        )}
                      >
                        <div className="flex items-center gap-3">
                           <div className={cn(
                             "w-1.5 h-1.5 rounded-full transition-colors",
                             isSelected ? "bg-white" : "bg-text-secondary/20"
                           )} />
                           <span className="text-xs font-black tracking-tight">{algo.info.name}</span>
                        </div>
                        {isSelected ? (
                          <Sparkles size={11} className="text-white/80" />
                        ) : (
                          <span className="text-[9px] font-mono font-black uppercase tracking-widest opacity-40">{algo.info.complexity?.time.average}</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="py-10 text-center flex flex-col items-center gap-3 opacity-30">
                  <Box size={24} className="text-text-secondary" />
                  <p className="text-[10px] font-black uppercase tracking-widest leading-none">Vacuum Detected</p>
                </div>
              )}
            </div>
            
            {/* Command Shortcut Info */}
            <div className="px-4 py-3 bg-background-secondary/30 border-t border-border flex items-center justify-between">
               <span className="text-[9px] font-black text-text-secondary uppercase tracking-widest">Global Search</span>
               <div className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 rounded border border-border bg-background-primary text-[9px] font-black text-text-primary shadow-sm">⌘</kbd>
                  <kbd className="px-1.5 py-0.5 rounded border border-border bg-background-primary text-[9px] font-black text-text-primary shadow-sm">K</kbd>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
