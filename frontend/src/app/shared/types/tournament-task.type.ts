export type TournamentTask = {
    id: number;
    tournamentId: number;
    title: string;
    description: string;
    assignedTo: string;
    deadline: string;
    status: 'pending' | 'in_progress' | 'done';
};

export type TournamentTaskCreate = Omit<TournamentTask, 'id'>;