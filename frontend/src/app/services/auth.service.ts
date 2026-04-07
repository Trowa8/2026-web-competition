import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ApiService } from './api.service';
import { LoginRequestDto, LoginResponseDto } from '../shared/types/auth.types';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private tokenKey = 'access_token';

    constructor(private http: HttpClient, private api: ApiService) { }

    async login(data: LoginRequestDto): Promise<void> {
        const res = await firstValueFrom(
            this.http.post<LoginResponseDto>(
                this.api.getUrl('/auth/login'),
                data
            )
        );

        localStorage.setItem(this.tokenKey, res.access_token);
    }

    getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    logout() {
        localStorage.removeItem(this.tokenKey);
    }

    isAuthenticated(): boolean {
        return !!this.getToken();
    }
}