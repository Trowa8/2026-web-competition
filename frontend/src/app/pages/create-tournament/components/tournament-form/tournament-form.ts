import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tournament-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tournament-form.html',
  styleUrls: ['./tournament-form.css']
})
export class TournamentForm {
  @Output() tournamentInfoUpdated = new EventEmitter<any>();

  tournamentName = '';
  description = '';
  startDate = '';
  endDate = '';
  numberOfTeams = 8;
  prizePool = '';
  format = 'single';

  onInputChange() {
    this.tournamentInfoUpdated.emit({
      name: this.tournamentName,
      description: this.description,
      startDate: this.startDate,
      endDate: this.endDate,
      numberOfTeams: this.numberOfTeams,
      prizePool: this.prizePool,
      format: this.format
    });
  }
}