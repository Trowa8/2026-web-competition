import { TestBed } from '@angular/core/testing';

import { ScoringStatus } from './scoring-status';

describe('ScoringStatus', () => {
  let service: ScoringStatus;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScoringStatus);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
