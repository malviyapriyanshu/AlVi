# AlgoVis - Interactive Algorithm Learning Platform

AlgoVis is a production-grade interactive algorithm visualization platform designed to help students master Data Structures and Algorithms through immersive step-by-step animations and real-world analogies.

## 🚀 Features

- **Advanced Visualization**: High-fidelity animations for Sorting, Searching, Graphs, Trees, and Dynamic Programming.
- **Interactive Coding**: Solve problems directly in the integrated Monaco Editor and watch your solution animate in real-time.
- **Educational Layer**: Every algorithm comes with complexity analysis, real-world analogies, and logic breakdowns.
- **Progress Tracking**: Tracks your learning path and quiz scores across different algorithm families.
- **Algorithm Comparison**: Race multiple algorithms side-by-side to understand performance differences.

## 🛠 Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: TailwindCSS, Lucide-React
- **State Management**: Zustand
- **Editor**: Monaco Editor
- **Testing**: Vitest, React Testing Library

## 📂 Project Structure

- `src/app`: Application core, routes, and layout providers.
- `src/core`: Animation engine and processing logic.
- `src/visualization`: Modular rendering components for different data structures.
- `src/algorithms`: Pure algorithm implementations returning standardized animation steps.
- `src/state`: Zustand stores for global application state.

## 🚦 Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start development server:
   ```bash
   npm run dev
   ```
3. Run tests:
   ```bash
   npm test
   ```

## 📜 License

MIT
