import React, { useState } from 'react';
import type { QuizQuestion } from '../../types/extended';
import { CheckCircle2, XCircle, ChevronRight, RotateCcw, Award } from 'lucide-react';

interface Props {
  questions: QuizQuestion[];
  onComplete?: (score: number, total: number) => void;
}

export const QuizCard: React.FC<Props> = ({ questions, onComplete }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));
  const [finished, setFinished] = useState(false);

  const current = questions[currentIdx];
  const hasAnswered = selected !== null;
  const isCorrect = selected === current?.correctIndex;

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    const newAnswers = [...answers];
    newAnswers[currentIdx] = idx;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelected(answers[currentIdx + 1]);
    } else {
      const score = answers.filter((a, i) => a === questions[i].correctIndex).length;
      setFinished(true);
      onComplete?.(score, questions.length);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0); setSelected(null); setAnswers(new Array(questions.length).fill(null)); setFinished(false);
  };

  if (finished) {
    const score = answers.filter((a, i) => a === questions[i].correctIndex).length;
    const pct = Math.round((score / questions.length) * 100);
    const isMaster = pct >= 80;

    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[32px] p-8 md:p-12 text-center shadow-premium animate-fade-in max-w-2xl mx-auto">
        <div className="flex justify-center mb-6">
            <div className={`w-20 h-20 rounded-3xl flex items-center justify-center text-white shadow-lg ${isMaster ? 'bg-emerald-500 shadow-emerald-500/20' : 'bg-indigo-600 shadow-indigo-600/20'}`}>
                <Award size={40} />
            </div>
        </div>
        <div className="text-6xl font-black mb-4 tracking-tighter" style={{ color: pct >= 80 ? '#10b981' : pct >= 50 ? '#f59e0b' : '#ef4444' }}>{pct}%</div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Quiz Completed!</h2>
        <p className="text-slate-500 dark:text-slate-400 font-bold mb-8">
            {pct >= 80 ? 'Incredible! You have a strong grasp of these concepts.' : pct >= 50 ? 'Well done! You are on the right track.' : 'Keep learning, consistency is the key to mastery!'}
        </p>

        <div className="grid grid-cols-5 gap-2 mb-10 max-w-sm mx-auto">
          {answers.map((a, i) => (
            <div key={i} className={`h-2 rounded-full transition-all duration-500 ${a === questions[i].correctIndex ? 'bg-emerald-500 w-full' : 'bg-rose-500 w-full opacity-40'}`} />
          ))}
        </div>

        <button 
          onClick={handleRestart} 
          className="flex items-center justify-center gap-2 w-full sm:w-auto mx-auto px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-sm transition-all shadow-btn-indigo active:scale-95"
        >
          <RotateCcw size={16} />
          <span>Attempt Again</span>
        </button>
      </div>
    );
  }

  if (!current) return null;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[32px] p-6 md:p-8 flex flex-col gap-6 shadow-sm animate-fade-in max-w-3xl mx-auto">
      {/* Header / Progress */}
      <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Module Assessment</span>
              <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-2 py-0.5 rounded-md">Q{currentIdx + 1} / {questions.length}</span>
          </div>
          <div className="flex gap-1.5 h-1.5">
            {questions.map((_, i) => (
              <div key={i} className={`flex-1 rounded-full transition-all duration-300 ${
                i < currentIdx 
                  ? (answers[i] === questions[i].correctIndex ? 'bg-emerald-500' : 'bg-rose-500 opacity-40') 
                  : i === currentIdx ? 'bg-indigo-600' : 'bg-slate-100 dark:bg-slate-800'
              }`} />
            ))}
          </div>
      </div>

      <h3 className="text-xl font-black text-slate-900 dark:text-white leading-tight tracking-tight pr-4">{current.question}</h3>

      <div className="grid grid-cols-1 gap-3">
        {current.options.map((option, idx) => {
          let stateStyles = 'bg-white dark:bg-slate-950 border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm';
          if (hasAnswered) {
            if (idx === current.correctIndex) stateStyles = 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-500 text-emerald-700 dark:text-emerald-400 font-bold';
            else if (idx === selected) stateStyles = 'bg-rose-50 dark:bg-rose-500/10 border-rose-500 text-rose-700 dark:text-rose-400 font-bold opacity-80';
            else stateStyles = 'bg-slate-50 dark:bg-slate-950 border-slate-100 dark:border-slate-900 text-slate-400 opacity-40';
          }
          return (
            <button key={idx} onClick={() => handleSelect(idx)}
              className={`w-full group text-left px-5 py-4 rounded-2xl border-2 transition-all duration-300 ${stateStyles} ${!hasAnswered ? 'cursor-pointer' : 'cursor-default'}`}>
              <div className="flex items-center gap-4">
                <span className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center text-[10px] font-black transition-colors ${
                  hasAnswered && idx === current.correctIndex ? 'bg-emerald-500 text-white border-emerald-500' : 'border-current'
                }`}>
                    {String.fromCharCode(65 + idx)}
                </span>
                <span className="text-sm tracking-tight">{option}</span>
                {hasAnswered && idx === current.correctIndex && <CheckCircle2 size={16} className="ml-auto text-emerald-500" strokeWidth={3} />}
                {hasAnswered && idx === selected && idx !== current.correctIndex && <XCircle size={16} className="ml-auto text-rose-500" strokeWidth={3} />}
              </div>
            </button>
          );
        })}
      </div>

      {/* Rationale / Feedback */}
      <div className={`min-h-[64px] transition-all duration-500 ${hasAnswered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
        {hasAnswered && (
          <div className={`rounded-2xl px-5 py-4 text-xs font-bold leading-relaxed border ${
            isCorrect ? 'bg-emerald-50/50 dark:bg-emerald-500/5 border-emerald-100 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400' 
                      : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
          }`}>
            <span className="uppercase tracking-widest text-[9px] block mb-1 opacity-60">{isCorrect ? 'Logic Confirmed' : 'Core Concept'}</span>
            {current.explanation}
          </div>
        )}
      </div>

      <button 
        onClick={handleNext} 
        disabled={!hasAnswered}
        className="self-center sm:self-end flex items-center gap-2.5 px-8 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-sm transition-all shadow-btn-indigo disabled:opacity-30 disabled:translate-y-0 hover:-translate-y-0.5"
      >
        <span>{currentIdx < questions.length - 1 ? 'Continue' : 'Finalize Session'}</span>
        <ChevronRight size={18} strokeWidth={3} />
      </button>
    </div>
  );
};
