import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, LoginRequest } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-container">
      <div class="login-card">
        <h2>Авторизація</h2>
        <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
          <div class="form-group">
            <label>Електронна пошта</label>
            <input type="email" [(ngModel)]="credentials.email" name="email" required class="form-control" placeholder="example@mail.com">
          </div>
          <div class="form-group">
            <label>Пароль</label>
            <input type="password" [(ngModel)]="credentials.password" name="password" required class="form-control" placeholder="Введіть пароль">
          </div>
          <div class="error" *ngIf="errorMessage">{{ errorMessage }}</div>
          <button type="submit" [disabled]="loginForm.invalid || isLoading" class="btn-primary">
            {{ isLoading ? 'Завантаження...' : 'Увійти' }}
          </button>
        </form>
        <div class="register-link">
          <p>Немає акаунту? <a routerLink="/register">Зареєструватися</a></p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-container { display: flex; justify-content: center; align-items: center; min-height: 80vh; }
    .login-card { background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); width: 100%; max-width: 400px; }
    .form-group { margin-bottom: 1rem; }
    .form-group label { display: block; margin-bottom: 0.5rem; }
    .form-control { width: 100%; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px; }
    .btn-primary { width: 100%; padding: 0.75rem; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer; }
    .error { color: red; margin-bottom: 1rem; }
    .register-link { text-align: center; margin-top: 1rem; }
    .register-link a { color: #667eea; text-decoration: none; }
  `]
})
export class LoginComponent {
  credentials: LoginRequest = { email: '', password: '' };
  errorMessage = '';
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) {}

  public async onSubmit(): Promise<void> {
    this.isLoading = true;
    try {
      await this.authService.login(this.credentials);
      this.router.navigate(['/tournaments']);
    } catch (error: any) {
      this.errorMessage = 'Помилка входу. Перевірте email та пароль.';
    } finally {
      this.isLoading = false;
    }
  }
}