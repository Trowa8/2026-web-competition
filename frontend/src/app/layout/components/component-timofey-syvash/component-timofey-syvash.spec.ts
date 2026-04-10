import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentTimofeySyvash } from './component-timofey-syvash';

describe('ComponentTimofeySyvash', () => {
  let component: ComponentTimofeySyvash;
  let fixture: ComponentFixture<ComponentTimofeySyvash>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentTimofeySyvash]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentTimofeySyvash);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
