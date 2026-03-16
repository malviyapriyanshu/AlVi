import React, { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import { Search, Terminal, Zap, Activity, Box, Search as SearchIcon } from 'lucide-react';
import { Dialog, Transition } from '@headlessui/react';
import { useAlgorithmStore } from '../../state/useAlgorithmStore';
import { ALL_ALGORITHMS } from '../../data/algorithmRegistry';
import { motion, AnimatePresence } from 'framer-motion';

export const CommandPalette: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { setSelectedAlgorithmId } = useAlgorithmStore();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const handleSelect = (id: string) => {
    setSelectedAlgorithmId(id);
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <Dialog
          static
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          open={open}
          onClose={() => setOpen(false)}
          className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] p-4 bg-slate-950/40 backdrop-blur-sm"
        >
          <Dialog.Panel
            as={motion.div}
            initial={{ scale: 0.95, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -20 }}
            className="w-full max-w-2xl bg-white dark:bg-background-secondary border border-border rounded-2xl shadow-2xl overflow-hidden"
          >
            <Command className="flex flex-col h-full">
              <div className="flex items-center border-b border-border px-4 py-3 gap-3">
                <SearchIcon className="w-5 h-5 text-text-secondary" />
                <Command.Input
                  placeholder="Type an algorithm or search... (⌘ + K)"
                  className="w-full bg-transparent border-none outline-none text-text-primary placeholder:text-text-secondary text-sm font-medium"
                />
              </div>

              <Command.List className="max-h-[350px] overflow-y-auto p-2 custom-scrollbar">
                <Command.Empty className="px-4 py-6 text-center text-sm text-text-secondary">
                  No algorithms found matching your search.
                </Command.Empty>

                <Command.Group heading="Search Operations" className="text-[10px] font-black uppercase tracking-widest text-text-secondary px-3 py-2">
                  {Object.values(ALL_ALGORITHMS)
                    .filter(a => a.info.category === 'searching')
                    .map(algo => (
                      <CommandItem key={algo.id} algo={algo} onSelect={() => handleSelect(algo.id)} icon={<Search className="w-4 h-4" />} />
                    ))
                  }
                </Command.Group>

                <Command.Group heading="Sorting Operations" className="text-[10px] font-black uppercase tracking-widest text-text-secondary px-3 py-2">
                  {Object.values(ALL_ALGORITHMS)
                    .filter(a => a.info.category === 'sorting')
                    .map(algo => (
                      <CommandItem key={algo.id} algo={algo} onSelect={() => handleSelect(algo.id)} icon={<Zap className="w-4 h-4" />} />
                    ))
                  }
                </Command.Group>

                <Command.Group heading="Graph & Trees" className="text-[10px] font-black uppercase tracking-widest text-text-secondary px-3 py-2">
                  {Object.values(ALL_ALGORITHMS)
                    .filter(a => ['graph', 'tree'].includes(a.info.category))
                    .map(algo => (
                      <CommandItem key={algo.id} algo={algo} onSelect={() => handleSelect(algo.id)} icon={<Activity className="w-4 h-4" />} />
                    ))
                  }
                </Command.Group>
                
                <Command.Group heading="Dynamic Programming" className="text-[10px] font-black uppercase tracking-widest text-text-secondary px-3 py-2">
                  {Object.values(ALL_ALGORITHMS)
                    .filter(a => a.info.category === 'dp')
                    .map(algo => (
                      <CommandItem key={algo.id} algo={algo} onSelect={() => handleSelect(algo.id)} icon={<Box className="w-4 h-4" />} />
                    ))
                  }
                </Command.Group>
              </Command.List>

              <div className="flex items-center gap-4 px-4 py-2 bg-slate-50 dark:bg-slate-900/50 border-t border-border mt-auto">
                <span className="text-[10px] font-medium text-text-secondary flex items-center gap-1.5">
                  <span className="px-1.5 py-0.5 bg-background-primary border border-border rounded">↑↓</span> to navigate
                </span>
                <span className="text-[10px] font-medium text-text-secondary flex items-center gap-1.5">
                  <span className="px-1.5 py-0.5 bg-background-primary border border-border rounded">↵</span> to select
                </span>
                <span className="text-[10px] font-medium text-text-secondary flex items-center gap-1.5">
                  <span className="px-1.5 py-0.5 bg-background-primary border border-border rounded">esc</span> to close
                </span>
              </div>
            </Command>
          </Dialog.Panel>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

const CommandItem = ({ algo, onSelect, icon }: { algo: any, onSelect: () => void, icon: React.ReactNode }) => (
  <Command.Item
    onSelect={onSelect}
    className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-accent-primary/5 aria-selected:bg-accent-primary/10 aria-selected:text-accent-primary group transition-all outline-none focus-visible:ring-2 focus-visible:ring-accent-ring"
  >
    <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-text-muted group-aria-selected:bg-accent-primary group-aria-selected:text-white transition-colors">
      {icon}
    </div>
    <div className="flex flex-col">
      <span className="text-sm font-bold tracking-tight">{algo.info.name}</span>
      <span className="text-[11px] text-text-muted line-clamp-1 font-medium">{algo.info.description}</span>
    </div>
  </Command.Item>
);
