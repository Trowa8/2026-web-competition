import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-task.html',
  styleUrl: './create-task.css',
})
export class CreateTask {
  title = signal('');
  description = signal('');
  tournamentId = signal('');

  isSubmitting = signal(false);

  submit() {
    if (!this.title() || !this.description() || !this.tournamentId()) {
      alert('Будь ласка, заповніть всі поля');
      return;
    }

    this.isSubmitting.set(true);

    const dto = {
      title: this.title(),
      description: this.description(),
      tournamentId: this.tournamentId(),
    };

    console.log('Create Task DTO:', dto);

    setTimeout(() => {
      this.isSubmitting.set(false);
      alert('Таска створена (mock)');
    }, 500);
  }
}