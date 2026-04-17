import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { LoginRequest } from '../../shared/types/auth.types';
import { UiButton } from '../../shared/components/ui-button/ui-button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, UiButton],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  credentials: LoginRequest = { email: '', password: '' };
  errorMessage = '';
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  public async onSubmit(): Promise<void> {
    this.isLoading = true;
    this.errorMessage = '';

    try {
      await this.authService.login(this.credentials);
      this.router.navigate(['/tournaments']);
    } catch (error: any) {
      this.errorMessage = 'Помилка входу';
    } finally {
      this.isLoading = false;
    }
  }
}