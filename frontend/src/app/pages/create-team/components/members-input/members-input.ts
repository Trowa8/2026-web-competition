import { Component, EventEmitter, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-members-input',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './members-input.html',
    styleUrl: './members-input.css',
})
export class MembersInput {
    member = signal('');
    members = signal<string[]>([]);

    @Output() change = new EventEmitter<string[]>();

    add() {
        if (!this.member()) return;

        this.members.set([...this.members(), this.member()]);
        this.member.set('');
        this.change.emit(this.members());
    }

    remove(index: number) {
        const updated = this.members().filter((_, i) => i !== index);
        this.members.set(updated);
        this.change.emit(updated);
    }
}