import { Injectable } from '@angular/core';
import { LoginRequest, AuthResponse } from '../types/auth.types';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private tokenKey = 'auth_token';
    private userKey = 'user_data';

    public async login(credentials: LoginRequest): Promise<AuthResponse> {
        const response: AuthResponse = {
            token: 'fake-token-' + Date.now(),
            user: {
                id: 1,
                name: 'Користувач',
                email: credentials.email
            }
        };
        localStorage.setItem(this.tokenKey, response.token);
        localStorage.setItem(this.userKey, JSON.stringify(response.user));
        return response;
    }

    public logout(): void {
        localStorage.removeItem(this.tokenKey);
        localStorage.removeItem(this.userKey);
    }

    public getToken(): string | null {
        if (typeof localStorage !== 'undefined') {
            return localStorage.getItem(this.tokenKey);
        }
        return null;
    }

    public getUser(): any {
        if (typeof localStorage !== 'undefined') {
            const user = localStorage.getItem(this.userKey);
            return user ? JSON.parse(user) : { name: 'Гість', email: 'guest@example.com' };
        }
        return { name: 'Гість', email: 'guest@example.com' };
    }

    public isAuthenticated(): boolean {
        if (typeof localStorage !== 'undefined') {
            return !!this.getToken();
        }
        return false;
    }
}