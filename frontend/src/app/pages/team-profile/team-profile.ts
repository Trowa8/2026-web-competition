import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-team-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './team-profile.html',
  styleUrls: ['./team-profile.css']
})
export class TeamProfileComponent {
  isDeleted = false;

  teamData = {
    name: 'AlgorithmX',
    code: 'ALG-792K',
    members: [
      { id: '42', name: 'maxkovalenko', role: 'Leader' },
      { id: '89', name: 'olena_k', role: 'Member' },
      { id: '156', name: 'yura_pro', role: 'Member' }
    ],
    history: [
      { name: 'Tournament Alpha', place: '1st', score: '950' },
      { name: 'Beta Challenge', place: '3rd', score: '720' }
    ]
  };

  constructor(private router: Router) { }

  onInvite() {
    const n = prompt('Ім’я нового учасника?');
    if (n) this.teamData.members.push({ id: '99', name: n, role: 'Member' });
  }

  onDelete() {
    if (confirm('Видалити команду?')) {
      this.isDeleted = true;
    }
  }

  onEdit() { alert('Редагування...'); }
}