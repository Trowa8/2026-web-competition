import { Component, signal, WritableSignal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Team } from "../../shared/types/team.types";

@Component({
    selector: "app-team-profile",
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: "./team-profile.html",
    styleUrl: "./team-profile.css",
})
export class TeamProfileComponent {
    activeNav = signal("Tournament #1");
    isEditing = signal(false);

    team: WritableSignal<Team> = signal({
        name: "CyberArena",
        description: "This is the best competitive team for algorithmic challenges.",
        createdAt: "13.05.2026",
        members: [
            { name: "Alice", role: "Captain", userId: 1 },
            { name: "Bob", role: "Member", userId: 2 },
            { name: "Charlie", role: "Member", userId: 3 },
        ],
        ownerId: 1,
        teamId: 1,
    });

    toggleEdit() {
        this.isEditing.update(value => !value);
    }

    inviteEmail = "";
    onInvite() {
        if (this.inviteEmail) {
            alert(`Запрошення для ${this.inviteEmail} надіслано!`);
            this.inviteEmail = "";
        }
    }

    setNav(val: string) {
        this.activeNav.set(val);
    }
}
