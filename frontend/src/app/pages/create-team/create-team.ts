import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  members: { id: number; name: string }[] = [];
  suggestedUsers = [
    { id: 1, name: 'VouPrchakero3000' },
    { id: 2, name: 'Niksulini' },
    { id: 3, name: 'Stipek' }
  ];

  newMemberName = '';
  showAddMemberForm = false;

  addSuggestedUser(user: { id: number; name: string }) {
    if (!this.members.find(m => m.id === user.id)) {
      this.members.push({ id: user.id, name: user.name });
      this.suggestedUsers = this.suggestedUsers.filter(u => u.id !== user.id);
    }
  }

  addManualMember() {
    if (this.newMemberName.trim()) {
      const newId = Date.now();
      this.members.push({ id: newId, name: this.newMemberName });
      this.newMemberName = '';
      this.showAddMemberForm = false;
    }
  }

  removeMember(id: number) {
    const removed = this.members.find(m => m.id === id);
    this.members = this.members.filter(m => m.id !== id);
    if (removed) {
      this.suggestedUsers.push({ id: removed.id, name: removed.name });
    }
  }

  onLogoUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.teamLogo = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  createTeam() {
    if (!this.teamName.trim()) {
      alert('Введіть назву команди');
      return;
    }
    if (this.members.length === 0) {
      alert('Додайте хоча б одного учасника');
      return;
    }

    const teamData = {
      name: this.teamName,
      description: this.description,
      logo: this.teamLogo,
      members: this.members
    };

    localStorage.setItem('createdTeam', JSON.stringify(teamData));
    alert(`✅ Команду "${this.teamName}" створено з ${this.members.length} учасниками!`);
    console.log('Team created:', teamData);

    this.resetForm();
  }

  resetForm() {
    this.teamName = '';
    this.description = '';
    this.teamLogo = null;
    this.members = [];
    this.suggestedUsers = [
      { id: 1, name: 'VouPrchakero3000' },
      { id: 2, name: 'Niksulini' },
      { id: 3, name: 'Stipek' }
    ];
  }
}