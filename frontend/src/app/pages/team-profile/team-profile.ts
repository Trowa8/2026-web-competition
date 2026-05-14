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
  // Початковий стан — команда існує
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
      { name: 'Beta Challenge', place: '3rd', score: '720' },
      { name: 'Spring Cup', place: '2nd', score: '810' }
    ]
  };

  constructor(private router: Router) { }

  onInvite() {
    const name = prompt('Enter new member name:');
    if (name) {
      this.teamData.members.push({
        id: Math.floor(Math.random() * 999).toString(),
        name: name,
        role: 'Member'
      });
    }
  }

  onDelete() {
    if (confirm('Are you sure you want to delete your team? This action cannot be undone.')) {
      this.isDeleted = true;
    }
  }
}