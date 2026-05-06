export type Task = {
    id: string;
    title: string;
    description: string;
    tournamentId: string;
    maxScore: number;
    createdAt: string;
    updatedAt: string;
};

export type CreateTaskDto = {
    title: string;
    description: string;
    tournamentId: string;
    maxScore: number;
};

export type UpdateTaskDto = {
    title?: string;
    description?: string;
    maxScore?: number;
};