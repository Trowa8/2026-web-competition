import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-team-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './team-form.html',
  styleUrls: ['./team-form.css']
})
export class TeamForm {
  @Output() teamInfoUpdated = new EventEmitter<{ name: string; description: string }>();

  teamName = '';
  description = '';
  logoPreview: string | null = null;

  onInputChange() {
    this.teamInfoUpdated.emit({
      name: this.teamName,
      description: this.description
    });
  }

  onLogoUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.logoPreview = e.target?.result as string;
        localStorage.setItem('teamLogo', this.logoPreview);
      };
      reader.readAsDataURL(file);
    }
  }

  removeLogo() {
    this.logoPreview = null;
    localStorage.removeItem('teamLogo');
  }
}