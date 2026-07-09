import { useCallback, useMemo, useState } from 'react';
import { screenerQuestions } from '../data/screenerQuestions';
import {
  calculateDomainScores,
  calculateTotalScore,
} from '../services/screenerScoringService';
import { AnswerValue, ScreenerAnswers } from '../types/screener';

export function useScreenerTest() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<ScreenerAnswers>({});

  const currentQuestion = screenerQuestions[currentIndex];
  const selectedAnswer = answers[currentQuestion.id];

  const totalQuestions = screenerQuestions.length;
  const maxScore = totalQuestions * 3;

  const answeredCount = useMemo(() => Object.keys(answers).length, [answers]);

  const progress = useMemo(
    () => answeredCount / totalQuestions,
    [answeredCount, totalQuestions]
  );

  const totalScore = useMemo(
    () => calculateTotalScore(screenerQuestions, answers),
    [answers]
  );

  const domainScores = useMemo(
    () => calculateDomainScores(screenerQuestions, answers),
    [answers]
  );

  const isFirstQuestion = currentIndex === 0;
  const isLastQuestion = currentIndex === totalQuestions - 1;
  const canGoNext = Boolean(selectedAnswer);

  const selectAnswer = useCallback(
    (answer: AnswerValue) => {
      setAnswers((currentAnswers) => ({
        ...currentAnswers,
        [currentQuestion.id]: answer,
      }));
    },
    [currentQuestion.id]
  );

  const goPrevious = useCallback(() => {
    setCurrentIndex((index) => Math.max(index - 1, 0));
  }, []);

  const goNext = useCallback(() => {
    setCurrentIndex((index) => Math.min(index + 1, totalQuestions - 1));
  }, [totalQuestions]);

  return {
    answers,
    currentIndex,
    currentQuestion,
    selectedAnswer,
    totalQuestions,
    answeredCount,
    progress,
    totalScore,
    maxScore,
    domainScores,
    isFirstQuestion,
    isLastQuestion,
    canGoNext,
    selectAnswer,
    goPrevious,
    goNext,
  };
}