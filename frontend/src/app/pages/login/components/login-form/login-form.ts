import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../shared/services/auth.service';
import { LoginRequest } from '../../../../shared/types/auth.types';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login-form.html',
  styleUrls: ['./login-form.css'],
})
export class LoginForm {
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
      const credentials: LoginRequest = {
        login: this.login(),
        password: this.password()
      };
      this.router.navigate(['/tournaments']);
    } catch {
      this.error.set('Невірний логін або пароль');
    } finally {
      this.isLoading.set(false);
    }
  }
}