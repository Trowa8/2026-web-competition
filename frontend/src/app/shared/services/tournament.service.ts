import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

import {
    TournamentType,
    TournamentListItemType,
    TournamentUpdatedType,
    LeaderboardEntryType,
    SuccessResponse,
    CreateTournamentRequest,
    UpdateTournamentRequest,
    RegisterTeamRequest,
} from '../types/tournament.types';

@Injectable({ providedIn: 'root' })
export class TournamentService {
    private readonly http = inject(HttpClient);

    private readonly tournamentsSignal = signal<TournamentListItemType[]>([]);
    private readonly isLoadingSignal = signal(false);
    private readonly errorSignal = signal<string | null>(null);

    public readonly tournaments = this.tournamentsSignal.asReadonly();
    public readonly isLoading = this.isLoadingSignal.asReadonly();
    public readonly error = this.errorSignal.asReadonly();

    public async getAllTournaments(): Promise<TournamentListItemType[]> {
        this.isLoadingSignal.set(true);
        this.errorSignal.set(null);
        try {
            const data = await firstValueFrom(
                this.http.get<TournamentListItemType[]>(`${environment.apiUrl}/tournaments`)
            );
            this.tournamentsSignal.set(data);
            return data;
        } catch {
            this.errorSignal.set('Помилка завантаження турнірів');
            return [];
        } finally {
            this.isLoadingSignal.set(false);
        }
    }

    public async getTournamentById(tournamentId: string): Promise<TournamentType> {
        return await firstValueFrom(
            this.http.get<TournamentType>(`${environment.apiUrl}/tournaments/${tournamentId}`)
        );
    }

    public async createTournament(body: CreateTournamentRequest): Promise<TournamentType> {
        return await  firstValueFrom(
            this.http.post<TournamentType>(`${environment.apiUrl}/tournaments`, body)
        );
    }

    public async updateTournament(tournamentId: string, body: UpdateTournamentRequest): Promise<TournamentUpdatedType> {
        return await firstValueFrom(
            this.http.put<TournamentUpdatedType>(`${environment.apiUrl}/tournaments/${tournamentId}`, body)
        );
    }

    public async deleteTournament(tournamentId: string): Promise<SuccessResponse> {
        return await firstValueFrom(
            this.http.delete<SuccessResponse>(`${environment.apiUrl}/tournaments/${tournamentId}`)
        );
    }

    public async registerTeam(tournamentId: string, body: RegisterTeamRequest): Promise<SuccessResponse> {
        return await firstValueFrom(
            this.http.post<SuccessResponse>(`${environment.apiUrl}/tournaments/${tournamentId}/register`, body)
        );
    }

    public async getTournamentLeaderboard(tournamentId: string): Promise<LeaderboardEntryType[]> {
        return await firstValueFrom(
            this.http.get<LeaderboardEntryType[]>(`${environment.apiUrl}/tournaments/${tournamentId}/leaderboard`)
        );
    }
}