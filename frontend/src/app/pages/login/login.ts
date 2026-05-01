import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
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

  onLoginChange(value: string) {
    this.login.set(value);
  }

  onPasswordChange(value: string) {
    this.password.set(value);
  }
}