import { create } from 'zustand';
import { AlgorithmEntry } from '../types/algorithmTypes';
import { ALL_ALGORITHMS, ALGORITHM_CATEGORIES } from '../data/algorithmRegistry';

interface AlgorithmState {
  selectedCategory: string;
  selectedAlgorithmId: string;
  algorithmRegistry: Record<string, AlgorithmEntry>;
  setSelectedCategory: (category: string) => void;
  setSelectedAlgorithmId: (id: string) => void;
  setAlgorithmRegistry: (registry: Record<string, AlgorithmEntry>) => void;
}

export const useAlgorithmStore = create<AlgorithmState>((set, get) => ({
  selectedCategory: 'sorting',
  selectedAlgorithmId: 'bubble',
  algorithmRegistry: ALL_ALGORITHMS,
  
  setSelectedCategory: (category) => {
    const registry = ALGORITHM_CATEGORIES as Record<string, string[]>;
    const algorithms = registry[category];
    
    set({ 
      selectedCategory: category,
      // Automatically select the first algorithm in the new category
      selectedAlgorithmId: algorithms && algorithms.length > 0 ? algorithms[0] : get().selectedAlgorithmId
    });
  },

  setSelectedAlgorithmId: (id) => {
    const algorithm = ALL_ALGORITHMS[id];
    if (algorithm) {
      set({ 
        selectedAlgorithmId: id,
        selectedCategory: algorithm.info.category.toLowerCase()
      });
    } else {
      set({ selectedAlgorithmId: id });
    }
  },

  setAlgorithmRegistry: (registry) => set({ algorithmRegistry: registry }),
}));
