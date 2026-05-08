import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-teams-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './teams-table.html',
  styleUrls: ['./teams-table.css']
})
export class TeamsTable {
  teams = [
    'Alpha Team', 'Beta Squad', 'Gamma Force', 'Delta Unit',
    'Epsilon', 'Zeta', 'Eta', 'Theta'
  ];
}