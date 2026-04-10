import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TournamentService {

    getAll() {
        return [
            { id: 1, name: 'Dota 2 Cup' },
            { id: 2, name: 'CS2 League' }
        ];
    }
}