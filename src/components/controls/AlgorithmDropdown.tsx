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
        className={`relative flex w-full items-center justify-between rounded-xl border bg-slate-800/50 px-3 py-2.5 text-sm font-semibold text-white transition-all
          ${isOpen ? 'border-indigo-500/50 ring-2 ring-indigo-500/20' : 'border-slate-700/50 hover:border-slate-600 hover:bg-slate-800'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <div className="flex items-center gap-2.5 truncate">
          <div className="bg-indigo-500/15 p-1.5 rounded-lg border border-indigo-500/20">
            <Terminal size={12} className="text-indigo-400" />
          </div>
          <div className="flex flex-col items-start leading-none gap-0.5">
            <span className="text-[9px] font-semibold text-slate-500 uppercase tracking-wider">{label}</span>
            <span className="truncate text-slate-200 text-xs">{selectedOption?.name || 'Select...'}</span>
          </div>
        </div>
        <ChevronDown size={14} className={`text-slate-500 transition-transform ${isOpen ? 'rotate-180 text-indigo-400' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-[calc(100%+8px)] z-[100] w-full min-w-[300px] rounded-2xl border border-slate-700/50 bg-slate-900 backdrop-blur-xl shadow-glass animate-fade-in overflow-hidden" role="listbox">
          {/* Search */}
          <div className="p-3 border-b border-slate-800">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={13} />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search algorithm..."
                value={searchQuery}
                onKeyDown={handleKeyDown}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl py-2 pl-9 pr-3 text-xs font-medium text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/50 transition-all"
              />
            </div>
          </div>

          {/* Options */}
          <div className="p-2 overflow-y-auto max-h-[350px] custom-scrollbar">
            {filteredAlgorithms.length > 0 ? (
              <div className="flex flex-col gap-0.5 mt-1">
                {filteredAlgorithms.map((algo: AlgorithmEntry, index: number) => (
                  <button
                    key={algo.id}
                    onClick={() => { setSelectedAlgorithmId(algo.id); setIsOpen(false); }}
                    onMouseEnter={() => setActiveIndex(index)}
                    role="option"
                    aria-selected={selectedAlgorithmId === algo.id || activeIndex === index}
                    className={`flex w-full items-center justify-between px-3 py-2.5 text-[12px] font-semibold rounded-xl transition-all
                      ${(selectedAlgorithmId === algo.id || activeIndex === index)
                        ? 'bg-indigo-500 text-white shadow-glow-indigo'
                        : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                  >
                    <div className="flex items-center gap-2.5">
                      {selectedAlgorithmId === algo.id
                        ? <Sparkles size={11} className="text-white" />
                        : <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />}
                      <span className="truncate">{algo.info.name}</span>
                    </div>
                    {selectedAlgorithmId === algo.id && (
                      <span className="bg-white/20 px-1.5 py-0.5 rounded text-[8px] uppercase tracking-tight">Active</span>
                    )}
                  </button>
                ))}
              </div>
            ) : (
              <div className="py-10 text-center">
                <Search size={28} className="mx-auto text-slate-700 mb-2" />
                <p className="text-xs text-slate-600 font-medium">No results for "{searchQuery}"</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
