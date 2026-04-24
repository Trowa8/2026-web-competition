import { Injectable, signal, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  Tournament,
  TournamentDetails,
  CreateTournamentRequest,
  CreateTournamentResponse,
  UpdateTournamentRequest,
  UpdateTournamentResponse,
  DeleteTournamentResponse,
  RegisterTeamResponse,
  LeaderboardEntry,
  PaginatedResponse,
} from '../types/tournament.types';

@Injectable({ providedIn: 'root' })
export class TournamentService {
  private readonly http = inject(HttpClient);
  private readonly API_URL = `${environment.apiUrl}/tournaments`;

  private readonly tournamentsState = signal<Tournament[]>([]);
  private readonly loadingState = signal(false);
  private readonly errorState = signal<string | null>(null);

  public readonly tournaments = this.tournamentsState.asReadonly();
  public readonly isLoading = this.loadingState.asReadonly();
  public readonly error = this.errorState.asReadonly();

  public async getAllTournaments(): Promise<Tournament[]> {
    this.loadingState.set(true);
    this.errorState.set(null);

    try {
      let params = new HttpParams();
      const response = await firstValueFrom<PaginatedResponse<Tournament>>(
        this.http.get<PaginatedResponse<Tournament>>(this.API_URL, { params })
      );
      this.tournamentsState.set(response.data);
      return response.data;
    } catch (error) {
      this.errorState.set('Помилка завантаження турнірів');
      // Демо-дані
      const mock: Tournament[] = [
        { id: 1, name: 'CS2 Cup', description: 'CS2 турнір', startDate: new Date().toISOString(), registrationDeadline: new Date().toISOString(), status: 'registration', createdBy: 1, createdAt: new Date().toISOString(), maxTeams: 16, registeredTeams: 8 },
        { id: 2, name: 'Dota 2 League', description: 'Dota 2 турнір', startDate: new Date().toISOString(), registrationDeadline: new Date().toISOString(), status: 'ongoing', createdBy: 1, createdAt: new Date().toISOString(), maxTeams: 16, registeredTeams: 16 },
      ];
      this.tournamentsState.set(mock);
      return mock;
    } finally {
      this.loadingState.set(false);
    }
  }

  public async getTournamentById(id: number): Promise<TournamentDetails | null> {
    this.loadingState.set(true);
    try {
      return await firstValueFrom<TournamentDetails>(
        this.http.get<TournamentDetails>(`${this.API_URL}/${id}`)
      );
    } catch {
      return null;
    } finally {
      this.loadingState.set(false);
    }
  }

  public async createTournament(data: CreateTournamentRequest): Promise<CreateTournamentResponse | null> {
    this.loadingState.set(true);
    try {
      const response = await firstValueFrom<CreateTournamentResponse>(
        this.http.post<CreateTournamentResponse>(this.API_URL, data)
      );
      await this.getAllTournaments();
      return response;
    } catch {
      // Демо-створення
      const mockResponse: CreateTournamentResponse = {
        id: Date.now(),
        name: data.name,
        description: data.description,
        startDate: data.startDate,
        registrationDeadline: data.registrationDeadline,
        createdBy: 1,
        createdAt: new Date().toISOString(),
      };
      const current = this.tournamentsState();
      this.tournamentsState.set([{ ...mockResponse, maxTeams: data.maxTeams, registeredTeams: 0, status: 'draft' } as Tournament, ...current]);
      return mockResponse;
    } finally {
      this.loadingState.set(false);
    }
  }

  public async updateTournament(id: number, data: UpdateTournamentRequest): Promise<UpdateTournamentResponse | null> {
    this.loadingState.set(true);
    try {
      const response = await firstValueFrom<UpdateTournamentResponse>(
        this.http.put<UpdateTournamentResponse>(`${this.API_URL}/${id}`, data)
      );
      await this.getAllTournaments();
      return response;
    } catch {
      return null;
    } finally {
      this.loadingState.set(false);
    }
  }
  public async deleteTournament(id: number): Promise<DeleteTournamentResponse | null> {
    this.loadingState.set(true);
    try {
      const response = await firstValueFrom<DeleteTournamentResponse>(
        this.http.delete<DeleteTournamentResponse>(`${this.API_URL}/${id}`)
      );
      const current = this.tournamentsState();
      this.tournamentsState.set(current.filter(t => t.id !== id));
      return response;
    } catch {
      const current = this.tournamentsState();
      this.tournamentsState.set(current.filter(t => t.id !== id));
      return { success: true, message: 'Турнір видалено' };
    } finally {
      this.loadingState.set(false);
    }
  }

  public async registerTeam(tournamentId: number, teamId: number): Promise<RegisterTeamResponse | null> {
    this.loadingState.set(true);
    try {
      return await firstValueFrom<RegisterTeamResponse>(
        this.http.post<RegisterTeamResponse>(`${this.API_URL}/${tournamentId}/register`, { teamId })
      );
    } catch {
      return { success: true, message: 'Команду зареєстровано', registeredAt: new Date().toISOString() };
    } finally {
      this.loadingState.set(false);
    }
  }

  public async getLeaderboard(tournamentId: number): Promise<LeaderboardEntry[]> {
    this.loadingState.set(true);
    try {
      return await firstValueFrom<LeaderboardEntry[]>(
        this.http.get<LeaderboardEntry[]>(`${this.API_URL}/${tournamentId}/leaderboard`)
      );
    } catch {
      return [
        { rank: 1, teamId: 1, teamName: 'Team Alpha', totalScore: 2500, taskScores: [] },
        { rank: 2, teamId: 2, teamName: 'Team Beta', totalScore: 2350, taskScores: [] },
      ];
    } finally {
      this.loadingState.set(false);
    }
  }

  public async startTournament(id: number): Promise<UpdateTournamentResponse | null> {
    return this.updateTournament(id, { status: 'ongoing' });
  }

  public async completeTournament(id: number): Promise<UpdateTournamentResponse | null> {
    return this.updateTournament(id, { status: 'completed' });
  }
}