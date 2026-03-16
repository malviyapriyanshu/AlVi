import { useState, useEffect, useMemo, useCallback } from 'react';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Layout & UI
import { MainLayout } from '../components/layout/MainLayout';
import { InsightPanel } from '../components/layout/InsightPanel';
import { FloatingControls } from '../components/layout/FloatingControls';
import { TabId } from './routes';

// State & Hooks
import { useAlgorithmStore } from '../state/useAlgorithmStore';
import { usePlaybackStore } from '../state/usePlaybackStore';
import { useAlgorithmRunner } from '../hooks/useAlgorithmRunner';
import { useProgressTracker } from '../hooks/useProgressTracker';
import { useAlgorithmVisualization } from '../hooks/useAlgorithmVisualization';
import { useAnimationActions, useAnimationDriver } from '../core/animation/animationEngine';

// Data
import { algorithmRegistry } from '../data/algorithmMetadata';
import { leetcodeProblems } from '../data/leetcodeProblems';
import { quizQuestions, learningPaths } from '../data/quizAndPaths';
import { generateRandomArray } from '../utils/generateRandomArray';
import { buildSampleBST } from '../algorithms/tree/binarySearchTree';
import { cn } from '../utils/cn';

// Visualizations
import { ArrayCanvas } from '../visualization/array/ArrayCanvas';
import { GraphCanvas } from '../visualization/graph/GraphCanvas';
import { TreeCanvas } from '../visualization/tree/TreeCanvas';
import { DPTable } from '../visualization/dp/DPTable';
import { ComparisonCanvas } from '../components/comparison/ComparisonCanvas';

// Algorithms for Race
import { bubbleSort } from '../algorithms/sorting/bubbleSort';
import { quickSort } from '../algorithms/sorting/quickSort';
import { mergeSort } from '../algorithms/sorting/mergeSort';

// Non-Viz Tabs
import { QuizCard } from '../components/quiz/QuizCard';
import { LearningPathPanel } from '../components/learning/LearningPath';

// Landing Page
import LandingPage from '../components/landing/LandingPage';

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

export default function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [activeTab, setActiveTab] = useState<TabId>('sorting');
  const [array, setArray] = useState<number[]>([]);
  const [target, setTarget] = useState<number | null>(null);

  const { selectedAlgorithmId, setSelectedAlgorithmId } = useAlgorithmStore();
  const { steps, currentStepIndex, reset: resetPlayback, isPlaying, isPaused } = usePlaybackStore();
  const { runSelected, stop } = useAlgorithmRunner();

  useAnimationDriver();
  const { nextStep, prevStep, pause, resume } = useAnimationActions();
  const { overallProgress, recordQuizScore, markAlgorithmViewed } = useProgressTracker();

  const entry = useMemo(() => algorithmRegistry[selectedAlgorithmId], [selectedAlgorithmId]);
  const problem = useMemo(() => leetcodeProblems.find(p => p.algorithmId === selectedAlgorithmId), [selectedAlgorithmId]);

  const { array: visualizedArray, explanation: arrayExplanation } = useAlgorithmVisualization(array, steps, currentStepIndex);

  const currentExplanation = useMemo(() => {
    if (['sorting', 'searching', 'techniques'].includes(activeTab)) return arrayExplanation;
    return steps[currentStepIndex]?.explanation;
  }, [activeTab, arrayExplanation, steps, currentStepIndex]);

  const handleNewArray = useCallback(() => {
    const size = activeTab === 'comparison' ? 40 : 15;
    const newArr = generateRandomArray(size, 10, 200);
    setArray(newArr);
    setTarget(
      ['binary', 'two-pointer'].includes(selectedAlgorithmId)
        ? newArr[Math.floor(Math.random() * newArr.length)]
        : null
    );
    resetPlayback();
  }, [resetPlayback, selectedAlgorithmId, activeTab]);

  useEffect(() => { handleNewArray(); }, [handleNewArray]);

  useEffect(() => {
    const cat = entry?.info.category.toLowerCase() as TabId;
    if (cat && activeTab !== cat && ['sorting','searching','techniques','graph','tree','dp'].includes(activeTab)) {
      setActiveTab(cat);
    }
  }, [selectedAlgorithmId, entry, activeTab]);

  const handleTabChange = (newTab: TabId) => {
    setActiveTab(newTab);
    if (['sorting','searching','techniques','graph','tree','dp'].includes(newTab)) {
      useAlgorithmStore.getState().setSelectedCategory(newTab);
    }
  };

  const handleRun = useCallback(() => {
    if (!entry) return;
    markAlgorithmViewed(selectedAlgorithmId);
    const cat = entry.info.category.toLowerCase();
    if (cat === 'graph') runSelected(SAMPLE_GRAPH, 'A');
    else if (cat === 'dp') runSelected(selectedAlgorithmId === 'fib' ? 10 : [1,2,5], 11);
    else if (cat === 'tree') runSelected(buildSampleBST());
    else runSelected(array, target);
  }, [entry, selectedAlgorithmId, markAlgorithmViewed, runSelected, array, target]);

  const progress = Math.round((currentStepIndex / Math.max(steps.length - 1, 1)) * 100);
  const isVizTab = ['sorting','searching','techniques','graph','tree','dp'].includes(activeTab);

  if (showLanding) {
    return <LandingPage onLaunch={() => setShowLanding(false)} />;
  }

  return (
    <MainLayout
      activeTab={activeTab}
      onTabChange={handleTabChange}
      insightPanel={isVizTab && entry ? (
        <InsightPanel
          info={entry.info}
          currentStep={steps[currentStepIndex]}
          explanation={currentExplanation}
          progress={progress}
        />
      ) : null}
    >
      <div className="flex-1 flex flex-col h-full min-h-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + selectedAlgorithmId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex-1 flex flex-col h-full"
          >
            {isVizTab ? (
              <div className="flex-1 flex flex-col min-h-0">
                {(activeTab === 'sorting' || activeTab === 'searching' || activeTab === 'techniques') &&
                  <ArrayCanvas array={visualizedArray} maxValue={200} />}
                
                {activeTab === 'graph' && (
                  <div className="flex-1 bg-background-secondary rounded-[32px] border border-border p-6 shadow-inner relative overflow-hidden">
                    <GraphCanvas graph={SAMPLE_GRAPH} currentStep={steps[currentStepIndex]} />
                  </div>
                )}
                
                {activeTab === 'tree' && (
                  <div className="flex-1 bg-background-secondary rounded-[32px] border border-border p-6 shadow-inner relative overflow-hidden">
                    <TreeCanvas root={buildSampleBST()} currentStep={steps[currentStepIndex]} />
                  </div>
                )}
                
                {activeTab === 'dp' && (
                  <div className="flex-1 bg-background-secondary rounded-[32px] border border-border p-6 shadow-inner relative overflow-hidden overflow-y-auto custom-scrollbar">
                    <DPTable steps={steps} currentStepIndex={currentStepIndex} />
                  </div>
                )}
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto custom-scrollbar h-full">
                {activeTab === 'comparison' && (
                  <div className="h-full">
                    <ComparisonCanvas 
                      array={array}
                      algorithms={[
                        { id: 'bubble', name: 'Bubble Sort', color: '#f59e0b', fn: bubbleSort },
                        { id: 'quick',  name: 'Quick Sort',  color: '#6366f1', fn: quickSort },
                        { id: 'merge',  name: 'Merge Sort',  color: '#ec4899', fn: mergeSort },
                      ]}
                    />
                  </div>
                )}
                {activeTab === 'quiz' && (
                  <div className="py-12">
                     <QuizCard questions={quizQuestions} onComplete={(score, total) => recordQuizScore('main', Math.round(score/total*100))} />
                  </div>
                )}
                {activeTab === 'paths' && (
                  <div className="py-12 max-w-5xl mx-auto px-4">
                    <div className="flex flex-col gap-10">
                       <div className="flex flex-col md:flex-row items-center gap-8 bg-background-primary border border-border rounded-[40px] p-10 shadow-sm relative overflow-hidden">
                          <div className="flex-1">
                             <h2 className="text-4xl font-black text-text-primary tracking-tighter mb-4">Mastery Progress</h2>
                             <p className="text-sm font-bold text-text-secondary max-w-lg mb-8 italic">"Consistency in visualizing leads to mastery in implementation. Track your growth across algorithmic domains."</p>
                             <div className="flex gap-4">
                                <MetricPill label="Skill Rank" value="Expert" color="text-accent-primary" />
                                <MetricPill label="Active Streak" value="12 Days" color="text-warning" />
                                <MetricPill label="Total Labs" value="34 Complete" color="text-success" />
                             </div>
                          </div>
                          
                          <div className="w-48 h-48 relative shrink-0">
                             <svg className="w-full h-full -rotate-90">
                                <circle cx="96" cy="96" r="80" fill="transparent" stroke="currentColor" strokeWidth="12" className="text-slate-100 dark:text-slate-800" />
                                <motion.circle 
                                  cx="96" cy="96" r="80" 
                                  fill="transparent" stroke="currentColor" strokeWidth="12" 
                                  className="text-accent-primary"
                                  strokeDasharray="502.6"
                                  initial={{ strokeDashoffset: 502.6 }}
                                  animate={{ strokeDashoffset: 502.6 * (1 - overallProgress / 100) }}
                                  transition={{ duration: 1.5, ease: 'easeOut' }}
                                  strokeLinecap="round"
                                />
                             </svg>
                             <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-4xl font-black text-text-primary tracking-tighter">{overallProgress}%</span>
                                <span className="text-[10px] font-black text-text-secondary uppercase tracking-widest">Mastery</span>
                             </div>
                          </div>
                          
                          {/* Animated Background Pattern */}
                          <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-accent-primary/5 rounded-full blur-3xl" />
                       </div>

                       <LearningPathPanel paths={learningPaths} viewedAlgorithms={[]} onSelectAlgorithm={(id: string) => setSelectedAlgorithmId(id)} />
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {isVizTab && (
          <FloatingControls
            onPlay={handleRun}
            onPause={pause}
            onReset={resetPlayback}
            onStepForward={nextStep}
            onStepBackward={prevStep}
            onRandomize={handleNewArray}
            isPlaying={isPlaying}
            isPaused={isPaused}
            canStepForward={currentStepIndex < steps.length - 1}
            canStepBackward={currentStepIndex > 0}
            progress={progress}
          />
        )}
      </div>
    </MainLayout>
  );
}

const MetricPill = ({ label, value, color }: { label: string, value: string, color: string }) => (
  <div className="px-4 py-2 bg-background-secondary border border-border rounded-2xl shadow-sm">
    <p className="text-[8px] font-black uppercase tracking-widest text-text-secondary mb-1 opacity-60">{label}</p>
    <p className={cn("text-xs font-black tracking-tight", color)}>{value}</p>
  </div>
);
