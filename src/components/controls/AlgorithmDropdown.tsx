import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronDown, Search, Terminal, Sparkles } from 'lucide-react';
import { useAlgorithmStore } from '../../state/useAlgorithmStore';
import { ALL_ALGORITHMS, ALGORITHM_CATEGORIES } from '../../data/algorithmRegistry';
import { AlgorithmEntry } from '../../types/algorithmTypes';

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
    const categoryIds = (ALGORITHM_CATEGORIES as any)[selectedCategory] || [];
    const algorithms = categoryIds.map((id: string) => ALL_ALGORITHMS[id]).filter(Boolean) as AlgorithmEntry[];
    
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
        setActiveIndex(prev => (prev + 1) % filteredAlgorithms.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex(prev => (prev - 1 + filteredAlgorithms.length) % filteredAlgorithms.length);
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
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`relative flex w-full items-center justify-between rounded-xl border px-3 py-2 text-sm font-bold transition-all
          ${isOpen 
            ? 'bg-white dark:bg-slate-900 border-indigo-500/50 ring-4 ring-indigo-500/10' 
            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/80 shadow-sm'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <div className="flex items-center gap-2.5 truncate">
          <div className="p-1.5 bg-indigo-50 dark:bg-indigo-500/10 rounded-lg text-indigo-600 dark:text-indigo-400">
            <Terminal size={12} strokeWidth={2.5} />
          </div>
          <div className="flex flex-col items-start leading-none gap-0.5">
            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{label}</span>
            <span className="truncate text-slate-900 dark:text-slate-100 text-xs tracking-tight">{selectedOption?.name || 'Select...'}</span>
          </div>
        </div>
        <ChevronDown size={14} className={`text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-indigo-500' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-[calc(100%+8px)] z-[100] w-full min-w-[320px] rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-premium animate-fade-in overflow-hidden" role="listbox">
          {/* Search Header */}
          <div className="p-3 bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={13} strokeWidth={2.5} />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Find algorithm..."
                value={searchQuery}
                onKeyDown={handleKeyDown}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-2 pl-9 pr-3 text-[11px] font-bold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/5 transition-all"
              />
            </div>
          </div>

          {/* List Options */}
          <div className="p-2 overflow-y-auto max-h-[300px] custom-scrollbar">
            {filteredAlgorithms.length > 0 ? (
              <div className="grid grid-cols-1 gap-0.5">
                {filteredAlgorithms.map((algo: AlgorithmEntry, index: number) => {
                  const isSelected = selectedAlgorithmId === algo.id;
                  const isActive = activeIndex === index;
                  return (
                    <button
                      key={algo.id}
                      onClick={() => { setSelectedAlgorithmId(algo.id); setIsOpen(false); }}
                      onMouseEnter={() => setActiveIndex(index)}
                      role="option"
                      aria-selected={isSelected}
                      className={`flex w-full items-center justify-between px-3 py-2.5 rounded-xl transition-all
                        ${(isSelected || isActive)
                          ? 'bg-indigo-600 text-white shadow-btn-indigo'
                          : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white' : 'bg-slate-300 dark:bg-slate-700'}`} />
                        <span className="text-xs font-bold truncate tracking-tight">{algo.info.name}</span>
                      </div>
                      {isSelected ? (
                         <Sparkles size={11} className="text-amber-300" />
                      ) : (
                         <span className="text-[8px] font-black uppercase tracking-widest opacity-40">{algo.info.complexity?.time.average}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="py-12 text-center">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-950 flex items-center justify-center mx-auto mb-3">
                  <Search size={20} className="text-slate-300" />
                </div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">No matches found</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
