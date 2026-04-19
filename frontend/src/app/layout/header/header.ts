import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { UserService } from '../../services/user';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterLink],
    template: `
        <header>
            <nav>
                <div class="logo">
                    <a routerLink="/">Турніри</a>
                </div>
                <div class="nav-links">
                    <a routerLink="/tournaments">Список турнірів</a>
                    
                    @if (userService.currentUser()) {
                        <button (click)="logout()">Вийти</button>
                    } @else {
                        <a routerLink="/login">Вхід</a>
                    }
                </div>
            </nav>
        </header>
    `,
    styles: [`
        header {
            background: #333;
            color: white;
            padding: 10px 20px;
        }
        nav {
            display: flex;
            justify-content: space-between;
            max-width: 1200px;
            margin: 0 auto;
        }
        .logo a {
            color: white;
            text-decoration: none;
            font-size: 20px;
        }
        .nav-links {
            display: flex;
            gap: 20px;
            align-items: center;
        }
        .nav-links a, .nav-links button {
            color: white;
            text-decoration: none;
            background: none;
            border: none;
            cursor: pointer;
        }
        .nav-links button:hover {
            text-decoration: underline;
        }
    `]
})
export class HeaderComponent {
    public userService = inject(UserService);
    private router = inject(Router);

    public async logout(): Promise<void> {
        await this.userService.logout();
        this.router.navigate(['/login']);
    }
}