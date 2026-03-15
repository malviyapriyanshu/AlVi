import React from 'react';
import { Gauge, FastForward } from 'lucide-react';
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
    <div className="flex flex-col gap-1.5 w-full group">
      <div className="flex items-center justify-between px-0.5">
        <div className="flex items-center gap-1.5">
          <Gauge size={11} className="text-indigo-400" />
          <label className="text-[9px] font-semibold text-slate-500 uppercase tracking-wider">Speed</label>
        </div>
        <div className="flex items-center gap-1 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">
          <FastForward size={9} className="text-indigo-400" />
          <span className="text-[10px] font-mono font-bold text-indigo-400">{speed}ms</span>
        </div>
      </div>

      <div className="relative h-5 flex items-center">
        {/* Track */}
        <div className="absolute inset-x-0 h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-indigo-600 to-indigo-400 rounded-full"
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Input */}
        <input
          type="range"
          min={min}
          max={max}
          step="10"
          value={speed}
          onChange={handleChange}
          aria-label="Simulation speed"
          className="absolute inset-x-0 w-full cursor-pointer appearance-none bg-transparent z-10
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-indigo-500 [&::-webkit-slider-thumb]:shadow-glow-indigo [&::-webkit-slider-thumb]:transition-all
            [&::-webkit-slider-thumb]:hover:scale-125"
        />
      </div>

      <div className="flex justify-between px-0.5 text-[8px] font-semibold text-slate-600 uppercase tracking-wider">
        <span>Fast</span>
        <span>Slow</span>
      </div>
    </div>
  );
};
