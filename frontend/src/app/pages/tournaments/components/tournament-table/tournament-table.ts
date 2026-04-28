import { Component, Input } from "@angular/core";

type Tournament = { id: number; name: string; status: string; maxTeams: number; registeredTeams: number };

@Component({
    selector: "app-tournament-table",
    standalone: true,
    templateUrl: "./tournament-table.html",
    styleUrls: ["./tournament-table.css"],
})
export class TournamentTable {
    @Input() tournaments: Tournament[] = [];

    getStatusText(status: string): string {
        const map: Record<string, string> = {
            draft: "Чернетка",
            registration: "Реєстрація",
            ongoing: "Триває",
            completed: "Завершено",
            cancelled: "Скасовано",
        };
        return map[status] || status;
    }
}
