import { useState, useEffect, useCallback, useMemo } from "react";
import { generateRandomArray } from "./utils/generateRandomArray";
import { useAnimation } from "./hooks/useAnimation";

import { bubbleSort, bubbleSortInfo } from "./algorithms/bubbleSort";
import { mergeSort, mergeSortInfo } from "./algorithms/mergeSort";
import { quickSort, quickSortInfo } from "./algorithms/quickSort";
import { binarySearch, binarySearchInfo } from "./algorithms/binarySearch";
import { twoPointerReverse, twoPointerInfo } from "./algorithms/twoPointer";

import { ArrayBar } from "./components/ArrayBar";
import { ControlPanel } from "./components/ControlPanel";
import { AlgorithmSelector } from "./components/AlgorithmSelector";
import { SpeedSlider } from "./components/SpeedSlider";
import { AlgorithmInfoCard } from "./components/AlgorithmInfoCard";

import { BarChart3 } from "lucide-react";

const ARRAY_SIZE = 30;
const MAX_VALUE = 300;

function App() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("bubble");
  const [speedMs, setSpeedMs] = useState(50);
  const [baseArray, setBaseArray] = useState<number[]>([]);
  const [targetValue, setTargetValue] = useState<number | null>(null);

  const {
    array: visualizedArray,
    isAnimating,
    isSorted,
    initializeArray,
    runAnimation,
    stopAnimation,
  } = useAnimation();

  useEffect(() => {
    handleGenerateNewArray();
  }, []);

  const handleGenerateNewArray = useCallback(() => {
    const newArray = generateRandomArray(ARRAY_SIZE, 10, MAX_VALUE);
    setBaseArray(newArray);
    initializeArray(newArray);
  }, [initializeArray]);

  const handleReset = useCallback(() => {
    initializeArray(baseArray);
    setTargetValue(null);
  }, [initializeArray, baseArray]);

  const activeAlgorithmInfo = useMemo(() => {
    switch (selectedAlgorithm) {
      case "bubble":
        return bubbleSortInfo;
      case "merge":
        return mergeSortInfo;
      case "quick":
        return quickSortInfo;
      case "binary":
        return binarySearchInfo;
      case "two-pointer":
        return twoPointerInfo;
      default:
        return bubbleSortInfo;
    }
  }, [selectedAlgorithm]);

  const handleStart = () => {
    if (isAnimating) return;

    const currentArray = isSorted
      ? [...baseArray]
      : visualizedArray.map((item) => item.value);

    if (isSorted) {
      initializeArray(baseArray);
    }
    setTargetValue(null);

    let steps;

    switch (selectedAlgorithm) {
      case "bubble":
        steps = bubbleSort(currentArray);
        break;

      case "merge":
        steps = mergeSort(currentArray);
        break;

      case "quick":
        steps = quickSort(currentArray);
        break;

      case "binary":
        const sortedForBinary = [...currentArray].sort((a, b) => a - b);
        initializeArray(sortedForBinary); // Instantly show sorted array
        
        // Pick a random target that exists in the array
        const binaryTarget = sortedForBinary[Math.floor(Math.random() * sortedForBinary.length)];
        setTargetValue(binaryTarget);
        
        steps = binarySearch(sortedForBinary, binaryTarget);
        break;

      case "two-pointer":
        const sortedForTwoPointer = [...currentArray].sort((a, b) => a - b);
        initializeArray(sortedForTwoPointer); // Instantly show sorted array
        
        // Pick two random distinct indices to form a target sum
        const idxA = Math.floor(Math.random() * sortedForTwoPointer.length);
        let idxB = Math.floor(Math.random() * sortedForTwoPointer.length);
        while (idxB === idxA && sortedForTwoPointer.length > 1) {
             idxB = Math.floor(Math.random() * sortedForTwoPointer.length);
        }
        const twoPointerTarget = sortedForTwoPointer[idxA] + sortedForTwoPointer[idxB];
        setTargetValue(twoPointerTarget);
        
        steps = twoPointerReverse(sortedForTwoPointer, twoPointerTarget);
        break;

      default:
        steps = bubbleSort(currentArray);
    }

    runAnimation({
      animationSteps: steps,
      speedMs,
    });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 flex flex-col font-sans">
      <header className="sticky top-0 z-10 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 py-4 px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">

          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <BarChart3 className="text-white" size={24} />
            </div>

            <h1 className="text-2xl font-bold">
              Algo<span className="text-indigo-400">Vis</span>
            </h1>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">

            <AlgorithmSelector
              selectedAlgorithm={selectedAlgorithm}
              onSelect={setSelectedAlgorithm}
              disabled={isAnimating}
            />

            <SpeedSlider
              speed={speedMs}
              onSpeedChange={setSpeedMs}
              disabled={isAnimating}
            />

            <ControlPanel
              onGenerateNew={handleGenerateNewArray}
              onStart={handleStart}
              onReset={handleReset}
              onStop={stopAnimation}
              isAnimating={isAnimating}
              isSorted={isSorted}
            />

          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-6 flex flex-col gap-6">
        
        {targetValue !== null && (
          <div className="flex justify-center -mb-2">
             <div className="bg-slate-800 border border-slate-700 rounded-full px-6 py-2 shadow-lg flex items-center gap-3">
               <span className="text-slate-400 font-medium">Target to find:</span>
               <span className="text-2xl font-bold text-white">{targetValue}</span>
             </div>
          </div>
        )}

        <div className="h-[520px] bg-slate-800/40 rounded-2xl border border-slate-700/50 p-4 shadow-inner flex items-end justify-center overflow-hidden">
          
          <div className="flex items-end justify-center h-full w-full gap-[3px] pt-12">
            
            {visualizedArray.map((bar, idx) => (
              <ArrayBar
                key={idx}
                value={bar.value}
                maxValue={MAX_VALUE}
                state={bar.state}
                pointers={bar.pointers}
                totalBars={ARRAY_SIZE}
              />
            ))}

          </div>
        </div>

        <AlgorithmInfoCard info={activeAlgorithmInfo} />

      </main>
    </div>
  );
}

export default App;