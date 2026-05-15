import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  private authService = inject(AuthService);
  loginData = { login: '', password: '' };
  isLoading = signal(false);
  errorMessage = signal('');

  onLogin() {
    this.isLoading.set(true);
    this.authService.login(this.loginData)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: () => console.log('Logged in'),
        error: (err) => console.error(err)
      });
  }
}