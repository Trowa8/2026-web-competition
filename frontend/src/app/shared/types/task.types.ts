export type Task = {
    id: string;
    title: string;
    description: string;
    tournamentId: string;
    createdAt: string;
};

export type CreateTaskDto = {
    title: string;
    description: string;
    tournamentId: string;
};