import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterLink],
    template: `
    <header>
      <a routerLink="/">🏆 AuthApp</a>
      <nav>
        @if (auth.isAuthenticated()) {
          <span>{{ auth.user()?.login }}</span>
          <button (click)="auth.logout()">Вийти</button>
        } @else {
          <a routerLink="/login">Вхід</a>
        }
      </nav>
    </header>
  `,
    styles: [`
    header { display: flex; justify-content: space-between; padding: 16px; background: #1a1a2e; color: white; }
    nav { display: flex; gap: 16px; align-items: center; }
    a, button { color: white; text-decoration: none; background: rgba(255,255,255,0.2); padding: 8px 16px; border-radius: 8px; cursor: pointer; border: none; }
  `]
})
export class Header {
    public auth = inject(AuthService);
}