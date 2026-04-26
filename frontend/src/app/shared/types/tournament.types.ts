export interface Tournament {
    id: number;
    name: string;
    game: string;
    startDate: Date;
    endDate: Date;
    maxPlayers: number;
    currentPlayers: number;
    status: "upcoming" | "ongoing" | "completed";
    prizePool: number;
    description: string;
    imageUrl?: string;
}
