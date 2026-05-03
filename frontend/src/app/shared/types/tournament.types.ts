export type Tournament = {
    id: number;
    name: string;
    description?: string;
    status: 'draft' | 'registration' | 'active' | 'finished';
    startDate?: string;
    maxTeams?: number;
    registeredTeams?: number;
};