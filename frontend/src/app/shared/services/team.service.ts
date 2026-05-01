import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Team } from '../types/team.types';

@Injectable({ providedIn: 'root' })
export class TeamService {
    private http = inject(HttpClient);
    private apiUrl = environment.apiUrl;

    public teams = signal<Team[]>([]);
    private loading = signal(false);

    public readonly isLoading = this.loading.asReadonly();

    async getAllTeams(): Promise<Team[]> {
        this.loading.set(true);
        try {
            const data = await firstValueFrom<Team[]>(this.http.get<Team[]>(`${this.apiUrl}/teams`));
            this.teams.set(data);
            return data;
        } catch {
            return [];
        } finally {
            this.loading.set(false);
        }
    }

    async getTeamById(id: number): Promise<Team | null> {
        this.loading.set(true);
        try {
            return await firstValueFrom<Team>(this.http.get<Team>(`${this.apiUrl}/teams/${id}`));
        } catch {
            return null;
        } finally {
            this.loading.set(false);
        }
    }

    async createTeam(data: { name: string; description: string }): Promise<any> {
        this.loading.set(true);
        try {
            const team = await firstValueFrom(this.http.post(`${this.apiUrl}/teams`, data));
            await this.getAllTeams();
            return team;
        } finally {
            this.loading.set(false);
        }
    }

    async updateTeam(id: number, data: { name?: string; description?: string }): Promise<any> {
        this.loading.set(true);
        try {
            const team = await firstValueFrom(this.http.put(`${this.apiUrl}/teams/${id}`, data));
            await this.getAllTeams();
            return team;
        } finally {
            this.loading.set(false);
        }
    }

    async deleteTeam(id: number): Promise<void> {
        this.loading.set(true);
        try {
            await firstValueFrom(this.http.delete(`${this.apiUrl}/teams/${id}`));
            await this.getAllTeams();
        } finally {
            this.loading.set(false);
        }
    }

    async addMember(teamId: number, userId: number): Promise<any> {
        this.loading.set(true);
        try {
            return await firstValueFrom(this.http.post(`${this.apiUrl}/teams/${teamId}/members`, { userId }));
        } finally {
            this.loading.set(false);
        }
    }

    async removeMember(teamId: number, userId: number): Promise<any> {
        this.loading.set(true);
        try {
            return await firstValueFrom(this.http.delete(`${this.apiUrl}/teams/${teamId}/members/${userId}`));
        } finally {
            this.loading.set(false);
        }
    }
}