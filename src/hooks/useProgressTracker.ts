import { useState, useCallback, useEffect } from 'react';
import type { UserProgress } from '../types/extended';

const STORAGE_KEY = 'algVis_progress_v1';

const defaultProgress: UserProgress = {
  viewedAlgorithms: [],
  solvedProblems: [],
  quizScores: {},
  completedPaths: [],
  totalTimeSpent: 0,
};

export const useProgressTracker = () => {
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? { ...defaultProgress, ...JSON.parse(stored) } : defaultProgress;
    } catch { return defaultProgress; }
  });

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); }
    catch { /* ignore */ }
  }, [progress]);

  const markAlgorithmViewed = useCallback((algorithmId: string) => {
    setProgress(prev => ({
      ...prev,
      viewedAlgorithms: prev.viewedAlgorithms.includes(algorithmId) ? prev.viewedAlgorithms : [...prev.viewedAlgorithms, algorithmId],
      lastVisited: algorithmId,
    }));
  }, []);

  const markProblemSolved = useCallback((problemId: string) => {
    setProgress(prev => ({
      ...prev,
      solvedProblems: prev.solvedProblems.includes(problemId) ? prev.solvedProblems : [...prev.solvedProblems, problemId],
    }));
  }, []);

  const recordQuizScore = useCallback((quizId: string, score: number) => {
    setProgress(prev => ({ ...prev, quizScores: { ...prev.quizScores, [quizId]: Math.max(prev.quizScores[quizId] ?? 0, score) } }));
  }, []);

  const markPathCompleted = useCallback((pathId: string) => {
    setProgress(prev => ({
      ...prev,
      completedPaths: prev.completedPaths.includes(pathId) ? prev.completedPaths : [...prev.completedPaths, pathId],
    }));
  }, []);

  const resetProgress = useCallback(() => {
    setProgress(defaultProgress);
  }, []);

  const TOTAL_ALGORITHMS = 13;
  const overallProgress = Math.round((progress.viewedAlgorithms.length / TOTAL_ALGORITHMS) * 100);

  return {
    progress, overallProgress, TOTAL_ALGORITHMS,
    markAlgorithmViewed, markProblemSolved, recordQuizScore, markPathCompleted, resetProgress,
  };
};
