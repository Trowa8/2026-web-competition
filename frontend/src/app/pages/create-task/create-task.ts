import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";

@Component({
    selector: "app-create-task",
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: "./create-task.html",
    styleUrl: "./create-task.scss",
})
export class CreateTask {
    task = {
        title: "",
        description: "",
        deadline: "",
        tournamentId: 0,
    };

    constructor(private router: Router) {}

    async onSubmit() {
        if (!this.task.title || !this.task.description || !this.task.deadline || !this.task.tournamentId) {
            alert("Будь ласка, заповніть всі обов’язкові поля");
            return;
        }

        try {
            alert("Завдання успішно створено!");
            this.router.navigate(["/tournaments"]);
        } catch (err) {
            alert("Помилка при створенні завдання");
        }
    }
}
