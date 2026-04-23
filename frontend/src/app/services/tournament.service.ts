import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { Tournament } from '../shared/types/tournament.types';

@Injectable({ providedIn: 'root' })
export class TournamentService {
    constructor(private http: HttpClient) { }

    public async getTournaments(): Promise<Tournament[]> {
        try {
            const response = await firstValueFrom<{ tournaments: Tournament[] }>(
                this.http.get<{ tournaments: Tournament[] }>(`${environment.apiUrl}/tournaments`)
            );
            return response.tournaments;
        } catch (error) {
            return [
                { id: 1, name: 'CS2 Cup', status: 'active' },
                { id: 2, name: 'Dota 2 League', status: 'completed' },
                { id: 3, name: 'Valorant Masters', status: 'active' },
                { id: 4, name: 'LoL Championship', status: 'completed' }
            ];
        }
    }

    public async createTournament(data: any): Promise<Tournament> {
        try {
            return await firstValueFrom<Tournament>(
                this.http.post<Tournament>(`${environment.apiUrl}/tournaments`, data)
            );
        } catch (error) {
            return {
                id: Date.now(),
                name: data.name,
                status: 'active',
                location: data.location,
                gameType: data.gameType,
                maxPlayers: data.maxPlayers,
                prizePool: data.prizePool,
                startDate: data.startDate,
                endDate: data.endDate,
                description: data.description
            };
        }
    }

    public async deleteTournament(id: number): Promise<void> {
        try {
            await firstValueFrom(
                this.http.delete(`${environment.apiUrl}/tournaments/${id}`)
            );
        } catch (error) {
            console.log('Демо-видалення:', id);
        }
    }
}