import { Component, EventEmitter, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-tournament-form',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './tournament-form.html',
    styleUrl: './tournament-form.css',
})
export class TournamentForm {
    name = signal('');
    description = signal('');

    @Output() create = new EventEmitter<{ name: string; description: string }>();

    submit() {
        if (!this.name() || !this.description()) {
            alert('Заповніть всі поля');
            return;
        }

        this.create.emit({
            name: this.name(),
            description: this.description(),
        });
    }
}