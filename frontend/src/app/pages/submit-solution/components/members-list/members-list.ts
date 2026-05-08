import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-members-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './members-list.html',
  styleUrls: ['./members-list.css']
})
export class MembersList {
  @Output() addMember = new EventEmitter<string>();

  members = [
    { name: 'VouPrchakero3000', role: 'Captain', active: true },
    { name: 'Niksulini', role: 'Co-Captain', active: true },
    { name: 'Stipek', role: 'Member', active: true }
  ];

  showAddForm = false;
  newMemberName = '';
  newMemberRole = 'Member';

  addNewMember() {
    if (this.newMemberName.trim()) {
      this.members.push({
        name: this.newMemberName,
        role: this.newMemberRole,
        active: true
      });
      this.newMemberName = '';
      this.showAddForm = false;
    }
  }

  removeMember(index: number) {
    this.members.splice(index, 1);
  }

  toggleRole(index: number) {
    const roles = ['Captain', 'Co-Captain', 'Member'];
    const currentIndex = roles.indexOf(this.members[index].role);
    this.members[index].role = roles[(currentIndex + 1) % roles.length];
  }
}