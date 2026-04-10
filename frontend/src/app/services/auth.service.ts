import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private tokenKey = 'token';

    async login(username: string, password: string): Promise<{ success: boolean, message?: string }> {
        if (username === 'admin' && password === '123') {
            localStorage.setItem('token', 'fake-jwt');
            return { success: true };
        }

        return {
            success: false,
            message: 'Невірний логін або пароль'
        };
    }

    async register(username: string, password: string): Promise<{ success: boolean, message: string }> {
        return {
            success: true,
            message: 'Registered successfully'
        };
    }

    logout() {
        localStorage.removeItem(this.tokenKey);
    }

    isLoggedIn(): boolean {
        return !!localStorage.getItem(this.tokenKey);
    }
}