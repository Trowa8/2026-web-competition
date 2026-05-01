export type Team = {
    teamId: number;
    name: string;
    description: string;
    ownerId: number;
    members: { userId: number; role: string; joinedAt: string }[];
    createdAt: string;
};