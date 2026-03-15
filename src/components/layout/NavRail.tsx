import React from 'react';
import { TABS, TabId } from '../../app/routes';

interface NavRailProps {
  activeTab: TabId;
  onTabChange: (id: TabId) => void;
}

export const NavRail: React.FC<NavRailProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="flex flex-col w-20 glass-panel items-center py-8 gap-8 z-50">
      <div className="mb-4">
         <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/40 rotate-3 hover:rotate-0 transition-transform cursor-pointer">
            <span className="font-black text-white text-xl">A</span>
         </div>
      </div>

      <div className="flex flex-col gap-4 w-full items-center">
        {TABS.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id as TabId)}
              className={`group relative p-3.5 rounded-2xl transition-all duration-500 
                ${isActive 
                  ? 'bg-indigo-600/10 text-indigo-400 shadow-inner shadow-indigo-500/10' 
                  : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/40'}`}
            >
              {/* Active bar indicator */}
              {isActive && (
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-indigo-500 rounded-r-full shadow-[0_0_12px_rgba(99,102,241,0.6)] animate-in fade-in slide-in-from-left-2" />
              )}

              <div className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                {React.createElement(tab.icon as any, { 
                    size: 22, 
                    strokeWidth: isActive ? 2.5 : 2 
                })}
              </div>

              {/* Tooltip */}
              <div className="absolute left-[calc(100%+1.5rem)] top-1/2 -translate-y-1/2 px-3 py-1.5 bg-slate-800 text-[11px] font-black text-white rounded-xl opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0 pointer-events-none whitespace-nowrap z-[100] border border-slate-700 shadow-2xl">
                {tab.label}
                <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-slate-800 border-l border-b border-slate-700 rotate-45" />
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-auto flex flex-col gap-6 items-center">
         <div className="w-8 h-px bg-slate-800/50" />
         <button className="text-slate-600 hover:text-indigo-400 transition-colors p-2">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
         </button>
      </div>
    </nav>
  );
};
