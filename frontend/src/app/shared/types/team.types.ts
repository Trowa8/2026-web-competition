export type TeamMember = {
    userId: number;
    role: 'captain' | 'member';
    joinedAt: string;
};

export type Team = {
    teamId: number;
    name: string;
    description: string;
    ownerId: number;
    members: TeamMember[];
    createdAt: string;
    updatedAt?: string;
};

export type CreateTeamRequest = {
    name: string;
    description: string;
};

export type CreateTeamResponse = {
    teamId: number;
    name: string;
    description: string;
    ownerId: number;
    createdAt: string;
};

export type UpdateTeamRequest = {
    name?: string;
    description?: string;
};

export type UpdateTeamResponse = {
    teamId: number;
    name: string;
    description: string;
    ownerId: number;
    updatedAt: string;
};

export type DeleteTeamResponse = {
    success: boolean;
};

export type AddMemberRequest = {
    userId: number;
};

export type AddMemberResponse = {
    userId: number;
    role: string;
};

export type RemoveMemberResponse = {
    success: boolean;
};

export type GetTeamResponse = {
    teamId: number;
    name: string;
    description: string;
    ownerId: number;
    members: { userId: number; role: string; joinedAt: string }[];
    createdAt: string;
};