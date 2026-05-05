import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
    Solution,
    CreateSolutionDto,
    UpdateSolutionDto,
} from '../types/solution.types';

import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class SolutionService {
    private readonly http = inject(HttpClient);
    private readonly apiUrl = `${environment.apiUrl}/solutions`;

    getAll(): Observable<Solution[]> {
        return this.http.get<Solution[]>(this.apiUrl);
    }

    getById(id: string): Observable<Solution> {
        return this.http.get<Solution>(`${this.apiUrl}/${id}`);
    }

    getByTask(taskId: string): Observable<Solution[]> {
        return this.http.get<Solution[]>(
            `${this.apiUrl}/task/${taskId}`
        );
    }

    getByTeam(teamId: string): Observable<Solution[]> {
        return this.http.get<Solution[]>(
            `${this.apiUrl}/team/${teamId}`
        );
    }

    create(dto: CreateSolutionDto): Observable<Solution> {
        return this.http.post<Solution>(this.apiUrl, dto);
    }

    update(id: string, dto: UpdateSolutionDto): Observable<Solution> {
        return this.http.patch<Solution>(`${this.apiUrl}/${id}`, dto);
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}