import { Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tournament-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './tournament-search.html',
  styleUrls: ['./tournament-search.css'],
})
export class TournamentSearch {
  search = output<string>();
  searchValue = signal('');

  onInput(e: Event) {
    const val = (e.target as HTMLInputElement).value;
    this.searchValue.set(val);
    this.search.emit(val);
  }
}