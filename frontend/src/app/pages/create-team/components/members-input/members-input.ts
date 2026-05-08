import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TeamMember } from '../../create-team';

@Component({
  selector: 'app-members-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './members-input.html',
  styleUrls: ['./members-input.css']
})
export class MembersInput {
  @Input() members: TeamMember[] = [];
  @Output() memberRemoved = new EventEmitter<number>();

  newMemberName = '';
  showAddForm = false;

  addMember() {
    if (this.newMemberName.trim()) {
      const newMember: TeamMember = {
        id: Date.now(),
        name: this.newMemberName.trim()
      };
      this.members = [...this.members, newMember];
      this.newMemberName = '';
      this.showAddForm = false;
    }
  }

  removeMember(id: number) {
    this.memberRemoved.emit(id);
  }
}