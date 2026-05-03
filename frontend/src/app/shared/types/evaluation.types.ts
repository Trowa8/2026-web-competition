export type BaseEvaluation = {
    score: number;
    comment?: string;
};

export type CreateEvaluationDto = BaseEvaluation & {
    solutionId: string;
};

export type UpdateEvaluationDto = Partial<BaseEvaluation>;

export type Evaluation = BaseEvaluation & {
    id: string;
    judgeId: string;
    solutionId: string;
    createdAt: string;
    updatedAt: string;
};