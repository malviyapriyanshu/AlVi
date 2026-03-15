import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
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
    <div className="relative w-full lg:w-64" ref={dropdownRef}>
      <label className="absolute -top-2 left-3 bg-slate-900 px-1 text-[10px] font-bold text-slate-500 uppercase tracking-widest z-10 transition-colors group-focus-within:text-indigo-400">
        {label}
      </label>
      <button
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`group flex w-full items-center justify-between rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-sm font-medium text-white transition-all hover:border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        <span className="truncate">{selectedOption?.name || 'Select...'}</span>
        <ChevronDown size={16} className={`text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-[calc(100%+8px)] z-50 w-full max-h-[400px] overflow-y-auto rounded-xl border border-slate-700 bg-slate-800 p-2 shadow-2xl animate-in fade-in slide-in-from-top-2">
          {categories.map((category) => (
            <div key={category.title} className="mb-2 last:mb-0">
              <div className="px-3 py-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                {category.title}
              </div>
              {category.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => { setSelectedAlgorithmId(option.id); setIsOpen(false); }}
                  className={`flex w-full items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors
                    ${selectedAlgorithmId === option.id 
                      ? 'bg-indigo-600 text-white' 
                      : 'text-slate-300 hover:bg-slate-700 hover:text-white'}`}
                >
                  {option.name}
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
