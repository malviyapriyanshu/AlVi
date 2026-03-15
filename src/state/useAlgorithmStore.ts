import { create } from 'zustand';
import { AlgorithmEntry } from '../types/algorithmTypes';
import { algorithmRegistry as registryData } from '../data/algorithmMetadata';

interface AlgorithmState {
  selectedAlgorithmId: string;
  setSelectedAlgorithmId: (id: string) => void;
  algorithmRegistry: Record<string, AlgorithmEntry>;
  setAlgorithmRegistry: (registry: Record<string, AlgorithmEntry>) => void;
}

export const useAlgorithmStore = create<AlgorithmState>((set) => ({
  selectedAlgorithmId: 'bubble',
  setSelectedAlgorithmId: (id) => set({ selectedAlgorithmId: id }),
  algorithmRegistry: registryData,
  setAlgorithmRegistry: (registry) => set({ algorithmRegistry: registry }),
}));
