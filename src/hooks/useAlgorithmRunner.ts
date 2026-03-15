import { useCallback } from 'react';
import { useAlgorithmStore } from '../state/useAlgorithmStore';
import { useAnimationEngineCore } from '../core/animation/animationEngine';

export const useAlgorithmRunner = () => {
  const { selectedAlgorithmId, algorithmRegistry } = useAlgorithmStore();
  const { play, stop } = useAnimationEngineCore();

  const runSelected = useCallback((data: any, target?: any) => {
    const entry = algorithmRegistry[selectedAlgorithmId];
    if (!entry) return;

    const steps = entry.run(data, target);
    play(steps);
  }, [selectedAlgorithmId, algorithmRegistry, play]);

  return { runSelected, stop };
};
