import { TestBed } from '@angular/core/testing';

import { ReviewingPanel } from './reviewing-panel';

describe('ReviewingPanel', () => {
  let service: ReviewingPanel;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReviewingPanel);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
