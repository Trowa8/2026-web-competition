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

export type TeamCreate = {
    name: string;
    description: string;
    maxMembers: number;
};