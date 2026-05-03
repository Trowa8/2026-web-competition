import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export type Evaluation = {
    id?: number;
    submissionId: number;
    juryId: number;
    score: number;
    comment?: string;
    criteriaScores?: {
        technical: number;
        functionality: number;
        design: number;
        presentation: number;
    };
    createdAt?: string;
}

@Injectable({ providedIn: 'root' })
export class EvaluationService {

    private evaluationsSignal = signal<Evaluation[]>([]);
    public evaluations = this.evaluationsSignal.asReadonly();

    public isLoading = signal(false);

    constructor(private http: HttpClient) { }

    public async getEvaluations(submissionId: number): Promise<Evaluation[]> {
        this.isLoading.set(true);
        try {
            const data = await firstValueFrom(
                this.http.get<Evaluation[]>(`/api/submissions/${submissionId}/evaluations`)
            );
            this.evaluationsSignal.set(data || []);
            return data || [];
        } catch (err) {
            console.error('Помилка завантаження оцінок', err);
            this.evaluationsSignal.set([]);
            return [];
        } finally {
            this.isLoading.set(false);
        }
    }

    public async submitEvaluation(evaluation: Omit<Evaluation, 'id' | 'createdAt'>): Promise<any> {
        try {
            const res = await firstValueFrom(
                this.http.post('/api/evaluations', evaluation)
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