import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="login-container">
      <div class="login-card">
        <h1>Ласкаво просимо!</h1>
        <p>Увійдіть у свій акаунт</p>
        @if (error()) { <div class="error">{{ error() }}</div> }
        <form (ngSubmit)="onSubmit()">
          <input type="text" [value]="login()" (input)="login.set($any($event.target).value)" placeholder="Логін" />
          <input type="password" [value]="password()" (input)="password.set($any($event.target).value)" placeholder="Пароль" />
          <button type="submit" [disabled]="isLoading()">{{ isLoading() ? 'Завантаження...' : 'Увійти' }}</button>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .login-container { display: flex; justify-content: center; align-items: center; min-height: 80vh; }
    .login-card { background: white; border-radius: 24px; padding: 40px; width: 400px; text-align: center; box-shadow: 0 20px 40px rgba(0,0,0,0.1); }
    input { width: 100%; padding: 12px; margin-bottom: 16px; border: 2px solid #e0e0e0; border-radius: 12px; }
    button { width: 100%; padding: 14px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 12px; cursor: pointer; }
    .error { padding: 12px; background: #fee; color: #c33; border-radius: 12px; margin-bottom: 20px; }
  `]
})
export class Login {
  private auth = inject(AuthService);
  private router = inject(Router);

  login = signal('');
  password = signal('');
  isLoading = signal(false);
  error = signal('');

  async onSubmit() {
    if (!this.login() || !this.password()) {
      this.error.set('Заповніть всі поля');
      return;
    }
    this.isLoading.set(true);
    this.error.set('');
    try {
      await this.auth.login({ login: this.login(), password: this.password() });
      this.router.navigate(['/tournaments']);
    } catch {
      this.error.set('Невірний логін або пароль');
    } finally {
      this.isLoading.set(false);
    }
  }
}