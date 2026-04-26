import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
    selector: "app-main-layout",
    standalone: true,
    imports: [RouterModule],
    template: `
        <header>
            <h1>TournamentApp</h1>
            <nav>
                <a routerLink="/tournaments">Турніри</a>
                <a routerLink="/teams">Команди</a>
                <a routerLink="/login">Вихід</a>
            </nav>
        </header>
        <main>
            <router-outlet></router-outlet>
        </main>
    `,
    styles: [
        `
            header {
                background: #222;
                color: white;
                padding: 1rem 2rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            nav a {
                color: white;
                margin-left: 1.5rem;
                text-decoration: none;
            }
            main {
                padding: 2rem;
            }
        `,
    ],
})
export class MainLayoutComponent {}
