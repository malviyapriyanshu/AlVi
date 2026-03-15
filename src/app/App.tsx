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
import { RotateCcw, SkipBack, SkipForward, Play, Pause } from 'lucide-react';
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
  <div className="flex items-center gap-1.5 md:gap-2 shrink-0">
    <div className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded ${color}`} />
    <span className="text-[9px] md:text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{label}</span>
  </div>
);

import { useThemeStore } from '../state/useThemeStore';

export default function App() {
  const { theme } = useThemeStore();
  
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

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
    <div className="min-h-screen w-full bg-gray-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 flex flex-col font-sans overflow-x-hidden">
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
      <div className="flex flex-1 flex-col xl:flex-row overflow-hidden relative">
        {/* Navigation Rail — repositioned or integrated? 
            For now keeping it as requested for desktop/tablet/mobile logic.
            User wants a 3-column layout: Theory | Viz | Walkthrough.
        */}
        <NavRail activeTab={activeTab} onTabChange={handleTabChange} />

        <div className="flex-1 flex flex-col xl:flex-row overflow-hidden overflow-y-auto xl:overflow-hidden bg-gray-50 dark:bg-slate-950">
          
          {/* Left Panel → Theory (Sidebar) */}
          <aside className={`
            w-full xl:w-[20%] xl:min-w-[280px] xl:max-w-[320px] 
            border-b xl:border-b-0 xl:border-r border-gray-200 dark:border-slate-800/50 
            bg-white dark:bg-slate-950 xl:order-1
            ${activeTab === 'paths' || activeTab === 'quiz' ? 'hidden' : 'block'}
            order-3 xl:h-full overflow-y-auto custom-scrollbar
          `}>
             <div className="p-4 md:p-6">
               <Sidebar
                 algorithm={entry}
                 problem={problem}
                 currentStep={steps[currentStepIndex]}
               />
             </div>
          </aside>

          {/* Center → Visualization — Primary Focus */}
          <main className="flex-[3] min-h-[480px] md:min-h-[500px] xl:min-h-0 bg-gray-50 dark:bg-slate-950 relative flex flex-col order-1 xl:order-2 xl:h-full overflow-hidden" role="main">
            {isVisualizationTab ? (
              <div className="flex-1 flex flex-col p-2 md:p-4 xl:p-6 min-h-0">
                <div className="flex-1 flex flex-col min-h-0 bg-white dark:bg-slate-900/50 rounded-2xl border border-gray-200 dark:border-slate-800/50 overflow-hidden relative shadow-sm dark:shadow-none">
                  {/* Subtle grid */}
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                       style={{ backgroundImage: 'radial-gradient(rgba(148,163,184,0.4) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

                  {/* Header */}
                  <div className="relative z-10 flex items-center justify-between px-4 md:px-6 py-3 md:py-4 border-b border-gray-200 dark:border-slate-800/50 shrink-0">
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <h2 className="text-xs md:text-sm font-bold text-slate-900 dark:text-slate-200 tracking-tight">
                        {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} <span className="hidden xs:inline">Simulation</span><span className="xs:hidden">Sim</span>
                      </h2>
                    </div>
                    <button
                      onClick={handleNewArray}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg text-xs font-bold transition-all active:scale-95 border border-gray-200 dark:border-slate-700/50 shrink-0"
                    >
                      <RotateCcw size={14} />
                      <span>Regenerate</span>
                    </button>
                  </div>

                  {/* Visualization Body */}
                  <div className="flex-1 flex flex-col relative z-0 min-h-0 overflow-hidden bg-white/50 dark:bg-transparent">
                    {(activeTab === 'sorting' || activeTab === 'searching' || activeTab === 'techniques') && 
                      <ArrayCanvas array={visualizedArray} maxValue={200} />}
                    {activeTab === 'graph' && <GraphCanvas graph={SAMPLE_GRAPH} currentStep={steps[currentStepIndex]} />}
                    {activeTab === 'tree' && <TreeCanvas root={buildSampleBST()} currentStep={steps[currentStepIndex]} />}
                    {activeTab === 'dp' && <DPTable steps={steps} currentStepIndex={currentStepIndex} />}
                  </div>

                  {/* Mobile Playback Controls — Below visualization as requested */}
                  <div className="md:hidden flex items-center justify-center gap-2 p-3 bg-gray-50 dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 shrink-0">
                    <button onClick={handleNewArray} className="flex-1 h-11 flex items-center justify-center bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-400 active:scale-95 transition-all">
                      <RotateCcw size={18} />
                    </button>
                    <button onClick={prevStep} disabled={isPlaying} className="flex-1 h-11 flex items-center justify-center bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-400 active:scale-95 transition-all disabled:opacity-30">
                      <SkipBack size={18} />
                    </button>
                    <button
                      onClick={isPlaying ? pause : handleRun}
                      className={`flex-[2] h-11 flex items-center justify-center rounded-xl font-bold text-white shadow-sm active:scale-95 transition-all ${isPlaying ? 'bg-slate-700' : 'bg-indigo-600 shadow-glow-indigo'}`}
                    >
                      {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
                    </button>
                    <button onClick={nextStep} disabled={isPlaying} className="flex-1 h-11 flex items-center justify-center bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-400 active:scale-95 transition-all disabled:opacity-30">
                      <SkipForward size={18} />
                    </button>
                  </div>

                  {/* Legend Footer */}
                  <div className="relative z-10 px-4 md:px-6 py-2 md:py-3 border-t border-gray-100 dark:border-slate-800/50 shrink-0 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 md:gap-8 bg-gray-50/50 dark:bg-slate-900/30">
                    <LegendItem color="bg-slate-400 dark:bg-slate-600" label="Default" />
                    <LegendItem color="bg-amber-400" label="Comparing" />
                    <LegendItem color="bg-red-500" label="Swap" />
                    <LegendItem color="bg-emerald-500" label="Sorted" />
                    <LegendItem color="bg-indigo-500" label="Pointer" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full overflow-y-auto custom-scrollbar p-4 md:p-8 bg-white dark:bg-slate-950">
                {activeTab === 'quiz' && (
                  <div className="max-w-3xl mx-auto w-full">
                    <QuizCard questions={quizQuestions} onComplete={(score, total) => recordQuizScore('main', Math.round(score/total*100))} />
                  </div>
                )}
                {activeTab === 'paths' && (
                  <div className="flex flex-col gap-8 max-w-5xl mx-auto">
                    <div className="surface-card p-8 flex items-center justify-between">
                      <div>
                        <h2 className="text-3xl font-extrabold mb-2 text-slate-900 dark:text-white tracking-tight">{overallProgress}% Complete</h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Your algorithm mastery path is progressing well.</p>
                      </div>
                      <div className="w-24 h-24 rounded-full border-4 border-gray-100 dark:border-slate-800 flex items-center justify-center relative">
                        <span className="text-xl font-bold">{overallProgress}%</span>
                        <svg className="absolute inset-0 w-full h-full -rotate-90">
                          <circle cx="48" cy="48" r="42" fill="transparent" stroke="#6366f1" strokeWidth="6" strokeDasharray="263.89" strokeDashoffset={263.89 * (1 - overallProgress/100)} strokeLinecap="round" />
                        </svg>
                      </div>
                    </div>
                    <LearningPathPanel paths={learningPaths} viewedAlgorithms={progress.viewedAlgorithms} onSelectAlgorithm={(id: string) => { setSelectedAlgorithmId(id); }} />
                  </div>
                )}
              </div>
            )}
          </main>

          {/* Right Panel → Walkthrough Panel */}
          <aside className={`
            w-full xl:w-[20%] xl:min-w-[300px] xl:max-w-[400px] 
            border-t xl:border-t-0 xl:border-l border-gray-200 dark:border-slate-800/50 
            bg-white dark:bg-slate-950 p-4 md:p-6 shrink-0
            ${!isVisualizationTab ? 'hidden' : 'block'}
            order-2 xl:order-3 xl:h-full overflow-y-auto custom-scrollbar
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
