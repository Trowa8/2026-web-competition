import {
  Component,
  signal,
  computed,
  input,
  model,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type InputType    = 'text' | 'email' | 'password' | 'number' | 'search' | 'tel';
export type InputVariant = 'default' | 'filled' | 'ghost';
export type InputSize    = 'sm' | 'md' | 'lg';
export type InputStatus  = 'default' | 'success' | 'error' | 'warning';

@Component({
  selector: 'ui-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-input.html',
  styleUrls: ['./ui-input.css'],
})
export class UiInputComponent {

  readonly label= input<string>('');
  readonly placeholder = input<string>('');
  readonly type = input<InputType>('text');
  readonly variant = input<InputVariant>('default');
  readonly size        = input<InputSize>('md');
  readonly hint        = input<string>('');
  readonly error       = input<string>('');
  readonly required    = input<boolean>(false);
  readonly disabled    = input<boolean>(false);
  readonly icon        = input<string>('');
  readonly status      = model<InputStatus>('default');

  readonly value  = signal('');
  readonly isFocused = signal(false);
  readonly showPassword = signal(false);
  readonly inputId = `ui-input-${Math.random().toString(36).slice(2, 8)}`;
  readonly currentStatus = computed<InputStatus>(() =>this.error() ? 'error' : this.status());
  readonly hasPrefixIcon = computed(() =>!!this.icon() || this.type() === 'search');
  readonly hasSuffixIcon = computed(() =>this.type() === 'password' ||(this.currentStatus() !== 'default' && this.type() !== 'password'));

  readonly wrapperClasses = computed(() => [
    `variant--${this.variant()}`,
    `size--${this.size()}`,
    `status--${this.currentStatus()}`,
    this.isFocused()? 'is-focused'  : '',
    this.disabled()? 'is-disabled' : '',
    this.hasPrefixIcon() ? 'has-prefix'  : '',
    this.hasSuffixIcon() ? 'has-suffix'  : '',
  ].filter(Boolean).join(' '));

  readonly prefixIconClass = computed(() =>
    this.type() === 'search' ? 'fa-magnifying-glass' : this.icon()
  );

  readonly statusIconClass = computed(() => {
    const map: Record<InputStatus, string> = {
      default:'',
      success:'fa-circle-check',
      error:'fa-circle-exclamation',
      warning: 'fa-triangle-exclamation',
    };
    return map[this.currentStatus()];
  });

  onInput(event: Event): void {
    this.value.set((event.target as HTMLInputElement).value);
  }

  onFocus(): void{ this.isFocused.set(true); }
  onBlur(): void{ this.isFocused.set(false); }
  togglePassword(): void{ this.showPassword.update(v => !v); }
}