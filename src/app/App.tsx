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
import { AlgorithmDropdown } from '../components/controls/AlgorithmDropdown';
import { SpeedSlider } from '../components/controls/SpeedSlider';
import { ControlPanel } from '../components/controls/ControlPanel';
import { AlgorithmOverviewCard } from '../components/learning/AlgorithmOverviewCard';
import { LogicBreakdown } from '../components/learning/LogicBreakdown';
import { RealWorldAnalogy } from '../components/learning/RealWorldAnalogy';
import { PseudocodeViewer } from '../components/learning/PseudocodeViewer';
import { CurrentStepExplanation } from '../components/walkthrough/CurrentStepExplanation';
import { ComparisonCanvas } from '../components/comparison/ComparisonCanvas';
import { CodeEditor } from '../components/editor/CodeEditor';
import { InputEditor } from '../components/playground/InputEditor';
import { QuizCard } from '../components/quiz/QuizCard';
import { LearningPathPanel } from '../components/learning/LearningPath';
import { ProblemPanel } from '../components/problems/ProblemPanel';

// Utils
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

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('visualizer');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [array, setArray] = useState<number[]>([]);
  const [target, setTarget] = useState<number | null>(null);
  
  const { selectedAlgorithmId, setSelectedAlgorithmId } = useAlgorithmStore();
  const { steps, currentStepIndex, reset: resetPlayback } = usePlaybackStore();
  const { runSelected, stop } = useAlgorithmRunner();
  
  // Single instance of the driver to avoid competition between hooks
  useAnimationDriver();
  const { nextStep, prevStep } = useAnimationActions();
  
  const { progress, overallProgress, recordQuizScore, markAlgorithmViewed } = useProgressTracker();

  const entry = useMemo(() => algorithmRegistry[selectedAlgorithmId], [selectedAlgorithmId]);
  const problem = useMemo(() => leetcodeProblems.find(p => p.algorithmId === selectedAlgorithmId), [selectedAlgorithmId]);

  const { array: visualizedArray, explanation: arrayExplanation } = useAlgorithmVisualization(array, steps, currentStepIndex);

  // Sync explanations across different algorithm types
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

  /**
   * Coordination Logic: 
   * Ensure the selected algorithm matches the active tab's context.
   */
  
  // 1. When algorithm changes, ensure we are on the right tab
  useEffect(() => {
    if (!entry) return;
    const cat = entry.info.category.toLowerCase();
    let targetTab: TabId = 'visualizer';
    
    if (cat === 'graph') targetTab = 'graph';
    else if (cat === 'tree') targetTab = 'tree';
    else if (cat === 'dp') targetTab = 'dp';
    
    // Only switch if the user is currently in a visualizer mode
    const visualizerTabs: TabId[] = ['visualizer', 'graph', 'tree', 'dp'];
    if (visualizerTabs.includes(activeTab) && activeTab !== targetTab) {
        setActiveTab(targetTab);
    }
  }, [selectedAlgorithmId, entry]);

  // 2. When user manually switches tab via sidebar, pick a default algorithm for that tab
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
        // Find first algorithm in the registry that matches this category
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
    <div className="min-h-screen bg-slate-900 text-slate-50 flex flex-col font-sans selection:bg-indigo-500/30">
      <Navbar overallProgress={overallProgress} onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} isMenuOpen={isMenuOpen} />
      
      <div className="flex-1 flex max-w-7xl w-full mx-auto overflow-hidden">
        <Sidebar activeTab={activeTab} setActiveTab={handleTabChange} tabs={TABS as any} />
        
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          {isVisualizationTab && (
            <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex flex-col lg:flex-row gap-6 items-start">
                <AlgorithmDropdown 
                  label="Algorithm" 
                  categories={algorithmCategories} 
                />
                <SpeedSlider />
                <button onClick={handleNewArray} className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 text-sm font-bold transition-all whitespace-nowrap">
                   New Data
                </button>
              </div>

              {/* Canvas Area */}
              <div className="bg-slate-900 shadow-2xl rounded-3xl p-6 border border-slate-700/50 min-h-[440px] flex flex-col relative overflow-hidden">
                <div className="absolute top-4 right-6 text-[10px] font-black uppercase tracking-widest text-slate-500 bg-slate-800/50 px-3 py-1 rounded-full border border-slate-700/50 z-10 transition-all">
                   {activeTab === 'visualizer' ? 'Array' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Visualizer
                </div>
                
                <div className="flex-1 flex flex-col">
                    {activeTab === 'visualizer' && (
                      <ArrayCanvas array={visualizedArray} maxValue={200} />
                    )}
                    {activeTab === 'graph' && (
                       <GraphCanvas graph={SAMPLE_GRAPH} currentStep={steps[currentStepIndex]} />
                    )}
                    {activeTab === 'tree' && (
                        <TreeCanvas root={buildSampleBST()} currentStep={steps[currentStepIndex]} />
                    )}
                    {activeTab === 'dp' && (
                      <DPTable steps={steps} currentStepIndex={currentStepIndex} />
                    )}
                </div>
              </div>

              {/* Playback & Step Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <ControlPanel 
                    onPlay={handleRun}
                    onStop={stop}
                    onStepForward={nextStep} 
                    onStepBackward={prevStep}
                    onRestart={handleNewArray}
                  />
                </div>
                <div className="md:col-span-2">
                  <CurrentStepExplanation explanation={currentExplanation} />
                </div>
              </div>

              {/* Educational Content */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 flex flex-col gap-6">
                  {entry && <AlgorithmOverviewCard info={entry.info} leetcodeLink={problem?.link} />}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {entry && <LogicBreakdown steps={entry.info.stepByStep} intuition={entry.info.intuition} whenToUse={entry.info.whenToUse} />}
                    <div className="flex flex-col gap-6">
                      {entry && <RealWorldAnalogy analogy={entry.info.analogy} />}
                      {entry && <PseudocodeViewer code={entry.info.pseudocode} />}
                    </div>
                  </div>
                </div>
                <div>
                  {problem && <ProblemPanel problem={problem} />}
                </div>
              </div>
            </div>
          )}

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
               <div className="bg-slate-800/40 rounded-3xl p-8 border border-slate-700/50 flex items-center justify-between">
                 <div>
                   <h2 className="text-4xl font-black mb-2">{overallProgress}% Path Complete</h2>
                   <p className="text-slate-400">Keep going! You're mastering the fundamental algorithms.</p>
                 </div>
                 <div className="w-32 h-32 rounded-full border-8 border-slate-700 flex items-center justify-center relative">
                    <span className="text-2xl font-black">{overallProgress}%</span>
                    <svg className="absolute inset-0 w-full h-full -rotate-90">
                      <circle cx="64" cy="64" r="56" fill="transparent" stroke="#6366f1" strokeWidth="8" strokeDasharray="351.85" strokeDashoffset={351.85 * (1 - overallProgress/100)} strokeLinecap="round" />
                    </svg>
                 </div>
               </div>
               <LearningPathPanel paths={learningPaths} viewedAlgorithms={progress.viewedAlgorithms} onSelectAlgorithm={(id) => { setSelectedAlgorithmId(id); setActiveTab('visualizer'); }} />
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}
