export type TestResult = {
  name: string;
  passed: boolean;
  message?: string;
};

export type SolutionStatus = 'pending' | 'completed' | 'failed';

export type Solution = {
  id: string | number;
  participantName: string;
  submittedAt: string;
  code: string;
  language: string;
  status: SolutionStatus;
  score?: number;
  feedback?: string;
  tests?: TestResult[];
};

export type ReviewSolutionRequest = {
  score: number;
  feedback: string;
};