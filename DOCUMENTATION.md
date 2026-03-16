# AlgoVis Technical Documentation

Welcome to the internal documentation for **AlgoVis**. This guide is designed for developers who want to understand the system architecture, state management, or contribute new visualization modules.

---

## 🏗 System Architecture

AlgoVis follow a **Uni-Directional Data Flow** pattern, separating pure algorithm logic from UI and animation concerns.

### 1. The Algorithm Layer (`src/algorithms`)
Algorithms are implemented as "Pure Producers". Instead of manipulating the UI directly, they take an input (e.g., an array) and return an array of `AnimationStep` objects.
- **Input**: Raw Data Structure + Target (optional).
- **Output**: `AnimationStep[]` (A chronological log of every comparison, swap, or state change).

### 2. The Animation Engine (`src/core/animation`)
The engine acts as a "Consumer/Controller". It manages:
- **Playback Control**: Play, Pause, Speed adjustment, and Step-by-step navigation.
- **Synchronization**: It reads the `AnimationStep[]` and updates the global `PlaybackStore` to reflect the current frame.

### 3. The Visualization Layer (`src/visualization`)
Components here are "Dumb Visualizers". They listen to the current `AnimationStep` and the visual data (like the modified array) provided by the `useAlgorithmVisualization` hook to render the current state.

---

## 🧠 State Management (Zustand)

We use **Zustand** for lightweight, performant state management across three main stores:

1.  **`useAlgorithmStore`**:
    *   Tracks selected category (Sorting, Tree, etc.).
    *   Tracks the active algorithm ID.
    *   Manages the global algorithm registry.

2.  **`usePlaybackStore`**:
    *   Controls the "Timeline" (current step index, total steps).
    *   Status flags: `isPlaying`, `isPaused`, `speed`.
    *   The source of truth for the visualization frames.

3.  **`useThemeStore`**:
    *   Handles Dark/Light mode switching.
    *   Synchronizes with the system preference and DOM classes.

---

## 🚀 How to Add a New Algorithm

To add a new algorithm (e.g., "Heap Sort"), follow these steps:

### 1. Implement the Logic
Create `src/algorithms/sorting/heapSort.ts`. Your function should return `AnimationStep[]`.

```typescript
export const heapSort = (arr: number[]): AnimationStep[] => {
  const steps: AnimationStep[] = [];
  // ... implement logic ...
  // push steps: { type: 'compare', indices: [i, j], explanation: 'Checking max heap property' }
  return steps;
};
```

### 2. Define Metadata
In the same file, export an `AlgorithmInfo` object.

```typescript
export const heapSortInfo: AlgorithmInfo = {
  name: 'Heap Sort',
  category: 'sorting',
  complexity: { time: { best: 'O(log N)', ... }, ... },
  // ... intuition, analogy, stepByStep ...
};
```

### 3. Register the Algorithm
Add it to the `ALL_ALGORITHMS` registry in `src/data/algorithmRegistry.ts`:

```typescript
export const ALL_ALGORITHMS = {
  // ...
  heap: { id: 'heap', info: heapSortInfo, run: heapSort },
};
```

### 4. Update the Category
Add the ID to the relevant category in the same file to make it appear in the dropdown.

---

## 🎨 Styling Guidelines

*   **TailwindCSS**: All styling should be done via Tailwind utility classes.
*   **Design Tokens**:
    *   **Primary**: `indigo-600`
    *   **Secondary**: `emerald-500`
    *   **Background**: `slate-950` (Dark) / `slate-50` (Light)
*   **Surfaces**: Use `rounded-2xl` or `rounded-3xl` for a modern look.
*   **Glassmorphism**: Use `backdrop-blur-xl` and semi-transparent backgrounds for floating cards.

---

## 🧪 Testing

We use **Vitest** for unit testing algorithm logic.

```bash
# Run all tests
npm test

# Run tests in UI mode
npm run test:ui
```

All new algorithms should have a corresponding `.test.ts` file in the same directory ensuring the visual "steps" produced actually sort/search the data correctly.

---

## 🛡 License

This project is licensed under the MIT License.
