import { Injectable } from '@angular/core';
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
};

@Injectable({ providedIn: 'root' })
export class EvaluationService {

    constructor(private http: HttpClient) { }

    public async submitEvaluation(data: Omit<Evaluation, 'id' | 'createdAt'>) {
        return await firstValueFrom(
            this.http.post<Evaluation>('/api/evaluations', data)
        )
            .catch(err => {
                console.error('Помилка збереження оцінки', err);
                throw err;
            });
    }
}