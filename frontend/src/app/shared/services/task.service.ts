import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TaskService {
    private http = inject(HttpClient);
    private apiUrl = environment.apiUrl;

    async getByTournament(tournamentId: number): Promise<any[]> {
        return await firstValueFrom<any[]>(this.http.get<any[]>(`${this.apiUrl}/tournaments/${tournamentId}/tasks`));
    }

    async getById(tournamentId: number, taskId: number): Promise<any> {
        return await firstValueFrom<any>(this.http.get<any>(`${this.apiUrl}/tournaments/${tournamentId}/tasks/${taskId}`));
    }

    async create(tournamentId: number, data: any): Promise<any> {
        return await firstValueFrom<any>(this.http.post<any>(`${this.apiUrl}/tournaments/${tournamentId}/tasks`, data));
    }

    async update(tournamentId: number, taskId: number, data: any): Promise<any> {
        return await firstValueFrom<any>(this.http.put<any>(`${this.apiUrl}/tournaments/${tournamentId}/tasks/${taskId}`, data));
    }
}