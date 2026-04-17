import { Component, InputSignal, OutputEmitterRef, input, output} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-button.html',
  styleUrls: ['./ui-button.css'],
})
export class UiButton {
  public readonly text: InputSignal<string>=input('Button');
  public readonly color: InputSignal<'primary' | 'outline' | 'leave' | 'secondary' | 'disabled'> = 
    input<'primary' | 'outline' | 'leave' | 'secondary' | 'disabled'>('primary');
  public readonly variant: InputSignal<string> = input('solid');
  public readonly disabled: InputSignal<boolean>=input(false);
  public readonly onClick: OutputEmitterRef<void> = output<void>();
}

