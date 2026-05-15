import { Injectable, signal, computed, inject, WritableSignal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs";
import { environment } from "../../../environments/environment";

import {
    UserType,
    RegisterRequest,
    RegisterResponse,
    LoginRequest,
    LoginResponse,
    RefreshTokenRequest,
    RefreshTokenResponse,
    UpdateUserRequest,
    UpdateUserResponse,
    DeleteUserResponse,
} from "../types/auth.types";

@Injectable({ providedIn: "root" })
export class AuthService {
    private readonly http = inject(HttpClient);

    private readonly authState = signal<{
        userId: string | null;
        accessToken: string | null;
        refreshToken: string | null;
    }>({
        userId: null,
        accessToken: null,
        refreshToken: null,
    });

    public readonly user: WritableSignal<UserType | null> = signal(null);

    public readonly userId = computed(() => this.authState().userId);
    public readonly isAuthenticated = computed(() => !!this.authState().userId);
    public readonly accessToken = computed(() => this.authState().accessToken);

    constructor() {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");
        const userId = localStorage.getItem("userId");

        if (accessToken && refreshToken && userId) {
            this.authState.set({ userId, accessToken, refreshToken });
        }
    }

    private saveToStorage(accessToken: string, refreshToken: string, userId: string): void {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("userId", userId);
    }

    private clearStorage(): void {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userId");
    }

    public async init(): Promise<void> {
        if (this.userId()) {
            this.user.set(await this.getUserById(this.userId()!));
        }
    }

    public async register(body: RegisterRequest): Promise<RegisterResponse> {
        const res = await firstValueFrom(this.http.post<RegisterResponse>(`${environment.apiUrl}/auth/register`, body));
        this.authState.set({ userId: res.userId, accessToken: res.accessToken, refreshToken: res.refreshToken });
        this.saveToStorage(res.accessToken, res.refreshToken, res.userId);
        return res;
    }

    public async login(body: LoginRequest): Promise<LoginResponse> {
        const res = await firstValueFrom(this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`, body));
        this.authState.set({ userId: res.userId, accessToken: res.accessToken, refreshToken: res.refreshToken });
        this.saveToStorage(res.accessToken, res.refreshToken, res.userId);
        return res;
    }

    public async refreshToken(): Promise<RefreshTokenResponse | null> {
        const currentRefreshToken = this.authState().refreshToken;
        if (!currentRefreshToken) return null;

        try {
            const body: RefreshTokenRequest = { refreshToken: currentRefreshToken };
            const res = await firstValueFrom(
                this.http.post<RefreshTokenResponse>(`${environment.apiUrl}/auth/refresh`, body),
            );
            this.authState.update(s => ({ ...s, accessToken: res.accessToken, refreshToken: res.refreshToken }));
            localStorage.setItem("accessToken", res.accessToken);
            localStorage.setItem("refreshToken", res.refreshToken);
            return res;
        } catch {
            this.logout();
            return null;
        }
    }

    public async logout(): Promise<void> {
        this.authState.set({ userId: null, accessToken: null, refreshToken: null });
        this.clearStorage();
    }

    public async getCurrentUser(): Promise<UserType> {
        return await firstValueFrom(this.http.get<UserType>(`${environment.apiUrl}/user/me`));
    }

    public async getUserById(userId: string): Promise<UserType> {
        return await firstValueFrom(this.http.get<UserType>(`${environment.apiUrl}/user/${userId}`));
    }

    public async updateUser(userId: string, body: UpdateUserRequest): Promise<UpdateUserResponse> {
        return await firstValueFrom(this.http.put<UpdateUserResponse>(`${environment.apiUrl}/user/${userId}`, body));
    }

    public async deleteUser(userId: string): Promise<DeleteUserResponse> {
        const res = await firstValueFrom(this.http.delete<DeleteUserResponse>(`${environment.apiUrl}/user/${userId}`));
        if (this.authState().userId === userId) await this.logout();
        return res;
    }
}
