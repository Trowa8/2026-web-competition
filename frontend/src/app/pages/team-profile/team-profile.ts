import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-team-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './team-profile.html',
  styleUrl: './team-profile.css'
})
export class TeamProfileComponent {
  activeNav = signal('Tournament #1');
  isEditing = signal(false);

  team = signal({
    name: 'CyberArena',
    description: 'This is the best competitive team for algorithmic challenges.',
    published: '13.05.2026',
    logo: ''
  });

  toggleEdit() {
    this.isEditing.set(!this.isEditing());
  }

  triggerFileInput() {
    const fileInput = document.getElementById('teamLogoInput') as HTMLElement;
    fileInput.click();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.team.update(t => ({ ...t, logo: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  }

  inviteEmail = '';
  onInvite() {
    if (this.inviteEmail) {
      alert(`Запрошення для ${this.inviteEmail} надіслано!`);
      this.inviteEmail = '';
    }
  }

  setNav(val: string) { this.activeNav.set(val); }
}