export type TeamMember = {
    userId: number;
    role: string;
    joinedAt: string;
};

export type Team = {
    teamId: number;
    name: string;
    description: string;
    ownerId: number;
    members: TeamMember[];
    createdAt: string;
};