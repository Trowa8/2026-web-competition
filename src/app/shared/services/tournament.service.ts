import { Injectable } from '@angular/core';
import { Tournament } from '../types/tournament.types';

@Injectable({
    providedIn: 'root'
})
export class TournamentService {

    public async getTournaments(): Promise<Tournament[]> {
        console.log('getTournaments called - returning mock data');

        return [
            {
                id: 1,
                name: '🏆 Cyber Cup 2024',
                game: 'Counter-Strike 2',
                startDate: new Date('2024-12-15T10:00:00'),
                endDate: new Date('2024-12-20T18:00:00'),
                maxPlayers: 16,
                currentPlayers: 12,
                status: 'upcoming',
                prizePool: 50000,
                description: 'Найбільший кіберспортивний турнір року. Призовий фонд 50,000$!'
            },
            {
                id: 2,
                name: '🎮 Dota 2 Championship',
                game: 'Dota 2',
                startDate: new Date('2024-12-10T14:00:00'),
                endDate: new Date('2024-12-18T20:00:00'),
                maxPlayers: 12,
                currentPlayers: 12,
                status: 'ongoing',
                prizePool: 100000,
                description: 'Міжнародний турнір з Dota 2. Призовий фонд 100,000$!'
            },
            {
                id: 3,
                name: '⚡ Valorant Masters',
                game: 'Valorant',
                startDate: new Date('2024-12-20T12:00:00'),
                endDate: new Date('2024-12-25T16:00:00'),
                maxPlayers: 10,
                currentPlayers: 4,
                status: 'upcoming',
                prizePool: 25000,
                description: 'Турнір з Valorant для професійних команд'
            },
            {
                id: 4,
                name: '🏅 League of Legends Cup',
                game: 'League of Legends',
                startDate: new Date('2024-12-05T15:00:00'),
                endDate: new Date('2024-12-09T19:00:00'),
                maxPlayers: 8,
                currentPlayers: 8,
                status: 'completed',
                prizePool: 30000,
                description: 'Закритий турнір з LoL. Переможець отримає 30,000$'
            },
            {
                id: 5,
                name: '🚀 Rocket League Showdown',
                game: 'Rocket League',
                startDate: new Date('2025-01-10T16:00:00'),
                endDate: new Date('2025-01-15T18:00:00'),
                maxPlayers: 20,
                currentPlayers: 5,
                status: 'upcoming',
                prizePool: 15000,
                description: 'Турнір з Rocket League. Реєстрація відкрита!'
            }
        ];
    }

    public async joinTournament(tournamentId: number): Promise<any> {
        console.log('Joining tournament:', tournamentId);
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ success: true, message: 'Successfully joined tournament' });
            }, 500);
        });
    }
}