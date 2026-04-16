import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { LoginRequest } from '../../shared/types/auth.types';
<<<<<<< HEAD
=======
import { MainLayoutComponent } from '../../layouts/main-layout/main-layout';
>>>>>>> upstream/main

@Component({
  selector: 'app-login',
  standalone: true,
<<<<<<< HEAD
  imports: [CommonModule, FormsModule, RouterModule],
=======
  imports: [CommonModule, FormsModule, RouterModule, MainLayoutComponent],
>>>>>>> upstream/main
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
<<<<<<< HEAD
      this.errorMessage = 'Помилка входу';
=======
      this.errorMessage = 'Помилка входу. Спробуйте ще раз.';
>>>>>>> upstream/main
    } finally {
      this.isLoading = false;
    }
  }
}