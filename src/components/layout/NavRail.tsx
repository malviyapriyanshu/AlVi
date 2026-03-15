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
      className="flex flex-row md:flex-col w-full md:w-16 bg-white dark:bg-slate-950 items-center overflow-x-auto md:overflow-visible no-scrollbar py-2 md:py-6 gap-2 md:gap-4 z-40 md:h-full shrink-0 border-b md:border-b-0 md:border-r border-gray-100 dark:border-slate-800/50 px-4 md:px-0"
      role="tablist"
      aria-label="Navigation"
    >
      {/* Logo mark — desktop only */}
      <div className="hidden md:flex mb-5 items-center justify-center">
        <div className="w-8 h-8 bg-indigo-600 dark:bg-indigo-500 rounded-xl flex items-center justify-center cursor-pointer shadow-lg shadow-indigo-600/20 dark:shadow-indigo-500/20 transition-transform hover:scale-110 hover:rotate-[-6deg] duration-200">
          <span className="font-bold text-white text-sm leading-none">A</span>
        </div>
      </div>

      {/* Tab Buttons */}
      <div className="flex flex-row md:flex-col gap-1 w-auto md:w-full items-center md:px-2 min-w-max md:min-w-0">
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
                  ? 'bg-indigo-50 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 shadow-sm dark:shadow-none'
                  : 'text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800/50'}`}
            >
              {/* Active indicator — desktop left bar */}
              {isActive && (
                <div className="hidden md:block absolute -left-[9px] top-1/2 -translate-y-1/2 w-[3px] h-5 bg-indigo-600 dark:bg-indigo-500 rounded-r-full" />
              )}
              {/* Active indicator — mobile bottom dot */}
              {isActive && (
                <div className="md:hidden absolute -bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-indigo-600 dark:bg-indigo-500 rounded-full" />
              )}

              {React.createElement(tab.icon as any, {
                size: 18,
                strokeWidth: isActive ? 2.5 : 2
              })}

              {/* Tooltip */}
              <div className="hidden md:block absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-slate-900 dark:bg-slate-800 text-[11px] font-bold text-white dark:text-slate-200 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-[100] border border-slate-700/50 shadow-xl">
                {tab.label}
              </div>
            </button>
          );
        })}
      </div>

      {/* Bottom status */}
      <div className="mt-auto hidden md:flex flex-col gap-3 items-center pb-4">
        <div className="w-5 h-px bg-gray-100 dark:bg-slate-800" />
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-glow-emerald" title="Engine Active" />
      </div>
    </nav>
  );
};
