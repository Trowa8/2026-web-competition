import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
    selector: "app-team-info",
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: "./team-info.html",
    styleUrls: ["./team-info.css"],
})
export class TeamInfo {
    @Input() teamName = "Code/Arena";
    @Input() isEditing = false;
    @Input() newTeamName = "";
    @Output() editTeam = new EventEmitter<void>();
    @Output() saveTeam = new EventEmitter<void>();
    @Output() cancelEdit = new EventEmitter<void>();
    @Output() updateName = new EventEmitter<string>();
}
