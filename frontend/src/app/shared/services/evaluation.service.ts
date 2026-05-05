import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { EvaluationResponse } from '../../shared/types/evaluation.types';

@Injectable({ providedIn: 'root' })
export class EvaluationService {

    private evaluationsSignal = signal<EvaluationResponse[]>([]);
    public evaluations = this.evaluationsSignal.asReadonly();

    private isLoadingSignal = signal(false);
    public isLoading=this.isLoadingSignal.asReadonly();

    constructor(private http: HttpClient) { }

    public async getEvaluations(submissionId: number): Promise<EvaluationResponse[]> {
        this.isLoadingSignal.set(true);
        try {
            const data = await firstValueFrom(
                this.http.get<EvaluationResponse[]>(`/api/submissions/${submissionId}/evaluations`)
            );
            this.evaluationsSignal.set(data || []);
            return data || [];
        } catch (err) {
            console.error('Помилка завантаження оцінок', err);
            this.evaluationsSignal.set([]);
            return [];
        } finally {
            this.isLoadingSignal.set(false);
        }
    }

    public async submitEvaluation(evaluation: Omit<EvaluationResponse, 'id' | 'createdAt'>): Promise<EvaluationResponse> {
        try {
            const res = await firstValueFrom(
                this.http.post<EvaluationResponse>('/api/evaluations', evaluation)
            );
            return res;
        } catch (err) {
            console.error('Помилка подачі оцінки', err);
            throw err;
        }
    }

    public async getAverageScore(taskId: number): Promise<number> {
        try {
            const res = await firstValueFrom(
                this.http.get<{ average: number }>(`/api/tasks/${taskId}/average-score`)
            );
            return res.average || 0;
        } catch (err) {
            console.error('Помилка отримання середнього балу', err);
            return 0;
        }
    }
}