import { Component } from '@angular/core';
import { 
  FormBuilder, 
  FormGroup, 
  ReactiveFormsModule, 
  Validators, 
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UiInputComponent } from '../../shared/ui-input/ui-input';
import { UiButton } from '../../shared/ui-button/ui-button';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, UiInputComponent, UiButton],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  styleUrls: ['./login.css'],
})
export class LoginComponent {
  form: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?!.*\s)(?=.*[\p{L}])(?=.*\d)(?=.*[!@#$%^&*]).*$/u)]],
    });
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
      if (!/\p{L}/u.test(val)) return 'Додайте хоча б одну літеру';
      if (!/[0-9]/.test(val)) return 'Додайте хоча б одну цифру';
      if (!/[!@#$%^&*]/.test(val)) return 'Додайте спецсимвол';
    }
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
