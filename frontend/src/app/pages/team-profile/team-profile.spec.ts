import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TeamProfileComponent } from "./team-profile";

describe("TeamProfile", () => {
    let component: TeamProfileComponent;
    let fixture: ComponentFixture<TeamProfileComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TeamProfileComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TeamProfileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
