import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TaskService {
    private http = inject(HttpClient);
    private apiUrl = environment.apiUrl;

    public tasks = signal<any[]>([]);
    private loading = signal(false);

    public readonly isLoading = this.loading.asReadonly();

    async getTasksByTournament(tournamentId: number): Promise<any[]> {
        this.loading.set(true);
        try {
            const data = await firstValueFrom<any[]>(this.http.get<any[]>(`${this.apiUrl}/tournaments/${tournamentId}/tasks`));
            this.tasks.set(data);
            return data;
        } catch {
            return [];
        } finally {
            this.loading.set(false);
        }
    }

    async getTaskById(tournamentId: number, taskId: number): Promise<any | null> {
        this.loading.set(true);
        try {
            return await firstValueFrom<any>(this.http.get<any>(`${this.apiUrl}/tournaments/${tournamentId}/tasks/${taskId}`));
        } catch {
            return null;
        } finally {
            this.loading.set(false);
        }
    }

    async createTask(tournamentId: number, data: any): Promise<any | null> {
        this.loading.set(true);
        try {
            const task = await firstValueFrom<any>(this.http.post<any>(`${this.apiUrl}/tournaments/${tournamentId}/tasks`, data));
            this.tasks.update(list => [...list, task]);
            return task;
        } catch {
            return null;
        } finally {
            this.loading.set(false);
        }
    }

    async updateTask(tournamentId: number, taskId: number, data: any): Promise<any | null> {
        this.loading.set(true);
        try {
            const task = await firstValueFrom<any>(this.http.put<any>(`${this.apiUrl}/tournaments/${tournamentId}/tasks/${taskId}`, data));
            this.tasks.update(list => list.map(t => t.taskId === taskId ? task : t));
            return task;
        } catch {
            return null;
        } finally {
            this.loading.set(false);
        }
    }
}