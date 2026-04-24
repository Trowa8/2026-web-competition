import { Injectable, signal, computed } from '@angular/core';

export type User = { id: number; login: string; email: string; role: string; createdAt: string };
export type LoginRequest = { login: string; password: string };
export type LoginResponse = { user: User; token: string };

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly authState = signal<{ user: User | null; token: string | null }>({ user: null, token: null });
  public readonly user = computed(() => this.authState().user);
  public readonly isAuthenticated = computed(() => !!this.authState().token);

  constructor() {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    if (token && userStr) this.authState.set({ user: JSON.parse(userStr), token });
  }

  public async login(credentials: LoginRequest): Promise<User> {
    const mockUser: User = { id: 1, login: credentials.login, email: 'demo@test.com', role: 'user', createdAt: new Date().toISOString() };
    const mockToken = 'demo-token';
    this.authState.set({ user: mockUser, token: mockToken });
    localStorage.setItem('token', mockToken);
    localStorage.setItem('user', JSON.stringify(mockUser));
    return mockUser;
  }

  public async logout(): Promise<void> {
    this.authState.set({ user: null, token: null });
    localStorage.clear();
  }
}