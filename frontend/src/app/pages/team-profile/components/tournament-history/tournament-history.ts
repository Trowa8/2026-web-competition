import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tournament } from '../../team-profile';

@Component({
  selector: 'app-tournament-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tournament-history.html',
  styleUrls: ['./tournament-history.css']
})
export class TournamentHistory {
  @Input() tournaments: Tournament[] = [];
  @Output() viewHistory = new EventEmitter<void>();
  @Output() viewAll = new EventEmitter<void>();

  getPositionEmoji(position: number): string {
    if (position === 1) return '🥇';
    if (position === 2) return '🥈';
    if (position === 3) return '🥉';
    return '📊';
  }
}