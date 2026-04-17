<<<<<<< Updated upstream
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class User {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }) {
    return this.http.post(`${this.apiUrl}/auth/login`, credentials);
  }

  getProfile() {
    return this.http.get(`${this.apiUrl}/users/me`);
  }
}
=======
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
    return await firstValueFrom<LoginResponse>(
      this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`, credentials)
    ).then((response: LoginResponse) => {
      this.currentUser.set(response.user);
      localStorage.setItem('token', response.token);
      return response.user;
    });
  }

  public async logout(): Promise<void> {
    return await firstValueFrom<void>(
      this.http.post<void>(`${environment.apiUrl}/auth/logout`, {})
    ).then(() => {
      this.currentUser.set(null);
      localStorage.removeItem('token');
    });
  }
}
>>>>>>> Stashed changes
