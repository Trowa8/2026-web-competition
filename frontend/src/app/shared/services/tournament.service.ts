import { Injectable } from '@angular/core';
import { Tournament } from '../types/tournament.types';

@Injectable({
    providedIn: 'root'
})
export class TournamentService {

    public async getTournaments(): Promise<Tournament[]> {
        console.log('getTournaments called');

        return [
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
    }

    public async joinTournament(tournamentId: number): Promise<any> {
        console.log('Joining tournament:', tournamentId);
        return { success: true };
    }
}