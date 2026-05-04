export type Tournament = {
    id: number;
    name: string;
    description: string;
    status: 'registration' | 'active' | 'finished';
};

export type CreateTournamentDto = {
    name: string;
    description: string;
};

export type LeaderboardItem = {
    teamName: string;
    score: number;
};