export type Solution = {
    id: string;
    team_id: string;
    file_name: string;
    uploaded_at: string;
    version: number;
};

export type CreateSolutionDto = {
    taskId: string;
    file: string;
};

export type UpdateSolutionDto = {
    file?: string;
};