import { Injectable, signal } from '@angular/core';
import { Tournament, CreateTournamentRequest } from '../models/tournament.types';

@Injectable({ providedIn: 'root' })
export class TournamentService {
    public tournaments = signal<Tournament[]>([
        { id: 1, name: 'Hackathon 2026', status: 'active' },
        { id: 2, name: 'AI Challenge', status: 'completed' },
        { id: 3, name: 'Frontend Battle', status: 'active' }
    ]);

    public async getTournaments(): Promise<Tournament[]> {
        // Повертаємо демо-дані без запиту до сервера
        return this.tournaments();
    }

    public async createTournament(data: CreateTournamentRequest): Promise<Tournament> {
        const newTournament: Tournament = {
            id: Date.now(),
            name: data.name,
            status: 'active'
        };

        const current = this.tournaments();
        this.tournaments.set([...current, newTournament]);
        return newTournament;
    }

    public async deleteTournament(id: number): Promise<void> {
        const current = this.tournaments();
        this.tournaments.set(current.filter(t => t.id !== id));
    }
}