import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  Terminal, 
  BarChart3, 
  Layers, 
  ArrowRight,
  Info,
  CheckCircle2,
  Clock,
  Database
} from 'lucide-react';
import { AlgorithmInfo } from '../../types/algorithmTypes';
import { AnimationStep } from '../../types/animationTypes';
import { cn } from '../../utils/cn';

interface InsightPanelProps {
  info: AlgorithmInfo;
  currentStep?: AnimationStep;
  explanation?: string;
  progress?: number;
}

export const AlgorithmInsightPanel: React.FC<InsightPanelProps> = ({ 
  info, 
  currentStep, 
  explanation,
  progress 
}) => {
  return (
    <div className="flex flex-col gap-8">
      {/* Title Section */}
      <div>
        <div className="flex items-center gap-2.5 mb-2">
           <span className="px-2.5 py-1 bg-accent-primary/10 border border-accent-primary/20 rounded-lg text-[10px] font-black text-accent-primary uppercase tracking-widest">
              {info.category}
           </span>
           <span className="w-1.5 h-1.5 rounded-full bg-border" />
           <span className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em]">Insights</span>
        </div>
        <h2 className="text-3xl font-black text-text-primary tracking-tighter leading-none mb-4">
           {info.name}
        </h2>
        <p className="text-xs font-bold text-text-secondary leading-relaxed line-clamp-3">
           {info.description}
        </p>
      </div>

      {/* Progress Monitor */}
      {progress !== undefined && (
        <div className="bg-background-secondary border border-border rounded-2xl p-5 shadow-sm">
           <div className="flex justify-between items-center mb-3">
              <span className="text-[10px] font-black text-text-secondary uppercase tracking-widest flex items-center gap-2">
                 <Terminal size={12} className="text-accent-primary" /> Execution Progress
              </span>
              <span className="text-[11px] font-mono font-bold text-accent-primary">{progress}%</span>
           </div>
           <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-[1px]">
              <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: `${progress}%` }}
                 className="h-full bg-accent-primary rounded-full shadow-glow-indigo"
              />
           </div>
        </div>
      )}

      {/* Logic Flow / Live Debugging */}
      <div className="space-y-4">
         <h4 className="text-[10px] font-black text-text-secondary uppercase tracking-widest px-1">Logic Flow</h4>
         <div className="bg-background-secondary border border-border rounded-2xl p-4 overflow-hidden relative group">
            {/* Terminal Shine */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-primary/20 to-transparent" />
            
            <AnimatePresence mode="wait">
               <motion.div
                 key={explanation}
                 initial={{ opacity: 0, x: 10 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: -10 }}
                 className="flex gap-4"
               >
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-accent-primary/5 border border-accent-primary/20 flex items-center justify-center text-accent-primary">
                     <Zap size={20} />
                  </div>
                  <div>
                     <p className="text-sm font-bold text-text-primary tracking-tight mb-1">Current Instruction</p>
                     <p className="text-xs font-medium text-text-secondary leading-relaxed">
                        {explanation || "Initializing simulation sequence..."}
                     </p>
                  </div>
               </motion.div>
            </AnimatePresence>
         </div>
      </div>

      {/* Step Breakdown */}
      <div className="space-y-4">
         <h4 className="text-[10px] font-black text-text-secondary uppercase tracking-widest px-1">Optimization Strategy</h4>
         <div className="space-y-2">
            {info.stepByStep.map((step, idx) => (
               <div key={idx} className="flex gap-4 p-3 hover:bg-background-secondary rounded-xl transition-colors border border-transparent hover:border-border">
                  <div className="shrink-0 w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] font-black text-text-secondary">
                     {idx + 1}
                  </div>
                  <div>
                     <h5 className="text-xs font-black text-text-primary tracking-tight">{step.title}</h5>
                     <p className="text-[11px] font-bold text-text-secondary mt-0.5">{step.description}</p>
                  </div>
               </div>
            ))}
         </div>
      </div>

      {/* Complexity Matrix (Interactive Cards) */}
      <div className="space-y-4">
         <div className="flex justify-between items-center px-1">
            <h4 className="text-[10px] font-black text-text-secondary uppercase tracking-widest">Complexity Matrix</h4>
            <div className="flex gap-2">
               <div className="w-2 h-2 rounded-full bg-success" />
               <div className="w-2 h-2 rounded-full bg-warning" />
               <div className="w-2 h-2 rounded-full bg-danger" />
            </div>
         </div>
         
         <div className="grid grid-cols-2 gap-3">
            <ComplexityCard label="Best"    value={info.complexity.time.best}    type="time"  icon={<Clock size={12} />} />
            <ComplexityCard label="Average" value={info.complexity.time.average} type="time"  icon={<Clock size={12} />} />
            <ComplexityCard label="Worst"   value={info.complexity.time.worst}   type="time"  icon={<Clock size={12} />} />
            <ComplexityCard label="Memory"  value={info.complexity.space}        type="space" icon={<Database size={12} />} />
         </div>
      </div>
    </div>
  );
};

const ComplexityCard = ({ label, value, type, icon }: { label: string, value: string, type: 'time'|'space', icon: React.ReactNode }) => {
  const isOptimal = value.includes('log') || value === 'O(1)' || value === 'O(N)';
  const isExpensive = value.includes('N²') || value.includes('2^N') || value.includes('N!');
  
  const statusColor = isOptimal ? 'text-success' : isExpensive ? 'text-danger' : 'text-warning';
  const statusBg = isOptimal ? 'bg-success/5 border-success/10' : isExpensive ? 'bg-danger/5 border-danger/10' : 'bg-warning/5 border-warning/10';

  return (
    <motion.div 
      whileHover={{ y: -2 }}
      className={cn(
        "p-4 rounded-2xl border flex flex-col gap-3 transition-all",
        statusBg
      )}
    >
       <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-widest text-text-secondary opacity-60">
          {icon} {label}
       </div>
       <div className={cn("text-sm font-mono font-black tracking-tight", statusColor)}>
          {value}
       </div>
    </motion.div>
  );
};
