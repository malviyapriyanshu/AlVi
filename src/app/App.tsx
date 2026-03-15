import { useState, useEffect, useMemo, useCallback } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Sidebar } from '../components/layout/Sidebar';
import { TABS, TabId } from './routes';

import { useAlgorithmStore } from '../state/useAlgorithmStore';
import { usePlaybackStore } from '../state/usePlaybackStore';
import { useAlgorithmRunner } from '../hooks/useAlgorithmRunner';
import { useProgressTracker } from '../hooks/useProgressTracker';

import { algorithmRegistry } from '../data/algorithmMetadata';
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
import { QuizCard } from '../components/quiz/QuizCard';
import { LearningPathPanel } from '../components/learning/LearningPath';
import { NavRail } from '../components/layout/NavRail';

import React from 'react';
import { RotateCcw, SkipBack, SkipForward, Play, Pause } from 'lucide-react';
import { generateRandomArray } from '../utils/generateRandomArray';
import { buildSampleBST } from '../algorithms/tree/binarySearchTree';
import { useThemeStore } from '../state/useThemeStore';

const SAMPLE_GRAPH = {
  directed: false,
  nodes: [
    { id: 'A', label: 'A', x: 80,  y: 80  }, { id: 'B', label: 'B', x: 200, y: 40  },
    { id: 'C', label: 'C', x: 320, y: 80  }, { id: 'D', label: 'D', x: 120, y: 180 },
    { id: 'E', label: 'E', x: 260, y: 180 }, { id: 'F', label: 'F', x: 400, y: 150 },
  ],
  edges: [
    { from: 'A', to: 'B', weight: 4 }, { from: 'A', to: 'D', weight: 2 },
    { from: 'B', to: 'C', weight: 5 }, { from: 'B', to: 'E', weight: 2 },
  ],
};

/* ────── Legend Pill ────── */
const LegendDot: React.FC<{ color: string; label: string }> = ({ color, label }) => (
  <div className="flex items-center gap-1.5 shrink-0">
    <div className={`w-2 h-2 rounded-full ${color}`} />
    <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">{label}</span>
  </div>
);

export default function App() {
  const { theme } = useThemeStore();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const [activeTab, setActiveTab]   = useState<TabId>('sorting');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [array, setArray]           = useState<number[]>([]);
  const [target, setTarget]         = useState<number | null>(null);

  const { selectedAlgorithmId, setSelectedAlgorithmId } = useAlgorithmStore();
  const { steps, currentStepIndex, reset: resetPlayback, isPlaying } = usePlaybackStore();
  const { runSelected, stop } = useAlgorithmRunner();

  useAnimationDriver();
  const { nextStep, prevStep, pause, resume } = useAnimationActions();
  const { overallProgress, recordQuizScore, markAlgorithmViewed } = useProgressTracker();

  const entry   = useMemo(() => algorithmRegistry[selectedAlgorithmId], [selectedAlgorithmId]);
  const problem = useMemo(() => leetcodeProblems.find(p => p.algorithmId === selectedAlgorithmId), [selectedAlgorithmId]);

  const { array: visualizedArray, explanation: arrayExplanation } = useAlgorithmVisualization(array, steps, currentStepIndex);

  const currentExplanation = useMemo(() => {
    if (['sorting', 'searching', 'techniques'].includes(activeTab)) return arrayExplanation;
    return steps[currentStepIndex]?.explanation;
  }, [activeTab, arrayExplanation, steps, currentStepIndex]);

  const handleNewArray = useCallback(() => {
    const newArr = generateRandomArray(20, 10, 200);
    setArray(newArr);
    setTarget(
      ['binary', 'two-pointer'].includes(selectedAlgorithmId)
        ? newArr[Math.floor(Math.random() * newArr.length)]
        : null
    );
    resetPlayback();
  }, [resetPlayback, selectedAlgorithmId]);

  useEffect(() => { handleNewArray(); }, [handleNewArray]);

  useEffect(() => {
    const cat = entry?.info.category.toLowerCase();
    if (!cat) return;
    const map: Record<string, TabId> = { sorting:'sorting', searching:'searching', techniques:'techniques', graph:'graph', tree:'tree', dp:'dp' };
    const t = map[cat];
    if (t && activeTab !== t && ['sorting','searching','techniques','graph','tree','dp'].includes(activeTab)) setActiveTab(t);
  }, [selectedAlgorithmId, entry, activeTab]);

  const handleTabChange = (newTab: TabId) => {
    setActiveTab(newTab);
    if (['sorting','searching','techniques','graph','tree','dp'].includes(newTab))
      useAlgorithmStore.getState().setSelectedCategory(newTab);
  };

  const handleRun = useCallback(() => {
    if (!entry) return;
    markAlgorithmViewed(selectedAlgorithmId);
    const cat = entry.info.category.toLowerCase();
    if (cat === 'graph')      runSelected(SAMPLE_GRAPH, 'A');
    else if (cat === 'dp')    runSelected(selectedAlgorithmId === 'fib' ? 10 : [1,2,5], 11);
    else if (cat === 'tree')  runSelected(buildSampleBST());
    else                      runSelected(array, target);
  }, [entry, selectedAlgorithmId, markAlgorithmViewed, runSelected, array, target]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === ' ')           { e.preventDefault(); isPlaying ? pause() : handleRun(); }
      if (e.key === 'ArrowRight')  { e.preventDefault(); nextStep(); }
      if (e.key === 'ArrowLeft')   { e.preventDefault(); prevStep(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isPlaying, pause, handleRun, nextStep, prevStep]);

  const isVizTab = ['sorting','searching','techniques','graph','tree','dp'].includes(activeTab);
  const progress = Math.round((currentStepIndex / Math.max(steps.length - 1, 1)) * 100);

  return (
    <div className="h-screen w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 flex flex-col overflow-hidden font-sans">

      {/* ── Top Navbar ── */}
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

      {/* ── Body ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* NavRail (icon sidebar) */}
        <NavRail activeTab={activeTab} onTabChange={handleTabChange} />

        {/* ── 3-Column Layout ── */}
        <div className="flex-1 flex overflow-hidden">

          {/* ── LEFT: Theory Panel ── */}
          {isVizTab && (
            <aside className="hidden xl:flex xl:w-[18%] xl:min-w-[220px] xl:max-w-[300px] flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-y-auto custom-scrollbar shrink-0">
              <div className="p-6">
                <Sidebar algorithm={entry} problem={problem} currentStep={steps[currentStepIndex]} />
              </div>
            </aside>
          )}

          {/* ── CENTER: Visualization Canvas ── */}
          <main className="flex-1 flex flex-col overflow-hidden min-w-0 bg-slate-50 dark:bg-slate-950">

            {isVizTab ? (
              <div className="flex-1 flex flex-col p-3 md:p-5 gap-3 md:gap-4 min-h-0 overflow-hidden">

                {/* Canvas card */}
                <div
                  className="flex-1 flex flex-col min-h-0 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden relative"
                  style={{
                    background: theme === 'dark'
                      ? 'radial-gradient(ellipse at top, #0f172a 0%, #020617 100%)'
                      : 'linear-gradient(to bottom, #f1f5f9, #ffffff)',
                    boxShadow: theme === 'dark'
                      ? '0 0 0 1px rgba(99,102,241,0.06) inset, 0 4px 32px rgba(0,0,0,0.5)'
                      : '0 4px 24px 0 rgba(0,0,0,0.07), 0 1px 4px 0 rgba(0,0,0,0.05)',
                  }}
                >
                  {/* Subtle dot grid */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-[0.04]"
                    style={{ backgroundImage: 'radial-gradient(circle, #94a3b8 1px, transparent 1px)', backgroundSize: '24px 24px' }}
                  />

                  {/* Canvas Header */}
                  <div className="relative z-10 flex items-center justify-between px-5 py-3 border-b border-slate-200/80 dark:border-slate-800/60 bg-white/60 dark:bg-slate-900/40 backdrop-blur-sm shrink-0">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="w-2.5 h-2.5 rounded-full bg-slate-200 dark:bg-slate-700" />
                        <span className="w-2.5 h-2.5 rounded-full bg-slate-200 dark:bg-slate-700" />
                      </div>
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase">
                        {entry?.info?.name ?? activeTab} · Simulation
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Step progress bar */}
                      {steps.length > 1 && (
                        <div className="hidden sm:flex items-center gap-2">
                          <div className="w-24 md:w-32 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-indigo-500 rounded-full transition-all duration-300"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                          <span className="text-[10px] font-mono font-bold text-slate-400 w-8 text-right">{progress}%</span>
                        </div>
                      )}
                      <button
                        onClick={handleNewArray}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-all active:scale-95 shadow-sm"
                      >
                        <RotateCcw size={13} />
                        <span className="hidden sm:inline">Regenerate</span>
                      </button>
                    </div>
                  </div>

                  {/* Visualization body */}
                  <div className="flex-1 flex flex-col relative z-0 min-h-0 overflow-hidden">
                    {(activeTab === 'sorting' || activeTab === 'searching' || activeTab === 'techniques') &&
                      <ArrayCanvas array={visualizedArray} maxValue={200} />}
                    {activeTab === 'graph' && <GraphCanvas graph={SAMPLE_GRAPH} currentStep={steps[currentStepIndex]} />}
                    {activeTab === 'tree'  && <TreeCanvas root={buildSampleBST()} currentStep={steps[currentStepIndex]} />}
                    {activeTab === 'dp'    && <DPTable steps={steps} currentStepIndex={currentStepIndex} />}
                  </div>

                  {/* Legend footer */}
                  <div className="relative z-10 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 px-5 py-2.5 border-t border-slate-200/60 dark:border-slate-800/60 bg-white/50 dark:bg-slate-900/30 backdrop-blur-sm shrink-0">
                    <LegendDot color="bg-slate-300 dark:bg-slate-600"  label="Default"   />
                    <LegendDot color="bg-amber-400"                     label="Comparing" />
                    <LegendDot color="bg-red-500"                       label="Swap"      />
                    <LegendDot color="bg-emerald-500"                   label="Sorted"    />
                    <LegendDot color="bg-indigo-500"                    label="Pointer"   />
                  </div>
                </div>

                {/* ── Mobile Playback Controls (Visualization tabs only) ── */}
                <div className="md:hidden flex items-center gap-2 shrink-0">
                  <button
                    onClick={handleNewArray}
                    className="w-11 h-11 flex items-center justify-center rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-100 shadow-sm active:scale-95 transition-all"
                  >
                    <RotateCcw size={18} />
                  </button>
                  <button
                    onClick={prevStep}
                    disabled={isPlaying}
                    className="w-11 h-11 flex items-center justify-center rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 disabled:opacity-30 hover:bg-slate-100 shadow-sm active:scale-95 transition-all"
                  >
                    <SkipBack size={18} />
                  </button>
                  <button
                    onClick={isPlaying ? pause : handleRun}
                    className={`flex-1 h-11 flex items-center justify-center rounded-xl font-bold text-white transition-all active:scale-95 shadow-sm ${
                      isPlaying
                        ? 'bg-slate-700 dark:bg-slate-700'
                        : 'bg-indigo-600 hover:bg-indigo-500 shadow-btn-indigo'
                    }`}
                  >
                    {isPlaying
                      ? <Pause size={20} fill="currentColor" />
                      : <Play  size={20} fill="currentColor" className="ml-0.5" />}
                  </button>
                  <button
                    onClick={nextStep}
                    disabled={isPlaying}
                    className="w-11 h-11 flex items-center justify-center rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 disabled:opacity-30 hover:bg-slate-100 shadow-sm active:scale-95 transition-all"
                  >
                    <SkipForward size={18} />
                  </button>
                </div>

                {/* ── Mobile: Theory + Walkthrough stacked below viz ── */}
                <div className="xl:hidden flex flex-col gap-3 overflow-y-auto custom-scrollbar">
                  {/* Theory accordion */}
                  <details className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
                    <summary className="px-5 py-3.5 font-bold text-sm text-slate-700 dark:text-slate-300 cursor-pointer select-none flex items-center justify-between">
                      <span>Theory & Specs</span>
                    </summary>
                    <div className="px-5 pb-5 pt-1">
                      <Sidebar algorithm={entry} problem={problem} currentStep={steps[currentStepIndex]} />
                    </div>
                  </details>

                  {/* Step explanation accordion */}
                  <details className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm" open>
                    <summary className="px-5 py-3.5 font-bold text-sm text-slate-700 dark:text-slate-300 cursor-pointer select-none">
                      Step Walkthrough
                    </summary>
                    <div className="px-5 pb-5 pt-1">
                      <WalkthroughPanel
                        steps={steps}
                        currentStepIndex={currentStepIndex}
                        currentExplanation={currentExplanation}
                        problem={problem}
                      />
                    </div>
                  </details>
                </div>

              </div>
            ) : (
              /* Non-viz tabs (quiz, paths) */
              <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10 bg-white dark:bg-slate-950">
                {activeTab === 'quiz' && (
                  <div className="max-w-3xl mx-auto">
                    <QuizCard questions={quizQuestions} onComplete={(score, total) => recordQuizScore('main', Math.round(score/total*100))} />
                  </div>
                )}
                {activeTab === 'paths' && (
                  <div className="flex flex-col gap-8 max-w-5xl mx-auto">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-card p-8 flex items-center justify-between">
                      <div>
                        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-1">{overallProgress}% Complete</h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Your algorithm mastery path is progressing well.</p>
                      </div>
                      <div className="w-24 h-24 rounded-full border-4 border-slate-100 dark:border-slate-800 flex items-center justify-center relative shrink-0">
                        <span className="text-xl font-bold text-slate-900 dark:text-white">{overallProgress}%</span>
                        <svg className="absolute inset-0 w-full h-full -rotate-90">
                          <circle cx="48" cy="48" r="42" fill="transparent" stroke="#6366f1" strokeWidth="5"
                            strokeDasharray="263.89"
                            strokeDashoffset={263.89 * (1 - overallProgress / 100)}
                            strokeLinecap="round" />
                        </svg>
                      </div>
                    </div>
                    <LearningPathPanel paths={learningPaths} viewedAlgorithms={[]} onSelectAlgorithm={(id: string) => setSelectedAlgorithmId(id)} />
                  </div>
                )}
              </div>
            )}
          </main>

          {/* ── RIGHT: Walkthrough Panel ── */}
          {isVizTab && (
            <aside className="hidden xl:flex xl:w-[22%] xl:min-w-[260px] xl:max-w-[360px] flex-col border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-y-auto custom-scrollbar shrink-0">
              <div className="p-6">
                <WalkthroughPanel
                  steps={steps}
                  currentStepIndex={currentStepIndex}
                  currentExplanation={currentExplanation}
                  problem={problem}
                />
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
