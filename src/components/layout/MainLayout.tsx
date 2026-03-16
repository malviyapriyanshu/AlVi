import React, { useState } from 'react';
import { ModernSidebar } from './ModernSidebar';
import { CommandPalette } from '../ui/CommandPalette';
import { TabId } from '../../app/routes';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../theme/themeProvider';
import { Sun, Moon, Search, User, Menu, X } from 'lucide-react';
import { cn } from '../../utils/cn';
import { AmbientBackground } from '../ui/AmbientBackground';

interface MainLayoutProps {
  children: React.ReactNode;
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  insightPanel?: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  activeTab, 
  onTabChange,
  insightPanel 
}) => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="h-screen w-full bg-background-primary flex overflow-hidden font-sans">
      <AmbientBackground />
      <CommandPalette />
      
      {/* Sidebar - Desktop */}
      <div className="hidden md:flex h-full">
        <ModernSidebar activeTab={activeTab} onTabChange={onTabChange} />
      </div>

      {/* Sidebar - Mobile Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] md:hidden"
            />
            <motion.div 
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              className="fixed inset-y-0 left-0 w-72 bg-background-primary z-[101] md:hidden"
            >
              <ModernSidebar activeTab={activeTab} onTabChange={(t) => { onTabChange(t); setMobileMenuOpen(false); }} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden relative">
        {/* Main Header */}
        <header className="h-16 flex items-center justify-between px-4 md:px-8 border-b border-border shrink-0 bg-background-primary/80 backdrop-blur-md z-40">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-background-secondary border border-border text-text-secondary"
            >
              <Menu size={20} />
            </button>
            <button 
              className="px-4 py-2 bg-slate-100 dark:bg-slate-900 border border-border rounded-xl flex items-center gap-3 text-text-secondary hover:text-text-primary transition-all group"
              onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
            >
              <Search size={16} />
              <span className="hidden sm:inline text-xs font-bold tracking-tight">Search algorithms...</span>
              <kbd className="hidden sm:flex text-[10px] bg-white dark:bg-black px-1.5 py-0.5 rounded border border-border opacity-60 group-hover:opacity-100 uppercase">⌘ K</kbd>
            </button>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
             <button
              onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-background-secondary border border-border text-text-secondary hover:text-accent-primary hover:border-accent-primary transition-all"
            >
              {resolvedTheme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            
            <div className="hidden sm:flex w-px h-6 bg-border mx-2" />
            
            <div className="flex items-center gap-3">
               <div className="text-right hidden lg:block">
                  <p className="text-xs font-black text-text-primary leading-none">Priyanshu</p>
                  <p className="text-[10px] font-bold text-accent-primary mt-1">Beta Access</p>
               </div>
               <div className="w-10 h-10 rounded-xl bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center text-accent-primary">
                  <User size={20} />
               </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 flex overflow-hidden relative">
          <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 custom-scrollbar bg-background-secondary/30 relative">
             <div className="max-w-[1600px] mx-auto h-full flex flex-col">
                {children}
             </div>
          </main>

          {/* Right Insight Panel */}
          {insightPanel && (
            <motion.aside
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="w-[320px] 2xl:w-[400px] h-full border-l border-border bg-background-primary overflow-y-auto custom-scrollbar shrink-0 hidden xl:block"
            >
              <div className="p-6">
                {insightPanel}
              </div>
            </motion.aside>
          )}
        </div>
      </div>
    </div>
  );
};
