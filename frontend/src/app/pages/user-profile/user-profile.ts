import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UiInputComponent } from '../../shared/ui-input/ui-input';
import { UiButton } from '../../shared/ui-button/ui-button';
import { TournamentHistory, TeamMember } from '../../shared/types/profile.types';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule, UiInputComponent, UiButton],
  templateUrl: './user-profile.html',
  styleUrls: ['./user-profile.css'],
})
export class ProfileComponent {
  readonly userId = signal<number>(1); 

  isEditing = signal(false);
  isLoading = signal(false);
  isSaved = signal(false);

  username = signal('');
  email = signal('');

  editUsername = signal('');
  editEmail = signal('');

  editErrors = signal<{ username?: string; email?: string }>({});

  teamMembers = signal<TeamMember[]>([
    { id: 1, name: 'Олексій Ковальчук' },
    { id: 2, name: 'Марія Іванова' },
    { id: 3, name: 'Дмитро Петров' },
    { id: 4, name: 'Ірина Сидоренко' },
    { id: 5, name: 'Артем Мороз' },
  ]);

  tournamentHistory = signal<TournamentHistory[]>([
    { id: 1, name: 'Kyiv Open 2024', date: '15.11.2024', place: 1, result: '1 місце' },
    { id: 2, name: 'UA Championship Q3', date: '02.09.2024', place: 4, result: '4 місце' },
    { id: 3, name: 'Summer Cup 2024', date: '20.07.2024', place: 2, result: '2 місце' },
    { id: 4, name: 'Dnipro Invitational', date: '10.05.2024', place: null, result: 'Чвертьфінал' },
    { id: 5, name: 'Spring Battle 2024', date: '22.03.2024', place: 1, result: '1 місце' },
    { id: 6, name: 'Winter Series 2023', date: '18.12.2023', place: 3, result: '3 місце' },
  ]);

  totalWins = computed(() =>
    this.tournamentHistory().filter(t => t.place !== null && t.place <= 3).length
  );

  totalTournaments = computed(() => this.tournamentHistory().length);

  usernameError = computed(() => {
    const v = this.editUsername();
    if (!v) return 'Нікнейм обов\'язковий';
    if (v.length < 3) return 'Мінімум 3 символи';
    return '';
  });

  emailError = computed(() => {
    const v = this.editEmail();
    if (!v) return 'Email обов\'язковий';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Некоректний формат email';
    return '';
  });

  tournamentStatus(t: TournamentHistory): 'перемога' | 'поразка' {
    return t.place !== null && t.place <= 3 ? 'перемога' : 'поразка';
  }

  startEdit(): void {
    this.editUsername.set(this.username());
    this.editEmail.set(this.email());
    this.editErrors.set({});
    this.isEditing.set(true);
    this.isSaved.set(false);
  }

  cancelEdit(): void {
    this.isEditing.set(false);
    this.editErrors.set({});
  }

  async saveEdit(): Promise<void> {
    const errors: { username?: string; email?: string } = {};
    if (this.usernameError()) errors.username = this.usernameError();
    if (this.emailError()) errors.email = this.emailError();
    this.editErrors.set(errors);
    if (Object.keys(errors).length > 0) return;

    this.username.set(this.editUsername());
    this.email.set(this.editEmail());
    this.isEditing.set(false);
    this.isSaved.set(true);
    setTimeout(() => this.isSaved.set(false), 3000);
  }
}