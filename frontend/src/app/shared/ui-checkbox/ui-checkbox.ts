import { Component, InputSignal, output, input, signal } from '@angular/core';
@Component({
  selector: 'ui-checkbox',
  imports: [],
  templateUrl: './ui-checkbox.html',
  styleUrl: './ui-checkbox.css',
})
export class UiCheckbox {
  public readonly label: InputSignal<string> = input('Option');
  public readonly checked: InputSignal<boolean> = input(false);
  public readonly checkedChange = output<boolean>();
  protected readonly isChecked = signal(false);
  ngOnInit(): void {
    this.isChecked.set(this.checked());
  }
  toggle(): void {
    this.isChecked.update(state => !state);
    this.checkedChange.emit(this.isChecked());
  }
}
