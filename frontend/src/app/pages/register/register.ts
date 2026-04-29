import { Component } from '@angular/core';
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
  const confirm = group.get('confirmPassword')?.value;
  return password === confirm ? null : { passwordMismatch: true };
};

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, UiInputComponent, UiButton],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class RegisterComponent {
  form: FormGroup;
  isLoading = false;

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

  get usernameError(): string {
    const ctrl = this.form.get('username');
    if (!ctrl?.touched || !ctrl.errors) return '';
    if (ctrl.errors['required']) return 'Нікнейм обов\'язковий';
    if (ctrl.errors['minlength']) return 'Мінімум 3 символи';
    return '';
  }

  get emailError(): string {
    const ctrl = this.form.get('email');
    if (!ctrl?.touched || !ctrl.errors) return '';
    if (ctrl.errors['required']) return 'Email обов\'язковий';
    if (ctrl.errors['email']) return 'Некоректний формат email';
    return '';
  }

  get passwordError(): string {
    const ctrl = this.form.get('password');
    const val = ctrl?.value || '';
    if (!ctrl?.touched || !ctrl.errors) return '';
    if (ctrl.errors['required']) return 'Пароль обов\'язковий';
    if (ctrl.errors['minlength']) return 'Мінімум 6 символів';

    if (ctrl.errors['pattern']) {
      if (/\s/.test(val)) return 'Пароль не має містити пробілів';
      if (!/\p{L}/u.test(val)) return 'Дoдайте хоча б одну літеру';
      if (!/[0-9]/.test(val)) return 'Дoдайте хоча б одну цифру';
      if (!/[!@#$%^&*]/.test(val)) return 'Дoдайте спецсимвол';
    }
    return '';
  }

  get confirmPasswordError(): string {
    const ctrl = this.form.get('confirmPassword');
    if (!ctrl?.touched) return '';
    if (ctrl.errors?.['required']) return 'Підтвердіть пароль';
    if (this.form.errors?.['passwordMismatch']) return 'Паролі не збігаються';
    return '';
  }
  get phoneError(): string {
    const ctrl = this.form.get('phone');
    if (!ctrl?.touched || !ctrl.errors) return '';
    if (ctrl.errors['required']) return 'Номер телефону обов\'язковий';
    return '';
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    try {
      await new Promise(r => setTimeout(r, 1000));
      this.router.navigate(['/home']);
    } finally {
      this.isLoading = false;
    }
  }
}