import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tournament } from '../types/tournament.interface';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {
  private apiUrl = '/api/tournaments';

  constructor(private http: HttpClient) {}

  async getTournaments(): Promise<Tournament[]> {
    return [
      {
        id: 1,
        name: 'Cyber Cup',
        game: 'CS:GO',
        startDate: new Date(),
        maxPlayers: 16,
        currentPlayers: 8,
        status: 'upcoming',
        description: 'Найбільший кіберспортивний турнір року',
        prizePool: 10000
      },
      {
        id: 2,
        name: 'Game Masters',
        game: 'Dota 2',
        startDate: new Date(),
        maxPlayers: 16,
        currentPlayers: 12,
        status: 'ongoing',
        description: 'Турнір для професійних гравців',
        prizePool: 5000
      },
      {
        id: 3,
        name: 'Pro League',
        game: 'League of Legends',
        startDate: new Date(),
        maxPlayers: 10,
        currentPlayers: 6,
        status: 'upcoming',
        description: 'Професійна ліга з LoL',
        prizePool: 7500
      }
    ];
  }

  async joinTournament(id: number): Promise<any> {
    console.log('Joining tournament:', id);
    return { success: true };
  }
}