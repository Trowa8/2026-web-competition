import { Component, output, signal } from '@angular/core';

@Component({
  selector: 'app-tournament-search',
  standalone: true,
  template: `
    <div class="search-wrapper">
      <span class="search-icon">🔍</span>
      <input
        type="text"
        [value]="searchValue()"
        (input)="onInput($event)"
        placeholder="Пошук турнірів..."
        class="search-input"
      />
    </div>
  `,
  styles: [`
    .search-wrapper {
      position: relative;
      flex: 1;
    }
    .search-icon {
      position: absolute;
      left: 14px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 16px;
      color: #999;
    }
    .search-input {
      width: 100%;
      padding: 12px 16px 12px 44px;
      border: 2px solid #e0e0e0;
      border-radius: 12px;
      font-size: 14px;
    }
    .search-input:focus {
      outline: none;
      border-color: #667eea;
    }
  `]
})
export class TournamentSearchComponent {
  protected readonly search = output<string>();
  protected readonly searchValue = signal('');

  protected onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchValue.set(value);
    this.search.emit(value);
  }
}