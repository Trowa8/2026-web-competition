import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Team, CreateTeamRequest, UpdateTeamRequest } from '../types/team.types';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TeamService {
    constructor(private http: HttpClient) { }
    private apiUrl = 'api/teams';

    async getAll(): Promise<Team[]> {
        return await firstValueFrom<Team[]>(this.http.get<Team[]>(`${this.apiUrl}/teams`));
    }

    async getById(id: number): Promise<Team> {
        return await firstValueFrom<Team>(this.http.get<Team>(`${this.apiUrl}/teams/${id}`));
    }

    async create(data: CreateTeamRequest): Promise<any> {
        return await firstValueFrom<any>(this.http.post<any>(`${this.apiUrl}/teams`, data));
    }

    async update(id: number, data: UpdateTeamRequest): Promise<any> {
        return await firstValueFrom<any>(this.http.put<any>(`${this.apiUrl}/teams/${id}`, data));
    }

    async delete(id: number): Promise<void> {
        await firstValueFrom(this.http.delete(`${this.apiUrl}/teams/${id}`));
    }

    async addMember(teamId: number, userId: number): Promise<any> {
        return await firstValueFrom<any>(this.http.post<any>(`${this.apiUrl}/teams/${teamId}/members`, { userId }));
    }

    async removeMember(teamId: number, userId: number): Promise<any> {
        return await firstValueFrom<any>(this.http.delete<any>(`${this.apiUrl}/teams/${teamId}/members/${userId}`));
    }

    getMyTeam(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/my`);
    }
}