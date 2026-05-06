export type TournamentType = {
    tournamentId: string;
    name: string;
    description: string;
    startDate: string;
    registrationDeadline: string;
    createdBy: number;
    createdAt: string;
};

export type TournamentListItemType = {
    tournamentId: string;
    name: string;
    startDate: string;
    registrationDeadline: string;
    createdBy: number;
    createdAt: string;
};

export type TournamentUpdatedType = {
    tournamentId: string;
    name: string;
    description: string;
    startDate: string;
    registrationDeadline: string;
    updatedAt: string;
};

export type LeaderboardEntryType = {
    rank: number;
    teamId: string;
    teamName: string;
    taskScores: {
        taskId: string;
        score: number;
    }[];
    total: number;
};

export type SuccessResponse = {
    success: boolean;
};

export type CreateTournamentRequest = {
    name: string;
    description?: string;
    startDate: string;
    registrationDeadline: string;
};

export type UpdateTournamentRequest = {
    name?: string;
    description?: string;
    startDate?: string;
    registrationDeadline?: string;
};

export type RegisterTeamRequest = {
    teamId: string;
};