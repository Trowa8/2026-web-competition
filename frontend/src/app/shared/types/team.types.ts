export type TeamMember = {
    user_id: number;
    role: string;
};

export type TeamProfile = {
    team_id: number;
    name: string;
    description: string;
    owner_id: number;
    members: TeamMember[];
    createdAt: string;
};