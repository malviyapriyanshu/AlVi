import { useState, useCallback, useRef } from 'react';
import type { AnimationStep, ArrayElement } from '../types';

interface UseAnimationEngineReturn {
  array: ArrayElement[];
  isAnimating: boolean;
  isPaused: boolean;
  isSorted: boolean;
  currentStepIndex: number;
  totalSteps: number;
  currentExplanation: string;
  initializeArray: (newArray: number[]) => void;
  runAnimation: (opts: { animationSteps: AnimationStep[]; speedMs: number }) => void;
  stopAnimation: () => void;
  pauseAnimation: () => void;
  resumeAnimation: () => void;
  stepForward: () => void;
  stepBackward: () => void;
  restartAnimation: () => void;
}

export const useAnimationEngine = (): UseAnimationEngineReturn => {
  const [array, setArray] = useState<ArrayElement[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);
  const [currentExplanation, setCurrentExplanation] = useState('');

  const timeoutsRef = useRef<number[]>([]);
  const stepsRef = useRef<AnimationStep[]>([]);
  const snapshotsRef = useRef<ArrayElement[][]>([]);
  const speedRef = useRef(50);
  const pausedIndexRef = useRef(0);

  const initializeArray = useCallback((newArray: number[]) => {
    clearTimeouts();
    const elements = newArray.map(val => ({ value: val, state: 'default' as const, pointers: [] as string[] }));
    setArray(elements);
    setIsAnimating(false);
    setIsPaused(false);
    setIsSorted(false);
    setCurrentStepIndex(0);
    setTotalSteps(0);
    setCurrentExplanation('');
    stepsRef.current = [];
    snapshotsRef.current = [elements];
    pausedIndexRef.current = 0;
  }, []);

  const clearTimeouts = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  const applyStep = (prevArray: ArrayElement[], step: AnimationStep): ArrayElement[] => {
    const newArray = prevArray.map(item => ({ ...item }));
    const [idx1, idx2] = step.indices;

    switch (step.type) {
      case 'compare':
        if (idx1 !== undefined) newArray[idx1] = { ...newArray[idx1], state: 'comparing' };
        if (idx2 !== undefined) newArray[idx2] = { ...newArray[idx2], state: 'comparing' };
        break;
      case 'swap':
        if (idx1 !== undefined && idx2 !== undefined) {
          newArray[idx1] = { ...newArray[idx1], state: 'swapping' };
          newArray[idx2] = { ...newArray[idx2], state: 'swapping' };
          const temp = newArray[idx1].value;
          newArray[idx1].value = newArray[idx2].value;
          newArray[idx2].value = temp;
        }
        break;
      case 'overwrite':
        if (idx1 !== undefined && step.value !== undefined) {
          newArray[idx1] = { value: step.value, state: 'swapping', pointers: newArray[idx1].pointers };
        }
        break;
      case 'clear':
        if (idx1 !== undefined) newArray[idx1] = { ...newArray[idx1], state: 'default' };
        if (idx2 !== undefined) newArray[idx2] = { ...newArray[idx2], state: 'default' };
        break;
      case 'found':
      case 'mark_found':
      case 'found_result':
        step.indices.forEach(idx => {
          if (newArray[idx]) newArray[idx] = { ...newArray[idx], state: 'found' };
        });
        break;
      case 'set_pointers':
      case 'move_pointer':
        newArray.forEach((item, i) => { newArray[i] = { ...item, pointers: [] }; });
        step.pointers?.forEach(p => {
          if (newArray[p.index]) {
            newArray[p.index].pointers.push(p.label);
            if (p.label === 'L') newArray[p.index].state = 'left_boundary';
            else if (p.label === 'R') newArray[p.index].state = 'right_boundary';
            else if (p.label === 'M') newArray[p.index].state = 'mid_element';
          }
        });
        break;
      case 'mark_discarded':
      case 'discard_range':
        step.indices.forEach(idx => {
          if (newArray[idx]) newArray[idx] = { ...newArray[idx], state: 'discarded', pointers: [] };
        });
        break;
      case 'highlight_range':
        step.indices.forEach(idx => {
          if (newArray[idx]) newArray[idx] = { ...newArray[idx], state: 'highlighted' };
        });
        break;
    }
    return newArray;
  };

  const buildSnapshots = (steps: AnimationStep[], initialArray: ArrayElement[]) => {
    const snapshots: ArrayElement[][] = [initialArray];
    let current = initialArray;
    for (const step of steps) {
      current = applyStep(current, step);
      snapshots.push(current);
    }
    return snapshots;
  };

  const stopAnimation = useCallback(() => {
    clearTimeouts();
    setIsAnimating(false);
    setIsPaused(false);
    setArray(prev => prev.map(item => ({ ...item, state: 'default', pointers: [] })));
    setCurrentExplanation('');
  }, []);

  const runAnimationFromIndex = useCallback((startIndex: number) => {
    clearTimeouts();
    const steps = stepsRef.current;
    const speed = speedRef.current;
    let totalWaitTime = 0;

    for (let i = startIndex; i < steps.length; i++) {
      const timeoutId = window.setTimeout(() => {
        const snapshot = snapshotsRef.current[i + 1];
        if (snapshot) setArray(snapshot);
        setCurrentStepIndex(i + 1);
        setCurrentExplanation(steps[i].explanation || '');

        if (i === steps.length - 1) {
          setIsAnimating(false);
          setIsSorted(true);
          markAllSorted(snapshot.length, speed);
        }
      }, totalWaitTime);
      timeoutsRef.current.push(timeoutId);
      totalWaitTime += speed;
    }
  }, []);

  const runAnimation = useCallback(({ animationSteps, speedMs }: { animationSteps: AnimationStep[]; speedMs: number }) => {
    if (isAnimating || animationSteps.length === 0) return;

    stepsRef.current = animationSteps;
    speedRef.current = speedMs;
    setIsAnimating(true);
    setIsPaused(false);
    setIsSorted(false);
    setTotalSteps(animationSteps.length);
    setCurrentStepIndex(0);
    pausedIndexRef.current = 0;

    setArray(current => {
      const snapshots = buildSnapshots(animationSteps, current);
      snapshotsRef.current = snapshots;
      runAnimationFromIndex(0);
      return current;
    });
  }, [isAnimating, runAnimationFromIndex]);

  const pauseAnimation = useCallback(() => {
    clearTimeouts();
    setIsPaused(true);
    pausedIndexRef.current = currentStepIndex;
  }, [currentStepIndex]);

  const resumeAnimation = useCallback(() => {
    setIsPaused(false);
    runAnimationFromIndex(pausedIndexRef.current);
  }, [runAnimationFromIndex]);

  const stepForward = useCallback(() => {
    const steps = stepsRef.current;
    const idx = pausedIndexRef.current;
    if (idx >= steps.length) return;

    clearTimeouts();
    setIsPaused(true);

    const nextIdx = idx + 1;
    const snapshot = snapshotsRef.current[nextIdx];
    if (snapshot) {
      setArray(snapshot);
      setCurrentStepIndex(nextIdx);
      setCurrentExplanation(steps[idx].explanation || '');
      pausedIndexRef.current = nextIdx;
    }

    if (nextIdx >= steps.length) {
      setIsAnimating(false);
      setIsSorted(true);
    }
  }, []);

  const stepBackward = useCallback(() => {
    const idx = pausedIndexRef.current;
    if (idx <= 0) return;

    clearTimeouts();
    setIsPaused(true);

    const prevIdx = idx - 1;
    const snapshot = snapshotsRef.current[prevIdx];
    if (snapshot) {
      setArray(snapshot);
      setCurrentStepIndex(prevIdx);
      setCurrentExplanation(prevIdx > 0 ? (stepsRef.current[prevIdx - 1].explanation || '') : '');
      pausedIndexRef.current = prevIdx;
    }
  }, []);

  const restartAnimation = useCallback(() => {
    const snapshot = snapshotsRef.current[0];
    if (snapshot) {
      clearTimeouts();
      setArray(snapshot);
      setCurrentStepIndex(0);
      setCurrentExplanation('');
      pausedIndexRef.current = 0;
      setIsPaused(true);
      setIsAnimating(true);
      setIsSorted(false);
    }
  }, []);

  const markAllSorted = (length: number, speedMs: number) => {
    let sortedWaitTime = 0;
    for (let i = 0; i < length; i++) {
      const timeoutId = window.setTimeout(() => {
        setArray(prevArray => {
          const newArray = [...prevArray];
          newArray[i] = { ...newArray[i], state: 'sorted', pointers: [] };
          return newArray;
        });
      }, sortedWaitTime);
      timeoutsRef.current.push(timeoutId);
      sortedWaitTime += Math.max(10, speedMs / 2);
    }
  };

  return {
    array, isAnimating, isPaused, isSorted,
    currentStepIndex, totalSteps, currentExplanation,
    initializeArray, runAnimation, stopAnimation,
    pauseAnimation, resumeAnimation, stepForward, stepBackward, restartAnimation,
  };
};
