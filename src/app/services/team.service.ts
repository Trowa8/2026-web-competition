import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TeamService {
    getTeams() {
        return [
            { id: 1, name: 'Динамо Київ' },
            { id: 2, name: 'Шахтар Донецьк' },
            { id: 3, name: 'Зоря Луганськ' },
            { id: 4, name: 'Ворскла Полтава' }
        ];
    }
}