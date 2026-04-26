import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
    selector: "app-login",
    standalone: true,
    imports: [FormsModule, CommonModule],
    template: `
        <div class="login-container">
            <h2>Вхід до системи</h2>
            <form (ngSubmit)="onLogin()">
                <input type="text" [(ngModel)]="username" placeholder="Логін" required />
                <input type="password" [(ngModel)]="password" placeholder="Пароль" required />
                <button type="submit">Увійти</button>
            </form>
            <p *ngIf="message" class="error">{{ message }}</p>
        </div>
    `,
    styles: [
        `
            .login-container {
                max-width: 400px;
                margin: 80px auto;
                padding: 30px;
                border: 1px solid #ddd;
                border-radius: 12px;
                text-align: center;
            }
            input {
                width: 100%;
                padding: 12px;
                margin: 10px 0;
                border: 1px solid #ccc;
                border-radius: 6px;
            }
            button {
                width: 100%;
                padding: 12px;
                background: #007bff;
                color: white;
                border: none;
                border-radius: 6px;
                cursor: pointer;
            }
            .error {
                color: red;
                margin-top: 10px;
            }
        `,
    ],
})
export class LoginComponent {
    username = "";
    password = "";
    message = "";

    constructor(
        private auth: AuthService,
        private router: Router,
    ) {}

    onLogin() {
        if (this.auth.login(this.username, this.password)) {
            this.router.navigate(["/tournaments"]);
        } else {
            this.message = "Невірний логін або пароль. Спробуй admin / 123";
        }
    }
}
