import { Injectable } from '@angular/core';
import { Tournament } from '../types/tournament.types';

@Injectable({
    providedIn: 'root'
})
export class TournamentService {
    private tournaments: Tournament[] = [
        {
            id: 1,
            name: '🏆 Кібер Кубок 2024',
            game: 'Counter-Strike 2',
            startDate: new Date('2024-12-15'),
            endDate: new Date('2024-12-20'),
            maxPlayers: 16,
            currentPlayers: 12,
            status: 'upcoming',
            prizePool: 50000,
            description: 'Найбільший кіберспортивний турнір року'
        },
        {
            id: 2,
            name: '🎮 Чемпіонат Dota 2',
            game: 'Dota 2',
            startDate: new Date('2024-12-10'),
            endDate: new Date('2024-12-18'),
            maxPlayers: 12,
            currentPlayers: 12,
            status: 'ongoing',
            prizePool: 100000,
            description: 'Міжнародний турнір з Dota 2'
        }
    ];

<<<<<<< HEAD
    public async getTournaments(): Promise<Tournament[]> {
        return this.tournaments;
    }

    public async joinTournament(tournamentId: number): Promise<any> {
        const tournament = this.tournaments.find(t => t.id === tournamentId);
        if (tournament && tournament.currentPlayers < tournament.maxPlayers) {
            tournament.currentPlayers++;
            console.log(`Joined tournament ${tournamentId}`);
            return { success: true, message: 'Ви приєдналися до турніру!' };
        }
        return { success: false, message: 'Не вдалося приєднатися' };
    }

    public async leaveTournament(tournamentId: number): Promise<any> {
        const tournament = this.tournaments.find(t => t.id === tournamentId);
        if (tournament && tournament.currentPlayers > 0) {
            tournament.currentPlayers--;
            console.log(`Left tournament ${tournamentId}`);
            return { success: true, message: 'Ви вийшли з турніру!' };
        }
        return { success: false, message: 'Не вдалося вийти з турніру' };
    }

    public async createTournament(tournament: Omit<Tournament, 'id'>): Promise<Tournament> {
        const newId = Math.max(...this.tournaments.map(t => t.id), 0) + 1;
        const newTournament = { ...tournament, id: newId };
        this.tournaments.push(newTournament);
        console.log(`Created tournament ${newId}`);
=======
    async getTournaments(): Promise<Tournament[]> {
        return this.tournaments;
    }

    async joinTournament(id: number): Promise<any> {
        const tournament = this.tournaments.find(t => t.id === id);
        if (tournament && tournament.currentPlayers < tournament.maxPlayers) {
            tournament.currentPlayers++;
            return { success: true };
        }
        return { success: false };
    }

    async leaveTournament(id: number): Promise<any> {
        const tournament = this.tournaments.find(t => t.id === id);
        if (tournament && tournament.currentPlayers > 0) {
            tournament.currentPlayers--;
            return { success: true };
        }
        return { success: false };
    }

    async createTournament(data: any): Promise<Tournament> {
        const newId = this.tournaments.length + 1;
        const newTournament: Tournament = {
            id: newId,
            name: data.name,
            game: data.game,
            description: data.description,
            maxPlayers: data.maxPlayers,
            prizePool: data.prizePool,
            startDate: data.startDate,
            endDate: data.endDate,
            currentPlayers: 0,
            status: 'upcoming'
        };
        this.tournaments.push(newTournament);
        console.log('Створено турнір:', newTournament);
>>>>>>> upstream/main
        return newTournament;
    }
}