import { useState, useCallback, useRef } from 'react';
import type { AnimationStep } from '../algorithms/types';

export type BarState = 
  | 'default' 
  | 'comparing' 
  | 'swapping' 
  | 'sorted' 
  | 'found' 
  | 'left_boundary' 
  | 'right_boundary' 
  | 'mid_element' 
  | 'discarded';

export interface ArrayElement {
  value: number;
  state: BarState;
  pointers: string[];
}

interface UseAnimationProps {
  initialArray: number[];
  animationSteps: AnimationStep[];
  speedMs: number;
}

export const useAnimation = () => {
  const [array, setArray] = useState<ArrayElement[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  
  const timeoutsRef = useRef<number[]>([]);

  const initializeArray = useCallback((newArray: number[]) => {
    clearTimeouts();
    setArray(newArray.map(val => ({ value: val, state: 'default', pointers: [] })));
    setIsAnimating(false);
    setIsSorted(false);
  }, []);

  const clearTimeouts = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  const stopAnimation = useCallback(() => {
    clearTimeouts();
    setIsAnimating(false);
    setArray(prev => prev.map(item => ({ ...item, state: 'default', pointers: [] })));
  }, []);

  const runAnimation = useCallback(({ animationSteps, speedMs }: Omit<UseAnimationProps, 'initialArray'>) => {
    if (isAnimating || animationSteps.length === 0) return;
    
    setIsAnimating(true);
    setIsSorted(false);
    clearTimeouts();

    let totalWaitTime = 0;

    animationSteps.forEach((step, index) => {
      const timeoutId = window.setTimeout(() => {
        setArray(prevArray => {
          const newArray = [...prevArray];
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
              if (idx1 !== undefined) newArray[idx1] = { ...newArray[idx1], state: 'found' };
              break;
            case 'set_pointers':
              // First clear all existing pointers
              newArray.forEach((item, i) => {
                newArray[i] = { ...item, pointers: [] };
              });
              // Set new pointers
              step.pointers?.forEach(p => {
                if (newArray[p.index]) {
                  newArray[p.index].pointers.push(p.label);
                  // Assign colors based on label if they are in default or bounds state
                  if (p.label === 'L') newArray[p.index].state = 'left_boundary';
                  else if (p.label === 'R') newArray[p.index].state = 'right_boundary';
                  else if (p.label === 'M') newArray[p.index].state = 'mid_element';
                }
              });
              break;
            case 'mark_discarded':
              step.indices.forEach(idx => {
                if (newArray[idx]) {
                  newArray[idx] = { ...newArray[idx], state: 'discarded', pointers: [] };
                }
              });
              break;
          }
          return newArray;
        });

        if (index === animationSteps.length - 1) {
          setIsAnimating(false);
          setIsSorted(true);
          setArray(currentArr => {
            setTimeout(() => markAllSorted(currentArr.length, speedMs), 0);
            return currentArr;
          });
        }
      }, totalWaitTime);
      
      timeoutsRef.current.push(timeoutId);
      totalWaitTime += speedMs;
    });

  }, [isAnimating]);

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
    array,
    isAnimating,
    isSorted,
    initializeArray,
    runAnimation,
    stopAnimation
  };
};
