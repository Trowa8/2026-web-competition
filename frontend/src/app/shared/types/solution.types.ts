export type Solution = {
    id: string;
    githubUrl: string;
    demoUrl?: string;
    teamId: string;
    taskId: string;
    createdAt: string;
    updatedAt: string;
};

export type CreateSolutionDto = {
    githubUrl: string;
    demoUrl?: string;
    taskId: string;
};

export type UpdateSolutionDto = {
    githubUrl?: string;
    demoUrl?: string;
};