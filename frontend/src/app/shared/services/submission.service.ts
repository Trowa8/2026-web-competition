import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export type Submission = {
    id?: number;
    taskId: number;
    teamId?: number;
    githubLink: string;
    demoLink?: string;
    videoLink?: string;
    description?: string;
    submittedAt?: string;
};

@Injectable({ providedIn: 'root' })
export class SubmissionService {

    constructor(private http: HttpClient) { }

    /** Подати рішення */
    public async submit(data: Omit<Submission, 'id' | 'submittedAt'>) {
        return await firstValueFrom(
            this.http.post<Submission>('/api/submissions', data)
        )
            .then(res => {
                console.log('Рішення подано', res);
                return res;
            })
            .catch(err => {
                console.error('Помилка подачі рішення', err);
                throw err;
            });
    }
}