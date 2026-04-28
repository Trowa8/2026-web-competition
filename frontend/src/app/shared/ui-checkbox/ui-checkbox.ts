import { Component, InputSignal, output, input, signal, model } from "@angular/core";

let nextId = 0;
@Component({
    selector: "ui-checkbox",
    imports: [],
    templateUrl: "./ui-checkbox.html",
    styleUrl: "./ui-checkbox.css",
})
export class UiCheckbox {
    public readonly label: InputSignal<string> = input("Option");
    public readonly checked = model<boolean>(false);
    public readonly isError: InputSignal<boolean> = input(false);
    public readonly isDisabled: InputSignal<boolean> = input(false);
    readonly inputId = `ui-checkbox-${nextId++}`;
    toggle(): void {
        if (!this.isDisabled()) {
            this.checked.update(state => !state);
        }
    }
}
