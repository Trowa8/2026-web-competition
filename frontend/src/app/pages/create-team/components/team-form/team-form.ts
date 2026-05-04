import { Component, EventEmitter, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MembersInput } from '../members-input/members-input';

@Component({
    selector: 'app-team-form',
    standalone: true,
    imports: [FormsModule, MembersInput],
    templateUrl: './team-form.html',
    styleUrl: './team-form.css',
})
export class TeamForm {
    name = signal('');
    description = signal('');
    members = signal<string[]>([]);

    @Output() create = new EventEmitter<{
        name: string;
        description: string;
        members: string[];
    }>();

    submit() {
        if (!this.name()) {
            alert('Введіть назву команди');
            return;
        }

        this.create.emit({
            name: this.name(),
            description: this.description(),
            members: this.members(),
        });
    }

    updateMembers(list: string[]) {
        this.members.set(list);
    }
}