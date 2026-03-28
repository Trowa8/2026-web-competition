import { TestBed } from '@angular/core/testing';

import { ServerTest } from './server-test';

describe('ServerTest', () => {
  let service: ServerTest;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServerTest);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
