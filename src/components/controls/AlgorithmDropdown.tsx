import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronDown, Search, Terminal, Sparkles, Box, Zap, Play } from 'lucide-react';
import { TABS } from '../../app/routes';
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
  const [activeIndex, setActiveIndex] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredAlgorithms = useMemo(() => {
    const categoryIds = (ALGORITHM_CATEGORIES as any)[selectedCategory] || [];
    return categoryIds.map((id: string) => ALL_ALGORITHMS[id]).filter(Boolean) as AlgorithmEntry[];
  }, [selectedCategory]);

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
      setActiveIndex(0);
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
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-x-4 top-20 md:absolute md:inset-auto md:top-[calc(100%+12px)] md:left-0 md:w-full md:min-w-[300px] z-[100] bg-background-primary border border-border rounded-3xl shadow-premium overflow-hidden"
          >


            {/* List */}
            <div className="p-2 overflow-y-auto max-h-[320px] custom-scrollbar">
              <div className="space-y-0.5">
                {filteredAlgorithms.map((algo, index) => {
                  const isSelected = selectedAlgorithmId === algo.id;
                  const isActive = activeIndex === index;
                  return (
                    <button
                      key={algo.id}
                      onClick={() => { setSelectedAlgorithmId(algo.id); setIsOpen(false); }}
                      onMouseEnter={() => setActiveIndex(index)}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all duration-200",
                        isSelected
                          ? "bg-accent-primary text-white shadow-glow-indigo"
                          : isActive 
                            ? "bg-background-secondary text-text-primary"
                            : "text-text-secondary hover:bg-background-secondary hover:text-text-primary"
                      )}
                    >
                      <div className="flex items-center gap-3">
                         <div className={cn(
                           "w-1.5 h-1.5 rounded-full transition-colors",
                           isSelected ? "bg-white" : "bg-text-secondary/20"
                         )} />
                         <span className="text-xs font-bold tracking-tight">{algo.info.name}</span>
                      </div>
                      {!isSelected && (
                        <span className="text-[8px] font-mono font-black uppercase tracking-widest opacity-30">{algo.info.complexity?.time.average}</span>
                      )}
                      {isSelected && <Sparkles size={11} className="text-white/80" />}
                    </button>
                  );
                })}
              </div>
            </div>
            

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
