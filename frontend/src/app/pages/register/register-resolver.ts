import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register-resolver.scss'
})
export class RegisterComponent {
  username = '';
  password = '';
  message = '';
  success = false;

  constructor(private auth: AuthService, private router: Router) { }

  async onRegister() {
    const result = await this.auth.register(this.username, this.password);

    this.message = result.message || '';
    this.success = result.success;

    if (result.success) {
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1500);
    }
  }
}