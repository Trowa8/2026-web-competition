import { TestBed } from '@angular/core/testing';

import { TeamsTable } from './teams-table';

describe('TeamsTable', () => {
  let service: TeamsTable;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamsTable);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
