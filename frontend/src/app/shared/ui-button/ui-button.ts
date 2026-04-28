import { Component, InputSignal, OutputEmitterRef, input, output} from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonColor = 'primary' | 'outline' | 'leave' | 'secondary' | 'disabled';
export type ButtonType = 'button' | 'submit' | 'reset';
export type ButtonAlignment = 'left' | 'center' | 'right';
export type ButtonVariant = 'solid' | 'outline' | 'ghost';
@Component({
  selector: 'ui-button',
  imports: [CommonModule],
  templateUrl: './ui-button.html',
  styleUrls: ['./ui-button.css'],
})
export class UiButton {
  public readonly text: InputSignal<string>=input('Button');
  public readonly color: InputSignal<ButtonColor>=input<ButtonColor>('primary');
  public readonly variant: InputSignal<ButtonVariant> = input<ButtonVariant>('solid');
  public readonly disabled: InputSignal<boolean>=input(false);
  public readonly IsFullWidth: InputSignal<boolean> = input(false);
  public readonly icon: InputSignal<string > = input("");
  public readonly IconPosition: InputSignal<'left' | 'right'> = input<'left' | 'right'>('left');
  public readonly type: InputSignal<ButtonType> = input<ButtonType>('button');
  public readonly alignment: InputSignal<ButtonAlignment> = input<ButtonAlignment>('center');

  public readonly onClick: OutputEmitterRef<void> = output<void>();
}

