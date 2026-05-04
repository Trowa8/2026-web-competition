export type TeamMember = {
    id: number;
    name: string;
    role: string;
    avatarUrl?: string;
};

export type TeamProfile = {
    id: number;
    name: string;
    description: string;
    avatarUrl?: string;
    members: TeamMember[];
};