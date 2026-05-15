import { Injectable, signal, computed, inject, WritableSignal, Signal } from "@angular/core";
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

    public readonly user: WritableSignal<UserType | null> = signal(null);

    public readonly isAuthenticated: Signal<boolean> = computed(() => !!this.user());

    private saveToStorage(accessToken: string, refreshToken: string): void {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
    }

    private clearStorage(): void {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
    }

    public async init(): Promise<void> {
        // Mock user for testing purposes. Remove this in production.
        this.user.set({
            userId: "1",
            login: "login",
            email: "email@example.com",
            createdAt: "2023-01-01T00:00:00Z",
        });

        if (!this.isAuthenticated()) {
            this.user.set(await this.getCurrentUser());
        }
    }

    public async register(body: RegisterRequest): Promise<RegisterResponse> {
        const res: RegisterResponse = await firstValueFrom(
            this.http.post<RegisterResponse>(`${environment.apiUrl}/auth/register`, body),
        );

        this.user.set(res.userId ? await this.getUserById(res.userId) : null);

        this.saveToStorage(res.accessToken, res.refreshToken);

        return res;
    }

    public async login(body: LoginRequest): Promise<LoginResponse> {
        const res: LoginResponse = await firstValueFrom(
            this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`, body),
        );

        this.user.set(res.userId ? await this.getUserById(res.userId) : null);

        this.saveToStorage(res.accessToken, res.refreshToken);

        return res;
    }

    public async refreshToken(): Promise<RefreshTokenResponse | null> {
        const currentRefreshToken = localStorage.getItem("refreshToken");

        if (!currentRefreshToken) return null;

        try {
            const body: RefreshTokenRequest = { refreshToken: currentRefreshToken };

            const res = await firstValueFrom(
                this.http.post<RefreshTokenResponse>(`${environment.apiUrl}/auth/refresh`, body),
            );

            this.saveToStorage(res.accessToken, res.refreshToken);

            return res;
        } catch {
            this.logout();

            return null;
        }
    }

    public async logout(): Promise<void> {
        this.user.set(null);
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

        if (this.user() && this.user()!.userId === userId) {
            await this.logout();
        }

        return res;
    }
}
