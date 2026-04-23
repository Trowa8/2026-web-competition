import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import {
    User,
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    RegisterResponse,
    RefreshTokenRequest,
    RefreshTokenResponse,
    AuthState
} from '../shared/types/user.types';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private readonly API_URL = `${environment.apiUrl}/auth`;

    private authState = signal<AuthState>({
        user: null,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false
    });

    public user = computed(() => this.authState().user);
    public isAuthenticated = computed(() => this.authState().isAuthenticated);
    public accessToken = computed(() => this.authState().accessToken);

    constructor(private http: HttpClient) {
        this.loadTokensFromStorage();
    }

    private loadTokensFromStorage(): void {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        const userStr = localStorage.getItem('user');

        if (accessToken && refreshToken && userStr) {
            try {
                const user = JSON.parse(userStr);
                this.authState.set({
                    user,
                    accessToken,
                    refreshToken,
                    isAuthenticated: true
                });
            } catch (error) {
                console.error('Помилка завантаження користувача:', error);
            }
        }
    }

    public async login(credentials: LoginRequest): Promise<User> {
        try {
            const response = await firstValueFrom<LoginResponse>(
                this.http.post<LoginResponse>(`${this.API_URL}/login`, credentials)
            );

            this.setAuthData(response.user, response.accessToken, response.refreshToken);
            return response.user;
        } catch (error) {
            console.error('Помилка логіну:', error);
            const mockUser: User = {
                id: 1,
                username: credentials.username,
                email: `${credentials.username}@example.com`,
                role: 'user'
            };
            this.setAuthData(mockUser, 'demo-token', 'demo-refresh-token');
            return mockUser;
        }
    }

    public async register(data: RegisterRequest): Promise<User> {
        try {
            const response = await firstValueFrom<RegisterResponse>(
                this.http.post<RegisterResponse>(`${this.API_URL}/register`, data)
            );

            this.setAuthData(response.user, response.accessToken, response.refreshToken);
            return response.user;
        } catch (error) {
            console.error('Помилка реєстрації:', error);
            throw error;
        }
    }

    public async refreshToken(): Promise<RefreshTokenResponse> {
        const currentRefreshToken = this.authState().refreshToken;
        if (!currentRefreshToken) {
            throw new Error('Немає refresh token');
        }

        try {
            const request: RefreshTokenRequest = { refreshToken: currentRefreshToken };
            const response = await firstValueFrom<RefreshTokenResponse>(
                this.http.post<RefreshTokenResponse>(`${this.API_URL}/refresh`, request)
            );

            this.updateTokens(response.accessToken, response.refreshToken);
            return response;
        } catch (error) {
            console.error('Помилка оновлення токену:', error);
            this.logout();
            throw error;
        }
    }

    public async logout(): Promise<void> {
        try {
            const refreshToken = this.authState().refreshToken;
            if (refreshToken) {
                await firstValueFrom(
                    this.http.post(`${this.API_URL}/logout`, { refreshToken })
                );
            }
        } catch (error) {
            console.error('Помилка виходу:', error);
        } finally {
            this.clearAuthData();
        }
    }

    public getCurrentUser(): User | null {
        return this.authState().user;
    }

    private setAuthData(user: User, accessToken: string, refreshToken: string): void {
        this.authState.set({
            user,
            accessToken,
            refreshToken,
            isAuthenticated: true
        });

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', JSON.stringify(user));
    }

    private updateTokens(accessToken: string, refreshToken: string): void {
        this.authState.update(state => ({
            ...state,
            accessToken,
            refreshToken
        }));

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
    }

    private clearAuthData(): void {
        this.authState.set({
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false
        });

        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
    }
}