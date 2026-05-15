import { Injectable, signal, inject, computed } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, delay, tap } from 'rxjs';
import { LoginRequest, LoginResponse, User } from '../types/auth.types';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private router = inject(Router);

    currentUser = signal<User | null>(null);
    isAuthenticatedSignal = signal<boolean>(!!localStorage.getItem('token'));
    tokenSignal = signal<string | null>(localStorage.getItem('token'));

    userId = computed(() => this.currentUser()?.id);

    user = this.currentUser;
    isAuthenticated = computed(() => this.isAuthenticatedSignal());
    accessToken = computed(() => this.tokenSignal());

    login(credentials: LoginRequest): Observable<LoginResponse> {
        const mockResponse: LoginResponse = {
            accessToken: 'fake-jwt-token',
            refreshToken: 'fake-refresh-token',
            user: { id: 1, login: credentials.login, email: 'user@example.com', role: 'admin' }
        };

        return of(mockResponse).pipe(
            delay(1000),
            tap(res => {
                localStorage.setItem('token', res.accessToken);
                this.tokenSignal.set(res.accessToken);
                this.currentUser.set(res.user);
                this.isAuthenticatedSignal.set(true);
                this.router.navigate(['/tournaments']);
            })
        );
    }

    logout(): void {
        localStorage.removeItem('token');
        this.tokenSignal.set(null);
        this.currentUser.set(null);
        this.isAuthenticatedSignal.set(false);
        this.router.navigate(['/login']);
    }

    async getCurrentUser() {
        return this.currentUser();
    }

    async updateUser(id: string | number, data: any) {
        this.currentUser.update(prev => prev ? { ...prev, ...data } : null);

        return this.currentUser();
    }
}