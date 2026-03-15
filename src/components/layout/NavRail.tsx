import React from 'react';
import { TABS, TabId } from '../../app/routes';
import { useAlgorithmStore } from '../../state/useAlgorithmStore';

interface NavRailProps {
  activeTab: TabId;
  onTabChange: (id: TabId) => void;
}

export const NavRail: React.FC<NavRailProps> = ({ activeTab, onTabChange }) => {
  const { selectedCategory, setSelectedCategory } = useAlgorithmStore();

  const handleCategoryClick = (id: TabId) => {
    // Categories that map directly to algorithm groups
    const algoCategories = ['sorting', 'searching', 'tree', 'graph', 'dp', 'techniques'];
    if (algoCategories.includes(id)) {
      setSelectedCategory(id);
    }
    onTabChange(id);
  };

  return (
    <nav
      className="flex flex-row md:flex-col w-full md:w-14 bg-slate-950 items-center justify-around md:justify-start py-1 md:py-6 gap-1 md:gap-1 z-40 md:h-full shrink-0 border-t md:border-t-0 md:border-r border-slate-800/50"
      role="tablist"
      aria-label="Navigation"
    >
      {/* Logo mark — desktop only */}
      <div className="hidden md:flex mb-5 items-center justify-center">
        <div className="w-8 h-8 bg-indigo-500 rounded-xl flex items-center justify-center cursor-pointer transition-transform hover:scale-110 hover:rotate-[-6deg] duration-200">
          <span className="font-bold text-white text-sm leading-none">A</span>
        </div>
      </div>

      {/* Tab Buttons */}
      <div className="flex flex-row md:flex-col gap-0.5 w-full justify-around md:justify-start items-center md:px-2">
        {TABS.map(tab => {
          const isActive = activeTab === tab.id || (selectedCategory === tab.id && ['sorting', 'searching', 'tree', 'graph', 'dp', 'techniques'].includes(activeTab));
          return (
            <button
              key={tab.id}
              onClick={() => handleCategoryClick(tab.id as TabId)}
              role="tab"
              aria-selected={isActive}
              aria-label={tab.label}
              title={tab.label}
              className={`group relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200
                ${isActive
                  ? 'bg-indigo-500/15 text-indigo-400'
                  : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'}`}
            >
              {/* Active indicator — desktop left bar */}
              {isActive && (
                <div className="hidden md:block absolute -left-[9px] top-1/2 -translate-y-1/2 w-[3px] h-5 bg-indigo-500 rounded-r-full" />
              )}
              {/* Active indicator — mobile bottom dot */}
              {isActive && (
                <div className="md:hidden absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-indigo-500 rounded-full" />
              )}

              {React.createElement(tab.icon as any, {
                size: 18,
                strokeWidth: isActive ? 2.5 : 1.8
              })}

              {/* Tooltip */}
              <div className="hidden md:block absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-slate-800 text-[11px] font-semibold text-slate-200 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-[100] border border-slate-700/50 shadow-glass">
                {tab.label}
              </div>
            </button>
          );
        })}
      </div>

      {/* Bottom status */}
      <div className="mt-auto hidden md:flex flex-col gap-3 items-center pb-4">
        <div className="w-5 h-px bg-slate-800" />
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Engine Active" />
      </div>
    </nav>
  );
};
