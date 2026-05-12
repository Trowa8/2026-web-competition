import { Component, computed, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UiInputComponent } from '../../shared/ui-input/ui-input';
import { UiButton } from '../../shared/ui-button/ui-button';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, UiInputComponent, UiButton],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  form: FormGroup;

  private touchedAt = signal(0);

  constructor(
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?!.*\s)(?=.*[\p{L}])(?=.*\d)(?=.*[!@#$%^&*]).*$/u)]],
    });
  }

  protected emailError = computed(() => {
    this.touchedAt();
    const emailControl = this.form.get('email');
    if (!emailControl?.touched || !emailControl.errors) return '';
    if (emailControl.errors['required']) return 'Email обов\'язковий';
    if (emailControl.errors['email']) return 'Некоректний формат email';
    return '';
  });

  protected passwordError = computed(() => {
    this.touchedAt();
    const passwordControl = this.form.get('password');
    const currentValue = passwordControl?.value || '';
    if (!passwordControl?.touched || !passwordControl.errors) return '';
    if (passwordControl.errors['required']) return 'Пароль обов\'язковий';
    if (passwordControl.errors['minlength']) return 'Мінімум 6 символів';
    if (passwordControl.errors['pattern']) {
      if (/\s/.test(currentValue)) return 'Пароль не має містити пробілів';
      if (!/\p{L}/u.test(currentValue)) return 'Додайте хоча б одну літеру';
      if (!/[0-9]/.test(currentValue)) return 'Додайте хоча б одну цифру';
      if (!/[!@#$%^&*]/.test(currentValue)) return 'Додайте спецсимвол';
    }
    return '';
  });

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.touchedAt.set(Date.now());
      return;
    }
  }
}
