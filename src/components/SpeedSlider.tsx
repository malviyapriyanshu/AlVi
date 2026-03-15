import React from 'react';

interface SpeedSliderProps {
  speed: number;
  onSpeedChange: (speed: number) => void;
  disabled?: boolean;
}

export const SpeedSlider: React.FC<SpeedSliderProps> = ({ speed, onSpeedChange, disabled }) => {
  const maxSpeedMs = 1000;
  const minSpeedMs = 5;
  
  const getSliderValue = () => {
    return Math.max(1, Math.min(100, 100 - ((speed - minSpeedMs) / (maxSpeedMs - minSpeedMs)) * 100));
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sliderVal = parseInt(e.target.value, 10);
    const newSpeedMs = maxSpeedMs - ((sliderVal / 100) * (maxSpeedMs - minSpeedMs));
    onSpeedChange(Math.max(minSpeedMs, newSpeedMs));
  };

  return (
    <div className="flex flex-col gap-2 min-w-[150px]">
      <div className="flex justify-between items-center text-sm">
        <label className="font-medium text-slate-400">Speed</label>
        <span className="text-indigo-400 font-mono text-xs">{Math.round(speed)}ms</span>
      </div>
      <input
        type="range"
        min="1"
        max="100"
        value={getSliderValue()}
        onChange={handleSliderChange}
        disabled={disabled}
        className={`
          w-full h-2 rounded-lg appearance-none cursor-pointer
          ${disabled ? 'opacity-50 cursor-not-allowed bg-slate-700' : 'bg-slate-700'}
          accent-indigo-500
        `}
      />
      <div className="flex justify-between text-xs text-slate-500">
        <span>Slow</span>
        <span>Fast</span>
      </div>
    </div>
  );
};
