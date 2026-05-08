import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-role-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './role-filter.html',
  styleUrls: ['./role-filter.css']
})
export class RoleFilter {
  roles = ['All', 'Participant', 'Judge', 'Organizer'];
  selected = 'All';

  selectRole(role: string) {
    this.selected = role;
  }
}