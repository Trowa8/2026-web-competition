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

export type CreateTournamentResponse = {
    id: number;
    name: string;
    description: string;
    startDate: string;
    registrationDeadline: string;
    createdBy: number;
    createdAt: string;
};

export type UpdateTournamentRequest = {
    name?: string;
    description?: string;
    startDate?: string;
    registrationDeadline?: string;
    status?: TournamentStatus;
    maxTeams?: number;
};

export type UpdateTournamentResponse = {
    id: number;
    name: string;
    description: string;
    startDate: string;
    registrationDeadline: string;
    status: TournamentStatus;
    updatedAt: string;
};

export type DeleteTournamentResponse = {
    success: boolean;
};

export type RegisterTeamRequest = {
    teamId: number;
};

export type RegisterTeamResponse = {
    success: boolean;
    message: string;
    registeredAt: string;
};

export type LeaderboardEntry = {
    rank: number;
    teamId: number;
    teamName: string;
    totalScore: number;
    taskScores: { taskId: number; taskName: string; score: number }[];
};