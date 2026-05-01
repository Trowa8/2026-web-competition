<<<<<<< HEAD
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Tournament, CreateTournamentRequest } from '../types/tournament.types';

@Injectable({ providedIn: 'root' })
export class TournamentService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  async getAll(): Promise<Tournament[]> {
    return await firstValueFrom<Tournament[]>(this.http.get<Tournament[]>(`${this.apiUrl}/tournaments`));
  }

  async getById(id: number): Promise<Tournament> {
    return await firstValueFrom<Tournament>(this.http.get<Tournament>(`${this.apiUrl}/tournaments/${id}`));
  }

  async create(data: CreateTournamentRequest): Promise<Tournament> {
    return await firstValueFrom<Tournament>(this.http.post<Tournament>(`${this.apiUrl}/tournaments`, data));
  }

  async update(id: number, data: any): Promise<Tournament> {
    return await firstValueFrom<Tournament>(this.http.put<Tournament>(`${this.apiUrl}/tournaments/${id}`, data));
  }

  async delete(id: number): Promise<void> {
    await firstValueFrom(this.http.delete(`${this.apiUrl}/tournaments/${id}`));
  }

  async registerTeam(tournamentId: number, teamId: number): Promise<any> {
    return await firstValueFrom(this.http.post(`${this.apiUrl}/tournaments/${tournamentId}/register`, { teamId }));
  }

  async getLeaderboard(tournamentId: number): Promise<any[]> {
    return await firstValueFrom<any[]>(this.http.get<any[]>(`${this.apiUrl}/tournaments/${tournamentId}/leaderboard`));
  }
=======
import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Tournament, CreateTournamentRequest } from '../types/tournament.types';

@Injectable({ providedIn: 'root' })
export class TournamentService {
    private http = inject(HttpClient);
    private apiUrl = environment.apiUrl;

    public tournaments = signal<Tournament[]>([]);
    private loading = signal(false);
    private errorMsg = signal<string | null>(null);

    public readonly isLoading = this.loading.asReadonly();
    public readonly error = this.errorMsg.asReadonly();

    async getAllTournaments(): Promise<Tournament[]> {
        this.loading.set(true);
        try {
            const data = await firstValueFrom<Tournament[]>(this.http.get<Tournament[]>(`${this.apiUrl}/tournaments`));
            this.tournaments.set(data);
            return data;
        } catch {
            this.errorMsg.set('Помилка завантаження');
            return [];
        } finally {
            this.loading.set(false);
        }
    }

    async getTournamentById(id: number): Promise<Tournament | null> {
        this.loading.set(true);
        try {
            return await firstValueFrom<Tournament>(this.http.get<Tournament>(`${this.apiUrl}/tournaments/${id}`));
        } catch {
            return null;
        } finally {
            this.loading.set(false);
        }
    }

    async createTournament(data: CreateTournamentRequest): Promise<Tournament | null> {
        this.loading.set(true);
        try {
            const tournament = await firstValueFrom<Tournament>(this.http.post<Tournament>(`${this.apiUrl}/tournaments`, data));
            this.tournaments.update(list => [tournament, ...list]);
            return tournament;
        } catch {
            return null;
        } finally {
            this.loading.set(false);
        }
    }

    async updateTournament(id: number, data: any): Promise<Tournament | null> {
        this.loading.set(true);
        try {
            const tournament = await firstValueFrom<Tournament>(this.http.put<Tournament>(`${this.apiUrl}/tournaments/${id}`, data));
            this.tournaments.update(list => list.map(t => t.id === id ? tournament : t));
            return tournament;
        } catch {
            return null;
        } finally {
            this.loading.set(false);
        }
    }

    async deleteTournament(id: number): Promise<void> {
        this.loading.set(true);
        try {
            await firstValueFrom(this.http.delete(`${this.apiUrl}/tournaments/${id}`));
            this.tournaments.update(list => list.filter(t => t.id !== id));
        } finally {
            this.loading.set(false);
        }
    }

    async registerTeam(tournamentId: number, teamId: number): Promise<any> {
        this.loading.set(true);
        try {
            return await firstValueFrom(this.http.post(`${this.apiUrl}/tournaments/${tournamentId}/register`, { teamId }));
        } finally {
            this.loading.set(false);
        }
    }

    async getLeaderboard(tournamentId: number): Promise<any[]> {
        this.loading.set(true);
        try {
            return await firstValueFrom<any[]>(this.http.get<any[]>(`${this.apiUrl}/tournaments/${tournamentId}/leaderboard`));
        } catch {
            return [];
        } finally {
            this.loading.set(false);
        }
    }
>>>>>>> 7e5c85abc519916356228fa3a4364425cd5d1b25
}