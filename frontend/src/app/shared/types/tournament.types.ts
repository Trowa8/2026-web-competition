export type TournamentStatus = 'upcoming' | 'ongoing' | 'finished';

export type Tournament = {
    tournamentId: number;
    title: string;
    description: string;
    status: TournamentStatus;
    startDate: string;
    endDate: string;
    maxTeams: number;
};

export type TournamentCreate = {
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    maxTeams: number;
};