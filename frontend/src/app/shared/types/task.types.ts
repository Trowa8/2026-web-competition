export type TaskType = {
    id: string;
    title: string;
    description: string;
    constraints: string;
    inputExample: string;
    outputExample: string;
    createdAt: string;
};

export type CreateTaskDto = {
    title: string;
    description: string;
    constraints: string;
    inputExample: string;
    outputExample: string;
};

export type CreateTaskRequest = {
    name: string;
    description: string;
    deadline: string;
};

export type UpdateTaskRequest = {
    name?: string;
    description?: string;
    deadline?: string;
};

export type SuccessResponse = {
    success: boolean;
};
