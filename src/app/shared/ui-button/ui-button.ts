import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-button.html',
  styleUrls: ['./ui-button.scss'],
})
export class UiButton {
  @Input() text = 'Button';
  @Input() color = 'primary';
  @Input() variant = 'solid';
  @Input() disabled = false;
  @Output() onClick = new EventEmitter<void>();

  handleClick() {
    if (this.disabled) {
      return;
    }
    this.onClick.emit();
  }
}

