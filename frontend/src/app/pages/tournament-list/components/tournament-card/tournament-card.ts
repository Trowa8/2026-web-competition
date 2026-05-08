import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tournament-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tournament-card.html',
  styleUrls: ['./tournament-card.css']
})
export class TournamentCard {
  @Input() tournament: any;
  @Output() signUp = new EventEmitter<number>();
}