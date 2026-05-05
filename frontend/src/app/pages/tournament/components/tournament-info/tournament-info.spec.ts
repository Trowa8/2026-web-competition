import { TestBed } from '@angular/core/testing';

import { TournamentInfo } from './tournament-info';

describe('TournamentInfo', () => {
  let service: TournamentInfo;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TournamentInfo);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
