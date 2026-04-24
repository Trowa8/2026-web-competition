import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../shared/services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="login-page">
      <div class="login-card">
        <h1>Ласкаво просимо!</h1>
        <p>Увійдіть у свій акаунт</p>
        <form #loginForm="ngForm" (ngSubmit)="onSubmit()">
          <input type="text" [(ngModel)]="login" name="login" placeholder="Логін" required />
          <input type="password" [(ngModel)]="password" name="password" placeholder="Пароль" required />
          <button type="submit" [disabled]="isLoading">Увійти</button>
        </form>
        <p class="demo-hint">💡 Демо: будь-який логін/пароль</p>
      </div>
    </div>
  `,
  styles: [`
    .login-page { display: flex; justify-content: center; align-items: center; min-height: 80vh; }
    .login-card { background: white; border-radius: 24px; padding: 40px; width: 400px; box-shadow: 0 20px 40px rgba(0,0,0,0.1); }
    h1 { text-align: center; margin-bottom: 8px; }
    p { text-align: center; color: #666; margin-bottom: 24px; }
    input { width: 100%; padding: 12px; margin-bottom: 16px; border: 2px solid #e0e0e0; border-radius: 12px; }
    button { width: 100%; padding: 14px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 12px; cursor: pointer; }
    .demo-hint { text-align: center; color: #999; font-size: 12px; margin-top: 24px; }
  `]
})
export class Login {
  login = '';
  password = '';
  isLoading = false;
  constructor(private auth: AuthService) { }
  async onSubmit() {
    this.isLoading = true;
    await this.auth.login({ login: this.login, password: this.password });
    window.location.href = '/tournaments';
  }
}