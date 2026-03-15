import React from 'react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
  tabs: { id: string; label: string; icon: React.ReactNode }[];
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, tabs }) => {
  return (
    <aside className="hidden lg:flex flex-col w-64 border-r border-slate-800 p-4 gap-2 h-[calc(100vh-64px)] overflow-y-auto">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all
            ${activeTab === tab.id 
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
              : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </aside>
  );
};
