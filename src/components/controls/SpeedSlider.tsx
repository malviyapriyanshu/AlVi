import React from 'react';
import { Gauge, Zap } from 'lucide-react';
import { usePlaybackStore } from '../../state/usePlaybackStore';

export const SpeedSlider: React.FC = () => {
  const { speed, setSpeed } = usePlaybackStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpeed(parseInt(e.target.value, 10));
  };

  const min = 10;
  const max = 1000;
  const percentage = ((speed - min) / (max - min)) * 100;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-1.5">
          <Gauge size={11} className="text-slate-400" strokeWidth={2.5} />
          <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Speed</label>
        </div>
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded-md border border-slate-200 dark:border-slate-700/60">
          <Zap size={9} className="text-amber-500 fill-amber-500" />
          <span className="text-[9px] font-mono font-bold text-slate-600 dark:text-slate-300">{speed}ms</span>
        </div>
      </div>

      <div className="relative h-4 flex items-center">
        {/* Track Background */}
        <div className="absolute inset-x-0 h-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
           {/* Active Track */}
          <div
            className="absolute inset-y-0 left-0 bg-indigo-600"
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Input Layer */}
        <input
          type="range"
          min={min}
          max={max}
          step="10"
          value={speed}
          onChange={handleChange}
          aria-label="Simulation speed"
          className="absolute inset-x-0 w-full cursor-pointer appearance-none bg-transparent z-10
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-indigo-600 [&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:transition-all
            [&::-webkit-slider-thumb]:hover:scale-125 focus:outline-none"
        />
      </div>

      <div className="flex justify-between px-1 text-[7px] font-black text-slate-400 uppercase tracking-widest">
        <span>Fast</span>
        <span>Slow</span>
      </div>
    </div>
  );
};
