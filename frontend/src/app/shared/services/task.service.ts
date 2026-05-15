import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs";
import { environment } from "../../../environments/environment";
import { TaskType, CreateTaskRequest, UpdateTaskRequest, SuccessResponse } from "../types/task.types";

@Injectable({ providedIn: "root" })
export class TaskService {
    private readonly http = inject(HttpClient);

    public async createTask(tournamentId: string, body: CreateTaskRequest): Promise<TaskType> {
        return await firstValueFrom(this.http.post<TaskType>(`${environment.apiUrl}/tasks/${tournamentId}`, body));
    }
    public async getTasksByTournament(tournamentId: string): Promise<TaskType[]> {
        return await firstValueFrom(this.http.get<TaskType[]>(`${environment.apiUrl}/tasks/${tournamentId}`));
    }
    public async getTaskById(taskId: string): Promise<TaskType> {
        return await firstValueFrom(this.http.get<TaskType>(`${environment.apiUrl}/tasks/${taskId}`));
    }
    public async updateTask(taskId: string, body: UpdateTaskRequest): Promise<TaskType> {
        return await firstValueFrom(this.http.put<TaskType>(`${environment.apiUrl}/tasks/${taskId}`, body));
    }
    public async deleteTask(taskId: string): Promise<SuccessResponse> {
        return await firstValueFrom(this.http.delete<SuccessResponse>(`${environment.apiUrl}/tasks/${taskId}`));
    }
}
