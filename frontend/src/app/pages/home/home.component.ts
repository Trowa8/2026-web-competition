import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    standalone: true,
    template: `
    <div class="card">
      <h1>Ласкаво просимо 👋</h1>
      <p>Це сучасна система управління турнірами</p>

      <button (click)="go()">Перейти до команд</button>
    </div>
  `,
    styles: [`
    .card {
      text-align: center;
      margin-top: 100px;
    }

    button {
      margin-top: 20px;
      padding: 12px 25px;
      background: #1976d2;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
    }

    button:hover {
      background: #1565c0;
    }
  `]
})
export class HomeComponent {
    constructor(private router: Router) { }

    go() {
        this.router.navigate(['/teams']);
    }
}