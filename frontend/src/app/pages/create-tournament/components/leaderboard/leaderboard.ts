import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Team } from '../../create-tournament';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leaderboard.html',
  styleUrls: ['./leaderboard.css']
})
export class Leaderboard {
  @Input() teams: Team[] = [];
}