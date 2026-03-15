import { useState, useEffect, useMemo, useCallback } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Sidebar } from '../components/layout/Sidebar';
import { TABS, TabId } from './routes';

import { useAlgorithmStore } from '../state/useAlgorithmStore';
import { usePlaybackStore } from '../state/usePlaybackStore';
import { useAlgorithmRunner } from '../hooks/useAlgorithmRunner';
import { useProgressTracker } from '../hooks/useProgressTracker';

import { algorithmCategories, algorithmRegistry } from '../data/algorithmMetadata';
import { leetcodeProblems } from '../data/leetcodeProblems';
import { useAlgorithmVisualization } from '../hooks/useAlgorithmVisualization';
import { useAnimationActions, useAnimationDriver } from '../core/animation/animationEngine';
import { quizQuestions, learningPaths } from '../data/quizAndPaths';

// Visualizations
import { ArrayCanvas } from '../visualization/array/ArrayCanvas';
import { GraphCanvas } from '../visualization/graph/GraphCanvas';
import { TreeCanvas } from '../visualization/tree/TreeCanvas';
import { DPTable } from '../visualization/dp/DPTable';

// Components
import { WalkthroughPanel } from '../components/walkthrough/WalkthroughPanel';
import { ComparisonCanvas } from '../components/comparison/ComparisonCanvas';
import { CodeEditor } from '../components/editor/CodeEditor';
import { InputEditor } from '../components/playground/InputEditor';
import { QuizCard } from '../components/quiz/QuizCard';
import { LearningPathPanel } from '../components/learning/LearningPath';
import { ProblemPanel } from '../components/problems/ProblemPanel';
import { NavRail } from '../components/layout/NavRail';

// Utils
import { RotateCcw } from 'lucide-react';
import React from 'react';
import { generateRandomArray } from '../utils/generateRandomArray';
import { buildSampleBST } from '../algorithms/tree/binarySearchTree';

const SAMPLE_GRAPH = {
  directed: false,
  nodes: [
    { id: 'A', label: 'A', x: 80, y: 80 }, { id: 'B', label: 'B', x: 200, y: 40 },
    { id: 'C', label: 'C', x: 320, y: 80 }, { id: 'D', label: 'D', x: 120, y: 180 },
    { id: 'E', label: 'E', x: 260, y: 180 }, { id: 'F', label: 'F', x: 400, y: 150 },
  ],
  edges: [
    { from: 'A', to: 'B', weight: 4 }, { from: 'A', to: 'D', weight: 2 },
    { from: 'B', to: 'C', weight: 5 }, { from: 'B', to: 'E', weight: 2 },
  ],
};

const LegendItem: React.FC<{ color: string; label: string }> = ({ color, label }) => (
  <div className="flex items-center gap-2">
    <div className={`w-2.5 h-2.5 rounded ${color}`} />
    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{label}</span>
  </div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('sorting');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [array, setArray] = useState<number[]>([]);
  const [target, setTarget] = useState<number | null>(null);

  const { selectedAlgorithmId, setSelectedAlgorithmId } = useAlgorithmStore();
  const { steps, currentStepIndex, reset: resetPlayback } = usePlaybackStore();
  const { runSelected, stop } = useAlgorithmRunner();

  useAnimationDriver();
  const { nextStep, prevStep, pause, resume } = useAnimationActions();

  const { progress, overallProgress, recordQuizScore, markAlgorithmViewed } = useProgressTracker();

  const entry = useMemo(() => algorithmRegistry[selectedAlgorithmId], [selectedAlgorithmId]);
  const problem = useMemo(() => leetcodeProblems.find(p => p.algorithmId === selectedAlgorithmId), [selectedAlgorithmId]);

  const { array: visualizedArray, explanation: arrayExplanation } = useAlgorithmVisualization(array, steps, currentStepIndex);

  const currentExplanation = useMemo(() => {
    if (['sorting', 'searching', 'techniques'].includes(activeTab)) return arrayExplanation;
    return steps[currentStepIndex]?.explanation;
  }, [activeTab, arrayExplanation, steps, currentStepIndex]);

  const handleNewArray = useCallback(() => {
    const newArr = generateRandomArray(20, 10, 200);
    setArray(newArr);
    if (selectedAlgorithmId === 'binary' || selectedAlgorithmId === 'two-pointer') {
      setTarget(newArr[Math.floor(Math.random() * newArr.length)]);
    } else {
      setTarget(null);
    }
    resetPlayback();
  }, [resetPlayback, selectedAlgorithmId]);

  useEffect(() => {
    handleNewArray();
  }, [handleNewArray]);

  useEffect(() => {
    const cat = entry?.info.category.toLowerCase();
    if (!cat) return;
    
    const categoryToTabMap: Record<string, TabId> = {
      'sorting': 'sorting',
      'searching': 'searching',
      'techniques': 'techniques',
      'graph': 'graph',
      'tree': 'tree',
      'dp': 'dp'
    };

    const targetTab = categoryToTabMap[cat];
    if (targetTab && activeTab !== targetTab && ['sorting', 'searching', 'techniques', 'graph', 'tree', 'dp'].includes(activeTab)) {
      setActiveTab(targetTab);
    }
  }, [selectedAlgorithmId, entry, activeTab]);

  const handleTabChange = (newTab: TabId) => {
    setActiveTab(newTab);
    const algoCategories = ['sorting', 'searching', 'techniques', 'graph', 'tree', 'dp'];
    if (algoCategories.includes(newTab)) {
      useAlgorithmStore.getState().setSelectedCategory(newTab);
    }
  };

  const { isPlaying: storeIsPlaying } = usePlaybackStore();
  const isPlaying = storeIsPlaying;

  const handleRun = useCallback(() => {
    if (!entry) return;
    markAlgorithmViewed(selectedAlgorithmId);

    const cat = entry.info.category.toLowerCase();
    if (cat === 'graph') {
      runSelected(SAMPLE_GRAPH, 'A');
    } else if (cat === 'dp') {
      if (selectedAlgorithmId === 'fib') runSelected(10);
      else runSelected([1, 2, 5], 11);
    } else if (cat === 'tree') {
      runSelected(buildSampleBST());
    } else {
      runSelected(array, target);
    }
  }, [entry, selectedAlgorithmId, markAlgorithmViewed, runSelected, array, target]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      switch (e.key) {
        case ' ':
          e.preventDefault();
          isPlaying ? pause() : handleRun();
          break;
        case 'ArrowRight':
          e.preventDefault();
          nextStep();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          prevStep();
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, stop, handleRun, nextStep, prevStep]);

  const isVisualizationTab = ['sorting', 'searching', 'techniques', 'graph', 'tree', 'dp'].includes(activeTab);

  return (
    <div className="h-screen w-full bg-slate-950 text-slate-200 flex flex-col font-sans overflow-hidden">
      <Navbar
        overallProgress={overallProgress}
        onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
        isMenuOpen={isMenuOpen}
        selectedAlgorithmId={selectedAlgorithmId}
        onAlgorithmChange={setSelectedAlgorithmId}
        onRun={handleRun}
        onStop={stop}
        onStepForward={nextStep}
        onStepBackward={prevStep}
        onReset={handleNewArray}
        isPlaying={isPlaying}
      />

      {/* Main responsive layout */}
      <div className="flex flex-1 flex-col md:flex-row overflow-hidden relative">
        {/* Navigation Rail — vertical on md+, horizontal on mobile */}
        <NavRail activeTab={activeTab} onTabChange={handleTabChange} />

        <div className="flex-1 flex flex-col xl:flex-row overflow-hidden overflow-y-auto xl:overflow-hidden custom-scrollbar">
          
          {/* Theory Panel (Sidebar) — Visible on xl in first column, otherwise stacked */}
          <aside className={`
            w-full xl:w-[20%] xl:min-w-[260px] xl:max-w-[320px] 
            border-b xl:border-b-0 xl:border-r border-slate-800/50 
            bg-slate-950 p-5 shrink-0
            ${activeTab === 'paths' || activeTab === 'quiz' ? 'hidden' : 'block'}
            order-2 xl:order-1
          `}>
            <Sidebar
              algorithm={entry}
              problem={problem}
              currentStep={steps[currentStepIndex]}
            />
          </aside>

          {/* Center — Visualization — Always visible, primary focus */}
          <main className="flex-1 min-h-[400px] md:min-h-0 bg-slate-950 relative flex flex-col order-1 xl:order-2" role="main">
            {isVisualizationTab ? (
              <div className="flex-1 flex flex-col p-3 md:p-5 min-h-0">
                <div className="flex-1 flex flex-col min-h-0 bg-slate-900/50 rounded-2xl border border-slate-800/50 overflow-hidden relative">
                  {/* Subtle grid */}
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                       style={{ backgroundImage: 'radial-gradient(rgba(148,163,184,0.4) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

                  {/* Header */}
                  <div className="relative z-10 flex items-center justify-between px-3 md:px-5 py-2.5 md:py-3 border-b border-slate-800/50 shrink-0">
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <h2 className="text-[11px] md:text-sm font-semibold text-slate-200 truncate max-w-[120px] md:max-w-none">
                        {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} <span className="hidden xs:inline">Simulation</span><span className="xs:hidden">Sim</span>
                      </h2>
                    </div>
                    <button
                      onClick={handleNewArray}
                      className="flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1 md:py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-[10px] md:text-[11px] font-semibold transition-all active:scale-95 border border-slate-700/50 shrink-0"
                    >
                      <RotateCcw size={10} className="md:w-[12px] md:h-[12px]" />
                      <span>Regenerate</span>
                    </button>
                  </div>

                  {/* Visualization Body */}
                  <div className="flex-1 flex flex-col relative z-0 min-h-0 overflow-hidden">
                    {(activeTab === 'sorting' || activeTab === 'searching' || activeTab === 'techniques') && 
                      <ArrayCanvas array={visualizedArray} maxValue={200} />}
                    {activeTab === 'graph' && <GraphCanvas graph={SAMPLE_GRAPH} currentStep={steps[currentStepIndex]} />}
                    {activeTab === 'tree' && <TreeCanvas root={buildSampleBST()} currentStep={steps[currentStepIndex]} />}
                    {activeTab === 'dp' && <DPTable steps={steps} currentStepIndex={currentStepIndex} />}
                  </div>

                  {/* Legend Footer */}
                  <div className="relative z-10 px-3 md:px-5 py-2 md:py-2.5 border-t border-slate-800/50 shrink-0 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 md:gap-5">
                    <LegendItem color="bg-slate-600" label="Default" />
                    <LegendItem color="bg-amber-400" label="Comparing" />
                    <LegendItem color="bg-red-400" label="Swap" />
                    <LegendItem color="bg-emerald-400" label="Sorted" />
                    <LegendItem color="bg-blue-400" label="Pointer" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full overflow-y-auto custom-scrollbar">
                {activeTab === 'quiz' && (
                  <div className="max-w-2xl mx-auto w-full py-8 px-4">
                    <QuizCard questions={quizQuestions} onComplete={(score, total) => recordQuizScore('main', Math.round(score/total*100))} />
                  </div>
                )}
                {activeTab === 'paths' && (
                  <div className="flex flex-col gap-6 p-6">
                    <div className="surface-card p-6 flex items-center justify-between">
                      <div>
                        <h2 className="text-3xl font-bold mb-1">{overallProgress}% Complete</h2>
                        <p className="text-slate-400 text-sm">Keep going! You're mastering the algorithms.</p>
                      </div>
                      <div className="w-24 h-24 rounded-full border-4 border-slate-800 flex items-center justify-center relative">
                        <span className="text-xl font-bold">{overallProgress}%</span>
                        <svg className="absolute inset-0 w-full h-full -rotate-90">
                          <circle cx="48" cy="48" r="42" fill="transparent" stroke="#6366f1" strokeWidth="4" strokeDasharray="263.89" strokeDashoffset={263.89 * (1 - overallProgress/100)} strokeLinecap="round" />
                        </svg>
                      </div>
                    </div>
                    <LearningPathPanel paths={learningPaths} viewedAlgorithms={progress.viewedAlgorithms} onSelectAlgorithm={(id: string) => { setSelectedAlgorithmId(id); }} />
                  </div>
                )}
              </div>
            )}
          </main>

          {/* Walkthrough Panel — Visible on xl in third column, otherwise stacked below */}
          <aside className={`
            w-full xl:w-[25%] xl:min-w-[300px] xl:max-w-[380px] 
            border-t xl:border-t-0 xl:border-l border-slate-800/50 
            bg-slate-950 p-5 shrink-0
            ${!isVisualizationTab ? 'hidden' : 'block'}
            order-3
          `}>
            <WalkthroughPanel
              steps={steps}
              currentStepIndex={currentStepIndex}
              currentExplanation={currentExplanation}
              problem={problem}
            />
          </aside>
        </div>
      </div>
    </div>
  );
}
