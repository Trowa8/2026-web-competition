import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
    User,
    RegisterRequest,
    RegisterResponse,
    LoginRequest,
    LoginResponse,
    RefreshTokenRequest,
    RefreshTokenResponse,
    UpdateUserRequest,
    UpdateUserResponse,
    DeleteUserResponse,
} from '../types/auth.types';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private readonly http = inject(HttpClient);
    private readonly API_URL = environment.apiUrl;

    private readonly authState = signal<{
        user: User | null;
        accessToken: string | null;
        refreshToken: string | null;
    }>({
        user: null,
        accessToken: null,
        refreshToken: null,
    });

    public readonly user = computed(() => this.authState().user);
    public readonly isAuthenticated = computed(() => !!this.authState().user);
    public readonly accessToken = computed(() => this.authState().accessToken);
    public readonly isAdmin = computed(() => this.authState().user?.role === 'admin');

    constructor() {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        const userStr = localStorage.getItem('user');
        if (accessToken && refreshToken && userStr) {
            try {
                const user = JSON.parse(userStr);
                this.authState.set({ user, accessToken, refreshToken });
            } catch {
                this.clearStorage();
            }
        }
    }

    private saveToStorage(accessToken: string, refreshToken: string, user: User): void {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', JSON.stringify(user));
    }

    private clearStorage(): void {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
    }

    private updateState(user: User, accessToken: string, refreshToken: string): void {
        this.authState.set({ user, accessToken, refreshToken });
        this.saveToStorage(accessToken, refreshToken, user);
    }

    public async register(data: RegisterRequest): Promise<User> {
        const res = await firstValueFrom<RegisterResponse>(
            this.http.post<RegisterResponse>(`${this.API_URL}/auth/register`, data)
        );
        this.updateState(res.user, res.accessToken, res.refreshToken);
        return res.user;
    }

    public async login(creds: LoginRequest): Promise<User> {
        const res = await firstValueFrom<LoginResponse>(
            this.http.post<LoginResponse>(`${this.API_URL}/auth/login`, creds)
        );
        this.updateState(res.user, res.accessToken, res.refreshToken);
        return res.user;
    }

    public async refreshToken(): Promise<RefreshTokenResponse | null> {
        const currentRefreshToken = this.authState().refreshToken;
        if (!currentRefreshToken) return null;

        try {
            const request: RefreshTokenRequest = { refreshToken: currentRefreshToken };
            const res = await firstValueFrom<RefreshTokenResponse>(
                this.http.post<RefreshTokenResponse>(`${this.API_URL}/auth/refresh`, request)
            );
            this.authState.update(s => ({ ...s, accessToken: res.accessToken, refreshToken: res.refreshToken }));
            localStorage.setItem('accessToken', res.accessToken);
            localStorage.setItem('refreshToken', res.refreshToken);
            return res;
        } catch {
            this.logout();
            return null;
        }
    }

    public async logout(): Promise<void> {
        this.authState.set({ user: null, accessToken: null, refreshToken: null });
        this.clearStorage();
    }

    public async getUserById(userId: number): Promise<User | null> {
        try {
            return await firstValueFrom<User>(this.http.get<User>(`${this.API_URL}/users/${userId}`));
        } catch {
            return null;
        }
    }

    public async getCurrentUser(): Promise<User | null> {
        try {
            const user = await firstValueFrom<User>(this.http.get<User>(`${this.API_URL}/users/me`));
            this.authState.update(s => ({ ...s, user }));
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        } catch {
            return null;
        }
    }

    public async updateUser(userId: number, data: UpdateUserRequest): Promise<UpdateUserResponse | null> {
        try {
            const res = await firstValueFrom<UpdateUserResponse>(
                this.http.put<UpdateUserResponse>(`${this.API_URL}/users/${userId}`, data)
            );
            const currentUser = this.authState().user;
            if (currentUser && currentUser.id === userId) {
                const updated = { ...currentUser, login: data.login || currentUser.login, email: data.email || currentUser.email };
                this.authState.update(s => ({ ...s, user: updated }));
                localStorage.setItem('user', JSON.stringify(updated));
            }
            return res;
        } catch {
            return null;
        }
    }

    public async deleteUser(userId: number): Promise<DeleteUserResponse | null> {
        try {
            const res = await firstValueFrom<DeleteUserResponse>(
                this.http.delete<DeleteUserResponse>(`${this.API_URL}/users/${userId}`)
            );
            if (this.authState().user?.id === userId) await this.logout();
            return res;
        } catch {
            return null;
        }
    }
}