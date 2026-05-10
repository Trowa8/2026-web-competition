import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-team',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-team.html',
  styleUrl: './create-team.css'
})
export class CreateTeam {
  teamName = signal('');
  description = signal('');
  maxMembers = signal(5);

  onCreateTeam() {
    const newTeam = {
      name: this.teamName(),
      description: this.description(),
      maxMembers: this.maxMembers(),
      createdAt: new Date().toISOString()
    };

    console.log('Команда створюється:', newTeam);
    alert(`Команду "${newTeam.name}" успішно створено!`);
  }
}