import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

export type Task = {
    id?: number;
    title: string;
    description: string;
    deadline: string;
    tournamentId: number;
    status?: 'draft' | 'active' | 'closed';
};

@Injectable({ providedIn: 'root' })
export class TaskService {
    private apiUrl = environment.apiUrl;

    private tasksSignal = signal<Task[]>([]);
    public tasks = this.tasksSignal.asReadonly();

    constructor(private http: HttpClient) { }

    public async getTasks(tournamentId: number): Promise<Task[]> {
        try {
            const data = await firstValueFrom(
                this.http.get<Task[]>(`/api/tournaments/${tournamentId}/tasks`)
            );
            this.tasksSignal.set(data || []);
            return data || [];
        } catch (err) {
            console.error('Помилка завантаження завдань', err);
            return [];
        }
    }

    public async createTask(tournamentId: number, title: string, description: string, deadline: string) {
        try {
            await firstValueFrom(
                this.http.post(`/api/tournaments/${tournamentId}/tasks`, {
                    title,
                    description,
                    deadline
                })
            );
            await this.getTasks(tournamentId);
        } catch (err) {
            console.error('Помилка створення завдання', err);
            throw err;
        }
    }

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