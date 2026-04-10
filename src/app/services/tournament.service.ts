import { Injectable } from '@angular/core';
import { Tournament } from '../shared/types/tournament.types';

@Injectable({
    providedIn: 'root'
})
export class TournamentService {

    public async getTournaments(): Promise<Tournament[]> {
        console.log('getTournaments called');

        return [
            {
                id: 1,
                name: 'Cyber Cup 2024',
                game: 'CS:GO',
                startDate: new Date(),
                endDate: new Date(),
                maxPlayers: 16,
                currentPlayers: 8,
                status: 'upcoming',
                prizePool: 10000,
                description: 'Тестовий турнір'
            },
            {
                id: 2,
                name: 'Dota 2 Championship',
                game: 'Dota 2',
                startDate: new Date(),
                endDate: new Date(),
                maxPlayers: 12,
                currentPlayers: 12,
                status: 'ongoing',
                prizePool: 25000,
                description: 'Ще один тестовий турнір'
            }
        ];
    }

    public async joinTournament(tournamentId: number): Promise<any> {
        console.log('Joining tournament:', tournamentId);
        alert('Ви приєдналися до турніру ' + tournamentId);
        return { success: true };
    }
}