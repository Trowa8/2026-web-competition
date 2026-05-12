export type Solution = {
    id: string;
    taskId: string;
    githubUrl: string;
    demoUrl: string;
    createdAt: string;
};

export type CreateSolutionDto = {
    taskId: string;
    githubUrl: string;
    demoUrl: string;
};