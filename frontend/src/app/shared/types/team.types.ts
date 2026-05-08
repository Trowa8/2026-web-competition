export type TeamMember = {
    id: number;
    name: string;
    role?: string;
    avatar?: string;
};

export type Team = {
    id?: number;
    name: string;
    description: string;
    members: TeamMember[];
    logo?: string;
    createdAt?: string;
};

export type SuggestedUser = {
    id: number;
    name: string;
    email: string;
    isAvailable: boolean;
};