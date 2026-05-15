export type MarkType = {
    markId: string;
    solutionId: string;
    judgeId: string;
    score: number;
    comment: string;
    createdAt: string;
};

export type CreateMarkRequest = {
    score: number;
    comment?: string;
};

export type UpdateMarkRequest = {
    score?: number;
    comment?: string;
};
