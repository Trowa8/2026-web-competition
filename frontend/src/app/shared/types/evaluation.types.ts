export type BaseEvaluation = {
    score: number;
    comment?: string;
    criteriaScores?: { 
        technical: number;
        functionality: number;
        design: number;
        presentation: number;
    };
};

export type CreateEvaluationrequest = BaseEvaluation & {
    submissionId: number;
};

export type UpdateEvaluationRequest = Partial<BaseEvaluation>;

export type EvaluationResponse = BaseEvaluation & {
    id: string; 
    juryId: string;
    submissionId: string;
    createdAt: string;
    updatedAt: string;
};