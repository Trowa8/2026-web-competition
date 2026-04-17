export type TournamentStatus = 'active' | 'completed';

export type Tournament = {
    id: number;
    name: string;
    status: TournamentStatus;
};

export type TournamentsResponse = {
    tournaments: Tournament[];
};

export type CreateTournamentRequest = {
    name: string;
    description?: string;
    startDate?: Date;
    endDate?: Date;
    location?: string;
    maxPlayers?: number;
    gameType?: string;
    prizePool?: number;
};