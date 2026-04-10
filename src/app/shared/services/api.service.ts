import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    protected baseUrl = environment.apiUrl;

    constructor(protected http: HttpClient) { }

    protected async get<T>(endpoint: string): Promise<T> {
        return await firstValueFrom(this.http.get<T>(`${this.baseUrl}${endpoint}`));
    }

    protected async post<T>(endpoint: string, data: any): Promise<T> {
        return await firstValueFrom(this.http.post<T>(`${this.baseUrl}${endpoint}`, data));
    }

    protected async put<T>(endpoint: string, data: any): Promise<T> {
        return await firstValueFrom(this.http.put<T>(`${this.baseUrl}${endpoint}`, data));
    }

    protected async delete<T>(endpoint: string): Promise<T> {
        return await firstValueFrom(this.http.delete<T>(`${this.baseUrl}${endpoint}`));
    }
}