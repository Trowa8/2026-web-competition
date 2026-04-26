import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
    Team,
    CreateTeamRequest,
    CreateTeamResponse,
    UpdateTeamRequest,
    UpdateTeamResponse,
    DeleteTeamResponse,
    AddMemberRequest,
    AddMemberResponse,
    RemoveMemberResponse,
    GetTeamResponse,
} from '../types/team.types';

@Injectable({ providedIn: 'root' })
export class TeamService {
    private readonly http = inject(HttpClient);
    private readonly API_URL = `${environment.apiUrl}/teams`;

    private readonly teamsState = signal<Team[]>([]);
    private readonly currentTeamState = signal<Team | null>(null);
    private readonly loadingState = signal(false);
    private readonly errorState = signal<string | null>(null);

    public readonly teams = this.teamsState.asReadonly();
    public readonly currentTeam = this.currentTeamState.asReadonly();
    public readonly isLoading = this.loadingState.asReadonly();
    public readonly error = this.errorState.asReadonly();

    public async getAllTeams(): Promise<Team[]> {
        this.loadingState.set(true);
        this.errorState.set(null);
        try {
            const data = await firstValueFrom<Team[]>(this.http.get<Team[]>(this.API_URL));
            this.teamsState.set(data);
            return data;
        } catch (err) {
            this.errorState.set('Помилка завантаження команд');
            return [];
        } finally {
            this.loadingState.set(false);
        }
    }

    public async getTeamById(teamId: number): Promise<GetTeamResponse | null> {
        this.loadingState.set(true);
        this.errorState.set(null);
        try {
            const data = await firstValueFrom<GetTeamResponse>(this.http.get<GetTeamResponse>(`${this.API_URL}/${teamId}`));
            return data;
        } catch (err) {
            this.errorState.set('Помилка завантаження команди');
            return null;
        } finally {
            this.loadingState.set(false);
        }
    }

    public async createTeam(data: CreateTeamRequest): Promise<CreateTeamResponse | null> {
        this.loadingState.set(true);
        this.errorState.set(null);
        try {
            const res = await firstValueFrom<CreateTeamResponse>(this.http.post<CreateTeamResponse>(this.API_URL, data));
            await this.getAllTeams();
            return res;
        } catch (err) {
            this.errorState.set('Помилка створення команди');
            return null;
        } finally {
            this.loadingState.set(false);
        }
    }

    public async updateTeam(teamId: number, data: UpdateTeamRequest): Promise<UpdateTeamResponse | null> {
        this.loadingState.set(true);
        this.errorState.set(null);
        try {
            const res = await firstValueFrom<UpdateTeamResponse>(this.http.put<UpdateTeamResponse>(`${this.API_URL}/${teamId}`, data));
            await this.getAllTeams();
            return res;
        } catch (err) {
            this.errorState.set('Помилка оновлення команди');
            return null;
        } finally {
            this.loadingState.set(false);
        }
    }

    public async deleteTeam(teamId: number): Promise<DeleteTeamResponse | null> {
        this.loadingState.set(true);
        this.errorState.set(null);
        try {
            const res = await firstValueFrom<DeleteTeamResponse>(this.http.delete<DeleteTeamResponse>(`${this.API_URL}/${teamId}`));
            await this.getAllTeams();
            return res;
        } catch (err) {
            this.errorState.set('Помилка видалення команди');
            return null;
        } finally {
            this.loadingState.set(false);
        }
    }

    public async addMember(teamId: number, userId: number): Promise<AddMemberResponse | null> {
        this.loadingState.set(true);
        this.errorState.set(null);
        const request: AddMemberRequest = { userId };
        try {
            return await firstValueFrom<AddMemberResponse>(this.http.post<AddMemberResponse>(`${this.API_URL}/${teamId}/members`, request));
        } catch (err) {
            this.errorState.set('Помилка додавання учасника');
            return null;
        } finally {
            this.loadingState.set(false);
        }
    }

    public async removeMember(teamId: number, userId: number): Promise<RemoveMemberResponse | null> {
        this.loadingState.set(true);
        this.errorState.set(null);
        try {
            return await firstValueFrom<RemoveMemberResponse>(this.http.delete<RemoveMemberResponse>(`${this.API_URL}/${teamId}/members/${userId}`));
        } catch (err) {
            this.errorState.set('Помилка видалення учасника');
            return null;
        } finally {
            this.loadingState.set(false);
        }
    }

    public clearError(): void {
        this.errorState.set(null);
    }
}