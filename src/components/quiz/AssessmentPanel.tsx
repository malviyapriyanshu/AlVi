import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  Award,
  Zap,
  Info
} from 'lucide-react';
import { QuizQuestion } from '../../types/extended';
import { cn } from '../../utils/cn';

interface Props {
  questions: QuizQuestion[];
  onComplete: (score: number, total: number) => void;
}

export const AssessmentPanel: React.FC<Props> = ({ questions, onComplete }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = questions[currentIdx];

  const handleSelect = (idx: number) => {
    if (showResult) return;
    setSelectedIdx(idx);
    setShowResult(true);
    if (idx === currentQuestion.correctIndex) setScore(s => s + 1);
  };

  const next = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(i => i + 1);
      setSelectedIdx(null);
      setShowResult(false);
    } else {
      setIsFinished(true);
      onComplete(score, questions.length);
    }
  };

  const reset = () => {
    setCurrentIdx(0);
    setScore(0);
    setSelectedIdx(null);
    setShowResult(false);
    setIsFinished(false);
  };

  if (isFinished) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-2xl mx-auto bg-background-primary border border-border rounded-[40px] p-12 text-center shadow-premium"
      >
        <div className="w-24 h-24 rounded-full bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center text-accent-primary mx-auto mb-8">
           <Award size={48} />
        </div>
        <h2 className="text-4xl font-black text-text-primary tracking-tighter mb-2">Assessment Matrix Complete</h2>
        <p className="text-text-secondary font-bold mb-8">You've successfully validated your algorithmic pattern recognition.</p>
        
        <div className="flex flex-col items-center gap-2 mb-10">
           <span className="text-6xl font-black text-accent-primary tracking-tighter">{pct}%</span>
           <span className="text-xs font-black text-text-secondary uppercase tracking-[0.3em]">Precision Index</span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-10">
           <div className="p-6 rounded-3xl bg-background-secondary border border-border">
              <p className="text-[10px] font-black text-text-secondary uppercase mb-1">Status</p>
              <p className={cn("text-lg font-black", pct >= 70 ? 'text-success' : 'text-warning')}>
                 {pct >= 70 ? 'Verified' : 'Review Required'}
              </p>
           </div>
           <div className="p-6 rounded-3xl bg-background-secondary border border-border">
              <p className="text-[10px] font-black text-text-secondary uppercase mb-1">Score</p>
              <p className="text-lg font-black text-text-primary">{score} / {questions.length}</p>
           </div>
        </div>

        <button 
           onClick={reset}
           className="px-8 py-4 bg-accent-primary text-white rounded-2xl font-black text-sm tracking-widest uppercase shadow-glow-indigo transition-transform active:scale-95 flex items-center gap-3 mx-auto"
        >
           <RotateCcw size={18} /> Re-Initialize
        </button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Progress Header */}
      <div className="flex items-center justify-between px-4">
         <div className="flex items-center gap-4">
            <span className="text-[10px] font-black text-text-secondary uppercase tracking-widest">Question</span>
            <span className="text-2xl font-black text-text-primary tracking-tight">{currentIdx + 1} / {questions.length}</span>
         </div>
         <div className="flex gap-1.5">
            {questions.map((_, i) => (
               <div key={i} className={cn(
                  "w-3 h-1.5 rounded-full transition-all duration-500",
                  i === currentIdx ? "bg-accent-primary w-8" : i < currentIdx ? "bg-success" : "bg-slate-200 dark:bg-slate-800"
               )} />
            ))}
         </div>
      </div>

      {/* Question Card */}
      <motion.div
        key={currentIdx}
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -20, opacity: 0 }}
        className="bg-background-secondary border border-border rounded-[40px] p-8 md:p-12 shadow-premium"
      >
        <div className="flex items-start gap-6 mb-10">
           <div className="shrink-0 w-12 h-12 rounded-2xl bg-accent-primary/5 border border-accent-primary/10 flex items-center justify-center text-accent-primary">
              <Zap size={24} />
           </div>
           <h3 className="text-2xl md:text-3xl font-black text-text-primary tracking-tight leading-tight pt-1">
              {currentQuestion.question}
           </h3>
        </div>

        <div className="grid grid-cols-1 gap-4 mb-10 text-left">
           {currentQuestion.options.map((opt, idx) => {
              const isCorrect = idx === currentQuestion.correctIndex;
              const isSelected = idx === selectedIdx;
              
              let styling = "bg-background-primary border-border hover:border-accent-primary/50 text-text-primary";
              if (showResult) {
                 if (isCorrect) styling = "bg-success/10 border-success text-success";
                 else if (isSelected) styling = "bg-danger/10 border-danger text-danger";
                 else styling = "opacity-40 border-border text-text-secondary";
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={showResult}
                  className={cn(
                    "w-full flex items-center justify-between p-6 rounded-3xl border-2 transition-all group relative overflow-hidden",
                    styling
                  )}
                >
                   <span className="text-sm font-bold tracking-tight z-10">{opt}</span>
                   <div className="z-10">
                      {showResult && isCorrect && <CheckCircle2 size={24} />}
                      {showResult && isSelected && !isCorrect && <XCircle size={24} />}
                   </div>
                   
                   {/* Selection Glow */}
                   {!showResult && (
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-accent-primary/5 to-transparent transition-opacity" />
                   )}
                </button>
              );
           })}
        </div>

        {/* Feedback Section */}
        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="mt-8 pt-8 border-t border-border"
            >
               <div className="flex gap-4 p-6 bg-slate-50 dark:bg-slate-900 border border-border rounded-3xl">
                  <div className="shrink-0 p-2 rounded-xl bg-background-primary text-text-secondary border border-border self-start">
                     <Info size={16} />
                  </div>
                  <div>
                     <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest mb-1.5">Logic Context</p>
                     <p className="text-xs font-bold text-text-primary leading-relaxed">
                        {currentQuestion.explanation}
                     </p>
                  </div>
               </div>
               
               <button 
                  onClick={next}
                  className="mt-8 w-full h-16 bg-text-primary text-background-primary rounded-3xl font-black text-sm tracking-[0.2em] uppercase flex items-center justify-center gap-3 transition-transform active:scale-95"
               >
                  {currentIdx === questions.length - 1 ? 'Finalize Report' : 'Next Operation'} <ArrowRight size={18} />
               </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
