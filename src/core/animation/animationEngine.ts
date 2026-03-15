import { useRef, useCallback, useEffect } from 'react';
import { usePlaybackStore } from '../../state/usePlaybackStore';
import { AnimationStep } from '../../types/animationTypes';

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

  const pause = useCallback(() => {
    setIsPlaying(false);
    setIsPaused(true);
  }, [setIsPlaying, setIsPaused]);

  const resume = useCallback(() => {
    setIsPlaying(true);
    setIsPaused(false);
  }, [setIsPlaying, setIsPaused]);

  const nextStep = useCallback(() => {
    setCurrentStepIndex(Math.min(currentStepIndex + 1, totalSteps - 1));
  }, [currentStepIndex, setCurrentStepIndex, totalSteps]);

  const prevStep = useCallback(() => {
    setCurrentStepIndex(Math.max(currentStepIndex - 1, 0));
  }, [currentStepIndex, setCurrentStepIndex]);

  return { play, stop, pause, resume, nextStep, prevStep };
};

export const useAnimationDriver = () => {
  const {
    isPlaying, isPaused, speed, currentStepIndex, totalSteps,
    setCurrentStepIndex, setIsPlaying
  } = usePlaybackStore();

  const stepRef = useRef(currentStepIndex);
  stepRef.current = currentStepIndex;

  useEffect(() => {
    if (isPlaying && !isPaused && currentStepIndex < totalSteps - 1) {
      const timer = window.setInterval(() => {
        const next = stepRef.current + 1;
        if (next >= totalSteps) {
          setIsPlaying(false);
          window.clearInterval(timer);
        } else {
          setCurrentStepIndex(next);
        }
      }, speed);

      return () => window.clearInterval(timer);
    } else if (currentStepIndex >= totalSteps - 1 && isPlaying) {
      setIsPlaying(false);
    }
  }, [isPlaying, isPaused, speed, totalSteps, setCurrentStepIndex, setIsPlaying]);
};

export const useAnimationEngineCore = () => {
  const actions = useAnimationActions();
  useAnimationDriver();
  return actions;
};
