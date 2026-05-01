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
}