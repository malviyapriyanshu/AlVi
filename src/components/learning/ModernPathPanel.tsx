import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Lock, ChevronRight, Bookmark, Search, Zap, Layout } from 'lucide-react';
import { LearningPath } from '../../types/extended';
import { cn } from '../../utils/cn';

interface Props {
  paths: LearningPath[];
  viewedAlgorithms: string[];
  onSelectAlgorithm?: (id: string) => void;
}

const levelStyles: Record<string, { badge: string; color: string; glow: string }> = {
  Beginner:     { badge: 'border-emerald-500/20 text-emerald-500 bg-emerald-500/5', color: 'emerald-500', glow: 'shadow-glow-emerald' },
  Intermediate: { badge: 'border-blue-500/20 text-blue-500 bg-blue-500/5', color: 'blue-500', glow: 'shadow-glow-blue' },
  Advanced:     { badge: 'border-accent-primary/20 text-accent-primary bg-accent-primary/5', color: 'accent-primary', glow: 'shadow-glow-indigo' },
};

export const ModernPathPanel: React.FC<Props> = ({ paths, viewedAlgorithms, onSelectAlgorithm }) => {
  return (
    <div className="space-y-12">
      {paths.map((path, pIdx) => {
        const style = levelStyles[path.level] || levelStyles.Advanced;
        const completed = path.steps.filter(s => viewedAlgorithms.includes(s.algorithmId)).length;
        const total = path.steps.length;
        const pct = Math.round((completed / total) * 100);

        return (
          <div key={path.id} className="relative group">
            {/* Connection Line between levels */}
            {pIdx < paths.length - 1 && (
               <div className="absolute left-6 top-[100%] w-[2px] h-12 bg-gradient-to-b from-border via-border/50 to-transparent z-0" />
            )}

            <div className="relative z-10 flex gap-6 md:gap-10">
               {/* Side Marker */}
               <div className="hidden md:flex flex-col items-center pt-2 gap-4">
                  <div className={cn(
                    "w-12 h-12 rounded-2xl border-2 flex items-center justify-center transition-all duration-500",
                    pct === 100 ? "bg-success border-success text-white shadow-glow-emerald" : "bg-background-primary border-border text-text-secondary"
                  )}>
                     {pct === 100 ? <CheckCircle2 size={24} /> : <span className="font-black text-xs">{pIdx + 1}</span>}
                  </div>
                  <div className="flex-1 w-[2px] bg-border" />
               </div>

               {/* Path Content */}
               <div className="flex-1">
                  <div className="mb-8">
                     <div className="flex items-center gap-3 mb-3">
                        <span className={cn("text-[10px] font-black px-2.5 py-1 rounded-lg border uppercase tracking-widest leading-none", style.badge)}>
                           {path.level} Unit
                        </span>
                        <div className="h-px flex-1 bg-border" />
                        <span className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em]">{completed} / {total} Units</span>
                     </div>
                     <h3 className="text-3xl font-black text-text-primary tracking-tighter mb-2">{path.title}</h3>
                     <p className="text-xs font-bold text-text-secondary leading-relaxed max-w-2xl italic">
                        "{path.description}"
                     </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                     {path.steps.map((step, sIdx) => {
                        const isDone = viewedAlgorithms.includes(step.algorithmId);
                        const isPrevDone = sIdx === 0 || viewedAlgorithms.includes(path.steps[sIdx - 1].algorithmId);
                        const isLocked = !isDone && !isPrevDone;

                        return (
                          <motion.button
                            whileHover={isLocked ? {} : { y: -4, x: 4 }}
                            key={step.algorithmId}
                            onClick={() => !isLocked && onSelectAlgorithm?.(step.algorithmId)}
                            disabled={isLocked}
                            className={cn(
                              "relative p-6 rounded-[32px] border-2 text-left transition-all duration-300 overflow-hidden",
                              isDone ? "bg-background-secondary border-success/20" : 
                              isLocked ? "bg-slate-50 dark:bg-slate-950 border-border opacity-40 cursor-not-allowed grayscale" : 
                              "bg-background-primary border-border hover:border-accent-primary shadow-sm hover:shadow-xl"
                            )}
                          >
                             {/* Background Motif */}
                             {isDone && <CheckCircle2 className="absolute -right-4 -bottom-4 w-20 h-20 text-success opacity-5" />}

                             <div className="flex items-start gap-4 mb-4 relative z-10">
                                <div className={cn(
                                  "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border transition-all duration-500",
                                  isDone ? "bg-success text-white border-transparent" : 
                                  isLocked ? "bg-slate-100 dark:bg-slate-800 text-slate-400 border-border" : 
                                  "bg-accent-primary/10 text-accent-primary border-accent-primary/20"
                                )}>
                                   {isDone ? <CheckCircle2 size={24} /> : isLocked ? <Lock size={20} /> : <Zap size={20} />}
                                </div>
                                <div className="min-w-0 flex-1 pt-1">
                                   <h4 className={cn("text-lg font-black tracking-tight leading-none mb-1", isLocked ? "text-text-secondary" : "text-text-primary")}>
                                      {step.name}
                                   </h4>
                                   <p className="text-[10px] font-bold text-text-secondary truncate">{step.description}</p>
                                </div>
                             </div>

                             <div className="flex items-center justify-between relative z-10">
                                <div className="flex gap-1.5">
                                   <span className="text-[9px] font-black uppercase text-text-secondary tracking-widest px-2 py-0.5 bg-background-primary border border-border rounded-md">CORE</span>
                                   {isDone && <span className="text-[9px] font-black uppercase text-success tracking-widest px-2 py-0.5 bg-success/10 rounded-md">Validated</span>}
                                </div>
                                {!isLocked && <ChevronRight size={16} className="text-accent-primary transition-transform group-hover:translate-x-1" />}
                             </div>

                             {/* Progress indicator at the bottom edge */}
                             {!isLocked && (
                                <div className="absolute bottom-0 left-0 h-1 bg-accent-primary/20 w-full overflow-hidden">
                                   {isDone && <div className="h-full bg-success w-full" />}
                                </div>
                             )}
                          </motion.button>
                        );
                     })}
                  </div>
               </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
