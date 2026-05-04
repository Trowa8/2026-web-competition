import { Component, Input } from '@angular/core';
import { TeamProfile } from '../../../../shared/types/team.types';

@Component({
  selector: 'app-team-info',
  standalone: true,
  templateUrl: './team-info.html',
  styleUrl: './team-info.css',
})
export class TeamInfo {
  @Input() team!: TeamProfile;
}