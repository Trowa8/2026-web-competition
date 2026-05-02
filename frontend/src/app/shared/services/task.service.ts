import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface Task {
    id: number;
    title: string;
    description: string;
    deadline: string;
    tournamentId: number;
    status: 'draft' | 'active' | 'closed';
}

@Injectable({ providedIn: 'root' })
export class TaskService {

    private tasksSignal = signal<Task[]>([]);
    public tasks = this.tasksSignal.asReadonly();

    constructor(private http: HttpClient) { }

    public async getTasks(tournamentId: number): Promise<Task[]> {
        return await firstValueFrom(
            this.http.get<Task[]>(`/api/tournaments/${tournamentId}/tasks`)
        )
            .then(data => {
                this.tasksSignal.set(data);
                return data;
            })
            .catch(() => {
                const mock: Task[] = [
                    {
                        id: 1,
                        title: 'Розробка фронтенду',
                        description: 'Створити сторінку списку турнірів',
                        deadline: '2026-05-15',
                        tournamentId: 1,
                        status: 'active'
                    }
                ];
                this.tasksSignal.set(mock);
                return mock;
            });
    }

    public async createTask(tournamentId: number, title: string, description: string, deadline: string) {
        console.log('Створено завдання для турніру', tournamentId);
    }
}