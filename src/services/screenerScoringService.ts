import {
  AnswerValue,
  DomainScore,
  ResultBand,
  ScreenerAnswers,
  ScreenerDomain,
  ScreenerQuestion,
} from '../types/screener';

const normalScores: Record<AnswerValue, number> = {
  never: 0,
  younger: 1,
  now: 2,
  nowAndYoung: 3,
};

const reverseScores: Record<AnswerValue, number> = {
  never: 3,
  younger: 2,
  now: 1,
  nowAndYoung: 0,
};

const domains: ScreenerDomain[] = [
  'social',
  'communication',
  'sensoryMotor',
  'focusedInterests',
];

export function scoreAnswer(question: ScreenerQuestion, answer: AnswerValue): number {
  return question.reverseScored ? reverseScores[answer] : normalScores[answer];
}

export function calculateTotalScore(
  questions: ScreenerQuestion[],
  answers: ScreenerAnswers
): number {
  return questions.reduce((total, question) => {
    const answer = answers[question.id];

    if (!answer) {
      return total;
    }

    return total + scoreAnswer(question, answer);
  }, 0);
}

export function calculateDomainScores(
  questions: ScreenerQuestion[],
  answers: ScreenerAnswers
): DomainScore[] {
  return domains.map((domain) => {
    const domainQuestions = questions.filter((question) => question.domain === domain);

    const score = domainQuestions.reduce((total, question) => {
      const answer = answers[question.id];

      if (!answer) {
        return total;
      }

      return total + scoreAnswer(question, answer);
    }, 0);

    return {
      domain,
      score,
      maxScore: domainQuestions.length * 3,
    };
  });
}

export function getResultBand(score: number, maxScore: number): ResultBand {
  const percentage = maxScore === 0 ? 0 : score / maxScore;

  if (percentage < 0.33) {
    return {
      label: 'Lower trait signal',
      description:
        'Your responses show fewer patterns in this educational screener. This is not a diagnosis.',
    };
  }

  if (percentage < 0.66) {
    return {
      label: 'Moderate trait signal',
      description:
        'Your responses show some patterns that may be useful to reflect on or discuss with a qualified professional.',
    };
  }

  return {
    label: 'Elevated trait signal',
    description:
      'Your responses show a stronger pattern of traits in this educational screener. This is not a diagnosis, but it may be worth discussing with a qualified professional.',
  };
}