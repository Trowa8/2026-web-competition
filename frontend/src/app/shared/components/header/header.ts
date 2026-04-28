import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class Header {
  private auth = inject(AuthService);
  private router = inject(Router);

  get user() { return this.auth.user; }
  get isAuthenticated() { return this.auth.isAuthenticated; }

  async logout() {
    await this.auth.logout();
    this.router.navigate(['/login']);
  }
}