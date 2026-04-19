import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user';
import { LoginRequest } from '../../models/user.types';

@Component({
    selector: 'app-login',
    standalone: true,
    template: `
        <div class="login-page">
            <div class="login-form">
                <h2>Вхід</h2>
                
                @if (error()) {
                    <div class="error">{{ error() }}</div>
                }
                
                <form (ngSubmit)="onSubmit()">
                    <input 
                        type="text" 
                        [value]="username()"
                        (input)="onUsernameInput($event)"
                        placeholder="Логін" 
                        required 
                    />
                    <input 
                        type="password" 
                        [value]="password()"
                        (input)="onPasswordInput($event)"
                        placeholder="Пароль" 
                        required 
                    />
                    <button type="submit" [disabled]="isLoading()">
                        {{ isLoading() ? 'Завантаження...' : 'Увійти' }}
                    </button>
                </form>
            </div>
        </div>
    `,
    styles: [`
        .login-page {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 80vh;
        }
        .login-form {
            width: 350px;
            padding: 30px;
            border: 1px solid #ddd;
            border-radius: 8px;
            background: white;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h2 {
            text-align: center;
            margin-bottom: 20px;
            color: #333;
        }
        input {
            width: 100%;
            padding: 10px;
            margin: 10px 0;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 16px;
        }
        button {
            width: 100%;
            padding: 10px;
            margin-top: 10px;
            background: #007bff;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
        }
        button:hover:not(:disabled) {
            background: #0056b3;
        }
        button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }
        .error {
            padding: 10px;
            margin-bottom: 15px;
            background: #f8d7da;
            color: #721c24;
            border-radius: 4px;
            text-align: center;
        }
    `]
})
export class LoginComponent {
    private userService = inject(UserService);
    private router = inject(Router);

    public username = signal<string>('');
    public password = signal<string>('');
    public isLoading = signal<boolean>(false);
    public error = signal<string>('');

    public onUsernameInput(event: Event): void {
        const input = event.target as HTMLInputElement;
        this.username.set(input.value);
    }

    public onPasswordInput(event: Event): void {
        const input = event.target as HTMLInputElement;
        this.password.set(input.value);
    }

    public async onSubmit(): Promise<void> {
        if (!this.username() || !this.password()) {
            this.error.set('Будь ласка, заповніть всі поля');
            return;
        }

        this.isLoading.set(true);
        this.error.set('');

        const credentials: LoginRequest = {
            username: this.username(),
            password: this.password()
        };

        try {
            await this.userService.login(credentials);
            this.router.navigate(['/tournaments']);
        } catch (error) {
            this.error.set('Невірний логін або пароль');
        } finally {
            this.isLoading.set(false);
        }
    }
}