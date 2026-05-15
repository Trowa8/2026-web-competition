export type SolutionType = {
<<<<<<< HEAD
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
=======
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
>>>>>>> main
};