import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-team-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './team-profile.html',
  styleUrls: ['./team-profile.css']
})
export class TeamProfileComponent {
  team = signal({
    name: 'Cyber Hornets',
    description: 'Команда для участі в турнірах. Ми фокусуємося на Angular та UI/UX.',
    captain_id: 'u-1',
    createdAt: 'May 10, 2026',
    members: [
      { id: 'u-1', role: 'Капітан', login: 'Captain_UA' },
      { id: 'u-2', role: 'Розробник', login: 'Dev_User' }
    ]
  });

  tournaments = signal([
    { name: 'Angular Cup 2026', dates: '01.06 - 05.06.2026' }
  ]);

  joinCode = signal('');

  isCodeValid = computed(() => this.joinCode().length === 6);

  onJoin() { console.log('Joining with:', this.joinCode()); }
}