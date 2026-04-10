export interface Tournament {
    id: number;
    name: string;
}

export class TournamentService {
    private data: Tournament[] = [
        { id: 1, name: 'Champions League' },
        { id: 2, name: 'World Cup' }
    ];

    async getAll(): Promise<Tournament[]> {
        return Promise.resolve(this.data);
    }

    async create(name: string) {
        this.data.push({ id: Date.now(), name });
    }

    async delete(id: number) {
        this.data = this.data.filter(t => t.id !== id);
    }
}