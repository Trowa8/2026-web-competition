import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TournamentService, Tournament } from '../features/tournaments/tournament.service';

@Component({
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
  <div class="p-6">
    <h1 class="text-2xl mb-4">Турніри</h1>

    <div class="flex gap-2 mb-4">
      <input [(ngModel)]="newName"
        class="border p-2 rounded w-64"
        placeholder="Назва турніру"/>

      <button (click)="add()"
        class="bg-green-500 text-white px-4 rounded">
        Додати
      </button>
    </div>

    <div class="grid gap-3">
      <div *ngFor="let t of tournaments"
        class="p-4 bg-gray-100 rounded flex justify-between">

        {{t.name}}

        <button (click)="remove(t.id)"
          class="text-red-500">✕</button>
      </div>
    </div>
  </div>
  `
})
export class TournamentsComponent {
    tournaments: Tournament[] = [];
    newName = '';

    constructor(private service: TournamentService) { }

    async ngOnInit() {
        this.tournaments = await this.service.getAll();
    }

    async add() {
        if (!this.newName) return;

        await this.service.create(this.newName);
        this.tournaments = await this.service.getAll();
        this.newName = '';
    }

    async remove(id: number) {
        await this.service.delete(id);
        this.tournaments = await this.service.getAll();
    }
}