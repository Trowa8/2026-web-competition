export type Evaluation = {
    id: string;
    solutionId: string;
    score: number;
    comment: string;
    createdAt: string;
};

export type CreateEvaluationDto = {
    solutionId: string;
    score: number;
    comment: string;
};