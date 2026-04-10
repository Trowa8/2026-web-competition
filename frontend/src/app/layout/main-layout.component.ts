import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterModule],
  template: `
    <header>
      <h1>TournamentApp</h1>
      <nav>
        <a routerLink="/login">Вихід</a>
      </nav>
    </header>
    <main style="padding: 60px; text-align: center;">
      <h2>Ласкаво просимо!</h2>
      <p>Ви успішно увійшли в систему.</p>
    </main>
  `,
  styles: [` 
    header { 
      background: #222; 
      color: white; 
      padding: 1rem 2rem; 
      display: flex; 
      justify-content: space-between; 
    }
  `]
})
export class MainLayoutComponent { }