import { useMemo } from 'react';
import { AnimationStep } from '../types/animationTypes';

export const useAlgorithmVisualization = (initialData: number[], steps: AnimationStep[], currentIndex: number) => {
  return useMemo(() => {
    const array = initialData.map(v => ({ value: v, state: 'default' as any, pointers: [] as any[] }));
    
    for (let i = 0; i <= currentIndex && i < steps.length; i++) {
      const step = steps[i];
      // Reset states for current frame if needed, though usually we apply delta
      // For simple visualization, we can just apply type-based transformations
      
      switch (step.type) {
        case 'compare':
          step.indices?.forEach(idx => array[idx].state = 'comparing');
          break;
        case 'swap':
          if (step.indices && step.indices.length === 2) {
            const [i, j] = step.indices;
            [array[i].value, array[j].value] = [array[j].value, array[i].value];
            array[i].state = 'swap';
            array[j].state = 'swap';
          }
          break;
        case 'overwrite':
          if (step.indices && step.value !== undefined) {
            step.indices.forEach(idx => {
              array[idx].value = step.value!;
              array[idx].state = 'overwrite';
            });
          }
          break;
        case 'move_pointer':
          step.pointers?.forEach(p => {
            if (array[p.index]) array[p.index].pointers.push(p.label);
          });
          break;
        case 'discard_range':
          step.indices?.forEach(idx => array[idx].state = 'discarded');
          break;
        case 'found_result':
          step.indices?.forEach(idx => array[idx].state = 'found');
          break;
      }
    }

    return { array, explanation: steps[currentIndex]?.explanation };
  }, [initialData, steps, currentIndex]);
};
