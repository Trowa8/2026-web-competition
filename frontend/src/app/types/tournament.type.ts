export type TournamentStatus = 'draft' | 'registration' | 'ongoing' | 'completed' | 'cancelled';

export type Tournament = {
    id: number;
    name: string;
    description?: string;
    startDate: Date;
    endDate: Date;
    location: string;
    maxPlayers: number;
    status: TournamentStatus;
    gameType: string;
    prizePool?: number;
    createdAt: Date;
    updatedAt: Date;
};

export type CreateTournamentRequest = {
    name: string;
    description?: string;
    startDate: Date;
    endDate: Date;
    location: string;
    maxPlayers: number;
    gameType: string;
    prizePool?: number;
};

export type UpdateTournamentRequest = {
    name?: string;
    description?: string;
    startDate?: Date;
    endDate?: Date;
    location?: string;
    maxPlayers?: number;
    status?: TournamentStatus;
    gameType?: string;
    prizePool?: number;
};

export type TournamentsResponse = {
    tournaments: Tournament[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
};

export type TournamentFilters = {
    status?: TournamentStatus;
    gameType?: string;
    search?: string;
    page?: number;
    pageSize?: number;
};

export type TournamentStats = {
    total: number;
    active: number;
    completed: number;
};