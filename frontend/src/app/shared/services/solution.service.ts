import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SolutionService {
    private http = inject(HttpClient);
    private apiUrl = environment.apiUrl;

    async getByTask(taskId: number): Promise<any[]> {
        return await firstValueFrom<any[]>(this.http.get<any[]>(`${this.apiUrl}/tasks/${taskId}/submissions`));
    }

    async submit(taskId: number, data: any): Promise<any> {
        return await firstValueFrom<any>(this.http.post<any>(`${this.apiUrl}/tasks/${taskId}/submissions`, data));
    }

    async getMarks(submissionId: number): Promise<any[]> {
        return await firstValueFrom<any[]>(this.http.get<any[]>(`${this.apiUrl}/submissions/${submissionId}/marks`));
    }
}