export type TaskType = {
    taskId: number;
    name: string;
    description: string;
    deadline: string;
    tournamentId: number;
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
