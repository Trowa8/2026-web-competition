import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../shared/services/auth';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login-form.html',
  styleUrls: ['./login-form.css'],
})
export class LoginForm {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly login = signal('');
  protected readonly password = signal('');
  protected readonly isLoading = signal(false);
  protected readonly error = signal('');

  public async onSubmit(): Promise<void> {
    if (!this.login() || !this.password()) {
      this.error.set('Заповніть всі поля');
      return;
    }

    this.isLoading.set(true);
    this.error.set('');

    try {
      await this.auth.login({ login: this.login(), password: this.password() });
      await this.router.navigate(['/tournaments']);
    } catch {
      this.error.set('Невірний логін або пароль');
    } finally {
      this.isLoading.set(false);
    }
  }
}