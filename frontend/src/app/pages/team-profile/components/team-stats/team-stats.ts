import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-team-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './team-stats.html',
  styleUrls: ['./team-stats.css']
})
export class TeamStats {
  @Input() stats: any;
}