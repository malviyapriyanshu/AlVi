import React, { useState } from 'react';
import type { QuizQuestion } from '../../types/extended';
import { CheckCircle2, XCircle, ChevronRight } from 'lucide-react';

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
    return (
      <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-6 text-center">
        <div className="text-5xl font-black mb-2" style={{ color: pct >= 80 ? '#34d399' : pct >= 50 ? '#facc15' : '#f87171' }}>{pct}%</div>
        <p className="text-white font-bold text-lg mb-1">You scored {score}/{questions.length}</p>
        <p className="text-slate-400 text-sm mb-6">{pct >= 80 ? '🎉 Excellent! You really know your algorithms.' : pct >= 50 ? '👍 Good effort! Keep practicing.' : '📚 Keep studying — you got this!'}</p>
        <div className="grid grid-cols-5 gap-1 mb-6">
          {answers.map((a, i) => (
            <div key={i} className={`h-2 rounded-full ${a === questions[i].correctIndex ? 'bg-emerald-500' : 'bg-rose-500'}`} />
          ))}
        </div>
        <button onClick={handleRestart} className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-all">Retry Quiz</button>
      </div>
    );
  }

  if (!current) return null;

  return (
    <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-5 flex flex-col gap-4">
      {/* Progress */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>Question {currentIdx + 1} of {questions.length}</span>
        <div className="flex gap-1">
          {questions.map((_, i) => (
            <div key={i} className={`w-5 h-1.5 rounded-full transition-all ${i < currentIdx ? (answers[i] === questions[i].correctIndex ? 'bg-emerald-500' : 'bg-rose-500') : i === currentIdx ? 'bg-indigo-500' : 'bg-slate-700'}`} />
          ))}
        </div>
      </div>

      <h3 className="text-base font-bold text-white leading-relaxed">{current.question}</h3>

      <div className="flex flex-col gap-2">
        {current.options.map((option, idx) => {
          let style = 'bg-slate-800/60 border-slate-700 text-slate-300 hover:border-indigo-500/50 hover:bg-slate-700/50';
          if (hasAnswered) {
            if (idx === current.correctIndex) style = 'bg-emerald-500/15 border-emerald-500 text-emerald-300';
            else if (idx === selected) style = 'bg-rose-500/15 border-rose-500 text-rose-300';
            else style = 'bg-slate-800/30 border-slate-700/50 text-slate-500';
          }
          return (
            <button key={idx} onClick={() => handleSelect(idx)}
              className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all ${style} ${!hasAnswered ? 'cursor-pointer' : 'cursor-default'}`}>
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-xs flex-shrink-0">{String.fromCharCode(65 + idx)}</span>
                {option}
                {hasAnswered && idx === current.correctIndex && <CheckCircle2 size={14} className="ml-auto text-emerald-400" />}
                {hasAnswered && idx === selected && idx !== current.correctIndex && <XCircle size={14} className="ml-auto text-rose-400" />}
              </div>
            </button>
          );
        })}
      </div>

      {hasAnswered && (
        <div className={`rounded-xl px-4 py-3 text-sm border ${isCorrect ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-slate-800/60 border-slate-700 text-slate-400'}`}>
          {isCorrect ? '✅ ' : '💡 '}{current.explanation}
        </div>
      )}

      <button onClick={handleNext} disabled={!hasAnswered}
        className="self-end flex items-center gap-2 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed">
        {currentIdx < questions.length - 1 ? 'Next Question' : 'See Results'}
        <ChevronRight size={16} />
      </button>
    </div>
  );
};
