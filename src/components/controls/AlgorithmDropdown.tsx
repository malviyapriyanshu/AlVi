import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronDown, Search, Cpu, Terminal, Sparkles } from 'lucide-react';
import { useAlgorithmStore } from '../../state/useAlgorithmStore';

interface Option {
  id: string;
  name: string;
}

interface Category {
  title: string;
  options: Option[];
}

interface AlgorithmDropdownProps {
  label: string;
  categories: Category[];
  disabled?: boolean;
}

export const AlgorithmDropdown: React.FC<AlgorithmDropdownProps> = ({ label, categories, disabled }) => {
  const { selectedAlgorithmId, setSelectedAlgorithmId } = useAlgorithmStore();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const selectedOption = useMemo(() => 
    categories.flatMap(c => c.options).find(o => o.id === selectedAlgorithmId),
    [categories, selectedAlgorithmId]
  );

  const filteredCategories = useMemo(() => {
    if (!searchQuery) return categories;
    return categories.map(cat => ({
      ...cat,
      options: cat.options.filter(opt => 
        opt.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })).filter(cat => cat.options.length > 0);
  }, [categories, searchQuery]);

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
    <div className="relative w-full group" ref={dropdownRef}>
      <button
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`relative flex w-full items-center justify-between rounded-2xl border bg-slate-950/40 backdrop-blur-xl px-4 py-3 text-sm font-bold text-white transition-all 
          ${isOpen ? 'border-primary/50 ring-4 ring-primary/10' : 'border-slate-800 hover:border-slate-700 hover:bg-slate-900/60 shadow-2xl'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <div className="flex items-center gap-3 truncate">
          <div className="bg-primary/20 p-1.5 rounded-lg border border-primary/20">
             <Terminal size={14} className="text-primary" />
          </div>
          <div className="flex flex-col items-start leading-none gap-1">
             <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</span>
             <span className="truncate text-slate-100">{selectedOption?.name || 'Search...'}</span>
          </div>
        </div>
        <ChevronDown size={16} className={`text-slate-500 transition-transform duration-500 ${isOpen ? 'rotate-180 text-primary' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-[calc(100%+12px)] z-[100] w-full min-w-[320px] rounded-[2rem] border border-slate-800 bg-slate-900/95 backdrop-blur-2xl shadow-[0_40px_100px_rgba(0,0,0,0.6)] animate-in fade-in zoom-in-95 duration-300 overflow-hidden">
          {/* Search Header */}
          <div className="p-4 border-b border-slate-800 bg-slate-950/50">
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
                <input 
                  ref={searchInputRef}
                  type="text"
                  placeholder="Type to search algorithm..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-xs font-bold text-white placeholder:text-slate-600 focus:outline-none focus:border-primary/50 transition-all shadow-inner"
                />
             </div>
          </div>

          {/* List Content */}
          <div className="p-2 overflow-y-auto max-h-[400px] custom-scrollbar">
            {filteredCategories.length > 0 ? filteredCategories.map((category) => (
              <div key={category.title} className="mb-4 last:mb-0">
                <div className="px-3 py-2 flex items-center gap-3">
                   <div className="h-px flex-1 bg-slate-800/80" />
                   <span className="text-[9px] font-black text-slate-600 uppercase tracking-[0.3em]">{category.title}</span>
                   <div className="h-px flex-1 bg-slate-800/80" />
                </div>
                <div className="grid gap-1 mt-1">
                  {category.options.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => { setSelectedAlgorithmId(option.id); setIsOpen(false); }}
                      className={`group/opt flex w-full items-center justify-between px-3 py-3 text-[13px] font-bold rounded-xl transition-all
                        ${selectedAlgorithmId === option.id 
                          ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]' 
                          : 'text-slate-400 hover:bg-slate-800/80 hover:text-white hover:translate-x-1'}`}
                    >
                      <div className="flex items-center gap-3">
                        {selectedAlgorithmId === option.id ? <Sparkles size={12} className="text-white animate-pulse" /> : <div className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover/opt:bg-primary transition-colors" />}
                        <span className="truncate">{option.name}</span>
                      </div>
                      {selectedAlgorithmId === option.id && (
                        <div className="bg-white/20 px-2 py-0.5 rounded text-[8px] uppercase tracking-tighter">Active</div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )) : (
              <div className="py-12 text-center">
                 <Search size={32} className="mx-auto text-slate-800 mb-3" />
                 <p className="text-xs font-bold text-slate-600">No algorithms found match "{searchQuery}"</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
