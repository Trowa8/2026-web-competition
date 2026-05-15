import { Component, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
    selector: "app-members-list",
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: "./members-list.html",
    styleUrls: ["./members-list.css"],
})
export class MembersList {
    @Output() addMember = new EventEmitter<string>();

    members = [
        { name: "VouPrchakero3000", role: "Captain" },
        { name: "Niksulini", role: "Co-Captain" },
        { name: "Stipek", role: "Member" },
    ];

    showAddForm = false;
    newMemberName = "";
    newMemberRole = "Member";

    addNewMember() {
        if (this.newMemberName.trim()) {
            this.members.push({
                name: this.newMemberName,
                role: this.newMemberRole,
            });
            this.addMember.emit(this.newMemberName);
            this.newMemberName = "";
            this.showAddForm = false;
        }
    }

    removeMember(index: number) {
        this.members.splice(index, 1);
    }
}
