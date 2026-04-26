import {
  Component,
  Signal,
  WritableSignal,
  computed,
  input,
  model,
  signal,
  InputSignal,
  ModelSignal,
  ElementRef,
  viewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type InputType    = 'text' | 'email' | 'password' | 'number' | 'search' | 'tel';
export type InputVariant = 'default' | 'filled' | 'ghost';
export type InputSize    = 'sm' | 'md' | 'lg';
export type InputStatus  = 'default' | 'success' | 'error' | 'warning';

@Component({
  selector: 'ui-input',
  imports: [CommonModule],
  templateUrl: './ui-input.html',
  styleUrls: ['./ui-input.css'],
})
export class UiInputComponent {
  // Вхідні параметри
  public readonly label: InputSignal<string>         = input<string>('');
  public readonly placeholder: InputSignal<string>   = input<string>('');
  public readonly type: InputSignal<InputType>       = input<InputType>('text');
  public readonly variant: InputSignal<InputVariant> = input<InputVariant>('default');
  public readonly size: InputSignal<InputSize>       = input<InputSize>('md');
  public readonly hint: InputSignal<string>          = input<string>('');
  public readonly error: InputSignal<string>         = input<string>('');
  public readonly required: InputSignal<boolean>     = input<boolean>(false);
  public readonly disabled: InputSignal<boolean>     = input<boolean>(false);
  public readonly icon: InputSignal<string>          = input<string>('');

  // Двостороннє зв'язування
  public readonly status: ModelSignal<InputStatus> = model<InputStatus>('default');
  public readonly value: ModelSignal<string>       = model.required<string>();

  // Посилання на DOM-елемент інпута через #input у шаблоні
  protected readonly inputRef: Signal<ElementRef<HTMLInputElement>> =
    viewChild.required<ElementRef<HTMLInputElement>>('input');

  // Локальні змінні
  protected readonly isFocused: WritableSignal<boolean>    = signal(false);
  protected readonly showPassword: WritableSignal<boolean> = signal(false);
  protected readonly inputId: string = `ui-input-${Math.random().toString(36).slice(2, 8)}`;

  // Похідні значення
  protected readonly isErrorVisible: Signal<boolean> = computed(() =>
    this.error().length > 0
  );

  protected readonly currentStatus: Signal<InputStatus> = computed<InputStatus>(() =>
    this.isErrorVisible() ? 'error' : this.status()
  );

  protected readonly hasPrefixIcon: Signal<boolean> = computed(() =>
    !!this.icon() || this.type() === 'search'
  );

  protected readonly hasSuffixIcon: Signal<boolean> = computed(() =>
    this.type() === 'password' || this.currentStatus() !== 'default'
  );
  protected readonly wrapperClasses: Signal<string> = computed(() => [
    `variant-${this.variant()}`,
    `size-${this.size()}`,
    `status-${this.currentStatus()}`,
    this.isFocused()     ? 'is-focused'  : '',
    this.disabled()      ? 'is-disabled' : '',
    this.hasPrefixIcon() ? 'has-prefix'  : '',
    this.hasSuffixIcon() ? 'has-suffix'  : '',
  ].filter(Boolean).join(' '));

  protected readonly prefixIconClass: Signal<string> = computed(() =>
    this.type() === 'search' ? 'fa-magnifying-glass' : this.icon()
  );

  protected readonly statusIconClass: Signal<string> = computed(() => {
    const map: Record<InputStatus, string> = {
      default: '',
      success: 'fa-circle-check',
      error:   'fa-circle-exclamation',
      warning: 'fa-triangle-exclamation',
    };
    return map[this.currentStatus()];
  });

  public focusInput(): void {
    this.inputRef().nativeElement.focus();
  }

  public blurInput(): void {
    this.inputRef().nativeElement.blur();
  }

  // Обробка вводу з урахуванням типу
  protected handleInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let val = input.value;

    if (this.type() === 'number') {
      val = val
      .replace(/[^0-9.]/g, '')
      .replace(/^0+(?=\d)/, "") 

      const parts = val.split('.');
      if (parts.length > 2) val = `${parts[0]}.${parts.slice(1).join('')}`;
    }

    if (this.type() === 'tel') {
      val = val.replace(/[^0-9]/g, '').slice(0, 10);
    }

    if (input.value !== val) {
      input.value = val;
    }

    this.value.set(val);
  }

  protected onFocus(): void { this.isFocused.set(true); }
  protected onBlur(): void  { this.isFocused.set(false); }
  protected togglePassword(): void { this.showPassword.update(v => !v); }
}