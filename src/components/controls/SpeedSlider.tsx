import React from 'react';
import { Gauge, FastForward } from 'lucide-react';
import { usePlaybackStore } from '../../state/usePlaybackStore';

export const SpeedSlider: React.FC = () => {
  const { speed, setSpeed } = usePlaybackStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpeed(parseInt(e.target.value, 10));
  };

  // Calculate percentage for custom track styling
  const min = 10;
  const max = 1000;
  const percentage = ((speed - min) / (max - min)) * 100;

  return (
    <div className="flex flex-col gap-2 w-full lg:w-56 group">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
           <Gauge size={12} className="text-indigo-400 group-hover:rotate-45 transition-transform duration-500" />
           <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Simulation Speed</label>
        </div>
        <div className="flex items-center gap-1.5 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">
          <FastForward size={10} className="text-indigo-400" />
          <span className="text-[10px] font-mono font-black text-indigo-400">{speed}ms</span>
        </div>
      </div>
      
      <div className="relative h-6 flex items-center">
        {/* Custom Track Background */}
        <div className="absolute inset-x-0 h-2 bg-slate-800 rounded-full border border-slate-700/50 overflow-hidden shadow-inner">
           <div 
             className="absolute inset-y-0 left-0 bg-gradient-to-r from-indigo-600 to-indigo-400 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.3)]"
             style={{ width: `${percentage}%` }}
           />
        </div>
        
        {/* Real Input */}
        <input
          type="range"
          min={min}
          max={max}
          step="10"
          value={speed}
          onChange={handleChange}
          className="absolute inset-x-0 w-full cursor-pointer appearance-none bg-transparent active:scale-95 transition-transform z-10
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-[0_0_15px_rgba(255,255,255,0.5)] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-indigo-500 [&::-webkit-slider-thumb]:transition-all
            [&::-webkit-slider-thumb]:hover:scale-125 [&::-webkit-slider-thumb]:hover:shadow-[0_0_20px_rgba(99,102,241,0.8)]"
        />
      </div>
      
      <div className="flex justify-between px-1 text-[8px] font-black text-slate-600 uppercase tracking-widest">
        <span>Fast (10ms)</span>
        <span>Slow (1000ms)</span>
      </div>
    </div>
  );
};
