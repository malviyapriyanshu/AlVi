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
    const algoCategories = ['sorting', 'searching', 'tree', 'graph', 'dp', 'techniques'];
    if (algoCategories.includes(id)) {
      setSelectedCategory(id);
    }
    onTabChange(id);
  };

  return (
    <nav
      className="hidden md:flex flex-col w-14 bg-white dark:bg-slate-950 items-center py-6 gap-6 z-40 h-full shrink-0 border-r border-slate-200 dark:border-slate-800"
      role="tablist"
      aria-label="Categories"
    >
      <div className="flex flex-col gap-2 w-full px-2">
        {TABS.map(tab => {
          const isSelected = activeTab === tab.id || (selectedCategory === tab.id && ['sorting', 'searching', 'tree', 'graph', 'dp', 'techniques'].includes(activeTab));
          
          return (
            <button
              key={tab.id}
              onClick={() => handleCategoryClick(tab.id as TabId)}
              role="tab"
              aria-selected={isSelected}
              title={tab.label}
              className={`group relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300
                ${isSelected
                  ? 'bg-indigo-600 text-white shadow-btn-indigo'
                  : 'text-slate-400 dark:text-slate-600 hover:text-slate-900 dark:hover:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 border border-transparent hover:border-slate-100 dark:hover:border-slate-800'}`}
            >
              {isSelected && (
                <div className="absolute -left-1 w-1 h-5 bg-indigo-600 rounded-r-full shadow-glow-indigo" />
              )}

              {React.createElement(tab.icon as any, {
                size: 18,
                strokeWidth: isSelected ? 2.5 : 2,
                className: "transition-transform group-active:scale-90"
              })}

              {/* Minimalist Tooltip */}
              <div className="absolute left-full ml-3 px-2 py-1 bg-slate-900 dark:bg-slate-800 text-[10px] font-bold text-white rounded-md opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all pointer-events-none whitespace-nowrap z-50 shadow-premium uppercase tracking-widest border border-slate-700">
                {tab.label}
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-auto pb-2 flex flex-col items-center gap-4">
        <div className="w-4 h-[1px] bg-slate-100 dark:bg-slate-800" />
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-glow-emerald" />
      </div>
    </nav>
  );
};
