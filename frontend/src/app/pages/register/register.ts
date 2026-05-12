import { Component, computed, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UiInputComponent } from '../../shared/ui-input/ui-input';
import { UiButton } from '../../shared/ui-button/ui-button';

const passwordMatchValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  const password = group.get('password')?.value;
  const confirmPassword = group.get('confirmPassword')?.value;
  return password === confirmPassword ? null : { passwordMismatch: true };
};

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, UiInputComponent, UiButton],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class RegisterComponent {
  form: FormGroup;

  private touchedAt = signal(0);

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.form = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?!.*\s)(?=.*[\p{L}])(?=.*\d)(?=.*[!@#$%^&*]).*$/u)]],
        confirmPassword: ['', Validators.required],
        phone: ['', [Validators.required, Validators.pattern(/^\+?\d{10,15}$/)]],
      },
      { validators: passwordMatchValidator },
    );
  }

  protected usernameError = computed(() => {
    this.touchedAt();
    const usernameControl = this.form.get('username');
    if (!usernameControl?.touched || !usernameControl.errors) return '';
    if (usernameControl.errors['required']) return 'Нікнейм обов\'язковий';
    if (usernameControl.errors['minlength']) return 'Мінімум 3 символи';
    return '';
  });

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

  protected confirmPasswordError = computed(() => {
    this.touchedAt();
    const confirmPasswordControl = this.form.get('confirmPassword');
    if (!confirmPasswordControl?.touched) return '';
    if (confirmPasswordControl.errors?.['required']) return 'Підтвердіть пароль';
    if (this.form.errors?.['passwordMismatch']) return 'Паролі не збігаються';
    return '';
  });

  protected phoneError = computed(() => {
    this.touchedAt();
    const phoneControl = this.form.get('phone');
    if (!phoneControl?.touched || !phoneControl.errors) return '';
    if (phoneControl.errors['required']) return 'Номер телефону обов\'язковий';
    if (phoneControl.errors['pattern']) return 'Некоректний формат номера телефону';
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