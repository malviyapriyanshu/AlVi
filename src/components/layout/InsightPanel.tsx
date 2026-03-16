import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  Terminal, 
  Code2, 
  Lightbulb, 
  ChevronDown,
  BarChart3,
  Clock,
  Database,
  Cpu,
  Info,
  FileText
} from 'lucide-react';
import { AlgorithmInfo } from '../../types/algorithmTypes';
import { AnimationStep } from '../../types/animationTypes';
import { cn } from '../../utils/cn';
import { PseudocodeViewer } from '../learning/PseudocodeViewer';
import { SourceCodeViewer } from '../learning/SourceCodeViewer';

interface Props {
  info: AlgorithmInfo;
  currentStep?: AnimationStep;
  explanation?: string;
  progress?: number;
}

export const InsightPanel: React.FC<Props> = ({ 
  info, 
  currentStep, 
  explanation,
  progress 
}) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    pseudocode: true,
    logic: true,
    complexity: true
  });
  const [codeMode, setCodeMode] = useState<'blueprint' | 'source'>('blueprint');

  const toggle = (id: string) => setExpanded(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="flex flex-col gap-6 select-none">
      {/* Header Info */}
      <div className="mb-2">
        <div className="flex items-center gap-2 mb-2">
           <div className="px-2 py-0.5 rounded-md bg-accent-primary/10 border border-accent-primary/20 text-[11px] font-black text-accent-primary uppercase tracking-widest">
              {info.category}
           </div>
           <span className="text-[11px] font-bold text-text-muted uppercase tracking-[0.2em]">Insight Core</span>
        </div>
        <h2 className="text-2xl font-black text-text-primary tracking-tighter leading-none mb-3">
           {info.name}
        </h2>
        <p className="text-sm font-medium text-text-secondary leading-relaxed line-clamp-3 italic">
           "{info.description}"
        </p>
      </div>

      {/* Live State Monitor */}
      <div className="bg-background-secondary border border-border rounded-2xl p-4 shadow-sm overflow-hidden relative">
         <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-primary/20 to-transparent" />
         <div className="flex justify-between items-center mb-4">
            <span className="text-[11px] font-black text-text-secondary uppercase tracking-widest flex items-center gap-2">
               <Terminal size={12} className="text-accent-primary" /> Instruction Stream
            </span>
            <span className="text-[11px] font-mono font-bold text-accent-primary" aria-label={`Simulation progress: ${progress || 0}%`}>{progress || 0}%</span>
         </div>
         
         <div className="min-h-[60px] flex items-center gap-4 bg-background-primary/50 rounded-xl p-3 border border-border/50">
            <div className="shrink-0 w-8 h-8 rounded-lg bg-accent-primary/5 border border-accent-primary/10 flex items-center justify-center text-accent-primary">
               <Zap size={16} />
            </div>
            <p className="text-[11px] font-bold text-text-primary leading-relaxed line-clamp-2">
               {explanation || "Awaiting simulation start..."}
            </p>
         </div>
      </div>

      {/* Complexity Matrix */}
      <div className="space-y-3">
         <SectionHeader 
           title="Complexity Matrix" 
           icon={<Cpu size={14} />} 
           isOpen={expanded.complexity} 
           onToggle={() => toggle('complexity')} 
         />
         <AnimatePresence>
            {expanded.complexity && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-2 gap-2 pb-2">
                  <CompactComplexityCard label="Best"    value={info.complexity.time.best}    />
                  <CompactComplexityCard label="Average" value={info.complexity.time.average} />
                  <CompactComplexityCard label="Worst"   value={info.complexity.time.worst}   />
                  <CompactComplexityCard label="Space"   value={info.complexity.space}        />
                </div>
              </motion.div>
            )}
         </AnimatePresence>
      </div>

      <div className="space-y-3">
         <div className="flex items-center justify-between">
            <SectionHeader 
              title="Logic Blueprint" 
              icon={<Code2 size={14} />} 
              isOpen={expanded.pseudocode} 
              onToggle={() => toggle('pseudocode')} 
            />
            {expanded.pseudocode && (
                <div className="flex bg-background-secondary p-1 rounded-lg border border-border scale-90 origin-right" role="tablist">
                   <button 
                     role="tab"
                     aria-selected={codeMode === 'blueprint'}
                     onClick={() => setCodeMode('blueprint')}
                     className={cn("px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-widest transition-all focus-visible:ring-2 focus-visible:ring-accent-ring outline-none", codeMode === 'blueprint' ? "bg-accent-primary text-white" : "text-text-secondary hover:text-text-primary")}
                   >Logic</button>
                   <button 
                     role="tab"
                     aria-selected={codeMode === 'source'}
                     onClick={() => setCodeMode('source')}
                     className={cn("px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-widest transition-all focus-visible:ring-2 focus-visible:ring-accent-ring outline-none", codeMode === 'source' ? "bg-accent-primary text-white" : "text-text-secondary hover:text-text-primary")}
                   >Source</button>
                </div>
            )}
         </div>
         <AnimatePresence mode="wait">
            {expanded.pseudocode && (
              <motion.div
                key={codeMode}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="overflow-hidden"
              >
                {codeMode === 'blueprint' ? (
                   <PseudocodeViewer 
                      code={info.pseudocode} 
                      highlightLine={currentStep?.line} 
                   />
                ) : (
                   <SourceCodeViewer 
                      code={info.pseudocode} // For now we use pseudocode as mock source if implementation is missing
                   />
                )}
              </motion.div>
            )}
         </AnimatePresence>
      </div>

      {/* Conceptual Strategy */}
      <div className="space-y-3">
         <SectionHeader 
           title="Mental Model" 
           icon={<Lightbulb size={14} />} 
           isOpen={expanded.logic} 
           onToggle={() => toggle('logic')} 
         />
         <AnimatePresence>
            {expanded.logic && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-border italic text-[11px] font-bold text-text-secondary leading-relaxed">
                   "{info.analogy}"
                </div>
              </motion.div>
            )}
         </AnimatePresence>
      </div>
    </div>
  );
};

const SectionHeader = ({ title, icon, isOpen, onToggle }: { title: string, icon: React.ReactNode, isOpen: boolean, onToggle: () => void }) => (
  <button 
    onClick={onToggle}
    aria-expanded={isOpen}
    className="w-full flex items-center justify-between group outline-none focus-visible:ring-2 focus-visible:ring-accent-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary rounded-xl"
  >
    <div className="flex items-center gap-2.5">
      <div className={cn(
        "p-1.5 rounded-lg transition-colors",
        isOpen ? "bg-accent-primary text-white shadow-glow-indigo" : "bg-slate-100 dark:bg-slate-800 text-text-secondary group-hover:text-text-primary"
      )}>
        {icon}
      </div>
      <span className="text-[11px] font-black uppercase tracking-widest text-text-secondary group-hover:text-text-primary transition-colors">
        {title}
      </span>
    </div>
    <ChevronDown size={14} className={cn("text-text-secondary transition-transform duration-300", isOpen && "rotate-180")} />
  </button>
);

const CompactComplexityCard = ({ label, value }: { label: string, value: string }) => {
  const isOptimal = value.includes('log') || value === 'O(1)' || value === 'O(N)';
  const isExpensive = value.includes('N²') || value.includes('2^N') || value.includes('N!');
  
  return (
    <div className="p-2.5 rounded-xl border border-border bg-background-secondary flex flex-col gap-1 transition-colors hover:border-accent-primary/20">
       <span className="text-[9px] font-black text-text-muted uppercase tracking-widest">{label}</span>
       <span className={cn(
         "text-[11px] font-mono font-black",
         isOptimal ? "text-success" : isExpensive ? "text-danger" : "text-warning"
       )}>
          {value}
       </span>
    </div>
  );
};
