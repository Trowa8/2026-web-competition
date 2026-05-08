import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Team } from '../../create-tournament';

@Component({
  selector: 'app-bracket-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bracket-preview.html',
  styleUrls: ['./bracket-preview.css']
})
export class BracketPreview {
  @Input() teams: Team[] = [];
  @Input() numberOfTeams: number = 8;

  get quarterFinals(): { team1: string; team2: string }[] {
    const matches = [];
    const shuffled = [...this.teams];
    for (let i = 0; i < Math.min(8, shuffled.length); i += 2) {
      matches.push({
        team1: shuffled[i]?.name || 'TBD',
        team2: shuffled[i + 1]?.name || 'TBD'
      });
    }
    return matches;
  }
}