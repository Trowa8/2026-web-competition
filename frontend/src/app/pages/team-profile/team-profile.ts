import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-team-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './team-profile.html',
  styleUrls: ['./team-profile.css']
})
export class TeamProfile {
  members = [
    { name: 'markovantikio', role: 'Leader', id: '#42', checked: false },
    { name: 'dlesa_k', role: 'Member', id: '#39', checked: false },
    { name: 'YIRLOPT', role: 'Member', id: '#116', checked: false }
  ];

  onGo() {
    alert('✅ Перехід до повідомлень команди');
  }

  onDeleteTeam() {
    if (confirm('Видалити ВСІХ учасників?')) {
      this.members = [];
      alert('🗑️ Всіх видалено');
    }
  }

  onInviteMember() {
    const newName = prompt('Введіть ім\'я учасника:');
    if (newName && newName.trim()) {
      this.members.push({
        name: newName.trim(),
        role: 'Member',
        id: '#' + Math.floor(Math.random() * 1000),
        checked: false
      });
    }
  }

  onRemoveMember(index: number) {
    if (confirm(`Видалити ${this.members[index].name}?`)) {
      this.members.splice(index, 1);
    }
  }

  onMemberCheck(index: number, event: Event) {
    const input = event.target as HTMLInputElement;
    this.members[index].checked = input.checked;
  }

  onTournamentClick(name: string) {
    alert(`ℹ️ Турнір: ${name}`);
  }
}