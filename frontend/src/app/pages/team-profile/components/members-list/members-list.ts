import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamMember } from '../../team-profile';

@Component({
  selector: 'app-members-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './members-list.html',
  styleUrls: ['./members-list.css']
})
export class MembersList {
  @Input() members: TeamMember[] = [];
  @Output() viewMember = new EventEmitter<TeamMember>();
}