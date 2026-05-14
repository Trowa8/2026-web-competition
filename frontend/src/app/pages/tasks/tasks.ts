import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tasks.html',
  styleUrls: ['./tasks.css']
})
export class TasksComponent {
  selectedFileName: string = '';

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) this.selectedFileName = file.name;
  }

  submitTask() {
    if (!this.selectedFileName) return alert('Оберіть файл!');
    alert('Завдання надіслано успішно!');
  }
}