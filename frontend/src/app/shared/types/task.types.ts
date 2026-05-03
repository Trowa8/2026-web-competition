export type Task = {
    id: number;
    title: string;
    description: string;
    deadline: string;
    tournamentId: number;
    status: 'draft' | 'active' | 'closed';
};