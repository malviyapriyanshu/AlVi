import { useState, useEffect, useCallback, useMemo } from 'react';
import { generateRandomArray } from '../utils/generateRandomArray';
import { useAnimationEngine } from '../hooks/useAnimationEngine';
import { algorithmRegistry, algorithmCategories } from '../data/algorithmMetadata';
import { leetcodeProblems } from '../data/leetcodeProblems';
import { DropdownWrapper } from '../components/controls/AlgorithmDropdown';
import { SpeedSlider } from '../components/controls/SpeedSlider';
import { ArrayBar } from '../components/visualizer/ArrayBar';
import { AlgorithmOverviewCard } from '../components/learning/AlgorithmOverviewCard';
import { RealWorldAnalogy } from '../components/learning/RealWorldAnalogy';
import { LogicBreakdown } from '../components/learning/LogicBreakdown';
import { PseudocodeViewer } from '../components/learning/PseudocodeViewer';
import { StepController } from '../components/walkthrough/StepController';
import { CurrentStepExplanation } from '../components/walkthrough/CurrentStepExplanation';
import { ProblemPanel } from '../components/problems/ProblemPanel';
import { BarChart3, Shuffle, Square, BookOpen, Play, RotateCcw } from 'lucide-react';

const ARRAY_SIZE = 30;
const MAX_VALUE = 300;

function App() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('bubble');
  const [speedMs, setSpeedMs] = useState(50);
  const [baseArray, setBaseArray] = useState<number[]>([]);
  const [targetValue, setTargetValue] = useState<number | null>(null);
  const [showProblem, setShowProblem] = useState(false);

  const {
    array: visualizedArray,
    isAnimating, isPaused, isSorted,
    currentStepIndex, totalSteps, currentExplanation,
    initializeArray, runAnimation, stopAnimation,
    pauseAnimation, resumeAnimation, stepForward, stepBackward, restartAnimation,
  } = useAnimationEngine();

  useEffect(() => { handleGenerateNewArray(); }, []);

  const handleGenerateNewArray = useCallback(() => {
    const newArray = generateRandomArray(ARRAY_SIZE, 10, MAX_VALUE);
    setBaseArray(newArray);
    initializeArray(newArray);
    setTargetValue(null);
  }, [initializeArray]);

  const handleReset = useCallback(() => {
    initializeArray(baseArray);
    setTargetValue(null);
  }, [initializeArray, baseArray]);

  const entry = useMemo(() => algorithmRegistry[selectedAlgorithm], [selectedAlgorithm]);
  const problem = useMemo(() => leetcodeProblems.find(p => p.algorithmId === selectedAlgorithm), [selectedAlgorithm]);

  const handleStart = useCallback(() => {
    if (isAnimating) return;

    let currentArray = isSorted ? [...baseArray] : visualizedArray.map(item => item.value);
    if (isSorted) initializeArray(baseArray);
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
    runAnimation({ animationSteps: steps, speedMs });
  }, [isAnimating, isSorted, baseArray, visualizedArray, entry, selectedAlgorithm, initializeArray, runAnimation, speedMs]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 flex flex-col font-sans">
      <header className="sticky top-0 z-10 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 py-3 px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <BarChart3 className="text-white" size={22} />
            </div>
            <h1 className="text-2xl font-bold">Algo<span className="text-indigo-400">Vis</span></h1>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5">
            <DropdownWrapper
              label="Algorithm"
              selectedId={selectedAlgorithm}
              categories={algorithmCategories}
              onSelect={setSelectedAlgorithm}
              disabled={isAnimating && !isPaused}
            />
            <SpeedSlider speed={speedMs} onSpeedChange={setSpeedMs} disabled={isAnimating && !isPaused} />

            <div className="flex items-center gap-3 border-l border-slate-700 pl-5 ml-2">
              <button onClick={handleGenerateNewArray} disabled={isAnimating && !isPaused}
                className="flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-slate-700 text-sm">
                <Shuffle size={16} className="text-indigo-400" /> New Array
              </button>

              {isAnimating && !isPaused ? (
                <button onClick={stopAnimation}
                  className="flex items-center gap-2 px-4 py-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 rounded-lg font-bold transition-all border border-rose-500/50 text-sm">
                  <Square size={16} className="fill-current" /> Stop
                </button>
              ) : (
                <button onClick={isSorted ? handleReset : handleStart}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all border text-sm shadow-lg
                    ${isSorted
                      ? 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border-emerald-500/50'
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white border-indigo-500'}`}>
                  {isSorted ? <RotateCcw size={16} /> : <Play size={16} className="fill-current" />}
                  {isSorted ? 'Reset' : 'Start'}
                </button>
              )}

              <button onClick={() => setShowProblem(!showProblem)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all border text-sm
                  ${showProblem ? 'bg-indigo-600/20 text-indigo-400 border-indigo-500/50' : 'bg-slate-800 hover:bg-slate-700 text-slate-400 border-slate-700'}`}>
                <BookOpen size={16} /> Problems
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-6 flex flex-col gap-6">
        {targetValue !== null && (
          <div className="flex justify-center -mb-2">
            <div className="bg-slate-800 border border-slate-700 rounded-full px-6 py-2 shadow-lg flex items-center gap-3">
              <span className="text-slate-400 font-medium text-sm">Target:</span>
              <span className="text-xl font-bold text-white">{targetValue}</span>
            </div>
          </div>
        )}

        <div className="h-[520px] bg-slate-800/40 rounded-2xl border border-slate-700/50 p-4 shadow-inner flex items-end justify-center overflow-hidden">
          <div className="flex items-end justify-center h-full w-full gap-[3px] pt-12">
            {visualizedArray.map((bar, idx) => (
              <ArrayBar key={idx} value={bar.value} maxValue={MAX_VALUE} state={bar.state} pointers={bar.pointers} totalBars={ARRAY_SIZE} />
            ))}
          </div>
        </div>

        {(isAnimating || isPaused || totalSteps > 0) && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-1">
              <StepController
                isPlaying={isAnimating} isPaused={isPaused}
                onPlay={handleStart} onPause={pauseAnimation} onResume={resumeAnimation}
                onStepForward={stepForward} onStepBackward={stepBackward} onRestart={restartAnimation}
                currentStep={currentStepIndex} totalSteps={totalSteps}
              />
            </div>
            <div className="lg:col-span-2">
              <CurrentStepExplanation explanation={currentExplanation} />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <AlgorithmOverviewCard info={entry.info} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <LogicBreakdown steps={entry.info.stepByStep} intuition={entry.info.intuition} whenToUse={entry.info.whenToUse} />
              <div className="flex flex-col gap-6">
                <RealWorldAnalogy analogy={entry.info.analogy} />
                <PseudocodeViewer code={entry.info.pseudocode} />
              </div>
            </div>
          </div>
          <div className="lg:col-span-1 flex flex-col gap-6">
            {showProblem && <ProblemPanel problem={problem} />}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
