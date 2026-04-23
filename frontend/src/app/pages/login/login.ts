import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../shared/types/user.types';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);

  public username: string = '';
  public password: string = '';
  public isLoading: boolean = false;
  public error: string = '';

  public async onSubmit(): Promise<void> {
    console.log('Form submitted', { username: this.username, password: this.password });

    if (!this.username || !this.password) {
      this.error = 'Будь ласка, заповніть всі поля';
      return;
    }

    this.isLoading = true;
    this.error = '';

    const credentials: LoginRequest = {
      username: this.username,
      password: this.password
    };

    try {
      console.log('Calling login...');
      await this.authService.login(credentials);
      console.log('Login success, navigating...');
      await this.router.navigate(['/tournaments']);
    } catch (error) {
      console.error('Login error:', error);
      this.error = 'Помилка входу. Спробуйте ще раз.';
    } finally {
      this.isLoading = false;
    }
  }
}