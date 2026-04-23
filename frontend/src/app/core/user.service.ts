import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

type User = {
    id: number;
    username: string;
};

type LoginRequest = {
    username: string;
    password: string;
};

type AuthResponse = {
    accessToken: string;
    refreshToken: string;
    user: User;
};

@Injectable({ providedIn: 'root' })
export class UserService {
    private http = inject(HttpClient);

    user = signal<User | null>(null);

    accessToken = signal<string | null>(null);
    refreshToken = signal<string | null>(null);

    async login(data: LoginRequest): Promise<void> {
        const res = await firstValueFrom(
            this.http.post<AuthResponse>('http://localhost:3000/auth/login', data)
        ) as AuthResponse;

        this.setSession(res);
    }

    async register(data: LoginRequest): Promise<void> {
        const res = await firstValueFrom(
            this.http.post<AuthResponse>('http://localhost:3000/auth/register', data)
        );

        this.setSession(res);
    }

    async refresh(): Promise<void> {
        const refreshToken = this.refreshToken();

        if (!refreshToken) return;

        const res = await firstValueFrom(
            this.http.post<AuthResponse>('http://localhost:3000/auth/refresh', {
                refreshToken
            })
        );

        this.setSession(res);
    }

    logout() {
        this.user.set(null);
        this.accessToken.set(null);
        this.refreshToken.set(null);

        localStorage.clear();
    }

    private setSession(res: AuthResponse) {
        this.user.set(res.user);
        this.accessToken.set(res.accessToken);
        this.refreshToken.set(res.refreshToken);

        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
    }

    loadFromStorage() {
        const access = localStorage.getItem('accessToken');
        const refresh = localStorage.getItem('refreshToken');

        if (access) this.accessToken.set(access);
        if (refresh) this.refreshToken.set(refresh);
    }
}
