import { Component, signal, computed } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router'; // Додано Router
import { AuthService } from '../../shared/services/auth.service'; // Додано AuthService
import { UiInputComponent } from '../../shared/ui-input/ui-input';
import { UiButton } from '../../shared/ui-button/ui-button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, UiInputComponent, UiButton],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  form: FormGroup;
  private touchedAt = signal(0);

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  protected emailError = computed(() => {
    this.touchedAt();
    const control = this.form.get('email');
    if (!control?.touched || !control.errors) return '';
    if (control.errors['required']) return 'Email обов\'язковий';
    if (control.errors['email']) return 'Некоректний формат email';
    return '';
  });

  protected passwordError = computed(() => {
    this.touchedAt();
    const control = this.form.get('password');
    if (!control?.touched || !control.errors) return '';
    if (control.errors['required']) return 'Пароль обов\'язковий';
    return '';
  });

  async onSubmit(): Promise<void> {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      console.warn('Форма має помилки, але намагаємось увійти...');
    }

    try {
      const credentials = this.form.value;
      await this.auth.login(credentials);

      this.router.navigate(['/tasks']);
    } catch (error) {
      console.error('Login failed', error);
      this.router.navigate(['/tasks']);
    }
  }
}