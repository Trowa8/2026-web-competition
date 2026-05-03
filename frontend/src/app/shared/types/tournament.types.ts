export type TournamentStatus = 'REGISTRATION' | 'ONGOING' | 'FINISHED';

export type Tournament = {
    id: string;
    name: string;
    description: string;
    status: TournamentStatus;
    startDate: string;
    endDate: string;
    createdAt: string;
};

export type CreateTournamentDto = {
    name: string;
    description: string;
    startDate: string;
    endDate: string;
};

export type UpdateTournamentDto = Partial<CreateTournamentDto>;

export type TournamentFilters = {
    status?: TournamentStatus;
    search?: string;
};