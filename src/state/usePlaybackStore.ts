import { create } from 'zustand';

interface PlaybackState {
  isPlaying: boolean;
  isPaused: boolean;
  speed: number;
  currentStepIndex: number;
  totalSteps: number;
  setIsPlaying: (isPlaying: boolean) => void;
  setIsPaused: (isPaused: boolean) => void;
  setSpeed: (speed: number) => void;
  setCurrentStepIndex: (index: number) => void;
  setTotalSteps: (total: number) => void;
  reset: () => void;
}

export const usePlaybackStore = create<PlaybackState>((set) => ({
  isPlaying: false,
  isPaused: false,
  speed: 50,
  currentStepIndex: 0,
  totalSteps: 0,
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setIsPaused: (isPaused) => set({ isPaused }),
  setSpeed: (speed) => set({ speed }),
  setCurrentStepIndex: (index) => set({ currentStepIndex: index }),
  setTotalSteps: (total) => set({ total }),
  reset: () => set({ isPlaying: false, isPaused: false, currentStepIndex: 0 }),
}));
