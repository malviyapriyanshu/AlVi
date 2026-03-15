import React from 'react';
import { usePlaybackStore } from '../../state/usePlaybackStore';

export const SpeedSlider: React.FC = () => {
  const { speed, setSpeed, isPlaying } = usePlaybackStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpeed(parseInt(e.target.value, 10));
  };

  return (
    <div className="flex flex-col gap-1 w-full lg:w-48">
      <div className="flex items-center justify-between px-1">
        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Speed</label>
        <span className="text-[10px] font-mono text-indigo-400">{speed}ms</span>
      </div>
      <input
        type="range"
        min="10"
        max="1000"
        step="10"
        value={speed}
        onChange={handleChange}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-700 accent-indigo-500 transition-all hover:bg-slate-600"
      />
    </div>
  );
};
