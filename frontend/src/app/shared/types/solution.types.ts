export type SolutionType = {
    solutionId: string;
    taskId: string;
    githubUrl: string;
    demoUrl: string;
    createdAt: string;
};

export type CreateSolutionDto = {
    taskId: string;
    teamId: string;
    fileName: string;
};

export type UploadFileRequest = {
    taskId: string;
    teamId: string;
    file: File;
};