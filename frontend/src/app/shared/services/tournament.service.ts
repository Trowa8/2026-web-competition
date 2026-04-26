import { Injectable, signal, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
    Tournament,
    TournamentStatus,
    CreateTournamentRequest,
    CreateTournamentResponse,
    UpdateTournamentRequest,
    UpdateTournamentResponse,
    DeleteTournamentResponse,
    RegisterTeamRequest,
    RegisterTeamResponse,
    LeaderboardEntry,
} from '../types/tournament.types';

@Injectable({ providedIn: 'root' })
export class TournamentService {
    private readonly http = inject(HttpClient);
    private readonly API_URL = `${environment.apiUrl}/tournaments`;

    private readonly tournamentsState = signal<Tournament[]>([]);
    private readonly loadingState = signal(false);
    private readonly errorState = signal<string | null>(null);
    private readonly totalState = signal(0);

    public readonly tournaments = this.tournamentsState.asReadonly();
    public readonly isLoading = this.loadingState.asReadonly();
    public readonly error = this.errorState.asReadonly();
    public readonly total = this.totalState.asReadonly();

    public async getAllTournaments(): Promise<Tournament[]> {
        this.loadingState.set(true);
        this.errorState.set(null);
        try {
            const data = await firstValueFrom<Tournament[]>(this.http.get<Tournament[]>(this.API_URL));
            this.tournamentsState.set(data);
            this.totalState.set(data.length);
            return data;
        } catch (err) {
            this.errorState.set('Помилка завантаження турнірів');
            return [];
        } finally {
            this.loadingState.set(false);
        }
    }

    public async getTournamentById(id: number): Promise<Tournament | null> {
        this.loadingState.set(true);
        this.errorState.set(null);
        try {
            return await firstValueFrom<Tournament>(this.http.get<Tournament>(`${this.API_URL}/${id}`));
        } catch (err) {
            this.errorState.set('Помилка завантаження турніру');
            return null;
        } finally {
            this.loadingState.set(false);
        }
    }

    public async createTournament(data: CreateTournamentRequest): Promise<CreateTournamentResponse | null> {
        this.loadingState.set(true);
        this.errorState.set(null);
        try {
            const res = await firstValueFrom<CreateTournamentResponse>(this.http.post<CreateTournamentResponse>(this.API_URL, data));
            await this.getAllTournaments();
            return res;
        } catch (err) {
            this.errorState.set('Помилка створення турніру');
            return null;
        } finally {
            this.loadingState.set(false);
        }
    }

    public async updateTournament(id: number, data: UpdateTournamentRequest): Promise<UpdateTournamentResponse | null> {
        this.loadingState.set(true);
        this.errorState.set(null);
        try {
            const res = await firstValueFrom<UpdateTournamentResponse>(this.http.put<UpdateTournamentResponse>(`${this.API_URL}/${id}`, data));
            await this.getAllTournaments();
            return res;
        } catch (err) {
            this.errorState.set('Помилка оновлення турніру');
            return null;
        } finally {
            this.loadingState.set(false);
        }
    }

    public async deleteTournament(id: number): Promise<DeleteTournamentResponse | null> {
        this.loadingState.set(true);
        this.errorState.set(null);
        try {
            const res = await firstValueFrom<DeleteTournamentResponse>(this.http.delete<DeleteTournamentResponse>(`${this.API_URL}/${id}`));
            await this.getAllTournaments();
            return res;
        } catch (err) {
            this.errorState.set('Помилка видалення турніру');
            return null;
        } finally {
            this.loadingState.set(false);
        }
    }

    public async registerTeam(tournamentId: number, teamId: number): Promise<RegisterTeamResponse | null> {
        this.loadingState.set(true);
        this.errorState.set(null);
        const request: RegisterTeamRequest = { teamId };
        try {
            return await firstValueFrom<RegisterTeamResponse>(this.http.post<RegisterTeamResponse>(`${this.API_URL}/${tournamentId}/register`, request));
        } catch (err) {
            this.errorState.set('Помилка реєстрації команди');
            return null;
        } finally {
            this.loadingState.set(false);
        }
    }

    public async unregisterTeam(tournamentId: number, teamId: number): Promise<{ success: boolean } | null> {
        this.loadingState.set(true);
        this.errorState.set(null);
        try {
            return await firstValueFrom<{ success: boolean }>(this.http.delete<{ success: boolean }>(`${this.API_URL}/${tournamentId}/register`, { body: { teamId } }));
        } catch (err) {
            this.errorState.set('Помилка відписки команди');
            return null;
        } finally {
            this.loadingState.set(false);
        }
    }

    public async getLeaderboard(tournamentId: number): Promise<LeaderboardEntry[]> {
        this.loadingState.set(true);
        this.errorState.set(null);
        try {
            return await firstValueFrom<LeaderboardEntry[]>(this.http.get<LeaderboardEntry[]>(`${this.API_URL}/${tournamentId}/leaderboard`));
        } catch (err) {
            this.errorState.set('Помилка завантаження турнірної таблиці');
            return [];
        } finally {
            this.loadingState.set(false);
        }
    }

    public async updateTournamentStatus(id: number, status: TournamentStatus): Promise<UpdateTournamentResponse | null> {
        return this.updateTournament(id, { status });
    }

    public clearError(): void {
        this.errorState.set(null);
    }
}