import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
    Task,
    CreateTaskDto,
    UpdateTaskDto,
} from '../types/task.types';

import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class TaskService {
    private readonly http = inject(HttpClient);
    private readonly apiUrl = `${environment.apiUrl}/tasks`;

    getAll(): Observable<Task[]> {
        return this.http.get<Task[]>(this.apiUrl);
    }

    getById(id: string): Observable<Task> {
        return this.http.get<Task>(`${this.apiUrl}/${id}`);
    }

    getByTournament(tournamentId: string): Observable<Task[]> {
        return this.http.get<Task[]>(
            `${this.apiUrl}/tournament/${tournamentId}`
        );
    }

    create(dto: CreateTaskDto): Observable<Task> {
        return this.http.post<Task>(this.apiUrl, dto);
    }

    update(id: string, dto: UpdateTaskDto): Observable<Task> {
        return this.http.patch<Task>(`${this.apiUrl}/${id}`, dto);
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}