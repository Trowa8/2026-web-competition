export type Team = {
    teamId: string;
    name: string;
    description: string;
    ownerId: string;
    createdAt: string;
};

export type CreateTeamRequest = {
    name: string;
    description: string;
};