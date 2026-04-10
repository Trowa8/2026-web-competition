import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {
  username = '';
  password = '';
  message = '';

  constructor(private auth: AuthService, private router: Router) { }

  async onLogin() {
    const result = await this.auth.login(this.username, this.password);
    if (result.success) {
      this.router.navigate(['/home']);
    } else {
      this.message = result.message || 'Невірний логін або пароль';
    }
  }
}