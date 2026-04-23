export type TournamentStatus = 'active' | 'completed';

export type Tournament = {
    id: number;
    name: string;
    status: TournamentStatus;
    location?: string;
    gameType?: string;
    maxPlayers?: number;
    prizePool?: number;
    startDate?: Date;
    endDate?: Date;
    description?: string;
};

export type CreateTournamentRequest = {
    name: string;
    location?: string;
    gameType?: string;
    maxPlayers?: number;
    prizePool?: number;
    startDate?: Date;
    endDate?: Date;
    description?: string;
};

export type TournamentsResponse = {
    tournaments: Tournament[];
    total: number;
    page: number;
    pageSize: number;
};