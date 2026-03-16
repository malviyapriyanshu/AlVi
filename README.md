# <p align="center">AlgoVis</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?logo=tailwind-css&logoColor=white" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/License-MIT-blue" alt="License" />
</p>

---

**AlgoVis** is a high-performance, interactive algorithm visualization platform designed for modern software engineering education. It transforms abstract data structures and complex logic into immersive, step-by-step visual experiences.

## ✨ Core Pillars

### 1. High-Fidelity Visualizations
- **Array-Based**: Dynamic sorting and searching with real-time state highlighting.
- **Graph Engine**: Visualizing BFS, DFS, and Dijkstra's using a force-directed layout philosophy.
- **Recursive Trees**: Real-time traversal (Inorder, Preorder, Postorder) of Binary Search Trees.
- **DP Workspace**: Tabulation memory maps for visualizing state transitions in Dynamic Programming.

### 2. The Learning Engine
- **Logic Walkthroughs**: Each step is paired with a clear, technical explanation and state snapshot.
- **IDE Integration**: Synchronized pseudocode viewer that highlights currently executing lines.
- **Conceptual Bridges**: Real-world analogies to ground complex theories in relatable contexts.
- **Module Assessments**: Integrated quizzes and curriculum-based learning paths.

### 3. Performance Benchmarking
- **Algorithm Races**: Run multiple algorithms side-by-side on the same input to observe efficiency differences.
- **Live Metrics**: Real-time telemetry tracking comparisons, swaps, and memory operations.

---

## 🛠 Tech Stack

- **Framework**: [React 19](https://react.dev/) for component architecture.
- **Language**: [TypeScript](https://www.typescriptlang.org/) for type-safe algorithm modeling.
- **Styling**: [TailwindCSS](https://tailwindcss.com/) for a professional "developer-tool" dashboard aesthetic.
- **State**: [Zustand](https://github.com/pmndrs/zustand) for low-latency playback control.
- **Icons**: [Lucide-React](https://lucide.dev/) for crisp, scalable iconography.

---

## 📂 Architecture

- **`src/core/animation`**: The central heartbeat—handling step-by-step playback, speed control, and state synchronization.
- **`src/algorithms`**: Pure, decoupled logic that returns an immutable sequence of animation frames.
- **`src/visualization`**: Pure rendering components that map internal states to SVG/Canvas/DOM elements.
- **`src/state`**: Global stores for theme, algorithm status, and playback progress.

---

## 🚦 Installation

```bash
# Clone the repository
git clone https://github.com/malviyapriyanshu/AlVi.git

# Enter directory
cd AlVi

# Install dependencies
npm install

# Launch development server
npm run dev

# Build for production
npm run build
```

---

## 📜 Documentation

For a detailed breakdown of the internal architecture, state management, and guides on how to add your own algorithms, please refer to the [DOCUMENTATION.md](DOCUMENTATION.md).

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

<p align="center">Made with ❤️ for the Engineering Community</p>
