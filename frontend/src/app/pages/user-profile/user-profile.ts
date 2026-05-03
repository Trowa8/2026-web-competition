import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UiInputComponent } from '../../shared/ui-input/ui-input';
import { UiButton } from '../../shared/ui-button/ui-button';

interface FieldState {
  value: string;
  touched: boolean;
}

interface TournamentHistory {
  id: number;
  name: string;
  date: string;
  result: string;
  status: 'перемога' | 'поразка';
}

interface TeamMember {
  id: number;
  name: string;
}

const PHONE_PATTERN = /^\+?\d{10,15}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateUsername(v: string): string {
  if (!v) return 'Нікнейм обов\'язковий';
  if (v.length < 3) return 'Мінімум 3 символи';
  return '';
}

function validateEmail(v: string): string {
  if (!v) return 'Email обов\'язковий';
  if (!EMAIL_PATTERN.test(v)) return 'Некоректний формат email';
  return '';
}

function validatePhone(v: string): string {
  if (!v) return 'Номер телефону обов\'язковий';
  if (!PHONE_PATTERN.test(v)) return 'Формат: +380XXXXXXXXX';
  return '';
}

function validateBio(v: string): string {
  if (v.length > 300) return 'Максимум 300 символів';
  return '';
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, UiInputComponent, UiButton],
  templateUrl: './user-profile.html',
  styleUrls: ['./user-profile.css'],
})
export class ProfileComponent {
  activeTab = signal<'info' | 'history'>('info');
  isEditing = signal(false);
  isLoading = signal(false);
  isSaved = signal(false);

  usernameField = signal<FieldState>({ value: '', touched: false });
  emailField = signal<FieldState>({ value: '', touched: false });
  phoneField = signal<FieldState>({ value: '', touched: false });
  bioField = signal<FieldState>({ value: '', touched: false });

  editUsername = signal('');
  editEmail = signal('');
  editPhone = signal('');
  editBio = signal('');

  editErrors = signal<{ username?: string; email?: string; phone?: string; bio?: string }>({});

  teamMembers = signal<TeamMember[]>([
    { id: 1, name: 'Олексій Ковальчук' },
    { id: 2, name: 'Марія Іванова' },
    { id: 3, name: 'Дмитро Петров' },
    { id: 4, name: 'Ірина Сидоренко' },
    { id: 5, name: 'Артем Мороз' },
  ]);

  tournamentHistory = signal<TournamentHistory[]>([
    { id: 1, name: 'Kyiv Open 2024', date: '15.11.2024', result: '1 місце', status: 'перемога' },
    { id: 2, name: 'UA Championship Q3', date: '02.09.2024', result: '4 місце', status: 'поразка' },
    { id: 3, name: 'Summer Cup 2024', date: '20.07.2024', result: '2 місце', status: 'поразка' },
    { id: 4, name: 'Dnipro Invitational', date: '10.05.2024', result: 'Чвертьфінал', status: 'поразка' },
    { id: 5, name: 'Spring Battle 2024', date: '22.03.2024', result: '1 місце', status: 'перемога' },
    { id: 6, name: 'Winter Series 2023', date: '18.12.2023', result: '3 місце', status: 'поразка' },
  ]);

  totalWins = computed(() => this.tournamentHistory().filter(t => t.status === 'перемога').length);
  totalTournaments = computed(() => this.tournamentHistory().length);

  usernameError = computed(() => {
    const { value, touched } = this.usernameField();
    return touched ? validateUsername(value) : '';
  });

  emailError = computed(() => {
    const { value, touched } = this.emailField();
    return touched ? validateEmail(value) : '';
  });

  phoneError = computed(() => {
    const { value, touched } = this.phoneField();
    return touched ? validatePhone(value) : '';
  });

  bioError = computed(() => {
    const { value, touched } = this.bioField();
    return touched ? validateBio(value) : '';
  });

  completedFields = computed<Record<string, boolean>>(() => ({
    username: !validateUsername(this.usernameField().value),
    email: !validateEmail(this.emailField().value),
    phone: !validatePhone(this.phoneField().value),
    bio: this.bioField().value.trim().length > 0,
  }));

  readonly allProfileItems = [
    { key: 'username', label: 'Нікнейм', weight: 25 },
    { key: 'email', label: 'Email', weight: 25 },
    { key: 'phone', label: 'Телефон', weight: 25 },
    { key: 'bio', label: 'Біографія', weight: 25 },
  ];

  profileCompletion = computed(() =>
    this.allProfileItems.reduce(
      (sum, item) => sum + (this.completedFields()[item.key] ? item.weight : 0),
      0
    )
  );

  readonly circumference = 2 * Math.PI * 36;

  dashOffset = computed(() =>
    this.circumference * (1 - this.profileCompletion() / 100)
  );

  progressColor = computed(() => {
    const p = this.profileCompletion();
    if (p < 40) return '#e57373';
    if (p < 70) return '#ffb74d';
    return '#5cb85c';
  });

  onUsernameChange(value: string): void {
    this.usernameField.set({ value, touched: true });
  }

  onEmailChange(value: string): void {
    this.emailField.set({ value, touched: true });
  }

  onPhoneChange(value: string): void {
    this.phoneField.set({ value, touched: true });
  }

  onBioChange(value: string): void {
    this.bioField.set({ value, touched: true });
  }

  startEdit(): void {
    this.editUsername.set(this.usernameField().value);
    this.editEmail.set(this.emailField().value);
    this.editPhone.set(this.phoneField().value);
    this.editBio.set(this.bioField().value);
    this.editErrors.set({});
    this.isEditing.set(true);
    this.isSaved.set(false);
  }

  cancelEdit(): void {
    this.isEditing.set(false);
    this.editErrors.set({});
  }

  onEditUsernameChange(value: string): void {
    this.editUsername.set(value);
    this.editErrors.update(e => ({ ...e, username: '' }));
  }

  onEditEmailChange(value: string): void {
    this.editEmail.set(value);
    this.editErrors.update(e => ({ ...e, email: '' }));
  }

  onEditPhoneChange(value: string): void {
    this.editPhone.set(value);
    this.editErrors.update(e => ({ ...e, phone: '' }));
  }

  onEditBioChange(value: string): void {
    this.editBio.set(value);
    this.editErrors.update(e => ({ ...e, bio: '' }));
  }

  async saveEdit(): Promise<void> {
    const errors: { username?: string; email?: string; phone?: string; bio?: string } = {};
    const user = validateUsername(this.editUsername());
    const email = validateEmail(this.editEmail());
    const phone = this.editPhone() && !PHONE_PATTERN.test(this.editPhone()) ? 'Формат: +380XXXXXXXXX' : '';
    const bio = validateBio(this.editBio());
    if (user) errors.username = user;
    if (email) errors.email = email;
    if (phone) errors.phone = phone;
    if (bio) errors.bio = bio;
    this.editErrors.set(errors);
    if (Object.keys(errors).length > 0) return;

    this.isLoading.set(true);
    this.usernameField.set({ value: this.editUsername(), touched: true });
    this.emailField.set({ value: this.editEmail(), touched: true });
    this.phoneField.set({ value: this.editPhone(), touched: !!this.editPhone() });
    this.bioField.set({ value: this.editBio(), touched: !!this.editBio() });
    this.isLoading.set(false);
    this.isEditing.set(false);
    this.isSaved.set(true);
    setTimeout(() => this.isSaved.set(false), 3000);
  }

  setTab(tab: 'info' | 'history'): void {
    this.activeTab.set(tab);
  }
}