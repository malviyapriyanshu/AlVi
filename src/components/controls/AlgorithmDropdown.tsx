import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface Option {
  id: string;
  name: string;
}

interface Category {
  title: string;
  options: Option[];
}

interface DropdownWrapperProps {
  selectedId: string;
  categories: Category[];
  onSelect: (id: string) => void;
  disabled?: boolean;
  label: string;
}

export const DropdownWrapper: React.FC<DropdownWrapperProps> = ({
  selectedId, categories, onSelect, disabled = false, label
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedOption = categories.flatMap(c => c.options).find(o => o.id === selectedId);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (id: string) => { if (disabled) return; onSelect(id); setIsOpen(false); };

  return (
    <div className="flex flex-col gap-2 relative" ref={dropdownRef}>
      <label className="text-sm font-medium text-slate-400">{label}</label>
      <button type="button" disabled={disabled} onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between w-full sm:w-64 px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm font-medium transition-all duration-200 outline-none
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-indigo-500 cursor-pointer'}
          ${isOpen ? 'ring-2 ring-indigo-500/20 border-indigo-500' : 'shadow-sm'}`}>
        <span className={selectedOption ? 'text-white' : 'text-slate-500'}>{selectedOption ? selectedOption.name : 'Select Algorithm'}</span>
        <ChevronDown size={18} className={`text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-indigo-400' : ''}`} />
      </button>
      {isOpen && !disabled && (
        <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-slate-800 border border-slate-700 rounded-xl shadow-2xl py-2 z-50 overflow-hidden">
          {categories.map((category, idx) => (
            <div key={category.title}>
              {idx > 0 && <div className="h-px bg-slate-700 mx-3 my-1" />}
              <div className="px-4 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">{category.title}</div>
              {category.options.map(option => (
                <button key={option.id} onClick={() => handleSelect(option.id)}
                  className={`flex items-center w-full px-4 py-2.5 text-sm transition-colors
                    ${selectedId === option.id ? 'bg-indigo-600/10 text-indigo-400 font-semibold' : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'}`}>
                  <div className={`w-1.5 h-1.5 rounded-full mr-3 transition-colors ${selectedId === option.id ? 'bg-indigo-500' : 'bg-transparent'}`} />
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
