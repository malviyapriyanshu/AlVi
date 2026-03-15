import { useRef, useCallback, useEffect } from 'react';
import { usePlaybackStore } from '../../state/usePlaybackStore';
import { AnimationStep } from '../../types/animationTypes';

/**
 * useAnimationActions provides functions to control the playback store.
 * It does NOT contain any side-effects like timers.
 */
export const useAnimationActions = () => {
  const { 
    currentStepIndex, totalSteps,
    setIsPlaying, setIsPaused, setCurrentStepIndex, setTotalSteps, setSteps 
  } = usePlaybackStore();

  const stop = useCallback(() => {
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentStepIndex(0);
  }, [setIsPlaying, setIsPaused, setCurrentStepIndex]);

  const play = useCallback((steps: AnimationStep[]) => {
    setSteps(steps);
    setTotalSteps(steps.length);
    setCurrentStepIndex(0);
    setIsPlaying(true);
    setIsPaused(false);
  }, [setCurrentStepIndex, setIsPlaying, setIsPaused, setSteps, setTotalSteps]);

  const pause = useCallback(() => setIsPaused(true), [setIsPaused]);
  const resume = useCallback(() => setIsPaused(false), [setIsPaused]);

  const nextStep = useCallback(() => {
    setCurrentStepIndex(Math.min(currentStepIndex + 1, totalSteps - 1));
  }, [currentStepIndex, setCurrentStepIndex, totalSteps]);

  const prevStep = useCallback(() => {
    setCurrentStepIndex(Math.max(currentStepIndex - 1, 0));
  }, [currentStepIndex, setCurrentStepIndex]);

  return { play, stop, pause, resume, nextStep, prevStep };
};

/**
 * useAnimationDriver contains the timer logic that drives the animation.
 * It should ONLY be used once in the application (e.g., in App.tsx) 
 * to avoid multiple intervals competing for state updates.
 */
export const useAnimationDriver = () => {
  const { 
    isPlaying, isPaused, speed, currentStepIndex, totalSteps,
    setCurrentStepIndex, setIsPlaying 
  } = usePlaybackStore();

  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isPlaying && !isPaused && currentStepIndex < totalSteps - 1) {
      timerRef.current = window.setInterval(() => {
        // Increment step
        setCurrentStepIndex(currentStepIndex + 1);
      }, speed);
    } else if (currentStepIndex >= totalSteps - 1 && isPlaying) {
      setIsPlaying(false);
    }

    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [isPlaying, isPaused, currentStepIndex, totalSteps, speed, setCurrentStepIndex, setIsPlaying]);
};

// Keep deprecated name for compatibility temporarily if needed, but we should refactor
export const useAnimationEngineCore = () => {
    const actions = useAnimationActions();
    useAnimationDriver();
    return actions;
};
