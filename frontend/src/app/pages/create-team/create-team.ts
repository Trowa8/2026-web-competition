import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type TeamMember = {
  id: number;
  name: string;
};

@Component({
  selector: 'app-create-team',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-team.html',
  styleUrls: ['./create-team.css']
})
export class CreateTeam {
  teamName = '';
  description = '';
  teamLogo: string | null = null;

  members: TeamMember[] = [
    { id: 1, name: 'VovaProfHacker2030' },
    { id: 2, name: 'NikitaBx' },
    { id: 3, name: 'Simple' }
  ];

  suggestedUsers = [
    { id: 4, name: 'User4' },
    { id: 5, name: 'User5' }
  ];

  showAddMemberForm = false;
  newMemberName = '';

  addMember(member: TeamMember) {
    if (!this.members.find(m => m.id === member.id)) {
      this.members.push(member);
      this.suggestedUsers = this.suggestedUsers.filter(u => u.id !== member.id);
    }
  }

  addManualMember() {
    if (!this.newMemberName.trim()) return;
    const newMember = {
      id: Date.now(),
      name: this.newMemberName
    };
    this.members.push(newMember);
    this.newMemberName = '';
    this.showAddMemberForm = false;
  }

  removeMember(id: number) {
    const removed = this.members.find(m => m.id === id);
    this.members = this.members.filter(m => m.id !== id);
    if (removed) {
      this.suggestedUsers.push(removed);
    }
  }

  onLogoUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.teamLogo = e.target?.result as string;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  createTeam() {
    if (!this.teamName.trim()) {
      alert('Введіть назву команди');
      return;
    }
    alert(`✅ Команду "${this.teamName}" створено з ${this.members.length} учасниками!`);
  }
}