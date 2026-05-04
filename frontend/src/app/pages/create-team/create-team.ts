import { Component } from '@angular/core';
import { TeamForm } from './components/team-form/team-form';

@Component({
    selector: 'app-create-team',
    standalone: true,
    imports: [TeamForm],
    templateUrl: './create-team.html',
    styleUrl: './create-team.css',
})
export class CreateTeamPage {
    onCreateTeam(data: { name: string; description: string; members: string[] }) {
        console.log('Create Team DTO:', data);
        alert('Команду створено (mock)');
    }
}