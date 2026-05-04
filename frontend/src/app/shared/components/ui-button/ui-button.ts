import { Component, InputSignal, OutputEmitterRef, input, output} from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonColor = 'primary' | 'outline' | 'leave' | 'secondary' ;
export type ButtonType = 'button' | 'submit' | 'reset';
export type ButtonAlignment = 'left' | 'center' | 'right';
@Component({
  selector: 'ui-button',
  imports: [CommonModule],
  templateUrl: './ui-button.html',
  styleUrls: ['./ui-button.css'],
})
export class UiButton {
  public readonly text: InputSignal<string>=input('Button');
  public readonly color: InputSignal<ButtonColor>=input<ButtonColor>('primary');
  public readonly disabled: InputSignal<boolean>=input(false);
  public readonly isFullWidth: InputSignal<boolean> = input(false);
  public readonly icon: InputSignal<string > = input("");
  public readonly iconPosition: InputSignal<'left' | 'right'> = input<'left' | 'right'>('left');
  public readonly type: InputSignal<ButtonType> = input<ButtonType>('button');
  public readonly alignment: InputSignal<ButtonAlignment> = input<ButtonAlignment>('center');

  public readonly onClick: OutputEmitterRef<void> = output<void>();
}

