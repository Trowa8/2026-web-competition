import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task, CreateTaskDto } from '../types/task.types';

@Injectable({
    providedIn: 'root',
})
export class TaskService {
    private http = inject(HttpClient);

    tasksSignal = signal<Task[]>([]);
    isLoading = signal(false);

    async getTasks(tournamentId: string): Promise<Task[]> {
        this.isLoading.set(true);

        try {
            const data = await this.http
                .get<Task[]>(`/api/tournaments/${tournamentId}/tasks`)
                .toPromise();

            this.tasksSignal.set(data || []);
            return data || [];
        } catch (e) {
            this.tasksSignal.set([]);
            return [];
        } finally {
            this.isLoading.set(false);
        }
    }

    async createTask(dto: CreateTaskDto): Promise<Task | null> {
        try {
            const created = await this.http
                .post<Task>(`/api/tasks`, dto)
                .toPromise();

            return created || null;
        } catch (e) {
            return null;
        }
    }
}