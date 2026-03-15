import React from 'react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
  tabs: { id: string; label: string; icon: React.ReactNode }[];
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, tabs }) => {
  return (
    <aside className="hidden lg:flex flex-col w-64 border-r border-slate-800/60 bg-slate-900/50 backdrop-blur-sm p-4 gap-1.5 h-[calc(100vh-64px)] overflow-y-auto custom-scrollbar">
      <div className="mb-4 px-4 py-2">
         <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">Navigation</span>
      </div>
      
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`group flex items-center justify-between px-4 py-3.5 rounded-2xl text-[13px] font-bold transition-all duration-300
            ${activeTab === tab.id 
              ? 'bg-indigo-600 text-white shadow-[0_10px_25px_rgba(79,70,229,0.3)] ring-1 ring-indigo-400/50 scale-[1.02]' 
              : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-100 hover:translate-x-1'}`}
        >
          <div className="flex items-center gap-3">
             <div className={`p-1 rounded-lg transition-colors ${activeTab === tab.id ? 'text-white' : 'text-slate-500 group-hover:text-indigo-400'}`}>
                {React.cloneElement(tab.icon as React.ReactElement, { size: 18 } as any)}
             </div>
             <span>{tab.label}</span>
          </div>
          {activeTab === tab.id && (
              <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_white]" />
          )}
        </button>
      ))}

      <div className="mt-auto px-4 py-6 border-t border-slate-800/60">
          <div className="flex flex-col gap-1">
             <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Environment</span>
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-mono font-bold text-slate-400">Local Dev Server</span>
             </div>
          </div>
      </div>
    </aside>
  );
};
