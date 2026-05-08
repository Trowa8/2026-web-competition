import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-code-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './code-editor.html',
  styleUrls: ['./code-editor.css']
})
export class CodeEditor {
  @Output() submitted = new EventEmitter<string>();
  code: string = '';

  onSubmit() {
    if (this.code.trim()) {
      this.submitted.emit(this.code);
    } else {
      alert('Please write your solution before submitting!');
    }
  }
}