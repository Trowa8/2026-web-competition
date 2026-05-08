import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamForm } from './components/team-form/team-form';
import { MembersInput } from './components/members-input/members-input';
import { TeamPreview } from './components/team-preview/team-preview';

export interface TeamMember {
  id: number;
  name: string;
  role?: string;
}

export interface Team {
  name: string;
  description: string;
  members: TeamMember[];
}

@Component({
  selector: 'app-create-team',
  standalone: true,
  imports: [CommonModule, TeamForm, MembersInput, TeamPreview],
  templateUrl: './create-team.html',
  styleUrls: ['./create-team.css']
})
export class CreateTeam {
  team: Team = {
    name: '',
    description: '',
    members: []
  };

  onTeamInfoUpdated(info: { name: string; description: string }) {
    this.team.name = info.name;
    this.team.description = info.description;
  }

  onMemberAdded(member: TeamMember) {
    if (!this.team.members.find(m => m.id === member.id)) {
      this.team.members = [...this.team.members, member];
    }
  }

  onMemberRemoved(memberId: number) {
    this.team.members = this.team.members.filter(m => m.id !== memberId);
  }

  onCreateTeam() {
    if (!this.team.name.trim()) {
      alert('Будь ласка, введіть назву команди');
      return;
    }
    if (this.team.members.length === 0) {
      alert('Будь ласка, додайте хоча б одного учасника');
      return;
    }

    localStorage.setItem('createdTeam', JSON.stringify(this.team));
    alert(`✅ Команда "${this.team.name}" успішно створена з ${this.team.members.length} учасниками!`);
    console.log('Team created:', this.team);
  }
}