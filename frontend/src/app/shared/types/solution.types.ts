export type SolutionType = {
    solutionId: string;
    taskId: string;
    githubUrl: string;
    demoUrl: string;
    createdAt: string;
};

export type SolutionListItemType = SolutionType;
export type SolutionDetailType = SolutionType;

export type UploadFileResponse = {
    success: boolean;
    message?: string;
    solutionId?: string;
};

export type CreateSolutionDto = {
    taskId: string;
    teamId: string;
    fileName: string;
};

export type CreateSolutionRequest = CreateSolutionDto;

export type UploadFileRequest = {
    taskId: string;
    teamId: string;
    file: File;
};