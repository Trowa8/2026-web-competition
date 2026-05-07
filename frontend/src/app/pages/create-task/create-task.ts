import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
//import { TaskService } from "../../shared/services/task.service";

@Component({
    selector: "app-create-task",
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: "./create-task.html",
    styleUrl: "./create-task.css",
})
export class CreateTask {
    private readonly router = inject(Router);
    //private readonly taskService = inject(TaskService);

    task = {
        name: "",
        description: "",
        deadline: "",
        tournamentId: "",
    };

    public async onSubmit(): Promise<void> {
        if (!this.task.name || !this.task.description || !this.task.deadline || !this.task.tournamentId) {
            alert("Будь ласка, заповніть всі обов'язкові поля");
            return;
        }

        try {
            // await this.taskService.createTask(this.task.tournamentId, {
            //     name: this.task.name,
            //     description: this.task.description,
            //     deadline: this.task.deadline,
            // });
            alert("Завдання успішно створено!");
            this.router.navigate(["/tournaments"]);
        } catch {
            alert("Помилка при створенні завдання");
        }
    }
}