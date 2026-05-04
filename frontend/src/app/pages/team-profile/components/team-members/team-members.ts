import { Component, Input } from '@angular/core';
import { TeamMember } from '../../../../shared/types/team.types';

@Component({
  selector: 'app-team-members',
  standalone: true,
  templateUrl: './team-members.html',
  styleUrl: './team-members.css',
})
export class TeamMembers {
  @Input() members: TeamMember[] = [];
}