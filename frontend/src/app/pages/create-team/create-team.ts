import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TeamCreate } from '../../shared/types/team.types';

@Component({
  selector: 'app-create-team',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-team.html',
  styleUrl: './create-team.css'
})
export class CreateTeam {
  private router = inject(Router);

  teamData = signal<TeamCreate>({
    name: '',
    description: '',
    maxMembers: 3
  });

  onCreateTeam() {
    console.log('Створення команди з даними:', this.teamData());
    alert('Команду успішно створено (імітація)!');
  }
}