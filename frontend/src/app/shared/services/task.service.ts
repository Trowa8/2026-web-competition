import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { TaskType, CreateTaskDto } from '../types/task.types';

@Injectable({ providedIn: 'root' })
export class TaskService {
    tasks = signal<TaskType[]>([]);
    selectedTask = signal<TaskType | null>(null);

    constructor(private http: HttpClient) { }

    createTask(dto: CreateTaskDto): Observable<TaskType> {
        return this.http.post<TaskType>('/api/tasks', dto).pipe(
            tap(newTask => {
                this.tasks.update(all => [...all, newTask]);
            })
        );
    }

    getTaskById(id: string): Observable<TaskType> {
        return this.http.get<TaskType>(`/api/tasks/${id}`).pipe(
            tap(task => this.selectedTask.set(task))
        );
    }
}