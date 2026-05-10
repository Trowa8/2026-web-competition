export type User = {
    user_id: string;
    login: string;
    email: string;
};

export type TeamMember = {
    user_id: string;
    role: 'captain' | 'member';
    user_details?: User;
};

export type TeamProfile = {
    team_id: string;
    name: string;
    description?: string;
    captain_id?: string;
    members: TeamMember[];
    createdAt: string;
};

export type Tournament = {
    id: string;
    name: string;
    description?: string;
    start_date: string;
    end_date: string;
    registration_deadline: string;
};

export type TeamTournamentHistory = {
    tournament: Tournament;
    rank: number;
    score: number;
};