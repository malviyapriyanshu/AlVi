import React from 'react';
import { DropdownWrapper } from './DropdownWrapper';

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
  const categories = [
    {
      title: 'Sorting Algorithms',
      options: [
        { id: 'bubble', name: 'Bubble Sort' },
        { id: 'merge', name: 'Merge Sort' },
        { id: 'quick', name: 'Quick Sort' },
      ],
    },
    {
      title: 'Searching Algorithms',
      options: [
        { id: 'binary', name: 'Binary Search' },
        { id: 'two-pointer', name: 'Two Pointers' },
      ],
    },
  ];

  return (
    <DropdownWrapper
      label="Algorithm"
      selectedId={selectedAlgorithm}
      categories={categories}
      onSelect={onSelect}
      disabled={disabled}
    />
  );
};
