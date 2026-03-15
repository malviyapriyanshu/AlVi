import { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { generateRandomArray } from '../utils/generateRandomArray';
import { useAnimationEngine } from '../hooks/useAnimationEngine';
import { useProgressTracker } from '../hooks/useProgressTracker';
import { algorithmRegistry, algorithmCategories } from '../data/algorithmMetadata';
import { leetcodeProblems } from '../data/leetcodeProblems';
import { quizQuestions, learningPaths } from '../data/quizAndPaths';
import { DropdownWrapper } from '../components/controls/AlgorithmDropdown';
import { SpeedSlider } from '../components/controls/SpeedSlider';
import { ArrayBar } from '../components/visualizer/ArrayBar';
import { GraphCanvas } from '../components/visualizer/GraphCanvas';
import { TreeCanvas } from '../components/visualizer/TreeCanvas';
import { DPTable } from '../components/visualizer/DPTable';
import { AlgorithmOverviewCard } from '../components/learning/AlgorithmOverviewCard';
import { RealWorldAnalogy } from '../components/learning/RealWorldAnalogy';
import { LogicBreakdown } from '../components/learning/LogicBreakdown';
import { PseudocodeViewer } from '../components/learning/PseudocodeViewer';
import { StepController } from '../components/walkthrough/StepController';
import { CurrentStepExplanation } from '../components/walkthrough/CurrentStepExplanation';
import { ProblemPanel } from '../components/problems/ProblemPanel';
import { ComparisonCanvas } from '../components/comparison/ComparisonCanvas';
import { CodeEditor } from '../components/editor/CodeEditor';
import { InputEditor } from '../components/playground/InputEditor';
import { QuizCard } from '../components/quiz/QuizCard';
import { LearningPathPanel } from '../components/learning/LearningPath';
import { AlgorithmMetrics } from '../components/metrics/AlgorithmMetrics';
import { bfs, bfsInfo } from '../algorithms/graph/bfs';
import { dfs, dfsInfo } from '../algorithms/graph/dfs';
import { dijkstra, dijkstraInfo } from '../algorithms/graph/dijkstra';
import { buildSampleBST, inorderTraversal, preorderTraversal, levelOrderTraversal, inorderInfo } from '../algorithms/tree/bst';
import { fibonacciDP, fibonacciInfo, coinChangeDP, coinChangeInfo } from '../algorithms/dp/fibAndCoin';
import { bubbleSort } from '../algorithms/sorting/bubbleSort';
import { mergeSort } from '../algorithms/sorting/mergeSort';
import { quickSort } from '../algorithms/sorting/quickSort';
import { insertionSort } from '../algorithms/sorting/insertionSort';
import type { Graph, GraphAnimationStep, TreeAnimationStep, DPAnimationStep } from '../types/extended';
import type { AnimationStep } from '../types';
import {
  BarChart3, Shuffle, Square, BookOpen, Play, RotateCcw, Menu, X,
  GitBranch, TreePine, Layers, BarChart2, Code2, Wand2, Trophy, Map,
  TrendingUp, ChevronDown, ChevronUp
} from 'lucide-react';

const ARRAY_SIZE = 30;
const MAX_VALUE = 300;

type TabId = 'visualizer' | 'graph' | 'tree' | 'dp' | 'compare' | 'code' | 'playground' | 'quiz' | 'paths';

const TABS: { id: TabId; label: string; icon: React.ReactNode; shortLabel: string }[] = [
  { id: 'visualizer', label: 'Visualizer', shortLabel: 'Viz', icon: <BarChart3 size={16} /> },
  { id: 'graph',      label: 'Graphs',     shortLabel: 'Graph', icon: <GitBranch size={16} /> },
  { id: 'tree',       label: 'Trees',      shortLabel: 'Tree', icon: <TreePine size={16} /> },
  { id: 'dp',         label: 'Dynamic Programming', shortLabel: 'DP', icon: <Layers size={16} /> },
  { id: 'compare',    label: 'Compare',    shortLabel: 'Cmp', icon: <BarChart2 size={16} /> },
  { id: 'code',       label: 'Code It',    shortLabel: 'Code', icon: <Code2 size={16} /> },
  { id: 'playground', label: 'Playground', shortLabel: 'Play', icon: <Wand2 size={16} /> },
  { id: 'quiz',       label: 'Quiz',       shortLabel: 'Quiz', icon: <Trophy size={16} /> },
  { id: 'paths',      label: 'Learn',      shortLabel: 'Learn', icon: <Map size={16} /> },
];

// Sample graph data
const SAMPLE_GRAPH: Graph = {
  directed: false,
  nodes: [
    { id: 'A', label: 'A', x: 80,  y: 80  },
    { id: 'B', label: 'B', x: 200, y: 40  },
    { id: 'C', label: 'C', x: 320, y: 80  },
    { id: 'D', label: 'D', x: 120, y: 180 },
    { id: 'E', label: 'E', x: 260, y: 180 },
    { id: 'F', label: 'F', x: 400, y: 150 },
    { id: 'G', label: 'G', x: 200, y: 260 },
  ],
  edges: [
    { from: 'A', to: 'B', weight: 4 }, { from: 'A', to: 'D', weight: 2 },
    { from: 'B', to: 'C', weight: 5 }, { from: 'B', to: 'E', weight: 2 },
    { from: 'C', to: 'F', weight: 3 }, { from: 'D', to: 'E', weight: 4 },
    { from: 'D', to: 'G', weight: 8 }, { from: 'E', to: 'F', weight: 1 },
    { from: 'E', to: 'G', weight: 6 }, { from: 'F', to: 'G', weight: 5 },
  ],
};

const ProgressBar = memo(({ viewed, total }: { viewed: number; total: number }) => (
  <div className="flex items-center gap-2">
    <div className="w-20 bg-slate-700 rounded-full h-1.5">
      <div className="bg-indigo-500 h-1.5 rounded-full transition-all" style={{ width: `${Math.round((viewed / total) * 100)}%` }} />
    </div>
    <span className="text-[10px] text-slate-500">{viewed}/{total}</span>
  </div>
));

function App() {
  const [activeTab, setActiveTab] = useState<TabId>('visualizer');
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('bubble');
  const [speedMs, setSpeedMs] = useState(50);
  const [baseArray, setBaseArray] = useState<number[]>([]);
  const [customArray, setCustomArray] = useState<number[] | null>(null);
  const [targetValue, setTargetValue] = useState<number | null>(null);
  const [showProblem, setShowProblem] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showMetrics, setShowMetrics] = useState(false);
  const [metrics, setMetrics] = useState({ comparisons: 0, swaps: 0, overwrites: 0 });

  // Graph state
  const [graphAlgo, setGraphAlgo] = useState<'bfs' | 'dfs' | 'dijkstra'>('bfs');
  const [graphSteps, setGraphSteps] = useState<GraphAnimationStep[]>([]);

  // Tree state
  const [treeTraversal, setTreeTraversal] = useState<'inorder' | 'preorder' | 'levelorder'>('inorder');
  const [treeSteps, setTreeSteps] = useState<TreeAnimationStep[]>([]);
  const bstRoot = useMemo(() => buildSampleBST(), []);

  // DP state
  const [dpAlgo, setDpAlgo] = useState<'fib' | 'coin'>('fib');
  const [dpSteps, setDpSteps] = useState<DPAnimationStep[]>([]);
  const [dpN, setDpN] = useState(10);

  const { progress, overallProgress, TOTAL_ALGORITHMS, markAlgorithmViewed, recordQuizScore } = useProgressTracker();

  const {
    array: visualizedArray,
    isAnimating, isPaused, isSorted,
    currentStepIndex, totalSteps, currentExplanation,
    initializeArray, runAnimation, stopAnimation,
    pauseAnimation, resumeAnimation, stepForward, stepBackward, restartAnimation,
  } = useAnimationEngine();

  useEffect(() => { handleGenerateNewArray(); }, []);

  // Run graph algo on tab switch / algo change
  useEffect(() => {
    if (activeTab !== 'graph') return;
    const steps = graphAlgo === 'bfs' ? bfs(SAMPLE_GRAPH, 'A') : graphAlgo === 'dfs' ? dfs(SAMPLE_GRAPH, 'A') : dijkstra(SAMPLE_GRAPH, 'A');
    setGraphSteps(steps);
  }, [graphAlgo, activeTab]);

  // Run tree traversal
  useEffect(() => {
    if (activeTab !== 'tree') return;
    const steps = treeTraversal === 'inorder' ? inorderTraversal(bstRoot) : treeTraversal === 'preorder' ? preorderTraversal(bstRoot) : levelOrderTraversal(bstRoot);
    setTreeSteps(steps);
  }, [treeTraversal, activeTab, bstRoot]);

  // Run DP
  useEffect(() => {
    if (activeTab !== 'dp') return;
    const steps = dpAlgo === 'fib' ? fibonacciDP(dpN) : coinChangeDP([1, 3, 5], dpN);
    setDpSteps(steps);
  }, [dpAlgo, dpN, activeTab]);

  const handleGenerateNewArray = useCallback(() => {
    const newArray = generateRandomArray(ARRAY_SIZE, 10, MAX_VALUE);
    setBaseArray(newArray);
    setCustomArray(null);
    initializeArray(newArray);
    setTargetValue(null);
    setMetrics({ comparisons: 0, swaps: 0, overwrites: 0 });
  }, [initializeArray]);

  const handleReset = useCallback(() => {
    initializeArray(customArray ?? baseArray);
    setTargetValue(null);
  }, [initializeArray, baseArray, customArray]);

  const entry = useMemo(() => algorithmRegistry[selectedAlgorithm], [selectedAlgorithm]);
  const problem = useMemo(() => leetcodeProblems.find(p => p.algorithmId === selectedAlgorithm), [selectedAlgorithm]);

  const handleStart = useCallback(() => {
    if (isAnimating) return;
    let currentArray = isSorted ? [...(customArray ?? baseArray)] : visualizedArray.map(item => item.value);
    if (isSorted) initializeArray(customArray ?? baseArray);
    setTargetValue(null);

    if (entry.needsSorted) {
      currentArray = [...currentArray].sort((a, b) => a - b);
      initializeArray(currentArray);
    }

    let target: number | undefined;
    if (entry.needsTarget) {
      if (selectedAlgorithm === 'two-pointer') {
        const idxA = Math.floor(Math.random() * currentArray.length);
        let idxB = Math.floor(Math.random() * currentArray.length);
        while (idxB === idxA && currentArray.length > 1) idxB = Math.floor(Math.random() * currentArray.length);
        target = currentArray[idxA] + currentArray[idxB];
      } else {
        target = currentArray[Math.floor(Math.random() * currentArray.length)];
      }
      setTargetValue(target);
    }

    const steps = entry.run(currentArray, target);
    // Compute metrics
    const m = steps.reduce((acc: typeof metrics, s: AnimationStep) => ({
      comparisons: acc.comparisons + (s.type === 'compare' ? 1 : 0),
      swaps: acc.swaps + (s.type === 'swap' ? 1 : 0),
      overwrites: acc.overwrites + (s.type === 'overwrite' ? 1 : 0),
    }), { comparisons: 0, swaps: 0, overwrites: 0 });
    setMetrics(m);
    markAlgorithmViewed(selectedAlgorithm);
    runAnimation({ animationSteps: steps, speedMs });
    setMenuOpen(false);
  }, [isAnimating, isSorted, customArray, baseArray, visualizedArray, entry, selectedAlgorithm, initializeArray, runAnimation, speedMs, markAlgorithmViewed]);

  const handlePlaygroundApply = (config: { array: number[]; target: number | null; windowSize: number }) => {
    setCustomArray(config.array);
    initializeArray(config.array);
    setTargetValue(config.target);
    setActiveTab('visualizer');
  };

  const handleSelectAlgorithm = (id: string) => {
    setSelectedAlgorithm(id);
    setActiveTab('visualizer');
  };

  const controlDisabled = isAnimating && !isPaused;
  const currentArray = visualizedArray.map(b => b.value);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 flex flex-col font-sans">
      {/* === HEADER === */}
      <header className="sticky top-0 z-20 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between gap-3 py-3">
            {/* Logo */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="bg-indigo-600 p-1.5 rounded-lg"><BarChart3 className="text-white" size={20} /></div>
              <h1 className="text-xl sm:text-2xl font-black">Algo<span className="text-indigo-400">Vis</span></h1>
            </div>

            {/* Desktop right side */}
            <div className="hidden lg:flex items-center gap-4 flex-1 justify-end">
              {activeTab === 'visualizer' && (<>
                <DropdownWrapper label="Algorithm" selectedId={selectedAlgorithm} categories={algorithmCategories} onSelect={setSelectedAlgorithm} disabled={controlDisabled} />
                <SpeedSlider speed={speedMs} onSpeedChange={setSpeedMs} disabled={controlDisabled} />
                <div className="flex items-center gap-2 border-l border-slate-700 pl-4">
                  <button onClick={handleGenerateNewArray} disabled={controlDisabled}
                    className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition-all disabled:opacity-50 border border-slate-700 text-sm">
                    <Shuffle size={15} className="text-indigo-400" /> New Array
                  </button>
                  {isAnimating && !isPaused ? (
                    <button onClick={stopAnimation} className="flex items-center gap-1.5 px-4 py-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 rounded-lg font-bold border border-rose-500/50 text-sm"><Square size={15} className="fill-current" /> Stop</button>
                  ) : (
                    <button onClick={isSorted ? handleReset : handleStart}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-bold border text-sm shadow-lg ${isSorted ? 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border-emerald-500/50' : 'bg-indigo-600 hover:bg-indigo-500 text-white border-indigo-500 shadow-indigo-500/20'}`}>
                      {isSorted ? <RotateCcw size={15} /> : <Play size={15} className="fill-current" />}
                      {isSorted ? 'Reset' : 'Start'}
                    </button>
                  )}
                  <button onClick={() => setShowProblem(!showProblem)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-medium border text-sm transition-all ${showProblem ? 'bg-indigo-600/20 text-indigo-400 border-indigo-500/50' : 'bg-slate-800 hover:bg-slate-700 text-slate-400 border-slate-700'}`}>
                    <BookOpen size={15} /> Problems
                  </button>
                </div>
              </>)}
              <ProgressBar viewed={progress.viewedAlgorithms.length} total={TOTAL_ALGORITHMS} />
            </div>

            {/* Mobile action buttons */}
            <div className="flex lg:hidden items-center gap-2">
              {activeTab === 'visualizer' && (<>
                {isAnimating && !isPaused ? (
                  <button onClick={stopAnimation} className="p-2 bg-rose-500/20 text-rose-400 rounded-lg border border-rose-500/50"><Square size={18} className="fill-current" /></button>
                ) : (
                  <button onClick={isSorted ? handleReset : handleStart}
                    className={`p-2 rounded-lg border ${isSorted ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50' : 'bg-indigo-600 text-white border-indigo-500'}`}>
                    {isSorted ? <RotateCcw size={18} /> : <Play size={18} className="fill-current" />}
                  </button>
                )}
              </>)}
              <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 bg-slate-800 text-slate-400 rounded-lg border border-slate-700">
                {menuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>

          {/* Mobile drawer */}
          {menuOpen && activeTab === 'visualizer' && (
            <div className="lg:hidden pb-4 flex flex-col gap-4 border-t border-slate-800 pt-4">
              <DropdownWrapper label="Algorithm" selectedId={selectedAlgorithm} categories={algorithmCategories} onSelect={(id) => { setSelectedAlgorithm(id); setMenuOpen(false); }} disabled={controlDisabled} />
              <SpeedSlider speed={speedMs} onSpeedChange={setSpeedMs} disabled={controlDisabled} />
              <div className="flex gap-2">
                <button onClick={() => { handleGenerateNewArray(); setMenuOpen(false); }} disabled={controlDisabled}
                  className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg border border-slate-700 text-sm disabled:opacity-50">
                  <Shuffle size={15} className="text-indigo-400" /> New Array
                </button>
                <button onClick={() => { setShowProblem(!showProblem); setMenuOpen(false); }}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-sm ${showProblem ? 'bg-indigo-600/20 text-indigo-400 border-indigo-500/50' : 'bg-slate-800 text-slate-400 border-slate-700'}`}>
                  <BookOpen size={15} /> Problems
                </button>
              </div>
            </div>
          )}

          {/* TAB BAR */}
          <div className="flex overflow-x-auto gap-0.5 pb-0 scrollbar-none border-t border-slate-800/50">
            {TABS.map(tab => (
              <button key={tab.id} onClick={() => { setActiveTab(tab.id); setMenuOpen(false); }}
                className={`flex items-center gap-1.5 px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-semibold whitespace-nowrap border-b-2 transition-all flex-shrink-0
                  ${activeTab === tab.id ? 'border-indigo-500 text-indigo-400 bg-indigo-500/5' : 'border-transparent text-slate-500 hover:text-slate-300 hover:border-slate-600'}`}>
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.shortLabel}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* === MAIN === */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-4 sm:py-6 flex flex-col gap-4 sm:gap-6">

        {/* ── VISUALIZER TAB ── */}
        {activeTab === 'visualizer' && (<>
          {targetValue !== null && (
            <div className="flex justify-center">
              <div className="bg-slate-800 border border-slate-700 rounded-full px-5 py-2 shadow-lg flex items-center gap-2">
                <span className="text-slate-400 text-xs font-medium">Target:</span>
                <span className="text-lg font-black text-orange-400">{targetValue}</span>
              </div>
            </div>
          )}

          <div className="h-[260px] sm:h-[380px] lg:h-[480px] bg-slate-800/40 rounded-2xl border border-slate-700/50 p-2 sm:p-4 shadow-inner flex items-end justify-center overflow-hidden">
            <div className="flex items-end justify-center h-full w-full gap-[1px] sm:gap-[2px] pt-8 sm:pt-12">
              {visualizedArray.map((bar, idx) => (
                <ArrayBar key={idx} value={bar.value} maxValue={MAX_VALUE} state={bar.state} pointers={bar.pointers} totalBars={ARRAY_SIZE} />
              ))}
            </div>
          </div>

          {/* Color Legend */}
          <div className="flex flex-wrap justify-center gap-x-3 gap-y-1.5 text-[10px] text-slate-500">
            {[['bg-indigo-500','Default'],['bg-yellow-400','Comparing'],['bg-red-500','Swap'],['bg-orange-400','Found'],['bg-emerald-500','Sorted'],['bg-blue-500','L ptr'],['bg-purple-500','R ptr'],['bg-slate-700 opacity-50','Discarded']].map(([cls, lbl]) => (
              <span key={lbl} className="flex items-center gap-1"><span className={`w-2.5 h-2.5 rounded-sm ${cls} inline-block`} />{lbl}</span>
            ))}
          </div>

          {(isAnimating || isPaused || totalSteps > 0) && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <StepController isPlaying={isAnimating} isPaused={isPaused} onPlay={handleStart} onPause={pauseAnimation} onResume={resumeAnimation} onStepForward={stepForward} onStepBackward={stepBackward} onRestart={restartAnimation} currentStep={currentStepIndex} totalSteps={totalSteps} />
              <div className="md:col-span-2"><CurrentStepExplanation explanation={currentExplanation} /></div>
            </div>
          )}

          {/* Metrics toggle */}
          {(metrics.comparisons > 0 || metrics.swaps > 0) && (
            <div>
              <button onClick={() => setShowMetrics(!showMetrics)} className="flex items-center gap-2 text-xs text-slate-500 hover:text-slate-300 transition-colors mb-2">
                <TrendingUp size={14} /> {showMetrics ? 'Hide' : 'Show'} Metrics {showMetrics ? <ChevronUp size={13}/> : <ChevronDown size={13}/>}
              </button>
              {showMetrics && <AlgorithmMetrics algorithmName={entry.info.name} comparisons={metrics.comparisons} swaps={metrics.swaps} overwrites={metrics.overwrites} arraySize={ARRAY_SIZE} />}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="lg:col-span-2 flex flex-col gap-4 sm:gap-6">
              <AlgorithmOverviewCard info={entry.info} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <LogicBreakdown steps={entry.info.stepByStep} intuition={entry.info.intuition} whenToUse={entry.info.whenToUse} />
                <div className="flex flex-col gap-4">
                  <RealWorldAnalogy analogy={entry.info.analogy} />
                  <PseudocodeViewer code={entry.info.pseudocode} />
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">{showProblem && <ProblemPanel problem={problem} />}</div>
          </div>
        </>)}

        {/* ── GRAPH TAB ── */}
        {activeTab === 'graph' && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap gap-2">
              {([['bfs','BFS'],['dfs','DFS'],['dijkstra',"Dijkstra's"]] as const).map(([id, label]) => (
                <button key={id} onClick={() => setGraphAlgo(id)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all ${graphAlgo === id ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-slate-800 text-slate-400 border-slate-700 hover:border-indigo-500/50'}`}>{label}</button>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-slate-800/40 rounded-2xl border border-slate-700/50 p-5">
                <GraphCanvas graph={SAMPLE_GRAPH} steps={graphSteps} speed={700} />
              </div>
              <div className="flex flex-col gap-4">
                <AlgorithmOverviewCard info={graphAlgo === 'bfs' ? bfsInfo as any : graphAlgo === 'dfs' ? dfsInfo as any : dijkstraInfo as any} />
                <PseudocodeViewer code={(graphAlgo === 'bfs' ? bfsInfo : graphAlgo === 'dfs' ? dfsInfo : dijkstraInfo).pseudocode} />
              </div>
            </div>
          </div>
        )}

        {/* ── TREE TAB ── */}
        {activeTab === 'tree' && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap gap-2">
              {([['inorder','Inorder (L→Root→R)'],['preorder','Preorder (Root→L→R)'],['levelorder','Level-Order (BFS)']] as const).map(([id, label]) => (
                <button key={id} onClick={() => setTreeTraversal(id)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all ${treeTraversal === id ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-slate-800 text-slate-400 border-slate-700 hover:border-indigo-500/50'}`}>{label}</button>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-slate-800/40 rounded-2xl border border-slate-700/50 p-5">
                <TreeCanvas root={bstRoot} steps={treeSteps} speed={600} />
              </div>
              <AlgorithmOverviewCard info={inorderInfo as any} />
            </div>
          </div>
        )}

        {/* ── DP TAB ── */}
        {activeTab === 'dp' && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex gap-2">
                {([['fib','Fibonacci'],['coin','Coin Change']] as const).map(([id, label]) => (
                  <button key={id} onClick={() => setDpAlgo(id)}
                    className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all ${dpAlgo === id ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-slate-800 text-slate-400 border-slate-700 hover:border-indigo-500/50'}`}>{label}</button>
                ))}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <span>N =</span>
                <input type="number" min={3} max={20} value={dpN} onChange={e => setDpN(Math.min(20, Math.max(3, parseInt(e.target.value, 10) || 3)))}
                  className="w-16 bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-white text-center font-mono focus:outline-none focus:border-indigo-500" />
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-slate-800/40 rounded-2xl border border-slate-700/50 p-5">
                <DPTable steps={dpSteps} title={dpAlgo === 'fib' ? `Fibonacci(${dpN})` : `Coin Change (amount=${dpN})`} speed={500} />
              </div>
              <div className="flex flex-col gap-4">
                <AlgorithmOverviewCard info={dpAlgo === 'fib' ? fibonacciInfo as any : coinChangeInfo as any} />
                <PseudocodeViewer code={(dpAlgo === 'fib' ? fibonacciInfo : coinChangeInfo).pseudocode} />
              </div>
            </div>
          </div>
        )}

        {/* ── COMPARE TAB ── */}
        {activeTab === 'compare' && (
          <div className="flex flex-col gap-4">
            <p className="text-sm text-slate-400">Watch three sorting algorithms race on the <strong className="text-white">same array</strong> simultaneously.</p>
            <ComparisonCanvas
              array={currentArray.length > 0 ? currentArray : generateRandomArray(20, 10, 100)}
              algorithms={[
                { id: 'bubble', name: 'Bubble Sort', color: '#818cf8', steps: [], fn: (arr) => bubbleSort([...arr]) },
                { id: 'merge', name: 'Merge Sort', color: '#34d399', steps: [], fn: (arr) => mergeSort([...arr]) },
                { id: 'quick', name: 'Quick Sort', color: '#fb923c', steps: [], fn: (arr) => quickSort([...arr]) },
                { id: 'insertion', name: 'Insertion Sort', color: '#facc15', steps: [], fn: (arr) => insertionSort([...arr]) },
              ]}
            />
          </div>
        )}

        {/* ── CODE EDITOR TAB ── */}
        {activeTab === 'code' && (
          <div className="flex flex-col gap-4">
            <p className="text-sm text-slate-400">Write your algorithm. When your tests pass, watch it <strong className="text-white">animate step-by-step</strong>!</p>
            <div className="bg-slate-800/40 rounded-2xl border border-slate-700/50 p-5">
              <CodeEditor onGenerateSteps={(steps) => { initializeArray([1,3,5,7,9,11,14,17,21,24]); runAnimation({ animationSteps: steps, speedMs: 400 }); setActiveTab('visualizer'); }} />
            </div>
          </div>
        )}

        {/* ── PLAYGROUND TAB ── */}
        {activeTab === 'playground' && (
          <div className="flex flex-col gap-4">
            <p className="text-sm text-slate-400">Enter your own array and target, then switch to the Visualizer to run any algorithm on it.</p>
            <InputEditor onApply={handlePlaygroundApply} />
          </div>
        )}

        {/* ── QUIZ TAB ── */}
        {activeTab === 'quiz' && (
          <div className="flex flex-col gap-4 max-w-2xl mx-auto w-full">
            <p className="text-sm text-slate-400">Test your understanding across all the algorithms you've learned.</p>
            <QuizCard questions={quizQuestions} onComplete={(score, total) => recordQuizScore('main', Math.round((score / total) * 100))} />
          </div>
        )}

        {/* ── LEARNING PATHS TAB ── */}
        {activeTab === 'paths' && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 bg-slate-800/40 rounded-2xl border border-slate-700/50 px-5 py-4">
              <div>
                <div className="text-lg font-black text-white">{overallProgress}% Complete</div>
                <div className="text-xs text-slate-400">{progress.viewedAlgorithms.length} of {TOTAL_ALGORITHMS} algorithms explored</div>
              </div>
              <div className="flex-1 ml-4">
                <div className="w-full bg-slate-700 rounded-full h-2.5">
                  <div className="bg-indigo-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${overallProgress}%` }} />
                </div>
              </div>
            </div>
            <LearningPathPanel paths={learningPaths} viewedAlgorithms={progress.viewedAlgorithms} onSelectAlgorithm={handleSelectAlgorithm} />
          </div>
        )}

      </main>
    </div>
  );
}

export default App;
