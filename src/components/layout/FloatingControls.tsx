import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  SkipBack, 
  SkipForward, 
  RefreshCw,
  Gauge,
  ArrowRightLeft
} from 'lucide-react';
import { InputEditor } from '../controls/InputEditor';
import { cn } from '../../utils/cn';
import { usePlaybackStore } from '../../state/usePlaybackStore';

interface FloatingControlsProps {
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  onStepForward: () => void;
  onStepBackward: () => void;
  onRandomize: () => void;
  isPlaying: boolean;
  isPaused: boolean;
  canStepForward: boolean;
  canStepBackward: boolean;
  progress: number;
  array: number[];
  onUpdateData: (newArray: number[]) => void;
}

export const FloatingControls: React.FC<FloatingControlsProps> = ({
  onPlay,
  onPause,
  onReset,
  onStepForward,
  onStepBackward,
  onRandomize,
  isPlaying,
  isPaused,
  canStepForward,
  canStepBackward,
  progress,
  array,
  onUpdateData
}) => {
  const { speed, setSpeed } = usePlaybackStore();
  const [showSpeed, setShowSpeed] = useState(false);

  return (
    <div className="fixed bottom-6 md:bottom-10 left-0 right-0 px-4 md:px-0 flex justify-center z-40">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-background-primary/80 backdrop-blur-2xl border border-border px-3 md:px-4 py-2 md:py-3 rounded-[2rem] md:rounded-[2.5rem] shadow-premium flex items-center gap-1 md:gap-2 max-w-full overflow-hidden"
      >
        {/* Data Input Section */}
        <div className="flex items-center gap-1.5 pr-2 md:pr-3 border-r border-border/50">
           <InputEditor initialValue={array} onUpdate={onUpdateData} />
           <ControlButton icon={<RefreshCw size={16} className="md:w-[18px]" />} onClick={onRandomize} tooltip="Randomize Data" />
        </div>

        {/* Reset Section */}
        <div className="flex items-center gap-1 pr-1 md:pr-1 border-r border-border/50 px-1">
          <ControlButton icon={<RotateCcw size={16} className="md:w-[18px]" />} onClick={onReset} tooltip="Reset Sequence" />
        </div>

        {/* Playback Section */}
        <div className="flex items-center gap-1.5 md:gap-2 px-2 md:px-4">
          <ControlButton 
            icon={<SkipBack size={16} className="md:w-[18px]" />} 
            onClick={onStepBackward} 
            disabled={!canStepBackward} 
            tooltip="Previous Step" 
          />

          {!isPlaying || isPaused ? (
            <button
              onClick={onPlay}
              className="w-11 h-11 md:w-14 md:h-14 rounded-full bg-accent-primary text-white flex items-center justify-center shadow-glow-indigo transition-transform active:scale-90 hover:scale-105 shrink-0"
            >
              <Play size={20} className="md:w-[24px] ml-1" fill="currentColor" />
            </button>
          ) : (
            <button
              onClick={onPause}
              className="w-11 h-11 md:w-14 md:h-14 rounded-full bg-accent-primary text-white flex items-center justify-center shadow-glow-indigo transition-transform active:scale-90 hover:scale-105 shrink-0"
            >
              <Pause size={20} className="md:w-[24px]" fill="currentColor" />
            </button>
          )}

          <ControlButton 
            icon={<SkipForward size={16} className="md:w-[18px]" />} 
            onClick={onStepForward} 
            disabled={!canStepForward} 
            tooltip="Next Step" 
          />
        </div>

        {/* Speed & Progress Section */}
        <div className="flex items-center gap-2 md:gap-3 pl-2 md:pl-4 border-l border-border/50">
           <div className="relative">
              <button 
                onClick={() => setShowSpeed(!showSpeed)}
                className={cn(
                  "w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-2xl bg-background-secondary border border-border transition-all transition-colors",
                  showSpeed ? "text-accent-primary border-accent-primary" : "text-text-secondary hover:text-text-primary"
                )}
              >
                  <Gauge size={16} className="md:w-[18px]" />
              </button>
              <AnimatePresence>
                {showSpeed && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute bottom-[calc(100%+12px)] right-0 w-48 p-4 bg-background-primary border border-border rounded-2xl shadow-xl z-50"
                  >
                     <div className="flex justify-between items-center mb-3">
                        <span className="text-[10px] font-black text-text-secondary uppercase tracking-widest">Velocity</span>
                        <span className="text-[10px] font-mono font-bold text-accent-primary">{speed}ms</span>
                     </div>
                     <input 
                        type="range" min="10" max="1000" step="10"
                        value={speed}
                        onChange={(e) => setSpeed(parseInt(e.target.value))}
                        className="w-full accent-accent-primary"
                     />
                  </motion.div>
                )}
              </AnimatePresence>
           </div>

          <div className="relative w-9 h-9 md:w-10 md:h-10 shrink-0">
             <svg className="w-full h-full -rotate-90">
                <circle cx="18" cy="18" r="16" fill="transparent" stroke="currentColor" strokeWidth="2" className="text-slate-100 dark:text-slate-800 md:hidden" />
                <circle cx="20" cy="20" r="18" fill="transparent" stroke="currentColor" strokeWidth="3" className="text-slate-100 dark:text-slate-800 hidden md:block" />
                
                <motion.circle 
                  cx="18" cy="18" r="16" 
                  fill="transparent" stroke="currentColor" strokeWidth="2" 
                  className="text-accent-primary md:hidden"
                  strokeDasharray="100.5"
                  animate={{ strokeDashoffset: 100.5 * (1 - progress / 100) }}
                  transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                  strokeLinecap="round"
                />
                
                <motion.circle 
                  cx="20" cy="20" r="18" 
                  fill="transparent" stroke="currentColor" strokeWidth="3" 
                  className="text-accent-primary hidden md:block"
                  strokeDasharray="113.1"
                  animate={{ strokeDashoffset: 113.1 * (1 - progress / 100) }}
                  transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                  strokeLinecap="round"
                />
             </svg>
             <div className="absolute inset-0 flex items-center justify-center text-[7px] md:text-[8px] font-black text-text-primary uppercase">
                {progress}%
             </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const ControlButton = ({ icon, onClick, disabled, tooltip }: { icon: React.ReactNode, onClick: () => void, disabled?: boolean, tooltip: string }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={cn(
      "relative group w-11 h-11 flex items-center justify-center rounded-2xl bg-background-secondary border border-border text-text-secondary transition-all active:scale-90",
      disabled ? "opacity-30 cursor-not-allowed" : "hover:text-accent-primary hover:border-accent-primary"
    )}
  >
    {icon}
    {!disabled && (
      <div className="absolute bottom-[calc(100%+12px)] left-1/2 -translate-x-1/2 px-3 py-1.5 bg-text-primary text-background-primary text-[10px] font-black rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl">
        <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-text-primary" />
        {tooltip}
      </div>
    )}
  </button>
);
