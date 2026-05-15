export type TournamentStatus = 'upcoming' | 'ongoing' | 'finished';

export type Tournament = {
    tournamentId: string;
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