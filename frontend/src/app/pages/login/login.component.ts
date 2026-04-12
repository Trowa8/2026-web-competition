import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { LoginRequest } from '../../shared/types/auth.types';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
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