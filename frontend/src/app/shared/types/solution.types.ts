export type SolutionType = {
    id: string;
    taskId: string;
    content: string;
    status: string;
    createdAt: string;
};

export type SolutionListItemType = {
    id: string;
    status: string;
    submittedAt: string;
};

export type CreateSolutionDto = {
    taskId: string;
    content: string;
};

export type UploadFileResponse = {
    fileUrl: string;
    success: boolean;
};

export type UploadFileRequest = {
    file: File;
    taskId: string;
};