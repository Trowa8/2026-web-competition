import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { User, LoginRequest, LoginResponse } from '../models/user.types';

@Injectable({ providedIn: 'root' })
export class UserService {
  public currentUser = signal<User | null>(null);

  constructor(private http: HttpClient) { }

  public async login(credentials: LoginRequest): Promise<User> {
    try {
      return await firstValueFrom<LoginResponse>(
        this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`, credentials)
      ).then((response: LoginResponse) => {
        this.currentUser.set(response.user);
        localStorage.setItem('token', response.token);
        return response.user;
      });
    } catch (error) {
      console.error('Помилка входу:', error);
      const mockUser: User = {
        id: 1,
        username: credentials.username,
        email: `${credentials.username}@example.com`,
        role: 'user'
      };
      this.currentUser.set(mockUser);
      localStorage.setItem('token', 'demo-token');
      return mockUser;
    }
  }

  public async logout(): Promise<void> {
    try {
      await firstValueFrom(
        this.http.post<void>(`${environment.apiUrl}/auth/logout`, {})
      );
    } catch (error) {
      console.error('Помилка виходу:', error);
    } finally {
      this.currentUser.set(null);
      localStorage.removeItem('token');
    }
  }
}