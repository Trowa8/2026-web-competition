import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamInfo } from './team-info';

describe('TeamInfo', () => {
  let component: TeamInfo;
  let fixture: ComponentFixture<TeamInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
