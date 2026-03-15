import { useRef, useCallback } from 'react';
import { usePlaybackStore } from '../../state/usePlaybackStore';
import { AnimationStep } from '../../types/animationTypes';

export const useAnimationEngineCore = () => {
  const { 
    isPlaying, isPaused, speed, currentStepIndex, totalSteps,
    setIsPlaying, setIsPaused, setCurrentStepIndex, setTotalSteps 
  } = usePlaybackStore();

  const timerRef = useRef<number | null>(null);
  const stepsRef = useRef<AnimationStep[]>([]);

  const stop = useCallback(() => {
    if (timerRef.current) window.clearInterval(timerRef.current);
    setIsPlaying(false);
    setIsPaused(false);
  }, [setIsPlaying, setIsPaused]);

  const play = useCallback((steps: AnimationStep[]) => {
    stepsRef.current = steps;
    setTotalSteps(steps.length);
    setCurrentStepIndex(0);
    setIsPlaying(true);
    setIsPaused(false);
  }, [setCurrentStepIndex, setIsPlaying, setIsPaused, setTotalSteps]);

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
