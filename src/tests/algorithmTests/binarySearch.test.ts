import { describe, it, expect } from 'vitest';
import { binarySearch } from '../../algorithms/searching/binarySearch';

describe('Binary Search', () => {
  it('should find the target in a sorted array', () => {
    const arr = [1, 3, 5, 7, 9];
    const steps = binarySearch(arr, 7);
    const foundStep = steps.find(s => s.type === 'found_result');
    expect(foundStep).toBeDefined();
    expect(foundStep?.indices).toContain(3);
  });

  it('should not find a missing target', () => {
    const arr = [1, 3, 5];
    const steps = binarySearch(arr, 2);
    const foundStep = steps.find(s => s.type === 'found_result');
    expect(foundStep).toBeUndefined();
  });
});
