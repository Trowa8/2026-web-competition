import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Team } from '../types/team.types';

@Injectable({ providedIn: 'root' })
export class TeamService {
    private http = inject(HttpClient);
    private apiUrl = environment.apiUrl;

    async getAll(): Promise<Team[]> {
        return await firstValueFrom<Team[]>(this.http.get<Team[]>(`${this.apiUrl}/teams`));
    }

    async getById(id: number): Promise<Team> {
        return await firstValueFrom<Team>(this.http.get<Team>(`${this.apiUrl}/teams/${id}`));
    }

    async create(data: { name: string; description: string }): Promise<any> {
        return await firstValueFrom(this.http.post(`${this.apiUrl}/teams`, data));
    }

    async update(id: number, data: { name?: string; description?: string }): Promise<any> {
        return await firstValueFrom(this.http.put(`${this.apiUrl}/teams/${id}`, data));
    }

    async delete(id: number): Promise<void> {
        await firstValueFrom(this.http.delete(`${this.apiUrl}/teams/${id}`));
    }

    async addMember(teamId: number, userId: number): Promise<any> {
        return await firstValueFrom(this.http.post(`${this.apiUrl}/teams/${teamId}/members`, { userId }));
    }

    async removeMember(teamId: number, userId: number): Promise<any> {
        return await firstValueFrom(this.http.delete(`${this.apiUrl}/teams/${teamId}/members/${userId}`));
    }
}