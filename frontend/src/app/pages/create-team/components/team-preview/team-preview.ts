import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Team } from '../../create-team';

@Component({
  selector: 'app-team-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './team-preview.html',
  styleUrls: ['./team-preview.css']
})
export class TeamPreview {
  @Input() team!: Team;
}