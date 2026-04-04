import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public async login(credentials: LoginRequest): Promise<AuthResponse> {
    return await this.http.post<AuthResponse>('/api/auth/login', credentials)
      .toPromise()
      .then((response: AuthResponse | undefined) => {
        if (response) {
          localStorage.setItem('token', response.token);
          return response;
        }
        throw new Error('Login failed');
      });
  }

  public logout(): void {
    localStorage.removeItem('token');
  }

  public isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}