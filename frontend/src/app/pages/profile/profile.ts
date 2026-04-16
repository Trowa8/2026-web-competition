import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../shared/services/auth.service';
import { MainLayoutComponent } from '../../layouts/main-layout/main-layout';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, MainLayoutComponent],
  template: `
    <app-main-layout>
      <div class="profile-container">
        <div class="profile-card">
          <h2>👤 Мій профіль</h2>
          <div class="profile-info">
            <p><strong>Ім'я:</strong> {{ user?.name || 'Користувач' }}</p>
            <p><strong>Email:</strong> {{ user?.email || 'user@example.com' }}</p>
            <p><strong>Роль:</strong> {{ user?.role || 'Гравець' }}</p>
          </div>
        </div>
      </div>
    </app-main-layout>
  `,
  styles: [`
    .profile-container {
      max-width: 600px;
      margin: 2rem auto;
      padding: 1rem;
    }
    .profile-card {
      background: white;
      border-radius: 20px;
      padding: 2rem;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    }
    .profile-card h2 {
      color: #1a1a2e;
      margin-bottom: 1.5rem;
      text-align: center;
    }
    .profile-info p {
      margin-bottom: 1rem;
      padding: 0.5rem;
      border-bottom: 1px solid #eee;
    }
  `]
})
export class ProfileComponent implements OnInit {
  user: any = null;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.user = this.authService.getUser();
  }
}