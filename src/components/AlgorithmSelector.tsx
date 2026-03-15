import React from 'react';

interface AlgorithmSelectorProps {
  selectedAlgorithm: string;
  onSelect: (algorithm: string) => void;
  disabled?: boolean;
}

export const AlgorithmSelector: React.FC<AlgorithmSelectorProps> = ({ 
  selectedAlgorithm, 
  onSelect, 
  disabled = false 
}) => {
  const algorithms = [
    { id: 'bubble', name: 'Bubble Sort' },
    { id: 'merge', name: 'Merge Sort' },
    { id: 'quick', name: 'Quick Sort' },
    { id: 'binary', name: 'Binary Search' },
    { id: 'two-pointer', name: 'Two Pointers' },
  ];

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-slate-400">Algorithm</label>
      <div className="flex bg-slate-800 p-1 rounded-lg shadow-inner">
        {algorithms.map((algo) => (
          <button
            key={algo.id}
            disabled={disabled}
            onClick={() => onSelect(algo.id)}
            className={`
              px-4 py-2 text-sm font-medium rounded-md transition-all duration-200
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:text-white'}
              ${selectedAlgorithm === algo.id 
                ? 'bg-indigo-600 text-white shadow-md' 
                : 'text-slate-400 transparent hover:bg-slate-700/50'}
            `}
          >
            {algo.name}
          </button>
        ))}
      </div>
    </div>
  );
};
