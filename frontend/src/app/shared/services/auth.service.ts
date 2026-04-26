import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

type User = { id: number; login: string; email: string; role: string; createdAt: string };
type LoginResponse = { user: User; accessToken: string; refreshToken: string };

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private state = signal<{ user: User | null; accessToken: string | null }>({ user: null, accessToken: null });

  user = computed(() => this.state().user);
  isAuthenticated = computed(() => !!this.state().user);
  accessToken = computed(() => this.state().accessToken);

  constructor() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) this.state.set({ user: JSON.parse(user), accessToken: token });
  }

  async login(creds: { login: string; password: string }): Promise<User> {
    const res = await firstValueFrom<LoginResponse>(this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`, creds));
    this.state.set({ user: res.user, accessToken: res.accessToken });
    localStorage.setItem('token', res.accessToken);
    localStorage.setItem('user', JSON.stringify(res.user));
    return res.user;
  }

  async logout() {
    this.state.set({ user: null, accessToken: null });
    localStorage.clear();
  }
}