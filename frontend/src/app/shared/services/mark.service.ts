import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MarkType, CreateMarkRequest, UpdateMarkRequest } from '../types/mark.types';

@Injectable({ providedIn: 'root' })
export class MarkService {

    private readonly http = inject(HttpClient);

    public async createMark(solutionId: string, body: CreateMarkRequest): Promise<MarkType> {
        return await firstValueFrom(
            this.http.post<MarkType>(`${environment.apiUrl}/marks/${solutionId}`, body)
        );
    }

    public async getMarksBySolution(solutionId: string): Promise<MarkType[]> {
        return await firstValueFrom(
            this.http.get<MarkType[]>(`${environment.apiUrl}/marks/${solutionId}`)
        );
    }

    public async updateMark(solutionId: string, markId: string, body: UpdateMarkRequest): Promise<MarkType> {
        return await firstValueFrom(
            this.http.put<MarkType>(`${environment.apiUrl}/marks/${solutionId}/${markId}`, body)
        );
    }
}