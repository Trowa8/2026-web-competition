import { Injectable, signal, computed } from '@angular/core';
import { User, LoginRequest, AuthState } from '../shared/types/user.types';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private authState = signal<AuthState>({
        user: null,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false
    });

    public user = computed(() => this.authState().user);
    public isAuthenticated = computed(() => this.authState().isAuthenticated);

    public async login(credentials: LoginRequest): Promise<User> {
        console.log('AuthService.login:', credentials);

        const mockUser: User = {
            id: 1,
            username: credentials.username,
            email: `${credentials.username}@example.com`,
            role: 'user'
        };

        this.authState.set({
            user: mockUser,
            accessToken: 'demo-token',
            refreshToken: 'demo-refresh-token',
            isAuthenticated: true
        });

        localStorage.setItem('user', JSON.stringify(mockUser));
        localStorage.setItem('accessToken', 'demo-token');
        localStorage.setItem('refreshToken', 'demo-refresh-token');

        console.log('Login successful');
        return mockUser;
    }

    public async logout(): Promise<void> {
        this.authState.set({
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false
        });

        localStorage.clear();
        console.log('Logout successful');
    }
}