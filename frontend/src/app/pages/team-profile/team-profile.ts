import { Component, signal, computed } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
    selector: "app-team-profile",
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: "./team-profile.html",
    styleUrls: ["./team-profile.css"],
})
export class TeamProfileComponent {
    readonly current_user_id = signal<number>(1);
    readonly join_code = signal<string>("");

    team = signal<any>({
        team_id: 77,
        name: "Frontend Warriors",
        description: "Команда ентузіастів Angular, які прагнуть створювати ідеальні інтерфейси.",
        owner_id: 1,
        created_at: "2026-04-10",
        members: [
            { user_id: 1, role: "Captain" },
            { user_id: 2, role: "Developer" },
            { user_id: 3, role: "Designer" },
        ],
    });

    tournaments = signal<any[]>([
        {
            tournament_id: 1,
            name: "Spring UI Cup",
            start_date: "2026-05-15",
        },
    ]);

    is_captain = computed(() => this.team().owner_id === this.current_user_id());

    on_delete() {
        if (confirm("Видалити команду?")) console.log("Team deleted");
    }
}
