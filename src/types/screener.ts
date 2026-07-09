export type AnswerValue = 'never' | 'younger' | 'now' | 'nowAndYoung';

export type ScreenerDomain =
  | 'social'
  | 'communication'
  | 'sensoryMotor'
  | 'focusedInterests';

export type ScreenerQuestion = {
  id: number;
  text: string;
  domain: ScreenerDomain;
  reverseScored?: boolean;
};

export type ScreenerAnswers = Record<number, AnswerValue>;

export type DomainScore = {
  domain: ScreenerDomain;
  score: number;
  maxScore: number;
};

export type ResultBand = {
  label: string;
  description: string;
};

export type SavedScreenerResult = {
  id: string;
  completedAt: string;
  totalScore: number;
  maxScore: number;
  domainScores: DomainScore[];
};