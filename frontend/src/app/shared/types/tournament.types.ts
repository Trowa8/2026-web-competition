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
    location?: string;
    prizePool?: number;
};

export type TournamentDetails = Tournament & {
    rules?: string;
    imageUrl?: string;
};

export type CreateTournamentRequest = {
    name: string;
    description: string;
    startDate: string;
    registrationDeadline: string;
    maxTeams: number;
    location?: string;
    prizePool?: number;
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
    location?: string;
    prizePool?: number;
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
    message?: string;
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
    taskScores: {
        taskId: number;
        taskName: string;
        score: number;
    }[];
};

export type UserTournamentsResponse = {
    registered: Tournament[];
    created: Tournament[];
};

export type TournamentFilters = {
    status?: TournamentStatus;
    search?: string;
    page?: number;
    limit?: number;
    sortBy?: 'startDate' | 'createdAt' | 'name';
    sortOrder?: 'asc' | 'desc';
};

export type PaginatedResponse<T> = {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
};