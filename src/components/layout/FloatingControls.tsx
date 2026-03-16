import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  SkipBack, 
  SkipForward, 
  RefreshCw,
  Gauge
} from 'lucide-react';
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
  progress
}) => {
  const { speed, setSpeed } = usePlaybackStore();
  const [showSpeed, setShowSpeed] = useState(false);

  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-40">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-background-primary/80 backdrop-blur-2xl border border-border px-4 py-3 rounded-[2.5rem] shadow-premium flex items-center gap-2"
      >
        {/* Reset / Randomize Section */}
        <div className="flex items-center gap-1.5 pr-2 border-r border-border/50">
          <ControlButton icon={<RotateCcw size={18} />} onClick={onReset} tooltip="Reset Sequence" />
          <ControlButton icon={<RefreshCw size={18} />} onClick={onRandomize} tooltip="Randomize Data" />
        </div>

        {/* Playback Section */}
        <div className="flex items-center gap-2 px-4">
          <ControlButton 
            icon={<SkipBack size={18} />} 
            onClick={onStepBackward} 
            disabled={!canStepBackward} 
            tooltip="Previous Step" 
          />

          {!isPlaying || isPaused ? (
            <button
              onClick={onPlay}
              aria-label="Start simulation"
              className="w-14 h-14 rounded-full bg-accent-primary text-white flex items-center justify-center shadow-glow-indigo transition-transform active:scale-90 hover:scale-105 outline-none focus-visible:ring-4 focus-visible:ring-accent-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background-primary"
            >
              <Play size={24} fill="currentColor" className="ml-1" />
            </button>
          ) : (
            <button
              onClick={onPause}
              aria-label="Pause simulation"
              className="w-14 h-14 rounded-full bg-accent-primary text-white flex items-center justify-center shadow-glow-indigo transition-transform active:scale-90 hover:scale-105 outline-none focus-visible:ring-4 focus-visible:ring-accent-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background-primary"
            >
              <Pause size={24} fill="currentColor" />
            </button>
          )}

          <ControlButton 
            icon={<SkipForward size={18} />} 
            onClick={onStepForward} 
            disabled={!canStepForward} 
            tooltip="Next Step" 
          />
        </div>

        {/* Speed & Progress Section */}
        <div className="flex items-center gap-3 pl-4 border-l border-border/50">
           <div className="relative">
              <button 
                onClick={() => setShowSpeed(!showSpeed)}
                aria-label="Simulation speed"
                aria-expanded={showSpeed}
                className={cn(
                  "w-11 h-11 flex items-center justify-center rounded-2xl bg-background-secondary border border-border transition-all transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent-ring",
                  showSpeed ? "text-accent-primary border-accent-primary" : "text-text-secondary hover:text-text-primary"
                )}
              >
                  <Gauge size={18} />
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
                        <span className="text-[11px] font-black text-text-muted uppercase tracking-widest">Velocity</span>
                        <span className="text-[11px] font-mono font-bold text-accent-primary">{speed}ms</span>
                     </div>
                     <label htmlFor="speed-range" className="sr-only">Set simulation delay in milliseconds</label>
                     <input 
                        id="speed-range"
                        type="range" min="10" max="1000" step="10"
                        value={speed}
                        onChange={(e) => setSpeed(parseInt(e.target.value))}
                        className="w-full h-1.5 bg-border rounded-lg appearance-none cursor-pointer accent-accent-primary"
                     />
                  </motion.div>
                )}
              </AnimatePresence>
           </div>

          <div className="relative w-10 h-10 shrink-0">
             <svg className="w-full h-full -rotate-90">
                <circle cx="20" cy="20" r="18" fill="transparent" stroke="currentColor" strokeWidth="3" className="text-slate-100 dark:text-slate-800" />
                <motion.circle 
                  cx="20" cy="20" r="18" 
                  fill="transparent" stroke="currentColor" strokeWidth="3" 
                  className="text-accent-primary"
                  strokeDasharray="113.1"
                  animate={{ strokeDashoffset: 113.1 * (1 - progress / 100) }}
                  transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                  strokeLinecap="round"
                />
             </svg>
              <div className="absolute inset-0 flex items-center justify-center text-[11px] font-black text-text-primary" aria-hidden="true">
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
    aria-label={tooltip}
    className={cn(
      "relative group w-11 h-11 flex items-center justify-center rounded-2xl bg-background-secondary border border-border text-text-secondary transition-all active:scale-90 outline-none focus-visible:ring-2 focus-visible:ring-accent-ring",
      disabled ? "opacity-30 cursor-not-allowed" : "hover:text-accent-primary hover:border-accent-primary"
    )}
  >
    {icon}
    {!disabled && (
      <div className="absolute bottom-[calc(100%+12px)] left-1/2 -translate-x-1/2 px-3 py-1.5 bg-text-primary text-background-primary text-[11px] font-black rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl">
        <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-text-primary" />
        {tooltip}
      </div>
    )}
  </button>
);
