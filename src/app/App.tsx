import { useState, useEffect, useMemo, useCallback } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Sidebar } from '../components/layout/Sidebar';
import { Footer } from '../components/layout/Footer';
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
import { CurrentStepExplanation } from '../components/walkthrough/CurrentStepExplanation';
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
    <div className={`w-3 h-3 rounded-full ${color} shadow-lg`} />
    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</span>
  </div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('visualizer');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [array, setArray] = useState<number[]>([]);
  const [target, setTarget] = useState<number | null>(null);
  
  const { selectedAlgorithmId, setSelectedAlgorithmId } = useAlgorithmStore();
  const { steps, currentStepIndex, reset: resetPlayback } = usePlaybackStore();
  const { runSelected, stop } = useAlgorithmRunner();
  
  useAnimationDriver();
  const { nextStep, prevStep } = useAnimationActions();
  
  const { progress, overallProgress, recordQuizScore, markAlgorithmViewed } = useProgressTracker();

  const entry = useMemo(() => algorithmRegistry[selectedAlgorithmId], [selectedAlgorithmId]);
  const problem = useMemo(() => leetcodeProblems.find(p => p.algorithmId === selectedAlgorithmId), [selectedAlgorithmId]);

  const { array: visualizedArray, explanation: arrayExplanation } = useAlgorithmVisualization(array, steps, currentStepIndex);

  const currentExplanation = useMemo(() => {
    if (activeTab === 'visualizer') return arrayExplanation;
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
    if (!entry) return;
    const cat = entry.info.category.toLowerCase();
    let targetTab: TabId = 'visualizer';
    
    if (cat === 'graph') targetTab = 'graph';
    else if (cat === 'tree') targetTab = 'tree';
    else if (cat === 'dp') targetTab = 'dp';
    
    const visualizerTabs: TabId[] = ['visualizer', 'graph', 'tree', 'dp'];
    if (visualizerTabs.includes(activeTab) && activeTab !== targetTab) {
        setActiveTab(targetTab);
    }
  }, [selectedAlgorithmId, entry, activeTab]);

  const handleTabChange = (newTab: TabId) => {
    setActiveTab(newTab);
    
    const tabToCategoryMap: Record<string, string> = {
        'visualizer': 'sorting',
        'graph': 'graph',
        'tree': 'tree',
        'dp': 'dp'
    };
    
    const targetCategory = tabToCategoryMap[newTab];
    if (targetCategory && entry?.info.category.toLowerCase() !== targetCategory) {
        const firstInCat = Object.values(algorithmRegistry).find(a => a.info.category.toLowerCase() === targetCategory);
        if (firstInCat) {
            setSelectedAlgorithmId(firstInCat.id);
        }
    }
  };

  const handleRun = () => {
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
  };

  const isVisualizationTab = ['visualizer', 'graph', 'tree', 'dp'].includes(activeTab);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col font-sans selection:bg-indigo-500/30 overflow-hidden">
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
        isPlaying={!!steps.length && currentStepIndex < steps.length - 1}
      />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Far Left: Navigation Rail */}
        <NavRail activeTab={activeTab} onTabChange={handleTabChange} />

        {/* Left Side: Educational Rail */}
        <aside className="hidden lg:flex flex-col w-80 border-r border-slate-800 bg-slate-900 overflow-y-auto p-6 custom-scrollbar animate-slide-left">
          <Sidebar 
            algorithm={entry} 
            problem={problem} 
            currentStep={steps[currentStepIndex]} 
          />
        </aside>

        {/* Center: Visualization Canvas */}
        <main className="flex-1 bg-slate-950 relative overflow-hidden flex flex-col items-center justify-center p-8 animate-premium">
          {isVisualizationTab ? (
            <div className="max-w-6xl mx-auto w-full flex flex-col gap-10">
              <section className="relative group">
                <div className="bg-slate-900 shadow-premium rounded-[32px] p-8 lg:p-12 border border-slate-800/60 min-h-[600px] flex flex-col relative overflow-hidden">
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                       style={{ backgroundImage: 'radial-gradient(#6366f1 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                  
                  <div className="absolute top-6 right-8 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500/50 bg-indigo-500/10 px-4 py-1.5 rounded-full border border-indigo-500/20 z-10 backdrop-blur-md">
                     {activeTab === 'visualizer' ? 'Array' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Simulation
                  </div>
                  
                  <div className="flex-1 flex flex-col relative z-0 justify-center">
                      {activeTab === 'visualizer' && <ArrayCanvas array={visualizedArray} maxValue={200} />}
                      {activeTab === 'graph' && <GraphCanvas graph={SAMPLE_GRAPH} currentStep={steps[currentStepIndex]} />}
                      {activeTab === 'tree' && <TreeCanvas root={buildSampleBST()} currentStep={steps[currentStepIndex]} />}
                      {activeTab === 'dp' && <DPTable steps={steps} currentStepIndex={currentStepIndex} />}
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-slate-800/50 flex flex-wrap gap-6 justify-center">
                    <LegendItem color="bg-indigo-500" label="Default" />
                    <LegendItem color="bg-yellow-400" label="Comparison" />
                    <LegendItem color="bg-rose-500" label="Modification / Swap" />
                    <LegendItem color="bg-emerald-500" label="Sorted / Result" />
                    <LegendItem color="bg-blue-400" label="Pointers" />
                  </div>
                </div>

                <button 
                  onClick={handleNewArray} 
                  className="absolute -bottom-6 left-1/2 -translate-x-1/2 group flex items-center gap-3 px-8 py-4 bg-slate-850 hover:bg-slate-800 rounded-2xl border border-slate-700 text-sm font-black transition-all shadow-2xl active:scale-95 whitespace-nowrap z-20"
                >
                   <RotateCcw size={18} className="text-indigo-400 group-hover:rotate-[-180deg] transition-transform duration-500" />
                   <span>Regenerate Dataset</span>
                </button>
              </section>

              {problem && (
                <div className="mt-8">
                  <ProblemPanel problem={problem} />
                </div>
              )}
            </div>
          ) : (
            <div className="h-full">
              {activeTab === 'compare' && <ComparisonCanvas array={array} algorithms={[]} />}
              {activeTab === 'code' && <CodeEditor onGenerateSteps={() => {}} />}
              {activeTab === 'playground' && <InputEditor onApply={() => {}} />}
              {activeTab === 'quiz' && (
                <div className="max-w-2xl mx-auto w-full py-8">
                  <QuizCard questions={quizQuestions} onComplete={(score, total) => recordQuizScore('main', Math.round(score/total*100))} />
                </div>
              )}
              {activeTab === 'paths' && (
                <div className="flex flex-col gap-8">
                   <div className="bg-slate-850 rounded-3xl p-8 border border-slate-700/50 flex items-center justify-between shadow-premium">
                     <div>
                       <h2 className="text-4xl font-black mb-2">{overallProgress}% Path Complete</h2>
                       <p className="text-slate-400">Keep going! You're mastering the fundamental algorithms.</p>
                     </div>
                     <div className="w-32 h-32 rounded-full border-8 border-slate-800 flex items-center justify-center relative">
                        <span className="text-2xl font-black">{overallProgress}%</span>
                        <svg className="absolute inset-0 w-full h-full -rotate-90">
                          <circle cx="64" cy="64" r="56" fill="transparent" stroke="#6366f1" strokeWidth="8" strokeDasharray="351.85" strokeDashoffset={351.85 * (1 - overallProgress/100)} strokeLinecap="round" />
                        </svg>
                     </div>
                   </div>
                    <LearningPathPanel paths={learningPaths} viewedAlgorithms={progress.viewedAlgorithms} onSelectAlgorithm={(id: string) => { setSelectedAlgorithmId(id); setActiveTab('visualizer'); }} />
                </div>
              )}
            </div>
          )}
        </main>

        <aside className="hidden xl:flex flex-col w-96 border-l border-slate-800 bg-slate-900 p-6 overflow-y-auto custom-scrollbar">
          {isVisualizationTab && (
            <div className="flex flex-col h-full">
              <div className="mb-8 font-black">
                <span className="text-[10px] text-slate-500 uppercase tracking-[0.3em]">Simulation Logic</span>
                <h3 className="text-xl mt-2">Walkthrough</h3>
              </div>
              <div className="flex-1">
                 <CurrentStepExplanation explanation={currentExplanation} />
              </div>
            </div>
          )}
        </aside>
      </div>
      <Footer />
    </div>
  );
}
