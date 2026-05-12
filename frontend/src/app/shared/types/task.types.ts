export type TaskType = {
    taskId: string;
    tournamentId: string;
    name: string;
    description: string;
    deadline: string;
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

export type DeleteTaskResponse = {
    success: boolean;
};