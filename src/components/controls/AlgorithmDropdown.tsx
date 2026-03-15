import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, Cpu } from 'lucide-react';
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
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = categories.flatMap(c => c.options).find(o => o.id === selectedAlgorithmId);

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
    <div className="relative w-full lg:w-72 group" ref={dropdownRef}>
      <div className="flex items-center gap-2 mb-1.5 ml-1">
        <Cpu size={12} className="text-indigo-400" />
        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{label}</span>
      </div>
      
      <button
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`relative flex w-full items-center justify-between rounded-2xl border bg-slate-800/40 backdrop-blur-md px-4 py-3 text-sm font-bold text-white transition-all ring-offset-2 ring-offset-slate-900 focus:ring-2 focus:ring-indigo-500/50 
          ${isOpen ? 'border-indigo-500/50 ring-2 ring-indigo-500/20' : 'border-slate-700/50 hover:border-slate-600 hover:bg-slate-800/60 shadow-lg'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <div className="flex items-center gap-3 truncate">
          <div className={`w-2 h-2 rounded-full ${isOpen ? 'bg-indigo-400 animate-pulse' : 'bg-slate-600'}`} />
          <span className="truncate">{selectedOption?.name || 'Select Algorithm...'}</span>
        </div>
        <ChevronDown size={18} className={`text-slate-500 transition-transform duration-500 ease-out ${isOpen ? 'rotate-180 text-indigo-400' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-[calc(100%+12px)] z-[100] w-full max-h-[460px] overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-900/95 backdrop-blur-2xl shadow-[0_30px_60px_rgba(0,0,0,0.5)] animate-in fade-in zoom-in-95 duration-200">
          <div className="p-2 overflow-y-auto max-h-[450px] custom-scrollbar">
            {categories.map((category) => (
              <div key={category.title} className="mb-3 last:mb-0">
                <div className="px-3 py-2 text-[9px] font-black text-slate-600 uppercase tracking-[0.3em] flex items-center justify-between">
                  {category.title}
                  <div className="h-px flex-1 bg-slate-800/50 ml-3" />
                </div>
                <div className="grid gap-1">
                  {category.options.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => { setSelectedAlgorithmId(option.id); setIsOpen(false); }}
                      className={`group/opt flex w-full items-center justify-between px-3 py-2.5 text-sm font-semibold rounded-xl transition-all
                        ${selectedAlgorithmId === option.id 
                          ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 shadow-inner' 
                          : 'text-slate-400 hover:bg-slate-800/80 hover:text-white'}`}
                    >
                      <span className="truncate">{option.name}</span>
                      {selectedAlgorithmId === option.id && (
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_#818cf8]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
