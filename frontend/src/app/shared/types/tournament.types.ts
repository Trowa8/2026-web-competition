export type TournamentStatus = 'draft' | 'registration' | 'ongoing' | 'completed' | 'cancelled';

export type Tournament = {
    id: number;
    name: string;
    description: string;
    startDate: string;
    registrationDeadline: string;
    status: TournamentStatus;
    createdBy: number;
    createdAt: string;
    maxTeams: number;
    registeredTeams: number;
};

export type CreateTournamentRequest = {
    name: string;
    description?: string;
    startDate: string;
    registrationDeadline: string;
    maxTeams: number;
};