import { Injectable } from '@angular/core';
import { LoginRequest, AuthResponse } from '../types/auth.types';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private tokenKey = 'auth_token';

    public async login(credentials: LoginRequest): Promise<AuthResponse> {
        console.log('Login:', credentials);

        return new Promise((resolve) => {
            setTimeout(() => {
                const response: AuthResponse = {
                    token: 'fake-jwt-token-' + Date.now(),
                    user: {
                        id: 1,
                        name: 'Test User',
                        email: credentials.email
                    }
                };
                localStorage.setItem(this.tokenKey, response.token);
                resolve(response);
            }, 500);
        });
    }

    public logout(): void {
        localStorage.removeItem(this.tokenKey);
    }

    public getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    public isAuthenticated(): boolean {
        return !!this.getToken();
    }
}