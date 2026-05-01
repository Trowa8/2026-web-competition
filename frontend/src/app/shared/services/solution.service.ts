import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SolutionService {
    private http = inject(HttpClient);
    private apiUrl = environment.apiUrl;

    public submissions = signal<any[]>([]);
    private loading = signal(false);

    public readonly isLoading = this.loading.asReadonly();

    async getSubmissionsByTask(taskId: number): Promise<any[]> {
        this.loading.set(true);
        try {
            const data = await firstValueFrom<any[]>(this.http.get<any[]>(`${this.apiUrl}/tasks/${taskId}/submissions`));
            this.submissions.set(data);
            return data;
        } catch {
            return [];
        } finally {
            this.loading.set(false);
        }
    }

    async submitSolution(taskId: number, data: any): Promise<any> {
        this.loading.set(true);
        try {
            const submission = await firstValueFrom<any>(this.http.post<any>(`${this.apiUrl}/tasks/${taskId}/submissions`, data));
            this.submissions.update(list => [...list, submission]);
            return submission;
        } catch {
            return null;
        } finally {
            this.loading.set(false);
        }
    }

    async getMarksBySubmission(submissionId: number): Promise<any[]> {
        this.loading.set(true);
        try {
            return await firstValueFrom<any[]>(this.http.get<any[]>(`${this.apiUrl}/submissions/${submissionId}/marks`));
        } catch {
            return [];
        } finally {
            this.loading.set(false);
        }
    }
}