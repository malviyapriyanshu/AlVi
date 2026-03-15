import React from 'react';
import type { BarState } from '../hooks/useAnimation';

interface ArrayBarProps {
  value: number;
  maxValue: number;
  state: BarState;
  totalBars: number;
}

export const ArrayBar: React.FC<ArrayBarProps> = ({
  value,
  maxValue,
  state,
  totalBars
}) => {

  const getColor = (state: BarState) => {
    switch (state) {
      case 'comparing':
        return 'bg-yellow-400';
      case 'swapping':
        return 'bg-red-500';
      case 'sorted':
        return 'bg-emerald-500';
      default:
        return 'bg-indigo-500';
    }
  };

  const height = (value / maxValue) * 100;

  const widthClass =
    totalBars <= 20
      ? "w-12"
      : totalBars <= 50
        ? "w-6"
        : totalBars <= 100
          ? "w-4"
          : "w-2";

  return (
    <div
      className={`flex flex-col justify-end items-center h-full ${widthClass}`}
      style={{ margin: "0 3px" }}
    >
      {totalBars <= 40 && (
        <span className="text-xs text-slate-400 mb-1">
          {value}
        </span>
      )}

      <div
        className={`w-full rounded-t-md transition-all duration-200 ease-in-out ${getColor(
          state
        )}`}
        style={{
          height: `${Math.max(height, 5)}%`
        }}
      />
    </div>
  );
};