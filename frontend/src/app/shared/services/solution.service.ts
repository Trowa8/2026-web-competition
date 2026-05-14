import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
    SolutionListItemType,
    SolutionType,
    UploadFileResponse,
    CreateSolutionDto,
} from '../types/solution.types';

@Injectable({
    providedIn: 'root'
})
export class SolutionService {
    constructor(private http: HttpClient) { }

    getSolutions(): Observable<SolutionListItemType[]> {
        return this.http.get<SolutionListItemType[]>('/api/solutions');
    }

    submitSolution(data: CreateSolutionDto): Observable<SolutionType> {
        return this.http.post<SolutionType>('/api/solutions', data);
    }

    uploadFile(file: File): Observable<UploadFileResponse> {
        const formData = new FormData();
        formData.append('file', file);
        return this.http.post<UploadFileResponse>('/api/upload', formData);
    }
}