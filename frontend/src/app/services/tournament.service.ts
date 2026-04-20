import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { Tournament, CreateTournamentRequest, TournamentsResponse } from '../models/tournament.types';

@Injectable({ providedIn: 'root' })
export class TournamentService {
    public tournaments = signal<Tournament[]>([]);

    constructor(private http: HttpClient) { }

    public async getTournaments(): Promise<Tournament[]> {
        try {
            return await firstValueFrom<TournamentsResponse>(
                this.http.get<TournamentsResponse>(`${environment.apiUrl}/tournaments`)
            ).then((response: TournamentsResponse) => {
                this.tournaments.set(response.tournaments);
                return response.tournaments;
            });
        } catch (error) {
            console.error('Помилка отримання турнірів:', error);
            // Fallback to mock data
            const mockTournaments: Tournament[] = [
                { id: 1, name: 'Hackathon 2026', status: 'active' },
                { id: 2, name: 'AI Challenge', status: 'completed' },
                { id: 3, name: 'Frontend Battle', status: 'active' }
            ];
            this.tournaments.set(mockTournaments);
            return mockTournaments;
        }
    }

    public async createTournament(data: CreateTournamentRequest): Promise<Tournament> {
        try {
            return await firstValueFrom<Tournament>(
                this.http.post<Tournament>(`${environment.apiUrl}/tournaments`, data)
            ).then((newTournament: Tournament) => {
                const current = this.tournaments();
                this.tournaments.set([...current, newTournament]);
                return newTournament;
            });
        } catch (error) {
            console.error('Помилка створення турніру:', error);
            // Fallback to mock creation
            const newTournament: Tournament = {
                id: Date.now(),
                name: data.name,
                status: 'active'
            };
            const current = this.tournaments();
            this.tournaments.set([...current, newTournament]);
            return newTournament;
        }
    }

    public async deleteTournament(id: number): Promise<void> {
        try {
            await firstValueFrom(
                this.http.delete(`${environment.apiUrl}/tournaments/${id}`)
            );
        } catch (error) {
            console.error('Помилка видалення турніру:', error);
        } finally {
            const current = this.tournaments();
            this.tournaments.set(current.filter(t => t.id !== id));
        }
    }
}