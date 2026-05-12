export type SolutionType = {
    solutionId: string;
    taskId: string;
    teamId: string;
    fileName: string;
};

export type SolutionListItemType = {
    solutionId: string;
    teamId: string;
    fileName: string;
};

export type SolutionDetailType = {
    solutionId: string;
    fileName: string;
    fileUrl: string;
};

export type UploadFileResponse = {
    fileName: string;
};

export type CreateSolutionRequest = {
    taskId: string;
    teamId: string;
    fileName: string;
};

export type UploadFileRequest = {
    taskId: string;
    teamId: string;
    file: File;
};