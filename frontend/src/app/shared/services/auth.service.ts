import { Injectable } from '@angular/core';
import { LoginRequest, AuthResponse } from '../types/auth.types';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private tokenKey = 'auth_token';
<<<<<<< HEAD

    public async login(credentials: LoginRequest): Promise<AuthResponse> {
        console.log('Login:', credentials);

=======
    private userKey = 'user_data';

    public async login(credentials: LoginRequest): Promise<AuthResponse> {
>>>>>>> upstream/main
        const response: AuthResponse = {
            token: 'fake-token-' + Date.now(),
            user: {
                id: 1,
<<<<<<< HEAD
                name: 'Test User',
=======
                name: 'Користувач',
>>>>>>> upstream/main
                email: credentials.email
            }
        };
        localStorage.setItem(this.tokenKey, response.token);
<<<<<<< HEAD
=======
        localStorage.setItem(this.userKey, JSON.stringify(response.user));
>>>>>>> upstream/main
        return response;
    }

    public logout(): void {
        localStorage.removeItem(this.tokenKey);
<<<<<<< HEAD
    }

    public getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    public isAuthenticated(): boolean {
        return !!this.getToken();
=======
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
>>>>>>> upstream/main
    }
}